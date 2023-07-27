import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi'
import NFT_Air_Black from '../public/images/Air-Gold.webp'
import NFT_Air_Green from '../public/images/Air-Silver.webp'
import NFT_Air_White from '../public/images/Air-Copper.webp'
import NFT_Earth_Black from '../public/images/Earth-Gold.webp'
import NFT_Earth_Green from '../public/images/Earth-Silver.webp'
import NFT_Earth_White from '../public/images/Earth-Copper.webp'
import NFT_Fire_Black from '../public/images/Fire-Gold.webp'
import NFT_Fire_Green from '../public/images/Fire-Silver.webp'
import NFT_Fire_White from '../public/images/Fire-Copper.webp'
import NFT_Water_Black from '../public/images/Water-Gold.webp'
import NFT_Water_Green from '../public/images/Water-Silver.webp'
import NFT_Water_White from '../public/images/Water-Copper.webp'
import NFT_Space_Green from '../public/images/Space-Silver.webp'
import NFT_Space_White from '../public/images/Space-Copper.webp'
import NFT_Space_Black from '../public/images/Space-Gold.webp'
import NFT_Metal_White from '../public/images/Metal-Copper.webp'
import NFT_Metal_Green from '../public/images/Metal-Silver.webp'
import NFT_Metal_Black from '../public/images/Metal-Gold.webp'
import { CardsContainer } from '../components/CardsContainer'
import { useCelo } from '@celo/react-celo'
import useDeviceType from '../hooks/useDevice'
import ButtonContainer from '../components/ButtonContainer'
import { useEffect, useState } from 'react'
import Modal from '../components/Modal'
import { AnimatePresence } from 'framer-motion'
import { convertWeb3Address } from '../functions/formatAddress'
import { FiLogOut } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'

const Home: NextPage = () => {
  const isDesktop = useDeviceType()
  const [openModal, setopenModal] = useState(false)
  const { isConnected, address: rainbowAddress } = useAccount()

  const { connect, disconnect, address } = useCelo()

  const handleOnDisconnect = () => {
    disconnect()
    setopenModal(false)
  }

  return (
    <section className={`${styles.container} bgmain  h-full`}>
      {openModal && (
        <AnimatePresence>
          <Modal>
            <div
              className='absolute top-2 right-2 text-lg font-bold text-slate-900 cursor-pointer'
              onClick={() => setopenModal(false)}
            >
              <IoClose />
            </div>
            <div
              suppressHydrationWarning
              className=' flex justify-center items-center bg-blue-300 rounded-full '
            >
              <p className='p-2 flex justify-center items-center pb-4 text-4xl'>
                🐒
              </p>
            </div>
            <h1 className='text-black font-bold text-lg'>
              {convertWeb3Address(address as string)}
            </h1>
            <button
              className='text-slate-900 bg-white px-6 font-bold flex flex-col gap-2 justify-center items-center shadow-md rounded-lg p-2'
              onClick={handleOnDisconnect}
            >
              <FiLogOut />
              <p>Disconnect</p>
            </button>
          </Modal>
        </AnimatePresence>
      )}
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to{' '}
          <span className='text-[#4C8030] font-bold'>
            {' '}
            Green Digital Guardians
          </span>
        </h1>
        <p className={styles.description}>This collection is cooming soon!</p>
        <ButtonContainer
          connect={connect}
          disconnect={disconnect}
          address={address}
          isConnected={isConnected}
          isDesktop={isDesktop}
          setopenModal={setopenModal}
        />
        {/* <p className={styles.description}>Click to get a fabolous NFT!</p> */}
        <div className='flex flex-wrap   flex-row w-full  justify-center items-center gap-4 m-10'>
          <CardsContainer
            isConnected
            ids={[3, 9, 15]}
            names={['Water', 'Water', 'Water']}
            images={[NFT_Water_Black, NFT_Water_Green, NFT_Water_White]}
          />
          <CardsContainer
            isConnected
            ids={[1, 7, 13]}
            names={['Earth', 'Earth', 'Earth']}
            images={[NFT_Earth_Black, NFT_Earth_Green, NFT_Earth_White]}
          />
          <CardsContainer
            isConnected
            ids={[2, 8, 14]}
            names={['Air', 'Air', 'Air']}
            images={[NFT_Air_Black, NFT_Air_Green, NFT_Air_White]}
          />

          <CardsContainer
            isConnected
            ids={[4, 10, 16]}
            names={['Fire', 'Fire', 'Fire']}
            images={[NFT_Fire_Black, NFT_Fire_Green, NFT_Fire_White]}
          />
          <CardsContainer
            isConnected
            ids={[5, 11, 17]}
            names={['Metal', 'Metal', 'Metal']}
            images={[NFT_Metal_Black, NFT_Metal_Green, NFT_Metal_White]}
          />
          <CardsContainer
            isConnected
            ids={[6, 12, 18]}
            names={['Space', 'Space', 'Space']}
            images={[NFT_Space_Black, NFT_Space_Green, NFT_Space_White]}
          />
        </div>
      </main>
      <footer className={styles.footer}>
        <a href='https://dgguardians.com/' rel='DG Guardians' target='_blank'>
          Made with 💚 by Green Digital Guardians Team 🌱
        </a>
      </footer>
    </section>
  )
}

export default Home
