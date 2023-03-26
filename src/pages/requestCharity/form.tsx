import { useState } from "react";
import ScreenWrapper from "@/components/layout/screenWrapper";
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Input,
	Select,
	Button,
	Textarea,
} from "@chakra-ui/react";
import ZkModal from "@/components/zkModal";
import { Router, useRouter } from "next/router";
import { makeFileObjects, storeFiles } from "@/lib/ipfs";
import { useSigner } from "wagmi";
import { InitCharity } from "@/lib/contracts";
import { sign } from "crypto";
import countries from "@/lib/countries";

export default function Charity(props) {
	const router = useRouter();
	const [name, setName] = useState<string>("");
	const [countryCode, setCountryCode] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [website, setWebsite] = useState<string>("");
	const [ein, setEin] = useState<string>("");
	const [walletAddress, setWalletAddress] = useState<string>("");
	const [additionalInfo, setAdditionalInfo] = useState<string>("");
	const { data: signer, isLoading } = useSigner();

	const [page, setPage] = useState<number>(1); // page can only be either 1 or 2
	const [modal, setModal] = useState({
		visible: false,
		isError: false,
		title: "",
		content: null,
	});
	const validateFirstPage = () => {
		let missingFields = [];
		if (name.trim() === "") missingFields.push("Name of Charity/Organization");
		if (countryCode.trim() === "") missingFields.push("Country");
		if (description.trim() === "") missingFields.push("Description");
		return missingFields;
	};

	const handleNextPage = () => {
		const missingFields = validateFirstPage();
		if (missingFields.length > 0) {
			const missingFieldsContent = (
				<>
					<h6>You are missing the following required fields:</h6>
					<ul>
						{missingFields.map((field) => (
							<li>{field}</li>
						))}
					</ul>
				</>
			);
			setModal({
				visible: true,
				isError: true,
				title: "Error: Missing fields",
				content: missingFieldsContent,
			});
			return;
		}
		setPage(2);
	};

	const hideAndClearModal = () => {
		setModal({ visible: false, isError: false, title: "", content: null });
		router.push("/home");
	};

	async function handleSubmit() {
		if (!isLoading) {
			console.log("submit"); // TODO: add api call to backend to create charity request

			const body = {
				location: countryCode,
				description: description + "\nADDITIONAL INFO:\n" + additionalInfo,
				website,
				tags: [],
				ein,
				Validation: {
					Validated: "processing",
					Comments: [""],
					ValidatedAt: "",
				},
			};

			const files = makeFileObjects(body);
			const cid = await storeFiles(files);

			const charity = {
				name: name,
				charityAddress: walletAddress,
				ownsWallet: true,
				info: cid,
			};

			const { data, ok } = await InitCharity(charity, signer);
			console.log({ data });
			if (ok) {
				setModal({
					visible: true,
					isError: false,
					title: "Thanks for your submission!",
					content: (
						<h6>
							zk.fund relies on the support of users like you to continue adding
							charities and organizations to the platform. In the spirit of
							privacy and anonymity, we won’t be able to notify you whether the
							organization you submitted was approved or denied. Just keep an
							eye on the charities in the home screen. We try our best to handle
							all validation requests within a few days. Thanks again!
						</h6>
					),
				});
			}
		}
	}

	const renderFirstPage = () => (
		<>
			{/* Name of Charity/Organization */}
			<FormLabel>Name of Charity/Organization</FormLabel>
			<Input
				className="requestCharityInput"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>

			{/* Country */}
			<FormLabel>Country</FormLabel>
			<Select
				select-name="Country"
				variant={"outlined"}
				className="requestCharityInput"
				placeholder="Select country..."
				onChange={(e) => setCountryCode(e.target.value)}>
				{countries.map((country) => (
					<option value={country.code}>{country.name}</option>
				))}
			</Select>

			{/* Description */}
			<FormLabel>Description</FormLabel>
			<FormHelperText className="requestCharityFormHelperText">
				What do they do? Do they operate globally? Within a local community?
				<br />
				Anything else we should know? Try to provide as much detail as you can.
			</FormHelperText>
			<Textarea
				variant={"outlined"}
				className="requestCharityInput requestCharityMultilineInput"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>

			{/* Website Link (Optional) */}
			<FormLabel>Website Link (Optional)</FormLabel>
			<Input
				className="requestCharityInput"
				value={website}
				onChange={(e) => setWebsite(e.target.value)}
			/>
			<Button variant="pinkOutline" onClick={handleNextPage}>
				Next
			</Button>
		</>
	);

	const renderSecondPage = () => (
		<>
			{/* EIN (Optional) */}
			<FormLabel>EIN (Optional)</FormLabel>
			<Input
				className="requestCharityInput"
				value={ein}
				onChange={(e) => setEin(e.target.value)}
			/>

			{/* Public Wallet Address (Optional) */}
			<FormLabel>Public Wallet Address (Optional)</FormLabel>
			<Input
				className="requestCharityInput"
				value={walletAddress}
				onChange={(e) => setWalletAddress(e.target.value)}
			/>

			{/* Additional Info (optional) */}
			<FormLabel>Additional Info (Optional)</FormLabel>
			<FormHelperText className="requestCharityFormHelperText">
				Any helpful notes/info for our validation team? We'd appreciate any
				feedback you may have!
				<br />
				Try to provide as much detail as you can.
			</FormHelperText>
			<Textarea
				className="requestCharityInput requestCharityMultilineInput"
				value={additionalInfo}
				onChange={(e) => setAdditionalInfo(e.target.value)}
			/>
			<div>
				<Button variant={"pinkOutline"} onClick={() => setPage(1)}>
					Back
				</Button>
				<Button variant={"pinkOutline"} onClick={handleSubmit}>
					Submit
				</Button>
			</div>
		</>
	);

	return (
		<ScreenWrapper className="request-form">
			<main>
				<div className="container">
					<ZkModal
						isOpen={modal.visible}
						isError={modal.isError}
						title={modal.title}
						onClose={hideAndClearModal}>
						<>{modal.content}</>
					</ZkModal>
					<FormControl>
						{page === 1 ? renderFirstPage() : renderSecondPage()}
					</FormControl>
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
