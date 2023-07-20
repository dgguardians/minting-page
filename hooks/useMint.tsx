import React, { useState } from 'react'
import contractAbi from '../constants/abi/mint.abi.json'
import { parseEther } from 'viem'
import { useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi'

export default function useMint () {
  const { address: rainbowAddress } = useAccount()
  const [id, setid] = useState(0)
  const [price, setPrice] = useState(`${0}` as `${number}`)
  const { config } = usePrepareContractWrite({
    address: '0x3f81a0817aDF6eaD6A1160367cfF52c13F3F0B73',
    abi: contractAbi,
    functionName: 'mint',
    args: [rainbowAddress, id, 1],
    value: parseEther(price),
  })
  const { write: mint } = useContractWrite(config)
  return { mint, setid, setPrice }
}
