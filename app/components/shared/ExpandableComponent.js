"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const ExpandableSection = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="border-b border-gray-300">
      <button
        onClick={toggleExpand}
        className="w-full flex items-center space-x-1  bg-gray-100 px-4 py-2 text-left font-semibold text-gray-700 hover:bg-gray-200"
      >
        <FontAwesomeIcon className="text-red-600" icon={isExpanded ? faChevronUp : faChevronDown} />
        <span>{title}</span>
      </button>
      {isExpanded && (
        <div className="p-4 bg-white ">{children}</div>
      )}
    </div>
  );
};

export default ExpandableSection;
