import React from "react";
import WindowCard from "../shared/WindowCard";
import { funding, MINIMUM_CARD_HEIGHT } from "@/app/data/data";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";

const Funding = () => {
  return (
    <div>
      <WindowCard
        cardLabel={"Funding"}
        icon={faMoneyBill}
        listItems={funding}
        size={MINIMUM_CARD_HEIGHT}
      />
    </div>
  );
};

export default Funding;
