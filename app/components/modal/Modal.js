import React from "react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-start items-start mx-10 p-10 mt-16">
      <div className="bg-white rounded-lg p-4 w-1/3">
        <button
          className="text-gray-500 hover:text-gray-800 float-right"
          onClick={onClose}
        >
          &times;
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
}
