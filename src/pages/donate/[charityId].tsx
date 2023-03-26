import ScreenWrapper from "@/components/layout/screenWrapper";
import {
	Button,
	Checkbox,
	Input,
	InputGroup,
	InputRightAddon,
	InputRightElement,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MakeDonation } from "@/lib/contracts";
import { BigNumber, ethers } from "ethers";
import { useSigner } from "wagmi";
import { getCharityInfo } from "@/lib/api/graph";
import ZkModal from "@/components/zkModal";

export default function Donate(props: any) {
	const router = useRouter();
	// get charityId from url
	const { charityId } = router.query;
	let id = parseInt(charityId as string);

	const { data: signer, isLoading } = useSigner();
	const [charityData, setCharityData] = useState(null);
	const [charityLoading, setCharityLoading] = useState(false);
	const [ethPrice, setEthPrice] = useState("0.00");
	const [timer, setTimer] = useState(null)

	const [amount, setAmount] = useState("");
	const [modal, setModal] = useState({
		visible: false,
		isError: false,
		title: "",
		content: null,
	});
	async function donate() {
		// send amount to charity
		if (isLoading) return null;
		else if (!signer) return null;
		else {
			const _amount: BigNumber = ethers.utils.parseEther(amount);
			try {
				const result = await MakeDonation(id, _amount, signer);
				if (result) {
					console.log(result);

					// pop success modal
					setModal({
						visible: true,
						isError: false,
						title: "Donation Successful",
						content: <p>NIce</p>,
					});
				}
			} catch (e) {
				setModal({
					visible: true,
					isError: true,
					title: "Donation Failed",
					content: <p>{e.message}</p>,
				});
			}
		}
	}
	const hideAndClearModal = () => {
		setModal({ visible: false, isError: false, title: "", content: null });
		router.push("/home");
	};
	async function getCharity() {
		// get charity data
		setCharityLoading(true);
		let data = await getCharityInfo(id);
		setCharityData(data);
		console.log(data);
		setCharityLoading(false);
	}
	async function ETHPrice(amount: string) {
		const res = await fetch(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.ETHSCAN_KEY}}`);
		const data = await res.json();
		console.log(data.result.ethusd);
		const price = parseFloat(data.result.ethusd);
		console.log(price);
		const _amount = parseFloat(amount);
		const total = price * _amount;


		return total.toPrecision(6);
	}
	async function handleAmount(amount: string) {
		// handle amount input
		setAmount(amount);

		clearTimeout(timer)

		const newTimer = setTimeout(async () => {
			if(amount !== ""){
				const price = await ETHPrice(amount);
				setEthPrice(price);
				console.log(price);
			}else{
				setEthPrice("0.00");
			}
		}, 500)

		setTimer(newTimer)



	}
	useEffect(() => {
		getCharity();
	}, [charityId]);
	return (
		<ScreenWrapper className="donate-page" title={"zk.fund Home"}>
			<main>
				<div className="container">
					<div id="pick-charity">
						{/* show selected charity, onclick opens modal */}
						<div id="charity-logo-div">
							<img
								id="charity-logo"
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzmiAMnhX5wmE3rsbFP1Y6gIxdvTUxbC6sNhhNQnzqM9JEOtfWpjQuPHNj4luUVwILKr4&usqp=CAU"
								alt="charity logo"
							/>
						</div>
						<h2 id="charity-name">{charityData?.name || "Charity Name"}</h2>
						<div id="select-value-row">
							{/* <h2>$</h2> */}
							<InputGroup>
								<Input
									placeholder="0.00"
									type={"number"}
									inputMode="decimal"
									id="select-value-input"
									variant={"underlined"}
									value={amount}
									onChange={(e: any) => {handleAmount(e.target.value)}}
								/>
								<InputRightElement>
									<h4>ETH</h4>
								</InputRightElement>
							</InputGroup>
							{/* show eth to usd conversion */}
							{/* <Button id="select-value-button" variant={"gradientOutline"}>
								ETH
							</Button> */}
						</div>
						<h6 className="secondary">
							~${	ethPrice}
							{/* //todo: Marco */}
						</h6>
					</div>
					<Checkbox className="anonymous-checkbox" defaultChecked>
						Make this donation anonymous
					</Checkbox>
					<Button
						id="donate-button"
						variant={"gradientOutline"}
						onClick={() => donate()}>
						DONATE
					</Button>
				</div>
				<ZkModal
					isOpen={modal.visible}
					isError={modal.isError}
					title={modal.title}
					onClose={hideAndClearModal}>
					<>{modal.content}</>
				</ZkModal>
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
