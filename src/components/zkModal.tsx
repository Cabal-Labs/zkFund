import React from "react";
import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/react";

interface ModalProps {
	title: string; // displayed in ModalHeader
	children: JSX.Element; // displayed in ModalBody
	isError?: boolean; // displays modal with error styling
	isOpen: boolean; // state in parent component to control modal visibility
	onClose: () => void; // setModalVisible(false) in parent component, with any other optional logic
}

export default function ZkModal({
	title,
	children,
	isError = false,
	isOpen = false,
	onClose,
}: ModalProps) {
	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						<h3 style={{ color: isError ? "red" : undefined }}>{title}</h3>
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>{children}</ModalBody>
					<ModalFooter style={{ justifyContent: "center" }}>
						<Button onClick={onClose} variant="pinkOutline">
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
