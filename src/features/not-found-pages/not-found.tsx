import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="w-screen flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <p className="text-2xl md:text-3xl font-semibold mt-4 text-gray-700">
        Page Not Found
      </p>
      <p className="text-gray-500 mt-2 text-center">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 rounded-xl bg-blue-800 font-medium shadow-md hover:bg-blue-700 transition"
      >
        <p className="text-white">Go Back Home</p>
      </Link>
    </div>
  );
}
