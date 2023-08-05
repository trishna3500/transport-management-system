import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
const EmployeeSignUp = () => {
  const { userSignUp } = useContext(AuthContext);
  const auth = getAuth();

  const navigate = useNavigate();

  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const fullName = form.fullName.value;

    const email = form.email.value;
    const password = form.password.value;
    const phoneNumber = form.phoneNumber.value;
    const employeeID = form.employeeID.value;
    console.log(fullName, email, password, phoneNumber);

    const teacherInfo = {
      name: fullName,
      email: email,
      role: "employee",
      employeeId: employeeID,
      phoneNumber: phoneNumber,
      password: password,
    };

    console.log(teacherInfo);

    fetch(`http://localhost:5000/api/v1/user`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(teacherInfo),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    userSignUp(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        updateProfile(auth.currentUser, {
          displayName: fullName,
        }).catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
    navigate("/");
    toast.success("Signed up successfully");
  };
  return (
    <div className="flex">
      <img
        src="https://hstu.ac.bd/img/home/slider/33.jpg"
        alt=""
        className="w-2/3 min-h-screen"
      />

      <main
        aria-label="Main"
        class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6"
      >
        <div class="max-w-xl lg:max-w-3xl">
          <h1 className="text-2xl">
            {" "}
            <span className="">Create</span>{" "}
            <span className=" font-bold text-violet-600 italic">Employee </span>
            account to our portal
          </h1>
          <form
            onSubmit={handleSignUp}
            action="#"
            class="mt-8 grid grid-cols-6 gap-6"
          >
            <div class="col-span-6">
              <label
                for="FirstName"
                class="block text-sm font-medium text-gray-700"
              >
                Full Name <span className="text-red-600 text-lg">*</span>
              </label>

              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
              <label
                for="phoneNumber"
                class="block text-sm font-medium text-gray-700"
              >
                Phone Number <span className="text-red-600 text-lg">*</span>
              </label>

              <input
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                required
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
              <label
                for="FirstName"
                class="block text-sm font-medium text-gray-700"
              >
                Employee Id
                <span className="text-red-600 text-lg">*</span>
              </label>

              <input
                type="number"
                id="employeeID"
                name="employeeID"
                required
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />

              <label
                for="Email"
                class="block text-sm font-medium text-gray-700 mt-2"
              >
                Email <span className="text-red-600 text-lg">*</span>
              </label>

              <input
                type="email"
                id="Email"
                name="email"
                required
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label
                for="Password"
                class="block text-sm font-medium text-gray-700"
              >
                Password <span className="text-red-600 text-lg">*</span>
              </label>

              <input
                type="password"
                id="Password"
                name="password"
                required
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
              <button class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                Create account
              </button>
            </div>
          </form>
          <div className="flex mt-5"></div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeSignUp;
