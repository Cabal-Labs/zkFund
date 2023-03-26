import { CharityCardProps } from "@/lib/types";
import { Avatar } from "@chakra-ui/react";

export default function CharityCard(props: CharityCardProps) {
	return (
		<button
			type="button"
			className="charity-card"
			id={`charity-card-${props.id}`}>
			<Avatar src={props.pic} />
			<h6>{props.name}</h6>
		</button>
	);
}
