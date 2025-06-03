import Lottie from "lottie-react";
import { Helmet } from "react-helmet";
import { Link } from "react-router";
import Animation404 from "./../assets/Animation404.json";

const ErrorPage = () => {
  return (
    <>
      <Helmet>
        <title>HobbyHub | Error - 404 page not found </title>
        <meta name="description" content="404 page not found" />
      </Helmet>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
        <Lottie animationData={Animation404} style={{ width: "300px" }} />
        <h1 className="text-7xl font-bold text-gray-800">404</h1>
        <h2 className="text-2xl font-semibold mt-4 text-gray-700">
          Page Not Found
        </h2>
        <p className="text-gray-500 mt-2 text-center">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition"
        >
          Go Home
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
