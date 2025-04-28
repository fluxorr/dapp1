import './App.css'
import '@solana/wallet-adapter-react-ui/styles.css';
import { useMemo } from 'react'
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { clusterApiUrl } from '@solana/web3.js';

import Airdrop from './components/Airdrop';
import Balance from './components/Balance';
import SignMessage from './components/SignMessage';
import SendSol from './components/SendSol';


import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';


if (window.global === undefined) {
  window.global = window;
}

function App() {
  // const network = WalletAdapterNetwork.Devnet;
  // const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const endpoint = "https://solana-devnet.g.alchemy.com/v2/A0E5vaXKmfREcOsNLwW8Bw-OupajajHt"

  const wallets = useMemo(() => [
    new SolflareWalletAdapter(),
  ], []);

  return (
    <>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <div className='text-white text-lg flex  flex-col justify-center items-center h-screen'>

              <WalletMultiButton /><br />
              <WalletDisconnectButton /><br />
              <Balance />
              <SignMessage />
              <SendSol />
              <Airdrop />


            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  )
}

export default App
