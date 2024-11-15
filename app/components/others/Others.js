import { administration, MINIMUM_CARD_HEIGHT, others } from "@/app/data/data";
import React from "react";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import WindowCard from "../shared/WindowCard";
const Others = () => {
  return (
    <div>
      <WindowCard
        cardLabel={"Others"}
        icon={faUsers}
        listItems={others}
        size={MINIMUM_CARD_HEIGHT}
      />
    </div>
  );
};

export default Others;
