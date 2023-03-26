import charitiesApi from "@/lib/api/charities";
import { useEffect, useState } from "react";

export async function getServerSideProps() {
	console.log("Here");
	// Fetch data from external API
	const { data, status, ok } = await charitiesApi.getAllCharities();
	console.log(data);
	return {
		props: {
			data,
			status,
			ok,
		},
	};
}
export default function AllCharities(props: any) {
	const [loading, setLoading] = useState(false);
	const [charities, setCharities] = useState<any[]>([]);
	useEffect(() => {
		console.log(props.data);
		setLoading(true);
		if (props.data) {
			setCharities(props.data.data.data);
			setLoading(false);
		}
	}, [props.data]);
	return (
		<div>
			<h1>All Charities</h1>
			{charities.length !== 0 ? (
				<div>
					{charities.map((charity: any) => {
						return <p>{charity.name}</p>;
					})}
				</div>
			) : (
				<p>no data</p>
			)}
		</div>
	);
}
