import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindowMaximize,
  faTimes,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import MemberSearchModal from "../member/MemberSearchModal";
import Link from "next/link";

export default function WindowCard({ icon, cardLabel, listItems, size }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleOpenModal = (label) => {
    setModalContent(label);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent("");
  };

  return (
    <div className="label border border-gray-400 shadow-sm">
      <div className="flex justify-end items-center p-1 px-2 border-b border-gray-400">
        <div className="flex space-x-2 justify-end items-end">
          <FontAwesomeIcon
            icon={faWindowMaximize}
            className="h-3 w-3 text-gray-500 hover:text-gray-700 cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faTimes}
            className="w-3 h-3 text-gray-500 hover:text-gray-700 cursor-pointer"
          />
        </div>
      </div>
      <div className="flex items-center p-1">
        <div className="bg-red-500 w-5 h-5 flex items-center justify-center rounded">
          <FontAwesomeIcon
            icon={icon}
            className="text-white h-3 w-3 cursor-pointer"
          />
        </div>
        <span className="ml-1">{cardLabel}</span>
      </div>
      <div className={`p-1 mx-3 overflow-y-auto rounded-scrollbar ${size}`}>
        {listItems?.length > 0 ? (
          listItems.map((items) => (
            <div key={items?.id} className="flex items-center">
              <div className="w-48 truncate">
                <Link href="/member">{items?.label}</Link>
              </div>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="h-3 w-3 ml-2 cursor-pointer"
                onClick={() => {
                  handleOpenModal(items?.label);
                }}
              />
            </div>
          ))
        ) : (
          <div className="sr-only text-gray-500 text-center">
            No items available
          </div>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-4 rounded shadow-lg border-none">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-semibold">
                <p>{modalContent}</p>
              </h2>

              <FontAwesomeIcon
                icon={faTimes}
                className="cursor-pointer"
                onClick={handleCloseModal}
              />
            </div>
            <div className="">
              <MemberSearchModal onClose={handleCloseModal} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
