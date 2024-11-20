import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
        {/* Success Icon and Message */}
        <div className="text-center">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-green-500 text-6xl"
          />
          <h1 className="text-3xl font-bold text-gray-800 mt-4">
            Payment Successful
          </h1>
          <p className="text-gray-600 mt-2">
            Thank you for your payment! Your transaction has been processed
            successfully.
          </p>
        </div>

        {/* Receipt Section */}
        <div className="mt-6 border-t border-gray-200 pt-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Payment Receipt
          </h2>
          <div className="mt-4 space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span className="font-medium">Transaction ID:</span>
              <span>#123456789</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Amount Paid:</span>
              <span>$150</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Payment Date:</span>
              <span>November 20, 2024</span>
            </div>
          </div>

          {/* View/Download Receipt Button */}
          <div className="mt-6 text-center">
            <a
              href="/path-to-receipt.pdf" // Replace with dynamic URL for the receipt
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <FontAwesomeIcon icon={faFilePdf} className="mr-2" />
              View Receipt
            </a>
          </div>
        </div>

        {/* CTA to Dashboard */}
        <div className="mt-8">
          <Link href="/">
            <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
              Go to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
