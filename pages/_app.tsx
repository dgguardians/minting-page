import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import {
  connectorsForWallets,
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme
} from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
// Import known recommended wallets
import { Valora, CeloWallet } from '@celo/rainbowkit-celo/wallets'
import {
  metaMaskWallet,
  walletConnectWallet,
  omniWallet,
  ledgerWallet,
  coinbaseWallet
} from '@rainbow-me/rainbowkit/wallets'

// Import CELO chain information
import { Alfajores, Celo } from '@celo/rainbowkit-celo/chains'
import useDeviceType from '../hooks/useDevice'

const projectId = '7e527e8d641d036dca61031d4bb8b5bc'

function MyApp ({ Component, pageProps }: any) {
  const isDesktop = useDeviceType()
  const { chains, publicClient } = configureChains(
    [Alfajores, Celo],
    [
      jsonRpcProvider({
        rpc: chain => ({ http: chain.rpcUrls.default.http[0] })
      })
    ]
  )

  const { wallets } = getDefaultWallets({
    appName: 'DGG Mint',
    projectId,
    chains
  })
  const availabloWallets = isDesktop
    ? [
        metaMaskWallet({ projectId, chains }),
        omniWallet({ projectId, chains }),
        walletConnectWallet({ projectId, chains }),
        ledgerWallet({ projectId, chains }),
        coinbaseWallet({ appName: 'DGG Mint', chains })
      ]
    : [
        metaMaskWallet({ projectId, chains }),
        walletConnectWallet({ projectId, chains })
      ]
  const connectors = connectorsForWallets([
    {
      ...wallets,
      groupName: 'CELO Only',
      wallets: [
        Valora({ projectId, chains }),
        CeloWallet({ projectId, chains })
      ]
    },
    {
      groupName: 'Supports Celo',
      wallets: [...availabloWallets]
    }
  ])

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient: publicClient
  })

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        theme={lightTheme({
          accentColor: '#16A34A'
        })}
        chains={chains}
      >
        <ToastContainer />
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp
