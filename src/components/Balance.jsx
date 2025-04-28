import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react"

export default function Balance() {

    const { connection } = useConnection()
    const wallet = useWallet()
    const [balance, setBalance] = useState(0)

    async function getBalance() {
        if (wallet.publicKey) {
            const bal = await connection.getBalance(wallet.publicKey);
            setBalance(bal / LAMPORTS_PER_SOL)
        }
    }

    useEffect(() => {
        getBalance();
    }, [wallet.publicKey, connection]);

    return (
        <div className="py-4" >
            Balance: {balance} SOL
        </div>
    )
}