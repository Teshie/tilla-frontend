import Link from "next/link";
import React from "react";

const PersonalOrRepresentative = () => {
  return (
    <div className="flex flex-col space-y-8 justify-center items-center p-4">
      <p className="text-lg font-semibold">Register as?</p>
      <div className="flex justify-center space-x-8 items-center">
        <Link href="/components/broker/broker-registrations">
          <p className="px-6 py-3 text-center text-white font-semibold main-color rounded-md shadow-md  focus:outline-none focus:ring-2  focus:ring-offset-2">
            Broker
          </p>
        </Link>
        <Link href="/components/broker/agent-registrations">
          <p className="px-6 py-3 text-center main-color font-semibold text-white border  rounded-md shadow-md  focus:outline-none focus:ring-2  focus:ring-offset-2">
            Agent
          </p>
        </Link>
      </div>
    </div>
  );
};

export default PersonalOrRepresentative;
