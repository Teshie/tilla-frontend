// app/layout.js
"use client";

import React, { useState } from "react";
import Administrations from "./components/administration/Administrations";
import Claim from "./components/claims/Claim";
import Document from "./components/document/Document";
import Favorite from "./components/Favorite/Favorite";
import Finance from "./components/finance/Finance";
import Member from "./components/member/Member";
import Others from "./components/others/Others";
import Provider from "./components/provider/Provider";
import Utilization from "./components/Utilization/Utilization";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/sidebar";
import Modal from "./components/modal/Modal";
import "./globals.css";



const componentList = [
  Favorite,
  Document,
  Claim,
  Member,
  Finance,
  Provider,
  Others,
  Utilization,
  Administrations,
];

export default function RootLayout({ children }) {
  const [selectedComponentIndex, setSelectedComponentIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIconClick = (index) => {
    setSelectedComponentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <div className="flex flex-1">
          <main className="flex-1">{children}</main>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {selectedComponentIndex !== null &&
            React.createElement(componentList[selectedComponentIndex])}
        </Modal>
      </body>
    </html>
  );
}
