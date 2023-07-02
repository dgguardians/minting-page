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

// Import known recommended wallets
import { Valora, CeloWallet, CeloTerminal } from '@celo/rainbowkit-celo/wallets'
import {
  metaMaskWallet,
  walletConnectWallet,
  omniWallet,
  ledgerWallet,
  coinbaseWallet,
} from '@rainbow-me/rainbowkit/wallets'

// Import CELO chain information
import { Alfajores, Celo } from '@celo/rainbowkit-celo/chains'

const projectId = '7e527e8d641d036dca61031d4bb8b5bc'

const { chains, publicClient } = configureChains(
  [Alfajores, Celo],
  [jsonRpcProvider({ rpc: chain => ({ http: chain.rpcUrls.default.http[0] }) })]
)

const { wallets } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId,
  chains
})

const connectors = connectorsForWallets([
  {
    ...wallets,
    groupName: 'CELO Only',
    wallets: [
      Valora({ projectId, chains }),
      CeloWallet({ projectId, chains }),
      CeloTerminal({ projectId, chains })
    ]
  },
  {
    groupName: 'Supports Celo',
    wallets: [
      metaMaskWallet({ projectId, chains }),
      omniWallet({ projectId, chains }),
      walletConnectWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
      coinbaseWallet({ appName: 'DGG Mint', chains })
    ]
  }
])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient: publicClient
})
function MyApp ({ Component, pageProps }: any) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        theme={lightTheme({
          accentColor: '#16A34A'
        })}
        chains={chains}
      >
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp
