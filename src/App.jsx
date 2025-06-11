import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import AuthProvider from "./providers/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-white text-gray-800">
        <Navbar />
        <Outlet />
        <Footer />
        <ToastContainer />
      </div>
    </AuthProvider>
  );
}

export default App;
