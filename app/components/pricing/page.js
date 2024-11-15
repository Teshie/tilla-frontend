"use client";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";

var API_CHECKOUT = "http://api.tillahealthinsurance.com/payments/checkout";

export default function PricingPlans() {
  const plans = [
    {
      title: "Basic Plan",
      features: [
        {
          name: "Routine check-ups, vaccinations, preventive care",
          covered: true,
        },
        { name: "Limited access to specialists", covered: true },
        { name: "Emergency visits only", covered: true },
        { name: "Partial coverage for hospital stays", covered: true },
        { name: "Chronic Disease Management", covered: false },
        { name: "Maternity/Newborn Care", covered: false },
        { name: "Mental Health Services", covered: false },
        { name: "Telehealth Services", covered: false },
        { name: "Additional Coverage", covered: false },
      ],
    },
    {
      title: "Standard Plan",
      features: [
        {
          name: "All Basic services + access to general practitioners",
          covered: true,
        },
        { name: "Access to specialists for common conditions", covered: true },
        { name: "Emergency and urgent care visits", covered: true },
        { name: "Full coverage for planned hospitalizations", covered: true },
        { name: "Basic coverage for common chronic conditions", covered: true },
        {
          name: "Partial coverage for prenatal care and delivery",
          covered: true,
        },
        { name: "Basic counseling services", covered: true },
        {
          name: "Telemedicine consultations for general health issues",
          covered: true,
        },
        { name: "Care coordination for managing treatments", covered: true },
      ],
    },
    {
      title: "Comprehensive Plan",
      features: [
        {
          name: "All Standard services + comprehensive diagnostics",
          covered: true,
        },
        { name: "Full access to a wide range of specialists", covered: true },
        {
          name: "Full coverage for emergency, urgent care, and ambulance services",
          covered: true,
        },
        {
          name: "Full coverage for planned and emergency hospitalizations",
          covered: true,
        },
        {
          name: "Comprehensive management for chronic conditions",
          covered: true,
        },
        {
          name: "Full coverage for prenatal, delivery, and postnatal care",
          covered: true,
        },
        {
          name: "Comprehensive mental health services, including psychiatric care",
          covered: true,
        },
        {
          name: "Full telemedicine access for both general and specialty consultations",
          covered: true,
        },
        {
          name: "Second opinion services, international care options",
          covered: true,
        },
      ],
    },
  ];

  // Pricing tiers for different types
  const pricingTypes = {
    "Individual or Family": { month: 90, yearly: 972 },
    Diaspora: { month: 50, yearly: 540 },
    NGO: { month: 70, yearly: 756 },
    "Private Sector": { month: 65, yearly: 656 },
  };

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState("month");
  const [pricingType, setPricingType] = useState("Individual or Family");
  const [members, setMembers] = useState({
    spause: 0,
    child: 0,
    elderly: 0,
    self: 1,
  });
  const memberData = 3;
  const parsedData = 3;
  const memberID = parsedData?.member?.id;
  const submit = () => {
    axios
      .post(API_CHECKOUT, {
        member_id: memberID,
        billing_cycle: "annual",
        plan_type: "dhc",
        members_count: JSON.stringify(members),
      })
      .then((response) => {
        // Extract the payment link from the response
        const paymentLink = response.data.payment_link;

        // Open the payment link in a new tab or window
        if (paymentLink) {
          window.open(paymentLink, "_blank"); // '_blank' opens it in a new tab
        }
      })
      .catch((error) => {
        console.error("Error during checkout request:", error);
        // Handle any errors (optional: show user-friendly message)
      });
  };

  const handlePlanSelection = (planTitle) => {
    setSelectedPlan(planTitle);
    setMembers({ spause: 0, child: 0, elderly: 0, self: 1 });
  };

  const handlePricingTypeSelection = (type) => {
    setPricingType(type);
  };

  const updateMemberCount = (type, operation) => {
    setMembers((prev) => ({
      ...prev,
      [type]:
        operation === "increment"
          ? prev[type] + 1
          : Math.max(prev[type] - 1, 0),
    }));
  };

  return (
    <div className="flex flex-col gap-8 p-8 bg-gray-50">
      {/* Billing cycle buttons */}
      <div className="flex justify-center mb-2">
        <button
          onClick={() => setBillingCycle("month")}
          className={`px-4 py-2 ${
            billingCycle === "month"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700"
          } rounded-l-md`}
        >
          Monthly
        </button>
        <button
          onClick={() => setBillingCycle("yearly")}
          className={`px-4 py-2 ${
            billingCycle === "yearly"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700"
          } rounded-r-md`}
        >
          Annualy
        </button>
      </div>
      {/* Pricing type selection buttons */}
      <div className="flex justify-center gap-4">
        {Object.keys(pricingTypes).map((type) => (
          <button
            key={type}
            onClick={() => handlePricingTypeSelection(type)}
            className={`px-4 py-2 ${
              pricingType === type
                ? "main-color text-white"
                : "bg-gray-200 text-gray-700"
            } rounded-md`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="w-full md:w-1/3 bg-white shadow-lg rounded-lg p-6 border border-gray-200"
          >
            <h3 className="text-xl font-semibold text-indigo-600">
              {plan.title}
            </h3>
            <ul className="mt-4 space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center text-gray-700">
                  <FontAwesomeIcon
                    icon={feature.covered ? faCheck : faTimes}
                    className={`mr-2 ${
                      feature.covered ? "text-green-500" : "text-red-500"
                    }`}
                  />
                  <span className="text-sm">{feature.name}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-4">
              {/* Display pricing based on selected pricing type and billing cycle */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold">Price</span>
                <span className="text-lg font-semibold text-indigo-600">
                  $
                  {billingCycle === "month"
                    ? pricingTypes[pricingType].month
                    : pricingTypes[pricingType].yearly}{" "}
                  / {billingCycle}
                </span>
              </div>
            </div>
            <button
              className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500 transition"
              onClick={() => handlePlanSelection(plan.title)}
            >
              Select {plan.title}
            </button>
            {selectedPlan === plan.title && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-800">
                  Select Members
                </h4>
                <div className="mt-4 space-y-4">
                  {["spause", "child", "elderly", "self"].map((type) => (
                    <div
                      key={type}
                      className="flex items-center justify-between"
                    >
                      <span className="capitalize">{type}</span>
                      <div className="flex items-center space-x-2">
                        <button
                          className="bg-gray-200 p-1 rounded-full"
                          onClick={() => updateMemberCount(type, "decrement")}
                        >
                          -
                        </button>
                        <span>{members[type]}</span>
                        <button
                          className="bg-gray-200 p-1 rounded-full"
                          onClick={() => updateMemberCount(type, "increment")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={submit}
                  className="mt-6 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-500 transition"
                >
                  Confirm Members for {plan.title}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
