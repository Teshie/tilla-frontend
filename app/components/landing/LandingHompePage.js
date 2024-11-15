import React from "react";
import Claim from "../claims/Claim";
import Administrations from "../administration/Administrations";
import Others from "../others/Others";
import Provider from "../provider/Provider";
import Member from "../member/Member";
import Finance from "../finance/Finance";
import Funding from "../funding/Funding";
import Utilization from "../Utilization/Utilization";
import MemberSearchModal from "../member/MemberSearchModal";

const LandingHomePage = () => {
  return (
    <div className="p-4 flex flex-wrap">
      {/* Left Section */}
      {/* <MemberSearchModal/> */}
      <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <Claim />
        <Others />
    <Finance />
        <Funding />
        <Utilization />
        <Administrations />
      </div>
      {/* Right Section */}
      <div className=" md:w-1/3 flex flex-col items-center space-y-4 mt-4 md:mt-0">
        <Member />
        <Provider />
      </div>
    </div>
  );
};

export default LandingHomePage;
