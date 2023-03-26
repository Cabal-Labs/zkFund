import {
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from "@chakra-ui/react";
import { OptionProps } from "../../lib/types";
import Icon from "../../lib/icons";
type OptionsProps = {
	id: number;
	options?: OptionProps[];
	size?: number;
};
export default function Options({ id, options, size = 20 }: OptionsProps) {
	function clickHandler(type: string) {
		// calls the right modal depending on the option clicked
		switch (type) {
			case "report":
				alert("reported");
		}
	}
	// console.log({ options });

	return (
		<div className="options">
			<Menu>
				<MenuButton
					as={IconButton}
					aria-label="Options"
					variant="ghost"
					icon={<Icon icon="MoreVert" size={20} title={"options"} />}
				/>
				{options ? (
					<MenuList>
						{options.map((item) => {
							return (
								<MenuItem
									onClick={() => clickHandler(item.type)}
									icon={item.icon}
									command={item.command ? item.command : ""}>
									{item.label}
								</MenuItem>
							);
						})}
					</MenuList>
				) : (
					<></>
				)}
			</Menu>
		</div>
	);
}
