import { CharityCardProps } from "@/lib/types";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CharityCard from "../charity/charityCard";

interface RenderProps {
	loading: boolean;
	charities: CharityCardProps[];
	searchTerm: string;
	setSelectedCharity: (charity: number) => void;
}
export default function RenderCharities({
	loading,
	charities,
	searchTerm,
	setSelectedCharity,
}: RenderProps) {
	useEffect(() => {
		console.log("renderCharities mounted");
		console.log("charities: ", charities);
		console.log("searchTerm:, ", searchTerm);
	}, [searchTerm]);
	const router = useRouter();
	function handleNavigate() {
		// navigate to a page that will allow the user to request a charity to be added
		router.push({ pathname: "./requestCharity", query: { searchTerm } });
	}
	function handleClick(item) {
		//set selected charity
		setOpen(false);
		console.log("onclick: ", item);
		setSelectedCharity(item.charityId);
	}

	const [open, setOpen] = useState<boolean>(false);
	useEffect(() => {
		// when the search term changes, make sure open is true
		setOpen(true);
	}, [searchTerm]);

	if (loading) {
		return <div className="render-charities loading">Loading...</div>;
	} else if (charities?.length === 0 && searchTerm.length > 0) {
		return (
			<div className="render-charities no-charities">
				<p>No Charities Match Your Search</p>
				<Button onClick={() => handleNavigate()}>
					Request "{searchTerm}" to be added!
				</Button>
			</div>
		);
	} else
		return (
			<div className={`render-charities ${open ? "open" : "close"}`}>
				{charities?.map((item, idx) => {
					return (
						<button
							key={item.id}
							className={`charity-card-wrapper ${
								idx % 2 === 0 ? "even" : "odd"
							}`}
							type={"button"}
							onClick={() => handleClick(item)}>
							<CharityCard {...item} />
						</button>
					);
				})}
			</div>
		);
}
