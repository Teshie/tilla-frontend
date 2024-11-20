"use client";
import React, { useState } from "react";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import PaymentSuccess from "../shared/PaymentSuccess";

export default function PricingPlans() {
  const API_CHECKOUT = "https://api.tillahealthinsurance.com/payments/checkout";
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const plans = [
    {
      title: "Basic Plan",
      price: { month: 50, year: 540 },
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
      price: { month: 90, year: 972 },
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
      price: { month: 150, year: 1620 },
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

  const MONTHLY_PRICE = 90;
  const YEARLY_PRICE = 972;

  const [billingCycle, setBillingCycle] = useState("month");
  const [selectedPlanData, setSelectedPlanData] = useState(
    plans.reduce((acc, plan) => {
      const basePrice = plan.price[billingCycle];
      acc[plan.title] = {
        members: { spause: 0, child: 0, elderly: 0, self: 1 },
        totalPrice: 1 * basePrice, // Initialize with 1 'self' member
      };
      return acc;
    }, {})
  );

  const handleMemberCountChange = (planTitle, type, operation) => {
    setSelectedPlanData((prev) => {
      const updatedMembers = {
        ...prev[planTitle].members,
        [type]:
          operation === "increment"
            ? prev[planTitle].members[type] + 1
            : Math.max(prev[planTitle].members[type] - 1, 0),
      };

      const memberCount = Object.values(updatedMembers).reduce(
        (a, b) => a + b,
        0
      );

      const pricePerMember =
        billingCycle === "month" ? MONTHLY_PRICE : YEARLY_PRICE;
      const totalPriceGrand = memberCount * pricePerMember;
      const deductablePrice = (memberCount - 1) * 10;
      const totalDiscountPrice =
        memberCount > 1 ? totalPriceGrand - deductablePrice : totalPriceGrand;

      return {
        ...prev,
        [planTitle]: {
          members: updatedMembers,
          totalPrice: totalDiscountPrice,
        },
      };
    });
  };

  const handleBillingCycleChange = (cycle) => {
    setBillingCycle(cycle);
    setSelectedPlanData((prev) =>
      Object.fromEntries(
        Object.entries(prev).map(([planTitle, data]) => {
          const selectedPlan = plans.find((plan) => plan.title === planTitle);
          if (!selectedPlan) {
            console.error(`Plan ${planTitle} not found`);
            return [planTitle, data]; // Fallback to the current data
          }
          const pricePerMember = selectedPlan.price[cycle]; // Get price for the selected cycle
          const totalMembers = Object.values(data.members).reduce(
            (a, b) => a + b,
            0
          );

          return [
            planTitle,
            {
              ...data,
              totalPrice: totalMembers * pricePerMember, // Update total price
            },
          ];
        })
      )
    );
  };
  const submit = () => {
    const combinedMembersCount = Object.values(selectedPlanData).reduce(
      (acc, planData) => {
        Object.entries(planData.members).forEach(([memberType, count]) => {
          acc[memberType] = (acc[memberType] || 0) + count;
        });
        return acc;
      },
      {}
    );

    axios
      .post(API_CHECKOUT, {
        member_id: "ec-48e3-87f6-01db07a11408", // Replace with the actual member ID
        billing_cycle: "monthly",
        plan_type: "dhc", // Replace with the selected plan type
        members_count: combinedMembersCount,
      })
      .then((response) => {
        const paymentLink = response.data.payment_link;

        if (paymentLink) {
          window.open(paymentLink, "_blank"); // Open payment link in a new tab
          setPaymentSuccess(true);
        }
      })
      .catch((error) => {
        console.error("Error during checkout request:", error);
      });
  };

  return (
    <div>
      {paymentSuccess ? (
        <PaymentSuccess />
      ) : (
        <div className="flex flex-col gap-8 p-8 bg-gray-50">
          <div className="flex justify-center mb-2">
            <button
              onClick={() => handleBillingCycleChange("month")}
              className={`px-4 py-2 ${
                billingCycle === "month"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700"
              } rounded-l-md`}
            >
              Monthly
            </button>
            <button
              onClick={() => handleBillingCycleChange("year")}
              className={`px-4 py-2 ${
                billingCycle === "yearly"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700"
              } rounded-r-md`}
            >
              Annually
            </button>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            {plans.map((plan) => (
              <div
                key={plan.title}
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
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">Price</span>
                    <span className="text-lg font-semibold text-indigo-600">
                      $ {selectedPlanData[plan.title].totalPrice} /{" "}
                      {billingCycle}
                    </span>
                  </div>
                </div>
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
                            onClick={() =>
                              handleMemberCountChange(
                                plan.title,
                                type,
                                "decrement"
                              )
                            }
                          >
                            -
                          </button>
                          <span>
                            {selectedPlanData[plan.title].members[type]}
                          </span>
                          <button
                            className="bg-gray-200 p-1 rounded-full"
                            onClick={() =>
                              handleMemberCountChange(
                                plan.title,
                                type,
                                "increment"
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center items-center ">
                  <button
                    className="main-color p-2 px-3 text-white"
                    onClick={submit}
                  >
                    Select {plan.title}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
