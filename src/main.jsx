import "leaflet/dist/leaflet.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.jsx";
import "./index.css";
import About from "./pages/About.jsx";
import AllRooms from "./pages/AllRooms.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import RoomDetails from "./pages/RoomDetails.jsx";
import Signup from "./pages/Signup.jsx";
import PrivateRoute from "./providers/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/rooms",
        element: <AllRooms />,
        loader: () => fetch(`${import.meta.env.VITE_BASE_URL}/rooms`),
      },
      {
        path: "room/:id",
        element: <RoomDetails />,
        loader: async ({ params }) =>
          fetch(`${import.meta.env.VITE_BASE_URL}/room/${params.id}`),
      },
      {
        path: "/my-bookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
