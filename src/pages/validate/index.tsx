import React, { useEffect, useState } from "react";
import ScreenWrapper from "@/components/layout/screenWrapper";
import RequestCard from "@/components/validate/requestCard";
import { useSigner } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { GetAllCharities, getPendingCharities } from "@/lib/api/graph";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function ValidatorPortal() {
	const router = useRouter();
	const { data: signer, isLoading } = useSigner();
	const [charitiesLoading, setCharitiesLoading] = useState(false);
	const [charityRequests, setCharityRequests] = useState([
		{
			charityName: "Habitat for Humanity",
			charityWallet: "0x0000000",
			charityId: 1,
			charityDescription:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies lacinia, nunc nisl tincidunt nunc, vitae aliquet nisl nisl sit amet elit. Sed euismod, nisl sit amet aliquam lacinia, nunc nisl tincidunt nunc, vitae aliquet nisl nisl",
		},
		{
			charityName: "Action Against Hunger",
			charityWallet: "0x0000000",
			charityId: 2,
			charityDescription:
				"We feed the hungry using food that would otherwise go to waste. We provide nutrition education and training to help communities become self-sufficient. We advocate for policies that protect people from hunger and malnutrition. We are a global movement of people working together to end hunger. We are Action Against Hunger. We also work in the United States to help people in need. We are a 501(c)(3) nonprofit organization.",
		},
	]);
	async function getCharityRequests() {
		setCharitiesLoading(true);
		//todo: check if the signer is a validator

		//todo: get charities from chain
		let result = await getPendingCharities();
		console.log("this", result.charityCreateds);

		// todo: loop through charities and decrypt the info stored in ipfs, restructure the data at the same time
		let _formattedCharities = [];
		for (let i = 0; i < result.charityCreateds.length; i++) {
			let _charity = {
				charityName: result.charityCreateds[i].name,
				charityId: result.charityCreateds[i].charityId,
				charityWallet: result.charityCreateds[i].charityAddress,
				charityDescription: result.charityCreateds[i].description,
			};
			_formattedCharities.push(_charity);
		}
		console.log(`formateed`, _formattedCharities);

		setCharityRequests(_formattedCharities);
		setCharitiesLoading(false);
	}
	useEffect(() => {
		// fetch charity requests from chain
		if (signer) {
			getCharityRequests();
		}
	}, [signer]);
	return (
		<ScreenWrapper
			className="validator-portal-page"
			title={"zk.fund Validator Portal"}>
			<main>
				<div className="container">
					<div className="title">
						<h1>Validator Portal</h1>
						<h6>
							Validate any pending requests to add charities to the platform!
						</h6>
						<p>
							We are still in development, and are only allowing US based
							charities found in the IRS database that also own a public crypto
							wallet. Learn more about our milestones and how we plan on
							expanding zk.fund
						</p>
						<Button
							variant={"outlined"}
							size="sm"
							onClick={() => {
								router.push("/#timeline");
							}}>
							Learn More
						</Button>
					</div>
					{/* map this */}
					{isLoading && <div>Loading validator credentials...</div>}
					{!isLoading && !signer && (
						<>
							<h3>Sign in to validate requests</h3>
							<br />
							<ConnectButton />
						</>
					)}
					{!charitiesLoading && signer && (
						<>
							{charityRequests.map((request) => (
								<RequestCard {...request} signer={signer} />
							))}
						</>
					)}
				</div>
				<div className="shapes">
					<div className="shape-0"></div>
					<div className="shape-1"></div>
					<div className="shape-2"></div>
					<div className="shape-3"></div>
					<div className="shape-4"></div>
					<div className="shape-5"></div>
					<div className="shape-6"></div>
					<div className="shape-7"></div>
				</div>
			</main>
		</ScreenWrapper>
	);
}
