// app/page.js
"use client"; // Use this if you have client-side state or effects

import React from "react";
import MemberInformation from "./components/member/member-information/page";
import PricingPlans from "./components/pricing/page";

export default function Home() {
  return (
    <div>
      <MemberInformation /> {/* Landing or main page content */}
      <PricingPlans/>
    </div>
  );
}
