import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import { Sepolia } from "@thirdweb-dev/chains";
import { ConnectWallet } from "@thirdweb-dev/react";
// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "ethereum";

function MyApp({ Component, pageProps }) {
    return (
        <ThirdwebProvider
            activeChain={Sepolia}
            // clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
            clientId="6918e682e6f34f8e37ba45153093c444"
        >
            <ConnectWallet />

            <Component {...pageProps} />
        </ThirdwebProvider>
    );
}

export default MyApp;
