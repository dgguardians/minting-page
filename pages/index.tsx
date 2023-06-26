import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
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
          Welcome to <span className='text-green-600 font-bold'> DG Guardians </span>
        </h1>
        <p className={styles.description}>
          Click to get a fabolous NFT!
        </p>
        <ConnectButton />
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
