import { Names } from 'aws-cdk-lib'
import Image from 'next/image'
import React from 'react'

export default function Card ({ image, name, isConnected }: any) {
  return (
    <div className='relative w-auto  backdrop-blur-md rounded-md  shadow-lg p-5'>
        <span className='z-[200] flex items-center justify-center font-bold text-white text-2xl absolute top-0 left-0 right-0 bottom-0 rounded-lg bg-gray-400 opacity-80'>
            <h1>Comming soon!</h1>
        </span>
      <span className='relative'>
        <Image
          className='rounded-md shadow-md w-auto h-72 sm:w-60'
          alt='wonderfull NFT'
          src={image}
        />
        <p className='absolute bottom-0 left-0 text-white backdrop-blur-md py-2 px-8  before:content-["CUsd"] before:font-bold before:pr-2'>
          1
        </p>
      </span>
      <span>
        <p className='absolute top-0 left-0 py-2 px-5 opacity-75  text-center rounded-lg text-white bg-black font-bold'>
          Legendary
        </p>
      </span>
      <div className='py-2 flex flex-col gap-2'>
        <h1 className='text-lg font-bold text-start'>{name}</h1>
        {isConnected ? (
          <button className='bg-green-500 w-full text-white py-2 rounded-md'>
            Mint!
          </button>
        ): 
        <span>
            <h2 className='bg-green-500 w-full text-white py-2 px-2 rounded-md' >Connect your wallet to get a NFT</h2>
        </span>
        }
      </div>
    </div>
  )
}
