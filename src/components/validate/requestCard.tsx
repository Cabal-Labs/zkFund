import { Button, IconButton } from "@chakra-ui/react";
import Icon from "@/lib/icons";
import React, { useEffect, useState } from "react";
import { useSigner } from "wagmi";
import {
	GetCharityVotes,
	GetVoteState,
	ResolveCharities,
	Vote,
} from "@/lib/contracts";
import { Signer } from "ethers";
import ZkModal from "../zkModal";
interface RequestCardProps {
	signer: Signer;
	charityId: number;
	charityWallet: string;
	charityName: string;
	charityDescription: string;
}

export default function RequestCard({
	signer,
	charityId,
	charityWallet,
	charityName,
	charityDescription,
}: RequestCardProps) {
	const [votesApprove, setVotesApprove] = useState(0);
	const [votesDisapprove, setVotesDisapprove] = useState(0);
	const [hasVoted, setHasVoted] = useState(false);

	const [modal, setModal] = useState({
		visible: false,
		isError: false,
		title: "",
		content: null,
	});
	const hideAndClearModal = () => {
		setModal({ visible: false, isError: false, title: "", content: null });
	};
	async function getVotes() {
		const votes = await GetCharityVotes(charityId, signer);
		setVotesApprove(votes.approveVotes.toNumber());
		setVotesDisapprove(votes.disapproveVotes.toNumber());
	}
	async function handleVote(vote: boolean) {
		try {
			await Vote(charityId, vote, signer);
			await getVotes();
		} catch (e) {
			setModal({
				visible: true,
				isError: true,
				title: "Error",
				content: <p>{e.reason}</p>,
			});
		}
	}

	async function approve() {
		await ResolveCharities(charityId, signer);
	}
	const totalValidators = 4;
	const canValidate: boolean =
		votesApprove / (votesDisapprove + votesApprove) < 0.8 &&
		votesDisapprove + votesApprove > totalValidators * 0.75;

	useEffect(() => {
		(async () => {
			let result = await GetVoteState(signer, charityId);
			await setHasVoted(result);
			await getVotes();
		})();
	}, [charityId]);
	return (
		<>
			<div className="validate-request-card-container">
				<div className="validate-request-charity-info-container">
					<h5>
						{votesApprove} / {votesDisapprove}
					</h5>
					{/* <p>{hasVoted.toString()}</p> */}
					<h3>{charityName}</h3>
					<h6 className="secondary">{charityWallet}</h6>
					<p>{charityDescription}</p>
				</div>
				<div>
					<div className="validate-selection-row">
						<div className="validate-selection-div">
							<IconButton
								aria-label="Approve"
								backgroundColor={"#65B36D"}
								icon={<Icon icon="ThumbsUpAlt" size={30} />}
								onClick={() => handleVote(true)}
							/>
							{hasVoted ? <h6>{votesApprove}</h6> : <h6></h6>}
						</div>
						<div className="validate-selection-div">
							<IconButton
								aria-label="Disapprove"
								backgroundColor={"#C74F4F"}
								icon={<Icon icon="ThumbsDownAlt" size={30} />}
								onClick={() => handleVote(false)}
							/>
							{hasVoted ? <h6>{votesDisapprove}</h6> : <h6></h6>}
						</div>
					</div>
					<Button
						onClick={() => approve()}
						// isDisabled={!canValidate}
						// disabled if approval percentage is less than 80%
					>
						Approve
					</Button>
				</div>
			</div>
			<ZkModal
				isOpen={modal.visible}
				isError={modal.isError}
				title={modal.title}
				onClose={hideAndClearModal}>
				<>{modal.content}</>
			</ZkModal>
		</>
	);
}
