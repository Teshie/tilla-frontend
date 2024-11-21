import Link from "next/link";

export default function HealthInsuranceRegistrationSuccess() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      {/* Header */}
      <header className="sr-only bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-green-600">
            Tilla Health Insurance
          </a>
          <nav className="space-x-4">
            <a
              href="#benefits"
              className="text-gray-700 hover:text-green-600 transition"
            >
              Benefits
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-green-600 transition"
            >
              Contact Support
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16 text-center">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-green-600 mb-4">
            Registration Successful!
          </h1>
          <p className="text-gray-700 mb-6">
            Your registration for the Tilla Health insurance plan has been
            successfully completed.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/"
              className="px-6 py-3 bg-green-600 text-white font-medium rounded-md shadow hover:bg-green-700 transition"
            >
              Go to My Dashboard
            </Link>
            <Link
              href="$"
              className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-md shadow hover:bg-gray-200 transition"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </main>

      {/* Benefits Section */}
      <section
        id="benefits"
        className="sr-only container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-green-600 mb-2">
            Comprehensive Coverage
          </h2>
          <p className="text-gray-700">
            Enjoy full medical coverage including hospital stays, outpatient
            visits, and emergency care.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-green-600 mb-2">
            24/7 Support
          </h2>
          <p className="text-gray-700">
            Access our support team at any time for assistance with your
            insurance needs.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-green-600 mb-2">
            Wellness Programs
          </h2>
          <p className="text-gray-700">
            Take part in our wellness programs designed to help you stay
            healthy.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="sr-only main-color text-white py-6">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">
            &copy; 2024 Tilla Health Insurance. All rights reserved.
          </p>
          <div className="space-x-4">
            <a href="#" className="text-white hover:text-green-300 transition">
              Facebook
            </a>
            <a href="#" className="text-white hover:text-green-300 transition">
              Twitter
            </a>
            <a href="#" className="text-white hover:text-green-300 transition">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
