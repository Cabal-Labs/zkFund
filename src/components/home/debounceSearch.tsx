import { useState, useMemo, useEffect } from "react";
import debounce from "lodash.debounce";
import Icon from "@/lib/icons";

import {
	Button,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
} from "@chakra-ui/react";
import { CharityCardProps } from "@/lib/types";
import { charityCards } from "@/lib/dummyData";
interface DebounceSearchProps {
	onSubmit: (string) => Promise<CharityCardProps[]>;
	searchTerm: string;
	setSearchTerm: (string) => void;
}
export default function DebounceSearch({
	onSubmit,
	searchTerm,
	setSearchTerm,
}: DebounceSearchProps) {
	const handleChange = (e) => {
		setSearchTerm(e.target.value);
		onSubmit(e.target.value);
	};
	const debouncedResults = useMemo(() => {
		return debounce(handleChange, 300);
	}, []);

	useEffect(() => {
		return () => {
			debouncedResults.cancel();
		};
	}, [searchTerm]);

	return (
		<div id="search">
			<InputGroup>
				<Input
					variant="outlined"
					placeholder="Search for a charity"
					onChange={debouncedResults}
				/>
				<InputRightElement>
					<IconButton
						disabled={!searchTerm}
						aria-label="search"
						placeholder="Search for a charity"
						onClick={() => onSubmit(searchTerm)}>
						<Icon icon={"Search"} />
					</IconButton>
				</InputRightElement>
			</InputGroup>
		</div>
	);
}
