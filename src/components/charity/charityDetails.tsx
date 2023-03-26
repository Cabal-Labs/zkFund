import { getCharityInfo } from "@/lib/api/graph";
import Options from "@/lib/components/options";
import Icon from "@/lib/icons";
import { Avatar, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CharityDetails({ selectedCharity }) {
	const router = useRouter();
	const [data, setData] = useState({} as any);
	const [pending, setPending] = useState(true);

	async function getCharity() {
		console.log("getting charity info with id: ", selectedCharity);
		if (selectedCharity === undefined) return;
		else {
			let data = await getCharityInfo(selectedCharity);
			console.log("data: ", data);
			setData(data);
			if(data?.status == 0){
				setPending(false);
			}
		}
	}
	useEffect(() => {
		getCharity();
	}, [selectedCharity]);
	if (selectedCharity === undefined) {
		return (
			<div className="charity-details no-charity">
				<Icon
					icon={"DonateHeart"}
					title={"Charity"}
					size={50}
					className="white"
				/>
				<h3>Welcome to zk.fund</h3>
				<div className="hint">
					<Icon icon={"Search"} title={"Search"} />
					<p>Search for a charity to learn more</p>
				</div>
			</div>
		);
	} else {
		return (
			<div className="charity-details" id={`charity-${selectedCharity}`}>
				<Options id={selectedCharity} />

				<div className="header">
					<Avatar src={data?.pic} size="lg" />
					<div className="content">
						<h2>{data?.name}</h2>
						<h5 className="secondary">
							<i>{data?.mission || "No mission"}</i>
						</h5>
					</div>
				</div>
				<div className="content">
					<div className="quick-info">
						<div className="info">
							<Icon icon={"City"} title={"Location"} />
							<p>{data?.location || "No location"}</p>
						</div>
						<div className="info">
							<Icon icon={"Link"} title={"Location"} />
							<p>{data?.website || "No website"}</p>
						</div>
						<div className="info">
							<Icon icon={"Contact"} title={"Location"} />
							<p>{data?.contact || "No contact"}</p>
						</div>
					</div>
					<p className="description">{data?.description || "No Description"}</p>
					<Button
						disabled={pending}
						variant={"outlined"}
						onClick={() => {
							pending && router.push(`/donate/${selectedCharity}`);
						}}>
						Donate to {data?.name}
					</Button>
				</div>
			</div>
		);
	}
}
