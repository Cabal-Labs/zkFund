import Head from "next/head";
import Image from "next/image";
import { Button } from "@chakra-ui/react";
import ScreenWrapper from "@/components/layout/screenWrapper";
import Link from "next/link";
import { useRouter } from "next/router";

export default function RequestCharity() {
	// get searchTerm from the router query
	const router = useRouter();
	const { searchTerm } = router.query;

	function handleNavigate() {
		router.push({
			pathname: "/requestCharity/form",
			query: { searchTerm },
		});
	}

	return (
		<ScreenWrapper>
			<main>
				<Head>
					<title>Request Charity</title>
					<meta name="description" content="Request Charity" />
				</Head>
				<h1>Request Charity</h1>

				<p>
					We're always working on adding more charities to our system, and we
					would love your help!
					<br />
					Take a second to give us some information about the charity you'd like
					to add.
					<br />
					We'll review your request and add it to our system if it meets our
					criteria.
					<br />
					Make sure to provide as much information as possible so we can approve
					your request faster. Thanks so much!
				</p>

				<Button
					variant={"link"}
					aria-role={"link"}
					onClick={() => handleNavigate()}>
					Fill out the form!
				</Button>
			</main>
		</ScreenWrapper>
	);
}
