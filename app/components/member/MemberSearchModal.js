"use client";
import {
  faCancel,
  faClose,
  faClosedCaptioning,
  faEdit,
  faEraser,
  faEye,
  faFileExport,
  faMagnifyingGlass,
  faMagnifyingGlassPlus,
  faPen,
  faWindowMaximize,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

export default function MemberSearchModal({ onClose }) {
  const [status, setStatus] = useState("");
  const [maxResult, setMaxResult] = useState(50);
  const [membId, setMembId] = useState("");

  return (
    <div className="w-full label max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      {/* Header */}
      <div className="bg-gray-600 text-gray-200 px-4 py-2 flex items-center justify-between border-none">
        <h1 className="text-md font-semibold">
          Member Search: Login person Name and ID
        </h1>
        <FontAwesomeIcon
          onClick={onClose}
          icon={faXmarkCircle}
          className="h-4 w-4 text-white  cursor-pointer"
        />
      </div>

      {/* Action Bar */}
      <div className="p-4 bg-gray-300 flex items-center justify-between">
        <div className="flex justify-center items-center space-x-2">
          <div className="flex justify-center items-center">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="h-6  text-gray-500 hover:text-gray-700 cursor-pointer"
            />
            <button className="bg-gray-300 text-gray-700 px-2  rounded">
              Search
            </button>
          </div>
          <div className="flex justify-center items-center ">
            <FontAwesomeIcon
              icon={faEraser}
              className="h-6 text-gray-500 hover:text-gray-700 cursor-pointer"
            />
            <button className="bg-gray-300 text-gray-700 px-3 rounded">
              Clear
            </button>
          </div>
        </div>

        <div className="relative">
          <span className="text-gray-700">Search For</span>
          <select className="ml-2 py-1 px-2 border rounded">
            <option>Person</option>
            <option>ID</option>
          </select>
        </div>
        <div className="flex items-center">
          <label htmlFor="maxResult" className="text-gray-700 mr-2">
            Max result
          </label>
          <select
            id="maxResult"
            className="py-1 px-2 border rounded"
            value={maxResult}
            onChange={(e) => setMaxResult(e.target.value)}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>

      {/* Criteria Form */}
      <div className="p-1 border-t border-gray-200">
        <div className="text-red-600 text-center mb-2">
          Enter Criteria Before Searching
        </div>

        <div className="grid grid-cols-3 gap-4">
          <input
            value={membId}
            onChange={(e) => setMembId(e.target.value)}
            type="text"
            placeholder="Member ID"
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Other ID"
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Subscription ID"
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="HICN/RRB"
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Medicare Beneficiary ID"
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="First Name"
            className="p-2 border rounded"
          />
          <input
            type="date"
            placeholder="Birth Date"
            className="p-2 border rounded"
          />
          <select
            className="p-2 border rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="mt-6 border-t pt-2">
          <h2 className="text-gray-700 font-semibold mb-4">
            Head of Household
          </h2>
          <div className="grid grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Last Name"
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="First Name"
              className="p-2 border rounded"
            />
            <input
              type="date"
              placeholder="Birth Date"
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Status"
              className="p-2 border rounded"
            />
          </div>
        </div>
      </div>
      {membId.length > 3 && (
        <div className="">
          <div className="p-1 border-t border-gray-200 bg-gray-300 flex justify-start items-center space-x-2 label">
            <div className="flex justify-center items-center space-x-1">
              <FontAwesomeIcon
                icon={faEye}
                className="h-4 w-4 text-gray-500 hover:text-gray-700 cursor-pointer"
              />
              <button
                onClick={() => onClose()}
                className=" text-gray-700   rounded"
              >
                <Link href="/components/member">View</Link>
              </button>
            </div>
            <div className="flex justify-center items-center space-x-1">
              <FontAwesomeIcon
                icon={faPen}
                className="h-3 w-3 text-gray-500 hover:text-gray-700 cursor-pointer"
              />
              <button className=" text-gray-700   rounded">Edit</button>
            </div>
            <div className="flex justify-center items-center space-x-1">
              <FontAwesomeIcon
                icon={faFileExport}
                className="h-3 w-3 text-gray-500 hover:text-gray-700 cursor-pointer"
              />
              <button className=" text-gray-700   rounded">Export</button>
            </div>
          </div>

          {/* Table Section */}
          <div className="mb-4 h-36 border-t border-gray-200 label">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-left">
                    Member Name
                  </th>
                  <th className="border border-gray-300 p-2 text-left">ID</th>
                  <th className="border border-gray-300 p-2 text-left">
                    Status
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Birth Date
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Subscriber Name
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Workbasket Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">xxxxx</td>
                  <td className="border border-gray-300 p-2">xxxx</td>
                  <td className="border border-gray-300 p-2">Active</td>
                  <td className="border border-gray-300 p-2">9/22/1983</td>
                  <td className="border border-gray-300 p-2">xxxxx</td>
                  <td className="border border-gray-300 p-2 text-green-600">
                    Workbasket Status
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
