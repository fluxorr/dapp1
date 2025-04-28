import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useState } from "react"


export default function Airdrop() {
    const wallet = useWallet()
    const { connection } = useConnection()

    const [amount, setAmount] = useState(0)

    const sendAirDropToUser = async () => {
        try {
            await connection.requestAirdrop(wallet.publicKey, parseInt(amount) * 1_000_000_000) // the function needs the amount in lamports so we need to convert in sol first
            alert(`AirDrop of ${amount} Successfull!`)
        } catch (error) {
            alert(error)
        }

    }

    return (
        <div className="flex flex-row  " >
            <input className=" p-4 border-2 mx-4 border-slate-600 rounded-md shadow-md transition-all" onChange={(e) => {
                setAmount(e.target.value)
            }}
                type="number" placeholder="Amount" />
            <button className=" p-4 cursor-pointer border-2 border-slate-600  rounded-md shadow-md transition-all" onClick={sendAirDropToUser} >Request 🛬</button>
            <div className="p-4 border-2 border-slate-600 rounded-md mx-4 " >{wallet.publicKey ? wallet.publicKey.toString() : "No wallet connected yet!"}</div>
        </div >
    )
}