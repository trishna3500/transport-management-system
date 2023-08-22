import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

export default function LoginContainer() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState("");
  const [show, setShow] = useState(false);

  console.log(errorType);

  const { userSignIn } = useContext(AuthContext);

  async function onFormSubmit(e) {
    e.preventDefault();
    console.log(email, password);

    try {
      await userSignIn(email, password).then((result) => {
        const user = result.user;
        if (user?.email) {
          fetch(`http://localhost:5000/api/v1/users/user/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
              if (
                data?.data[0]?.role === "student" &&
                data?.data[0]?.isVerified === false
              ) {
                navigate("/user-verification");
                logout();
              } else if (
                data?.data[0]?.role === "student" &&
                data?.data[0]?.isVerified === true
              ) {
                navigate("/");
                toast.success("Signed in successfully");
              } else if (
                data?.data[0]?.role === "employee" &&
                data?.data[0]?.isVerified === true
              ) {
                navigate("/");
                toast.success("Signed in successfully");
              } else if (
                data?.data[0]?.role === "teacher" &&
                data?.data[0]?.isVerified === true
              ) {
                navigate("/");
                toast.success("Signed in successfully");
              } else if (data?.data[0]?.role === "admin") {
                navigate("/");
                toast.success("Signed in successfully");
              } else {
                navigate("/missing-user");
                logout();
              }
            });
        }
      });
      setShow(true);
      setError("Loading");
      setErrorType("success");
    } catch (error) {
      // console.log(error.message);
      setError("Failed to Login!");
      setErrorType("warning");
      setShow(true);
    }
  }

  return (
    <div
      className="bg-cover bg-center min-h-screen flex items-center justify-center"
      style={{
        backgroundImage:
          "url(https://i.ibb.co/KsB6qFL/pexels-juanjo-menta-17121257.jpg)",
      }}
    >
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-20">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              <span className="text-4xl text-violet-600 italic">Sign in</span>{" "}
              <span className="text-white"> to HSTU TMS</span>
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={onFormSubmit}>
            {show && <span className="text-red-400 text-2xl">{error}</span>}
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border mt-2 border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const FormWithBackground = () => {
  return (
    <div
      className="bg-cover bg-center min-h-screen flex items-center justify-center"
      style={{ backgroundImage: 'url("your-background-image.jpg")' }}
    ></div>
  );
};
