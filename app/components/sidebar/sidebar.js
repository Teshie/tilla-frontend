"use client";

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStar, faFolder, faFile, faUser, 
  faDollarSign, faStethoscope, faUsers, 
  faClipboardList, faCog 
} from '@fortawesome/free-solid-svg-icons';

const icons = [
  faStar, faFolder, faFile, faUser, 
  faDollarSign, faStethoscope, faUsers, 
  faClipboardList, faCog
];

const Sidebar = ({ onIconClick }) => {
  const [clickedIcon, setClickedIcon] = useState(null);

  const handleIconClick = (index) => {
    setClickedIcon(index);
    onIconClick(index); // Update the selected component in Home
  };

  return (
    <aside className="main-color text-white w-20 flex flex-col items-center p-2 space-y-4">
      {icons.map((icon, index) => (
        <FontAwesomeIcon  
          key={index} 
          icon={icon} 
          style={{ color: clickedIcon === index ? 'black' : 'white' }}
          onClick={() => handleIconClick(index)}
          className="mt-10 cursor-pointer w-5 h-5 transition-transform transform hover:scale-125 hover:text-gray-300" 
        />
      ))}
    </aside>
  );
};

export default Sidebar;
