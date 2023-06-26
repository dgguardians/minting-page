import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import { lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import celoGroups from '@celo/rainbowkit-celo/lists'
import { Alfajores, Celo, Cannoli } from '@celo/rainbowkit-celo/chains'
import '@rainbow-me/rainbowkit/styles.css'

const projectId = 'your-wallet-connnect-project-id' // get one at https://cloud.walletconnect.com/app

const { chains, publicClient } = configureChains(
  [Alfajores, Celo, Cannoli],
  [jsonRpcProvider({ rpc: chain => ({ http: chain.rpcUrls.default.http[0] }) })]
)
const connectors = celoGroups({
  chains,
  projectId,
  appName: (typeof document === 'object' && document.title) || 'Your App Name'
})
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient: publicClient
})

function MyApp ({ Component, pageProps }: any) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider theme={lightTheme({
         accentColor: '#16A34A',

      })} chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp
