import React from "react";
import Image from "next/image";
import sampleImage1 from "../../../../public/assets/family.png";
import sampleImage2 from "../../../../public/assets/family.png";
import sampleImage3 from "../../../../public/assets/family.png";
import Link from "next/link";

const BrokerInformation = () => {
  return (
    <div className="">
      {/* Main Header */}
      <div className="bg-yellow-100 p-8 flex justify-around items-center">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">
          Tilla Family Choice Brokers
        </h1>
        <button className="text-lg font-bold text-white  bg-red-600 px-2 py-1 rounded">
          <Link href="/components/broker/agent_broker_choice">
            Register as a broker
          </Link>
        </button>
      </div>
      <h2 className="p-6 text-xl font-semibold text-blue-800 mb-8">
        Get the most from your membership
      </h2>
      {/* Featured Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Card 1 */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <Image
            src={sampleImage1}
            alt="Medicaid Check-In"
            className="w-full h-40 object-cover rounded-md mb-4"
          />
          <h3 className="text-lg font-semibold text-blue-800">
            Medicaid Check-In 2024
          </h3>
          <p className="text-gray-700 text-sm mt-2">
            Changes are coming to Maryland Medicaid. Medicaid renewals will not
            be automatic this year. Make sure your contact information is up to
            date...
          </p>
          <a href="#" className="text-blue-600 font-semibold mt-4 inline-block">
            Click Here to Get Started →
          </a>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <Image
            src={sampleImage2}
            alt="Tilla eVisit"
            className="w-full h-40 object-cover rounded-md mb-4"
          />
          <h3 className="text-lg font-semibold text-blue-800">
            Tilla eVisit - Telehealth
          </h3>
          <p className="text-gray-700 text-sm mt-2">
            If you think you may be sick with COVID-19, flu, or have any other
            illness or minor injury, you and your family get free Tilla
            eVisit...
          </p>
          <a href="#" className="text-blue-600 font-semibold mt-4 inline-block">
            Learn More About Tilla eVisit Telehealth →
          </a>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <Image
            src={sampleImage3}
            alt="Family Health"
            className="w-full h-40 object-cover rounded-md mb-4"
          />
          <h3 className="text-lg font-semibold text-blue-800">
            Keeping you and your family healthy
          </h3>
          <p className="text-gray-700 text-sm mt-2">
            Keeping your children up to date on their vaccines is important,
            even during this health crisis. Contact your child’s doctor...
          </p>
          <a href="#" className="text-blue-600 font-semibold mt-4 inline-block">
            Learn More About Child and Adult Wellness →
          </a>
        </div>
      </div>

      {/* Secondary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-yellow-100 p-4 rounded-lg shadow-md text-center">
          <h3 className="font-semibold text-blue-800">Find a provider</h3>
          <p className="text-gray-600 text-sm">
            Receive expert care from our physicians.
          </p>
          <a href="#" className="text-blue-600 font-semibold mt-2 inline-block">
            Find a Provider →
          </a>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow-md text-center">
          <h3 className="font-semibold text-blue-800">Make an appointment</h3>
          <p className="text-gray-600 text-sm">Make an appointment online.</p>
          <a href="#" className="text-blue-600 font-semibold mt-2 inline-block">
            Make an Appointment →
          </a>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow-md text-center">
          <h3 className="font-semibold text-blue-800">Wellness incentives</h3>
          <p className="text-gray-600 text-sm">
            Learn about incentives for completing wellness visits.
          </p>
          <a href="#" className="text-blue-600 font-semibold mt-2 inline-block">
            Learn More →
          </a>
        </div>
      </div>
      <h2 className="p-2 mt-4 text-xl font-semibold text-blue-800">
        Get the most from your membership
      </h2>

      {/* Featured Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Card 1 */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <Image
            src={sampleImage1}
            alt="Medicaid Check-In"
            className="w-full h-40 object-cover rounded-md mb-4"
          />
          <h3 className="text-lg font-semibold text-blue-800">
            Medicaid Check-In 2024
          </h3>
          <p className="text-gray-700 text-sm mt-2">
            Changes are coming to Maryland Medicaid. Medicaid renewals will not
            be automatic this year. Make sure your contact information is up to
            date...
          </p>
          <a href="#" className="text-blue-600 font-semibold mt-4 inline-block">
            Click Here to Get Started →
          </a>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <Image
            src={sampleImage2}
            alt="Tilla eVisit"
            className="w-full h-40 object-cover rounded-md mb-4"
          />
          <h3 className="text-lg font-semibold text-blue-800">
            Tilla eVisit - Telehealth
          </h3>
          <p className="text-gray-700 text-sm mt-2">
            If you think you may be sick with COVID-19, flu, or have any other
            illness or minor injury, you and your family get free Tilla
            eVisit...
          </p>
          <a href="#" className="text-blue-600 font-semibold mt-4 inline-block">
            Learn More About Tilla eVisit Telehealth →
          </a>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <Image
            src={sampleImage3}
            alt="Family Health"
            className="w-full h-40 object-cover rounded-md mb-4"
          />
          <h3 className="text-lg font-semibold text-blue-800">
            Keeping you and your family healthy
          </h3>
          <p className="text-gray-700 text-sm mt-2">
            Keeping your children up to date on their vaccines is important,
            even during this health crisis. Contact your child’s doctor...
          </p>
          <a href="#" className="text-blue-600 font-semibold mt-4 inline-block">
            Learn More About Child and Adult Wellness →
          </a>
        </div>
      </div>
    </div>
  );
};

export default BrokerInformation;
