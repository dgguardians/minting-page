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

import '@celo/react-celo/lib/styles.css'
import 'react-toastify/dist/ReactToastify.css'
// Import known recommended wallets
import { Valora, CeloWallet } from '@celo/rainbowkit-celo/wallets'
import {
  metaMaskWallet,
  omniWallet,
  ledgerWallet,
  coinbaseWallet
} from '@rainbow-me/rainbowkit/wallets'

// Import CELO chain information
import { Alfajores, Celo } from '@celo/rainbowkit-celo/chains'
import useDeviceType from '../hooks/useDevice'
import { CeloProvider, SupportedProviders } from '@celo/react-celo'

const projectId = '7e527e8d641d036dca61031d4bb8b5bc'

function MyApp ({ Component, pageProps }: any) {
  const isDesktop = useDeviceType()
  const { chains, publicClient } = configureChains(
    [Celo],
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

  console.log(wallets)
  const celoWallets = isDesktop
    ? [Valora({ projectId, chains }), CeloWallet({ projectId, chains })]
    : [Valora({ projectId, chains })]
  const availableWallets = isDesktop
    ? [
        metaMaskWallet({ projectId, chains }),
        omniWallet({ projectId, chains }),
        ledgerWallet({ projectId, chains }),
        coinbaseWallet({ appName: 'DGG Mint', chains })
      ]
    : [
        metaMaskWallet({ projectId, chains })
        // walletConnectWallet({ projectId, chains })
      ]
  const connectors = connectorsForWallets([
    // ...wallets,
    {
      groupName: 'CELO Only',
      wallets: [...celoWallets]
    },
    {
      groupName: 'Supports Celo',
      wallets: [...availableWallets]
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
        coolMode
        chains={chains}
      >
        <ToastContainer />
        <CeloProvider
          dapp={{
            icon: 'https://example.com/icon.png',
            name: 'My awesome dApp',
            description: 'My awesome description',
            url: 'https://example.com',
            // if you plan on supporting WalletConnect compatible wallets, you need to provide a project ID, you can find it here: https://docs.walletconnect.com/2.0/cloud/relay
            walletConnectProjectId: projectId
          }}
          connectModal={{
            providersOptions: {
              // This option hides specific wallets from the default list
              // hideFromDefaults: [SupportedProviders.CeloExtensionWallet],

              hideFromDefaults: [
                SupportedProviders.MetaMask,
                SupportedProviders.PrivateKey,
                SupportedProviders.Valora,
                SupportedProviders.Ledger,
                SupportedProviders.Omni,
                SupportedProviders.CeloDance,
                SupportedProviders.CoinbaseWallet,
                SupportedProviders.Injected,
                SupportedProviders.CeloWallet



              ],
              searchable: false
            }
          }}
        >
          <Component {...pageProps} />
        </CeloProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp
