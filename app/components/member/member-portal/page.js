import Image from "next/image";
import familyImage from "../../../../public/assets/family.png";
export default function MemberPortal() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="main-color text-white">
        <div className="flex items-center justify-between px-8 py-4">
          <h1 className="text-lg font-bold">Tilla Family Choice</h1>
          <nav className="space-x-4">
            <a href="#" className="hover:underline">
              Register
            </a>
            <a href="#" className="hover:underline">
              Login
            </a>
            <a href="#" className="hover:underline">
              Help
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center p-8 bg-white">
        <div className="w-full max-w-6xl flex flex-col md:flex-row">
          {/* Text Content */}
          <div className="md:w-1/2 p-8 space-y-4">
            <h2 className="text-3xl font-bold text-blue-900">
              Welcome to the Tilla Family Choice Interoperability Member
              Portal
            </h2>
            <p className="text-gray-700">
              Tilla Family Choice is committed to having our members have ease
              of access when it comes to managing digital health care data.
            </p>
            <p className="text-gray-700">
              Before you can utilize a third-party application, you must
              authorize Tilla Family Choice to share data with it. You will
              need to register yourself, and then provide valid login
              credentials each time you want to view your data.
            </p>
          </div>

          {/* Image */}
          <div className="md:w-1/2 p-8">
            <Image
              src={familyImage}
              alt="Happy family"
              className="rounded-lg"
              width={500}
              height={300}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
