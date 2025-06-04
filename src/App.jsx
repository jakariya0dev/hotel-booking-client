import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import AuthProvider from "./providers/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Outlet />
      <Footer />
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
