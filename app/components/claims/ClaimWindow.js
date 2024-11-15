import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { MINIMUM_CARD_HEIGHT, others } from "@/app/data/data";
import WindowCard from "../shared/WindowCard";

export default function ClaimWindow() {
  return (
    <WindowCard
      cardLabel={"Claims"}
      icon={faFile}
      listItems={[]}
      size={MINIMUM_CARD_HEIGHT}
    />
  );
}
