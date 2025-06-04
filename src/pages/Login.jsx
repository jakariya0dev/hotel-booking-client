import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { use, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import LoaderBar from "../components/common/LoaderBar.jsx";
import { app } from "./../../firebase.config.js";
import { AuthContext } from "./../providers/AuthProvider.jsx";

const Login = () => {
  const { user, setUser, isLoading, setIsLoading } = use(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user && location.pathname === "/login") {
      navigate(location.state ? location.state : "/");
    }
  }, [user, navigate, location.pathname, location.state]);

  const handleLogin = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log("User signed in successfully:", user);
        toast.success("Login successful!");
        setUser(user);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error signing in:", error);
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;

        // console.log("User signed in with Google", user);
        toast.success("Login successful!");
        setUser(user);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        // console.log("Error code:", error.code);
        toast.error(error.message);
      });
  };

  if (isLoading) {
    return <LoaderBar />;
  }

  return (
    <>
      <Helmet>
        <title>HorizonHotel | Login</title>
        <meta name="description" content="Login to HobbyHub" />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
        <div className="w-full max-w-md bg-base-300 shadow-xl rounded-xl p-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            Login to HorizonHotel
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label mb-1">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="label mb-1">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </form>

          <div className="divider">OR</div>

          <button
            className="btn btn-outline w-full flex items-center justify-center gap-2"
            onClick={handleGoogleLogin}
          >
            <FcGoogle className="text-xl" />
            Login with Google
          </button>

          <p className="text-sm text-center mt-4">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
