import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js"


export default function SendSol() {
    const wallet = useWallet()
    const { connection } = useConnection()

    const sendTokens = async () => {
        let receiverAddress = document.getElementById("to").value;
        let amountToSend = document.getElementById("amount").value;
        const transaction = new Transaction()

        if (!receiverAddress | !amountToSend) {
            alert("Please enter a valid amount and address!")
        } else {
            transaction.add(SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: new PublicKey(receiverAddress),
                lamports: amountToSend * LAMPORTS_PER_SOL,
            }));

            await wallet.sendTransaction(transaction, connection);
            alert(`Sent ${amountToSend} SOL to ${receiverAddress}`);
            // alert("get some money")

        }
    }

    return (
        <div className="flex flex-row  " >
            <input type="text" id="to" className="border-1 m-2 border-slate-600 rounded-md shadow-md px-4 p-2 " placeholder="Receiver's Address" />
            <input id="amount" className="border-1 m-2 border-slate-600 rounded-md shadow-md px-4 p-2" type="number" placeholder="Amount" />
            <button className="border-1 m-2 border-slate-600 rounded-md shadow-md px-4 p-2 hover:bg-green-500 transition-all duration-500 " onClick={sendTokens}>Send</button>

        </div>
    )
}