import Head from "next/head";
import Image from "next/image";
import { Button } from "@chakra-ui/react";
import ScreenWrapper from "@/components/layout/screenWrapper";
import Icon from "@/lib/icons";
import { useContext, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useRouter } from "next/router";
import { Context } from "@/lib/providers/provider";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
	const router = useRouter();
	const { setPubAddress } = useContext(Context);
	const { address, isConnected } = useAccount();
	//todo: important important! - fix wallet connect bug
	function handleMainCTA() {
		if (isConnected) {
			router.push("/home");
		} else {
			useConnect();
		}
	}
	// useEffect(() => {
	// 	if (address && isConnected) {
	// 		setPubAddress(address);
	// 		router.push("/home");
	// 	}
	// }, [address, isConnected]);
	const timelineItems = [
		{
			date: "Sept '22",
			title: "Team Formation",
			description:
				"The zk.fund team came together to through the Stevens Institute of Technology Senior Design Program. Team members Brendan, Amit, Christian, and Marcos had worked together in the past and were excited to begin working on issues in the donation space.",
			status: "Done",
		},
		{
			date: "Sept '22 - November '22",
			title: "ClearFund",
			description:
				"Initially, the team was called ClearFund and the problem we were focusing on was a lack of transparency during the donation process. Though, after interviewing charities we realized that each organization has its own policies and procedures and it would be difficult ot build a system that would work well with enough charities.",
			status: "Done",
		},
		{
			date: "November '22",
			title: "Pivot to zk.fund",
			description:
				"Marco found a bounty from the Aztec Network for an Anonymous Donation Portal. We liked that this still related to the charity space, but had a clearer problem and solution. People around the world are unable to donate to causes they care about because of oppressive rules or social taboo. We believe that it a right to be able to donate to causes you care about.",
			status: "Done",
		},
		{
			date: "Novemner '22 - May '23",
			title: "Building an MPV",
			description:
				"We are in the process of building our first version of zk.fund. At release, users will be able to donate to charities that have been verified by the zk.fund team. Users can also request new charities to be added, which will be handled by the zk.fund team. We are aware that only real charities can be allowed, else we risk allowing evil actors to use zk.fund to launder money. We are working on a solution to this problem and will be releasing it in the future.",
			status: "in-progress",
		},
		{
			date: "May '23 - Future",
			title: "Open Source",
			description: `After graduation, we plan on working with Cabal Labs to open source this project. We hope that this will allow us to continue to work on zk.fund and allow others to contribute to the validator network, and grow our list of charities.`,
			status: "todo",
		},
	];
	return (
		<ScreenWrapper title={"Welcome to zk.fund"} className="landing-page">
			<main>
				<div id="landing">
					<div className="title">
						<h1>Donations are your Right</h1>
						<h3>powered by ZKSync</h3>
					</div>
					<div className="cta">
						{isConnected ? (
							<Button
								size={"lg"}
								variant={"contained"}
								onClick={() => handleMainCTA()}>
								Go to Dashboard
							</Button>
						) : (
							<ConnectButton />
						)}
						{!isConnected ? (
							<a href="https://metamask.io/" target={"_blank"}>
								What's a Wallet?
							</a>
						) : (
							<></>
						)}
					</div>
					<div className="footer">
						<Icon icon={"ChevronDown"} size={60} className={"white"} />
						<h4>Learn More</h4>
					</div>
				</div>

				<section className="" id="info-1">
					<div className="content">
						<h2>Why do we exist?</h2>
						<p>
							Laboris nostrud dolore proident culpa non mollit proident
							reprehenderit aliqua et quis exercitation Lorem. Deserunt sunt
							commodo elit fugiat fugiat ad proident magna. Incididunt do minim
							irure veniam esse. Sint eiusmod do proident fugiat irure laborum
							consequat pariatur reprehenderit velit minim cupidatat. Laborum
							nulla aute reprehenderit excepteur nostrud velit reprehenderit
							irure aliquip ad ea incididunt ipsum. Commodo cupidatat laborum
							qui reprehenderit laboris non nulla commodo officia minim anim in
							occaecat.
						</p>
					</div>
					<div className="img-wrapper">
						<Image
							src={"https://picsum.photos/200"}
							layout={"fill"}
							objectFit={"cover"}
							objectPosition={"center"}
						/>
					</div>
				</section>
				<section className="reverse" id="info-1">
					<div className="content">
						<h2>Donations are protected by Free Speech</h2>
						<p>
							Laboris nostrud dolore proident culpa non mollit proident
							reprehenderit aliqua et quis exercitation Lorem. Deserunt sunt
							commodo elit fugiat fugiat ad proident magna. Incididunt do minim
							irure veniam esse. Sint eiusmod do proident fugiat irure laborum
							consequat pariatur reprehenderit velit minim cupidatat. Laborum
							nulla aute reprehenderit excepteur nostrud velit reprehenderit
							irure aliquip ad ea incididunt ipsum. Commodo cupidatat laborum
							qui reprehenderit laboris non nulla commodo officia minim anim in
							occaecat.
						</p>
					</div>
					<div className="img-wrapper">
						<Image
							src={"https://picsum.photos/200"}
							layout={"fill"}
							objectFit={"cover"}
							objectPosition={"center"}
						/>
					</div>
				</section>
				<section className="" id="info-1">
					<div className="content">
						<h2>Verified charities give you peace of mind</h2>
						<p>
							Laboris nostrud dolore proident culpa non mollit proident
							reprehenderit aliqua et quis exercitation Lorem. Deserunt sunt
							commodo elit fugiat fugiat ad proident magna. Incididunt do minim
							irure veniam esse. Sint eiusmod do proident fugiat irure laborum
							consequat pariatur reprehenderit velit minim cupidatat. Laborum
							nulla aute reprehenderit excepteur nostrud velit reprehenderit
							irure aliquip ad ea incididunt ipsum. Commodo cupidatat laborum
							qui reprehenderit laboris non nulla commodo officia minim anim in
							occaecat.
						</p>
					</div>
					<div className="img-wrapper">
						<Image
							src={"https://picsum.photos/200"}
							layout={"fill"}
							objectFit={"cover"}
							objectPosition={"center"}
						/>
					</div>
				</section>
				<section id="timeline">
					<div className="content">
						<h2>Our Timeline</h2>
						<div className="timeline">
							<div className="line"></div>
							{timelineItems.map((item, index) => {
								return (
									<div
										className={`timeline-item ${item.status} ${
											index % 2 === 0 ? "even" : "odd"
										}`}
										key={index}>
										<div className="dot"></div>
										<div className="timeline-item-content">
											<div className="title">
												<h3>{item.title}</h3>
												<div className="status">{item.status}</div>
											</div>
											<h6>{item.date}</h6>
											<hr />
											<p>{item.description}</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</section>
				<h4 className="center pb">
					Interested in contribuing? Email us at{" "}
					<a href={"mailto:zkfundproject@gmail.com"}>zkfundproject@gmail.com</a>
					!
				</h4>
			</main>
		</ScreenWrapper>
	);
}
