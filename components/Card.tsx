import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import useMint from '../hooks/useMint'
import { parseEther } from 'viem'
import { useAccount } from 'wagmi'
import { useCelo } from '@celo/react-celo'

export default function Card ({
  image,
  name,
  isConnected,
  type,
  id,
  pricing
}: any) {
  const {
    approve,
    mintCelo,
    mintError,
    approvalError,
    data,
    refetch,
    approveLoad,
    approved,
    mint,
    minted,
    mintLoad,
    setid,
    actualId,
    setPrice
  } = useMint()

  const { address: rainbow } = useAccount()
  const { address: celo } = useCelo()

  // const [isMinted, setisMinted] = useState(false)

  const handleOnClick = () => {
    setid(id)
    setPrice(BigInt(pricing * 10 ** 18))
  }

  useEffect(() => {
    if (mintError || approvalError) {
      toast.error('Something went wrong, try again later', {
        toastId: 'flow',
        autoClose: 5000,
        onClose: () => window.location.reload()
      })
      console.error(mintError)
      return
    }

    if (minted) {
      toast.success('NFT minted!', {
        toastId: 'flow',
        autoClose: 5000,
        onClose: () => window.location.reload()
      })
      return
    }
    if (rainbow && actualId !== 0 && typeof data !== undefined) {
      // @ts-expect-error
      if (BigInt(pricing * 10 ** 18) > data) {
        refetch()
        if (!approved && approve && !approveLoad) {
          approve?.()
        }
      } else if (!minted && mint && !mintLoad) {
        mint?.()
        console.debug('por alguna razon pase aqui')
      }
    }
  }, [rainbow, actualId, data, approved, approveLoad, minted, mintLoad, mint])

  useEffect(() => {
    if (actualId !== 0 && celo) {
      mintCelo()
    }
  }, [actualId])

  return (
    <div className='relative w-auto bg-black bg-opacity-5  backdrop-blur-md rounded-md  shadow-lg p-5'>
      {/* <span className='z-[200] flex items-center justify-center font-bold text-white text-2xl absolute top-0 left-0 right-0 bottom-0 rounded-lg bg-gray-400 opacity-80'>
        <h1>Comming soon!</h1>
      </span> */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className='relative'
      >
        <Image
          loading='lazy'
          className='rounded-md shadow-md aspect-square'
          alt='wonderfull NFT'
          width={256}
          height={256}
          src={image}
        />
        <p className='absolute bottom-0 left-0 text-white backdrop-blur-md py-2 px-8  before:content-["CUsd"] before:font-bold before:pr-2'>
          {pricing}
        </p>
      </motion.span>
      <span>
        <p
          className={`absolute top-0 w-3/6 rounded-tl-lg  left-0 py-2 px-5 opacity-90  text-center  text-white ${
            type === 'Gold'
              ? 'bg-[#C7A44C]'
              : type === 'Silver'
              ? 'bg-[#999EA3]'
              : 'bg-[#D09D51]'
          }  font-bold`}
        >
          {type}
        </p>
      </span>
      <div className='py-2 flex flex-col gap-2'>
        <h1 className='text-lg font-bold text-start'>{name}</h1>
        {isConnected ? (
          <button
            disabled={approveLoad || mintLoad}
            onClick={handleOnClick}
            className={`${
              approveLoad || mintLoad ? 'bg-[#4c8030b7]' : 'bg-[#4C8030]'
            } font-bold w-full text-white py-2 rounded-md hover:bg-[#70bd46] transition-all duration-200 ease-in-out`}
          >
            Mint!
          </button>
        ) : (
          <span>
            <h2 className='bg-[#4C8030] font-bold w-full text-white py-2 px-2 rounded-md'>
              Connect your wallet to get a NFT
            </h2>
          </span>
        )}
      </div>
    </div>
  )
}
