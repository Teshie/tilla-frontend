"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRedoAlt,
  faGlobe,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import ExpandableSection from "../shared/ExpandableComponent";
import FormField from "../shared/FormField";

const Subscription = () => {
  // State for active tab and sub-tab
  const [activeTab, setActiveTab] = useState("Claims");

  // Function to handle tab click
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  const [data, setData] = useState(null);

  useEffect(() => {
    // Replace with actual fetch or API call to get the data
    const fetchData = async () => {
      const response = await fetch("http://127.0.0.1:8000/api/member/");
      const result = await response.json();
      setData(result[0]); // Assuming the response is an array and we're using the first object
    };

    fetchData();
  }, []);

  // Utility function to calculate age from birth date
  const getAge = (birthDate) => {
    const birthDateObj = new Date(birthDate);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDateObj.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && currentDate.getDate() < birthDateObj.getDate())
    ) {
      return age - 1;
    }
    return age;
  };

  if (!data) return <div>Loading...</div>;
  console.log(data, "data");

  return (
    <div className="label">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Subscription</h1>
        <span className="text-red-500 font-bold border border-red-500 px-2 py-1 text-sm">
          P
        </span>
      </div>
      <p className="text-gray-600 mb-6">912451937</p>

      {/* Top Navigation */}
      <div className="flex space-x-4 border-b pb-2 mb-4">
        <div className="text-gray-500">Actions:</div>
        <div className="text-gray-500 hover:text-black cursor-pointer">
          Refresh
        </div>
        <div className="text-gray-500 hover:text-black cursor-pointer">
          Benefit Predictor
        </div>
        <div className="text-gray-500 hover:text-black cursor-pointer">
          Trial Claim
        </div>
        <div className="text-gray-500 hover:text-black cursor-pointer">
          Provider Finder
        </div>
        <div>
          <FontAwesomeIcon icon={faGlobe} className="text-gray-500" />
          <div className="text-gray-500 hover:text-black cursor-pointer">
            Coverage Events
          </div>
        </div>
        <div className="">
          <FontAwesomeIcon
            icon={faExclamationCircle}
            className="text-gray-500"
          />
          <div className="text-gray-500 hover:text-black cursor-pointer">
            Provider Choice Events
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="mb-4">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Alert</th>
              <th className="border px-4 py-2 text-left">ID</th>
              <th className="border px-4 py-2 text-left">
                Status as of 10/17/2024
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b px-4 py-2">xxxx</td>
              <td className="border-b px-4 py-2">
                <span className="text-red-500 font-bold border border-red-500 px-2 py-1 text-sm">
                  P
                </span>
              </td>
              <td className="border-b px-4 py-2">912451937</td>
              <td className="border-b px-4 py-2 text-green-500">Active</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bottom Tabs */}
      <div className="flex flex-wrap border-b ">
        {[
          "Claims",
          "Financial Activity",
          "Payment History",
          "Authorizations",
          "Accumulators",
          "Linked Members",
          "Family Link",
          "Cases",
          "Episodes of Care",
          "Accounts",
          "Attachments",
          "Communications",
          "Issue Tracking",
          "UDT",
        ].map((tab) => (
          <div
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`cursor-pointer border px-2 ${
              activeTab === tab
                ? "border-red-500 text-red-500"
                : "border-gray-300 text-gray-500 hover:text-black"
            }`}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Sub-Tabs */}
      <div className="flex flex-wrap">
        {[
          "General",
          "Contact",
          "Benefit Plan",
          "Provider Choice",
          "Claim Review",
          "Manual Review",
          "Health",
          "Medicare",
          "Factors",
          "Reserves",
          "Compliance Programs",
          "COB",
          "PHI",
        ].map((subTab) => (
          <div
            key={subTab}
            onClick={() => handleTabClick(subTab)}
            className={`cursor-pointer border p-1 px-2 ${
              activeTab === subTab
                ? "border-red-500 text-red-500"
                : "border-gray-300 text-gray-500 hover:text-black"
            }`}
          >
            {subTab}
          </div>
        ))}
      </div>
      <div className="mt-1 space-y-4 bg-gray-300">
        {/* Account Information Section */}
        <ExpandableSection title="Account Information">
          <div className="space-y-4">
            <FormField
              label="Account Name:"
              defaultValue={data.account_plan.name}
            />
            <FormField label="Account ID:" defaultValue={data.id} />
          </div>
        </ExpandableSection>

        {/* Enrollment Information Section */}
        <ExpandableSection title="Enrollment Information">
          <div className="grid grid-cols-2 gap-4">
            {/* First Column */}
            <div className="space-y-4">
              <FormField
                label="Primary Name:"
                defaultValue={data.first_name + " " + data.last_name}
              />
              <FormField
                label="Birth Country:"
                defaultValue={data.address.country}
              />
              <FormField
                label="Birth State/Prov.:"
                defaultValue={data.address.region}
              />
              <FormField
                label="Birth Country Code:"
                defaultValue={data.address.zip_postal_code}
              />
              <FormField label="Member ID:" defaultValue={data.id} />
              <FormField
                label="Active Since:"
                defaultValue={data.date_of_birth}
              />
              <FormField
                label="First Effective Date:"
                defaultValue={data.medicare.start_date}
              />
            </div>

            {/* Second Column */}
            <div className="space-y-4">
              <FormField label="SSN:" defaultValue={data.other_ids.id_number} />
              <FormField
                label="Birth Date:"
                defaultValue={data.date_of_birth}
              />
              <FormField
                label="Current Age:"
                defaultValue={getAge(data.date_of_birth)}
              />
              <FormField
                label="Date of Death:"
                defaultValue={data.date_of_birth}
              />
              <FormField label="Marital Status:" defaultValue="Unknown" />
              <FormField label="Immigration Status:" defaultValue="Unknown" />
              <FormField label="Relationship:" defaultValue="Unknown" />
              <FormField label="Pronoun:" defaultValue={data.gender_identity} />
              <FormField
                label="Receipt Date:"
                defaultValue={data.medicare.start_date}
              />
            </div>
          </div>
        </ExpandableSection>

        {/* Physical Characteristic Section */}
        <ExpandableSection title="Physical Characteristic">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Height (cm):" defaultValue={data.height} />
            <FormField label="Weight (kg):" defaultValue={data.weight} />
          </div>
        </ExpandableSection>

        {/* Employment Information Section */}
        <ExpandableSection title="Employment Information">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <FormField
                label="Employment Status:"
                defaultValue={data.employment.status}
              />
              <FormField
                label="Position/Title:"
                defaultValue={data.employment.position}
              />
              <FormField
                label="Employee Type:"
                defaultValue={data.employment.employment_type}
              />
              <FormField
                label="Hire/Affiliation Date:"
                defaultValue={data.employment.start_date}
              />
              <FormField
                label="Salary:"
                defaultValue={data.employment.salary}
              />
              <FormField label="Salary Interval:" defaultValue="Monthly" />
            </div>
            <div className="space-y-4">
              <FormField label="Salary Grade:" defaultValue="Unknown" />
              <FormField label="Hours Worked:" defaultValue="40" />
              <FormField label="Hours Interval:" defaultValue="Weekly" />
              <FormField label="Retirement Date:" defaultValue="Unknown" />
              <FormField label="Department:" defaultValue="Unknown" />
              <FormField label="Business Unit:" defaultValue="Unknown" />
            </div>
          </div>
        </ExpandableSection>
      </div>
    </div>
  );
};

export default Subscription;
