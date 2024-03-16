import {
    ConnectWallet,
    useContract,
    useContractRead,
    useContractWrite,
    useAddress,
    useMetamask,
} from "@thirdweb-dev/react";
import { ethers } from "ethers"; // Import ethers library for BigNumber operations

import { useEffect, useState } from "react";

export default function Home() {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const subscriptionAmount = 0.5;
    const { contract } = useContract(
        "0x144737Da00D2ab474d2523FE8262c8523EB7bf1A"
    );
    const address = useAddress();
    const connect = useMetamask();

    const { mutateAsync: purchaseSubscription, isLoading } = useContractWrite(
        contract,
        "purchaseSubscription"
    );

    useEffect(() => {
        const func = async () => {
            if (!contract) return;
            if (address) {
                const data = await contract.call("getSubscriberInfo", [
                    address,
                ]);
                console.log("data", data);
            }
        };
        func();
    }, [address]);

    const handleBuySubscription = async () => {
        if (!address) {
            alert("Please connect your wallet");
            // connect();
            return;
        }
        try {
            // const data = await purchaseSubscription({
            //     args: [0],
            // });
            const data = await contract.call("purchaseSubscription", [0]);
            setIsSubscribed(true);
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    };

    return (
        <main className="w-screen h-screen justify-start items-center mx-auto flex flex-col py-10">
            <p className="font-bold text-5xl w-full text-center">
                Shop Smart Subscription
            </p>
            <button
                onClick={handleBuySubscription}
                className={`text-2xl ${
                    isSubscribed ? "bg-blue-500 " : "bg-green-500"
                } mt-10 rounded-md px-5 py-2 w-fit`}
            >
                {isSubscribed ? "Already Subscribed" : "Buy Subscription 10$"}
            </button>
        </main>
    );
}
