import { useMemo, useState } from "react";
export interface Data {
	loggedIn: boolean;
	setLoggedIn: (loggedIn: boolean) => void;
	pubAddress: string;
	setPubAddress: (userId: string) => void;
}
const AllData = () => {
	const [pubAddress, setPubAddress] = useState<string>("");
	const [loggedIn, setLoggedIn] = useState<boolean>(false);

	const provider = useMemo(
		() => ({
			loggedIn,
			setLoggedIn,
			pubAddress,
			setPubAddress,
		}),
		[loggedIn, setLoggedIn, pubAddress, setPubAddress]
	);
	return provider;
};

export default AllData;
