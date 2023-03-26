import { useEffect, useState } from "react";
import DebounceSearch from "@/components/home/debounceSearch";
import RenderCharities from "@/components/home/renderCharities";
import ScreenWrapper from "@/components/layout/screenWrapper";
import { CharityCardProps } from "@/lib/types";
import { charityCards, charityDetails } from "@/lib/dummyData";
import CharityDetails from "@/components/charity/charityDetails";
import charitiesApi from "@/lib/api/charities";
import { useToast } from "@chakra-ui/react";
import { SearchCharities } from "@/lib/api/graph";

export default function Home(props) {
	const toast = useToast();

	const [searchTerm, setSearchTerm] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [charities, setCharities] = useState<CharityCardProps[]>([]);
	const [selectedCharity, setSelectedCharity] = useState<number>();

	async function getCharities(search: string): Promise<CharityCardProps[]> {
		
		// console.log("getting Charities that match: ", search);
		// const { data, status, ok } = await charitiesApi.getCharities({ search });
		if (search !== "") {
			setLoading(true);
			const charities = await SearchCharities(search);
			if (charities) {
				setCharities(charities);
			} else {
				setCharities([]);
				// show an error toast saying something went wrong
				toast({
					title: "Error",
					description: "Something went wrong",
					status: "error",
					duration: 5000,
					isClosable: true,
				});
			}
			setLoading(false);
			return charities;
		}
		setLoading(false);
	}

	useEffect(() => {
		console.log("selectedCharity: ", selectedCharity);
	}, [selectedCharity]);
	return (
		<ScreenWrapper className="home-page" title={"zk.fund Home"}>
			<main>
				<div className="container">
					<div id="search-container">
						<DebounceSearch
							onSubmit={getCharities}
							searchTerm={searchTerm}
							setSearchTerm={setSearchTerm}
						/>

						<RenderCharities
							loading={loading}
							charities={charities}
							searchTerm={searchTerm}
							setSelectedCharity={setSelectedCharity}
						/>
					</div>
					<div id="results-container">
						<CharityDetails selectedCharity={selectedCharity} />
					</div>
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
