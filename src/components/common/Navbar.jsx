import { getAuth, signOut } from "firebase/auth";
import { use } from "react";
import { Link, NavLink } from "react-router";
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

  const navlinkStyle = ({ isActive }) => {
    return isActive
      ? "hover:text-amber-500 underline text-blue-600 underline-offset-5 transition-all"
      : "hover:text-amber-500 transition-all";
  };

  const links = (
    <>
      <li>
        <NavLink className={navlinkStyle} to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className={navlinkStyle} to="/rooms">
          Rooms
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink className={navlinkStyle} to="/my-bookings">
            My Bookings
          </NavLink>
        </li>
      )}
      <li>
        <NavLink className={navlinkStyle} to="/about">
          About
        </NavLink>
      </li>
      <li>
        <NavLink className={navlinkStyle} to="/contact">
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-white text-gray-600 shadow-lg px-4 sticky top-0 z-10">
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
            className="menu menu-sm dropdown-content bg-white text-gray-800 rounded-box z-1 mt-3 w-52 p-2 shadow"
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
