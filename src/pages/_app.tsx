import "@rainbow-me/rainbowkit/styles.css";
import "@/styles/index.scss";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";

import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "@/lib/providers/provider";
import chakraTheme from "@/styles/chakraTheme";
import { WagmiConfig } from "wagmi";
import { chains, wagmiClient } from "@/lib/rainbowKit/config";
import { useEffect, useState } from "react";
function useMousePosition() {
	const [position, setPosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		function handleMouseMove(event) {
			setPosition({ x: event.clientX, y: event.clientY });
		}

		document.addEventListener("mousemove", handleMouseMove);

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	return position;
}

function MouseFollower() {
	const { x, y } = useMousePosition();

	return (
		<div
			className="app-blob"
			style={{
				position: "absolute",
				left: `${x}px`,
				top: `${y}px`,
			}}></div>
	);
}
export default function App({ Component, pageProps }: AppProps) {
	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider
				chains={chains}
				theme={darkTheme({
					accentColor: "#d37cf1",
				})}>
				<ChakraProvider theme={chakraTheme}>
					<Provider>
						<div id="screen-container">
							<style jsx global>{`
								body {
									background-color: #22142f;
								}
							`}</style>
							<Component {...pageProps} />
							<MouseFollower />
						</div>
					</Provider>
				</ChakraProvider>
			</RainbowKitProvider>
		</WagmiConfig>
	);
}
