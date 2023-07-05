import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi'
import contractAbi from '../contract.abi.json'
import NFT_Air_Black from '../public/images/NFT_Air_Black.webp'
import NFT_Air_White from '../public/images/NFT_Air_White.webp'
import NFT_Air_Green from '../public/images/NFT_Air_Green.webp'
import NFT_Earth_Black from '../public/images/NFT_Earth_Black.webp'
import NFT_Earth_White from '../public/images/NFT_Earth_White.webp'
import NFT_Earth_Green from '../public/images/NFT_Earth_Green.webp'
import NFT_Fire_Black from '../public/images/NFT_Fire_Black.webp'
import NFT_Fire_White from '../public/images/NFT_Fire_White.webp'
import NFT_Fire_Green from '../public/images/NFT_Fire_Green.webp'
import NFT_Water_Black from '../public/images/NFT_Water_Black.webp'
import NFT_Water_White from '../public/images/NFT_Water_White.webp'
import NFT_Water_Green from '../public/images/NFT_Water_Green.webp'
import NFT_Space_Green from '../public/images/NFT_Space_Green.webp'
import NFT_Space_White from '../public/images/NFT_Space_White.webp'
import NFT_Space_Black from '../public/images/NFT_Space_Black.webp'
import { CardsContainer } from '../components/CardsContainer'

const Home: NextPage = () => {
  const { isConnected } = useAccount()

  const { config } = usePrepareContractWrite({
    address: '0x510B5aF8f210296C561A6Ac6d03A49b5F6360a2f',
    abi: contractAbi,
    functionName: 'safeMint'
  })
  const { write: mint, isSuccess } = useContractWrite(config)

  return (
    <div className={`${styles.container} backdrop-blur-lg`}>
      <Head>
        <title>DG Guardians mint</title>
        <meta
          content='DG Guardians mint'
          name='This is a DAPP for minting DG Guardians NFTS.'
        />
        <link href='/favicon.ico' rel='icon' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to{' '}
          <span className='text-green-600 font-bold'> DG Guardians </span>
        </h1>
        <p className={styles.description}>Click to get a fabolous NFT!</p>
        <ConnectButton
          accountStatus={{
            smallScreen: 'avatar',
            largeScreen: 'full'
          }}
        />
        <div className='flex flex-wrap   flex-row w-full  justify-center items-center gap-4 m-10'>
          <CardsContainer
            isConnected={isConnected}
            names={['Air', 'Air', 'Air']}
            images={[NFT_Air_Black, NFT_Air_White, NFT_Air_Green]}
          />
          <CardsContainer
            isConnected={isConnected}
            names={['Earth', 'Earth', 'Earth']}
            images={[NFT_Earth_Black, NFT_Earth_White, NFT_Earth_Green]}
          />
          <CardsContainer
            isConnected={isConnected}
            names={['Space', 'Space', 'Space']}
            images={[NFT_Space_Black, NFT_Space_White, NFT_Space_Green]}
          />
          <CardsContainer
            isConnected={isConnected}
            names={['Fire', 'Fire', 'Fire']}
            images={[NFT_Fire_Black, NFT_Fire_White, NFT_Fire_Green]}
          />
          <CardsContainer
            isConnected={isConnected}
            names={['Water', 'Water', 'Water']}
            images={[NFT_Water_Black, NFT_Water_White, NFT_Water_Green]}
          />
        </div>
        {isSuccess && <p className='text-green-600 font-bold'>Minted!</p>}
      </main>

      <footer className={styles.footer}>
        <a href='https://dgguardians.com/' rel='DG Guardians' target='_blank'>
          Made with 💚 by DG Guardians Team 🌱
        </a>
      </footer>
    </div>
  )
}

export default Home
