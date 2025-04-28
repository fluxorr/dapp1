import { ed25519 } from "@noble/curves/ed25519";
import baseX from 'base-x';
import { useWallet } from "@solana/wallet-adapter-react";

const BASE58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const base58 = baseX(BASE58);

export default function SignMessage() {
    const { publicKey, signMessage } = useWallet()

    async function doSign() {
        if (!publicKey) throw new Error('Wallet not connected!');
        if (!signMessage) throw new Error('Wallet does not support message signing!');

        const message = document.getElementById("message").value;
        const encodedMessage = new TextEncoder().encode(message);
        const signature = await signMessage(encodedMessage);

        if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) throw new Error('Message signature invalid!');
        alert('success', `Message signature: ${base58.encode(signature)}`);
    };

    return (
        <div className="flex " >
            <input id="message" type="text" className=" p-4 text-center border-2 mx-4 w-full my-4 border-slate-600 rounded-md shadow-md " placeholder="Message" />
            <button className=" p-4 border-2 mx-4 w-full my-4 border-slate-600 hover:bg-slate-700 cursor-pointer rounded-md shadow-md " onClick={doSign}>
                Sign Message
            </button>
        </div>
    );

}