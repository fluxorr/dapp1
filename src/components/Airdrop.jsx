import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import { useState } from "react"

export default function Airdrop() {
    const wallet = useWallet()
    const { connection } = useConnection()

    const [amount, setAmount] = useState(0)

    const sendAirDropToUser = async () => {
        try {
            await connection.requestAirdrop(wallet.publicKey, parseInt(amount) * LAMPORTS_PER_SOL) // the function needs the amount in lamports so we need to convert in sol first
            alert(`AirDrop of ${amount} Successfull!`)
        } catch (error) {
            alert(error)
        }

    }

    return (
        <div>
            <div className="p-4 rounded-md mx-4 border-dotted border-slate-600 border-1  " > Connected Wallet: {wallet.publicKey ? wallet.publicKey.toString() : "No wallet connected yet!"}</div>
            <div className="flex items-center " >
                <input className=" p-4 border-2 mx-4 w-full my-4 border-slate-600 rounded-md shadow-md transition-all"
                    onChange={(e) => {
                        setAmount(e.target.value)
                    }} type="number" placeholder="Amount" />

                <button className=" px-4 cursor-pointer border-2 h-16 hover:bg-slate-700 border-slate-600  rounded-md shadow-md transition-all" onClick={sendAirDropToUser} >Request </button>

            </div >

        </div>
    )
}