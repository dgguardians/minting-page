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
import NFT_Metal_Green from '../public/images/NFT_Metal_Green.webp'
import NFT_Metal_White from '../public/images/NFT_Metal_White.webp'
import NFT_Metal_Black from '../public/images/NFT_Metal_Black.webp'
import { CardsContainer } from '../components/CardsContainer'
import { useCelo } from '@celo/react-celo'
import useDeviceType from '../hooks/useDevice'

const Home: NextPage = () => {
  const isDesktop = useDeviceType()

  const { isConnected } = useAccount()
  // const [isConnectedToCeloWallet, setIsConnectedToCeloWallet] = useState(false)
  const { config } = usePrepareContractWrite({
    address: '0x510B5aF8f210296C561A6Ac6d03A49b5F6360a2f',
    abi: contractAbi,
    functionName: 'safeMint'
  })
  const { write: mint, isSuccess } = useContractWrite(config)
  const { connect, disconnect, address } = useCelo()

  // useEffect(() => {
  //   if (!isConnectedToCeloWallet) {
  //     setIsConnectedToCeloWallet(true)
  //     toast.info('Now you can mint your NFT!', { toastId: 'customId' })
  //   }
  // }, [address])

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
          <span className='text-green-600 font-bold'>
            {' '}
            Green digital guardians
          </span>
        </h1>
        <p className={styles.description}>This collection is cooming soon!</p>
        {/* <p className={styles.description}>Click to get a fabolous NFT!</p> */}
        <div className='flex flex-col md:flex-row gap-2'>
          {!address && (
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
          {!isConnected &&
            (address ? (
              <>
                <h1 className='p-5 text-blue-700 hover:text-blue-800'>
                  You are connected now!
                </h1>
                <button
                  className='rounded-md font-bold px-4 py-2 bg-green-500 text-white'
                  onClick={disconnect}
                >
                  Disconnect
                </button>
              </>
            ) : (
              <button
                className='rounded-xl shadow-lg font-bold px-4 py-2 bg-green-600 text-white hover:transform hover:scale-105 transition duration-100 ease-in-out  '
                onClick={connect}
              >
                Connect Celo Wallet
              </button>
            ))}
        </div>
        <div className='flex flex-wrap   flex-row w-full  justify-center items-center gap-4 m-10'>
          <CardsContainer
            isConnected
            names={['Earth', 'Earth', 'Earth']}
            images={[NFT_Earth_Black, NFT_Earth_Green, NFT_Earth_White]}
          />
          <CardsContainer
            isConnected
            names={['Air', 'Air', 'Air']}
            images={[NFT_Air_Black, NFT_Air_Green, NFT_Air_White]}
          />
          <CardsContainer
            isConnected
            names={['Water', 'Water', 'Water']}
            images={[NFT_Water_Black, NFT_Water_Green, NFT_Water_White]}
          />
          <CardsContainer
            isConnected
            names={['Fire', 'Fire', 'Fire']}
            images={[NFT_Fire_Black, NFT_Fire_Green, NFT_Fire_White]}
          />
          <CardsContainer
            isConnected
            names={['Space', 'Space', 'Space']}
            images={[NFT_Space_Black, NFT_Space_Green, NFT_Space_White]}
          />
          <CardsContainer
            isConnected
            names={['Metal', 'Metal', 'Metal']}
            images={[NFT_Metal_Black, NFT_Metal_Green, NFT_Metal_White]}
          />
        </div>
      </main>

      <footer className={styles.footer}>
        <a href='https://dgguardians.com/' rel='DG Guardians' target='_blank'>
          Made with 💚 by Green digital guardians Team 🌱
        </a>
      </footer>
    </div>
  )
}

export default Home
