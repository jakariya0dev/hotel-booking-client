import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { use, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { app } from "../../firebase.config.js";
import LoaderBar from "../components/common/LoaderBar";
import { AuthContext } from "../providers/AuthProvider";

const auth = getAuth(app);

const Signup = () => {
  const { user, setUser, isLoading, setIsLoading } = use(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validatePassword = (password) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const isLong = password.length >= 6;
    return hasUpper && hasLower && isLong;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { name, email, photoURL, password } = formData;

    if (!validatePassword(password)) {
      toast.error(
        "Password must have an uppercase, a lowercase letter, and at least 6 characters."
      );
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL,
      });
      toast.success("Registration successful!");
      setFormData({ name: "", email: "", photoURL: "", password: "" });
      setUser(userCredential.user);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoaderBar />;
  }

  return (
    <>
      <Helmet>
        <title>HobbyHub | Signup</title>
        <meta name="description" content="Sign up to HobbyHub" />
      </Helmet>
      <section className="w-full min-h-screen p-4 bg-white text-gray-800">
        <div className="max-w-md mx-auto p-6 mt-12 shadow-2xl rounded-xl">
          <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label mb-1">Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="label mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="label mb-1">Photo URL</label>
              <input
                type="url"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="label mb-1">Password</label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>

            <button type="submit" className="btn btn-primary w-full mt-4">
              Register
            </button>

            <p className="text-center mt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Signup;
