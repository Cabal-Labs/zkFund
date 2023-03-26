// File: Applies all meta tags
// Libraries
import { Head } from "next/document";
interface HeadProps {
	title?: string;
}
export default function DefaultHead(props: HeadProps) {
	const { title } = { ...props };
	return (
		<Head>
			<title>{title || "zk.fund"}</title>
			<meta property="og:title" content={title || "zk.fund"} />
			<meta
				name="description"
				content={
					"zk.fund enables purely anonymous donations via the Aztec Network"
				}
			/>
			<meta
				property="og:description"
				content={
					"zk.fund enables purely anonymous donations via the Aztec Network"
				}
			/>
			<meta property="og:image" content={"/zkfundlogo_primary.png"} />
			<meta property="og:url" content={"https://zkfund.org"} />
			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:image:alt" content={"/zkfundlogo_primary.png"} />
			<meta property="twitter:text:title" content={title || "zk.fund"} />
			<meta
				property="keywords"
				content="donations, crypto, defi, charities, aztec, zero-knowledge proofs"
			/>
		</Head>
	);
}
