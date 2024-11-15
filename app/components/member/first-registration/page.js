"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export default function MemberRegistrationForm() {
  const [formData, setFormData] = useState({
    memberId: "",
    medicaidId: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log("Form submitted", formData);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen ">
      <p className="text-3xl text-center text-blue-900 mb-4">
        Member Registration
      </p>
      <div className="bg-white shadow-md border border-red-500 rounded-lg  w-full max-w-sm flex justify-center items-center flex-col">
        <p className=" text-center text-blue-900 mb-4">
          Complete the form to request your unique member ID and begin your
          journey with us.
        </p>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 flex flex-col justify-center w-full p-2"
        >
          <div>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="First Name"
            />
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Last Name"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
            />
          </div>
          <button
            type="submit"
            className="w-full text-white main-color py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
