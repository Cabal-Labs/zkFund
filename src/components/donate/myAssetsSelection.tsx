import React, { useState } from "react";
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
import AssetSelectionRow from "./assetSelectionRow";

interface MyAssetsSelectionProps {
  selectedAsset: string;
  setSelectedAsset: (asset: string) => void;
  availableAssets: any; // TODO: Create a type for this
}

export default function MyAssetsSelection({
  selectedAsset,
  setSelectedAsset,
  availableAssets,
}: MyAssetsSelectionProps) {
  return (
    <>
      <Modal
        variant={"gradientOutlined"}
        isOpen={false} // isOpen={isOpen}
        //   onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {/* used to be isError below */}
            <h2>My Assets</h2>
          </ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody>
            {/* {availableAssets.map((asset) => (
              <AssetSelectionRow
                ticker={asset.ticker}
                name={asset.name}
                selected={selectedAsset === asset.ticker}
                onSelect={() => setSelectedAsset(asset.ticker)}
                balance={asset.balance}
                balanceInUSD={asset.balanceInUSD}
              />
            ))} */}
            <AssetSelectionRow
              ticker="ETH"
              name="Ethereum"
              selected={selectedAsset === "ETH"}
              onSelect={() => setSelectedAsset("ETH")}
              balance={0.00213}
              balanceInUSD={1570.5}
            />
            <AssetSelectionRow
              ticker="BTC"
              name="Bitcoin"
              selected={selectedAsset === "BTC"}
              onSelect={() => setSelectedAsset("BTC")}
              balance={0.00000213}
              balanceInUSD={12.39}
            />
          </ModalBody>
          <ModalFooter style={{ justifyContent: "center" }}>
            {/* <Button
              // onClick={onClose}
              variant="pinkOutline"
            >
              Close
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
