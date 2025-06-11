import { getAuth, signOut } from "firebase/auth";
import { use } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import { AuthContext } from "../../providers/AuthProvider";
import { app } from "./../../../firebase.config.js";
import LoaderDotted from "./LoaderDotted";

export default function Navbar() {
  const { user, setUser, isLoading } = use(AuthContext);

  const handleLogout = () => {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        toast.success("Logout successful");
        setUser(null);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const links = (
    <>
      <li>
        <Link
          className="hover:text-amber-500 hover:underline underline-offset-4 transition-all"
          to="/"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          className="hover:text-amber-500 hover:underline underline-offset-4 transition-all"
          to="/rooms"
        >
          Rooms
        </Link>
      </li>
      <li>
        <Link
          className="hover:text-amber-500 hover:underline underline-offset-4 transition-all"
          to="/my-bookings"
        >
          My Bookings
        </Link>
      </li>
      <li>
        <Link
          className="hover:text-amber-500 hover:underline underline-offset-4 transition-all"
          to="/about"
        >
          About
        </Link>
      </li>
      <li>
        <Link
          className="hover:text-amber-500 hover:underline underline-offset-4 transition-all"
          to="/contact"
        >
          Contact
        </Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-white text-gray-600 shadow-sm px-4">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link
          to="/"
          className="text-xl text-amber-500 font-bold transition-all"
        >
          Sunset<span className="text-gray-600">Bay</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-semibold">{links}</ul>
      </div>
      <div className="navbar-end">
        {isLoading ? (
          <LoaderDotted />
        ) : user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={user.photoURL}
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={user.displayName}
                />
                <Tooltip id="my-tooltip" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-2 p-2 shadow-lg bg-gray-200 rounded-box w-52"
            >
              <li>
                <button
                  className="btn btn-ghost text-lg"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn bg-black text-white hover:shadow-lg transition-all"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
