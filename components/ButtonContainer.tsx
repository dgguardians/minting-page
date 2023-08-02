import { ConnectButton } from '@rainbow-me/rainbowkit'
import React, { useEffect, useState } from 'react'
import { convertWeb3Address } from '../functions/formatAddress'

function ButtonContainer ({
  CeloAddress,
  RainbowAddress,
  isDesktop,
  connect,
  disconnect,
  setopenModal
}: any) {
  const [isMounted, setisMounted] = useState(false)
  useEffect(() => {
    setisMounted(true)
  }),
    []

  return (
    <div className='flex flex-col md:flex-row gap-2'>
      {!CeloAddress && (
        <ConnectButton
          //@ts-expect-error
          className='w-full'
          label={'Connect Web3 Wallet'}
          accountStatus={{
            smallScreen: 'full',
            largeScreen: 'full'
          }}
        />
      )}
      {isDesktop && CeloAddress && (
        <div
          onClick={() => setopenModal(true)}
          className='flex connectedShadow  flex-row justify-center bg-white px-1 rounded-lg hover:scale-105 transition duration-100 ease-in-out  items-center '
        >
          <div suppressHydrationWarning className='bg-blue-300 rounded-3xl p-1'>
            🐒
          </div>
          <button className=' text-black trasition duration-[125] relative font-bold rounded-xl ease-linear py-2 px-1 border-solid'>
            {convertWeb3Address(CeloAddress)}
          </button>
        </div>
      )}
      {/* To do, this is pretty ugly but works. */}
      {isDesktop && !CeloAddress && !RainbowAddress && isMounted && (
        <button
          className='rounded-xl shadow-lg font-bold px-4 py-2 bg-[#4C8030] text-white hover:transform   '
          onClick={connect}
        >
          Connect Celo Wallet
        </button>
      )}
    </div>
  )
}

export default ButtonContainer
