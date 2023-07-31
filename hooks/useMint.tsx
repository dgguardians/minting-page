import React, { useState } from 'react'
import contractAbi from '../constants/abi/mint.abi.json'
import erc20Abi from '../constants/abi/erc20.abi.json'
import { zeroAddress } from 'viem'
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  erc20ABI
} from 'wagmi'
import { useCelo } from '@celo/react-celo'
import { toast } from 'react-toastify'

export default function useMint () {
  const { address: rainbowAddress } = useAccount()
  const { address: celoAddress, kit } = useCelo()

  const [id, setid] = useState(0)
  const [price, setPrice] = useState(BigInt(0))

  async function mintNFT () {
    const cUSD = await kit.contracts.getStableToken()
    let approveContract = new kit.connection.web3.eth.Contract(
      erc20ABI as any,
      process.env.NEXT_PUBLIC_CUSD_ADDRESS
    )
    await approveContract.methods
      .approve(process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS, price)
      .send({
        from: celoAddress,
        feeCurrency: cUSD.address
      })
    let contract = new kit.connection.web3.eth.Contract(
      contractAbi as any,
      process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS
    )
    const tx = await contract.methods.mint(id, 1).send({
      from: celoAddress,
      feeCurrency: cUSD.address
    })
    toast.success('NFT minted!', {
      toastId: 'flow',
      autoClose: 5000,
      onClose: () => window.location.reload()
    })
    return tx
  }
  const { config: approvalConfig } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_CUSD_ADDRESS as `0x{string}`,
    abi: erc20ABI,
    functionName: 'approve',
    args: [process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as `0x{string}`, price]
  })
  const {
    write: approve,
    isLoading: approveLoad,
    isSuccess: approved
  } = useContractWrite(approvalConfig)
  const { config: mintConfig } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as `0x{string}`,
    abi: contractAbi,
    functionName: 'mint',
    args: [id, 1]
  })
  const {
    write: mint,
    isLoading: mintLoad,
    isSuccess: minted
  } = useContractWrite(mintConfig)
  const { data } = useContractRead({
    address: process.env.NEXT_PUBLIC_CUSD_ADDRESS as `0x{string}`,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [
      // @ts-expect-error
      rainbowAddress ? rainbowAddress : celoAddress ? celoAddress : zeroAddress,
      process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as `0x{string}`
    ]
  })
  return {
    mintCelo: mintNFT,
    approve,
    approveLoad,
    approved,
    mint,
    minted,
    mintLoad,
    data,
    setid,
    actualId: id,
    setPrice
  }
}
