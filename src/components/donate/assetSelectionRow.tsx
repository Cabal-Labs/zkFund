import React from "react";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

interface AssetSelectionRowProps {
  ticker: string; // ETH, BTC, DOGE
  name: string; // Ethereum, Bitcoin, Dogecoin
  selected: boolean; // true if this row is selected
  onSelect: () => void; // callback to select this row
  balance: number; // 0.00213
  balanceInUSD: number; // 1570.50 (displayed as $1570.50 USD)
}

export default function AssetSelectionRow({
  ticker,
  name,
  selected,
  onSelect,
  balance,
  balanceInUSD,
}: AssetSelectionRowProps) {
  return (
    <div className="asset-selection-row-container" onSelect={onSelect}>
      <div className="select-circle">
        {selected && (
          <div
            style={{
              backgroundColor: "#D37CF1",
              borderRadius: "50%",
              height: "80%",
              width: "80%",
              // TODO: temporary hotfix because it wasn't centering otherwise
              marginLeft: "10%",
              marginTop: "10%",
            }}
          />
        )}
      </div>
      <div className="asset-info-text-container">
        <div className="asset-info-top-row">
          <h3>{ticker}</h3>
          <h3>{balance}</h3>
        </div>
        <div className="asset-info-bottom-row">
          <h6 className="balance">{name}</h6>
          <h6 className="balance-in-usd">${balanceInUSD?.toFixed(2)} USD</h6>
        </div>
      </div>
    </div>
  );
}
