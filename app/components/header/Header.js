import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUndo,
  faArrowLeft,
  faArrowRight,
  faSearch,
  faPen,
  faFolder,
  faEnvelope,
  faThumbtack,
  faHeadset,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import logoWhite from "../../../public/assets/white-logo.png";

const Header = () => {
  return (
    <header className="main-color text-white flex items-center justify-between p-6 shadow-lg">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <Image src={logoWhite} alt="Logo" width={32} height={32} />
        <h1 className="text-lg font-semibold">Tilla Family Choice</h1>
      </div>

      {/* Center Buttons Section */}
      <div className="flex justify-center items-center space-x-3">
        <button className="text-lg font-bold text-white hover:text-red-600 hover:bg-white px-2 py-1 rounded">
          Tilla Members
        </button>
        <button className="text-lg font-bold text-white hover:text-red-600 hover:bg-white px-2 py-1 rounded">
          Tilla Providers
        </button>
      </div>

      {/* Icons and Language Section */}
      <div className="flex items-center space-x-3">
        <FontAwesomeIcon icon={faSearch} className="text-lg" />
        <div className="flex items-center space-x-1 text-sm">
          <span>Language</span>
          <span>|</span>
          <span>English</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
