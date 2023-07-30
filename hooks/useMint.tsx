import React, { useState } from 'react'
import contractAbi from '../constants/abi/mint.abi.json'
import { zeroAddress } from 'viem'
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  erc20ABI
} from 'wagmi'
import { useCelo } from '@celo/react-celo'

export default function useMint () {
  const { address: rainbowAddress } = useAccount()
  const { address: celoAddress } = useCelo()
  const [id, setid] = useState(0)
  const [price, setPrice] = useState(BigInt(0))
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
