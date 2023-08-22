import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState();
  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/all-users`)
      .then((res) => res.json())
      .then((data) => setAllUsers(data.data));
  }, []);
  console.log(allUsers);

  const handleVerifyUser = (id) => {
    const updatedInfo = {
      isVerified: true,
    };
    fetch(`http://localhost:5000/api/v1/verify-user/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("User Verified Successfully");
        window.location.reload();
      });
  };

  const handleDeleteUser = (id) => {
    fetch(`http://localhost:5000/api/v1/user/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("User has been deleted");
        window.location.reload();
      });
  };

  return (
    <div>
      <h1 className="text-center text-4xl italic font-semibold my-10">
        All Users
      </h1>
      <div class="overflow-x-auto mx-20">
        <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead class="">
            <tr>
              <th class=" text-start  font-medium text-gray-900">Name</th>
              <th class=" text-start font-medium text-gray-900">Role</th>
              <th class=" text-start font-medium text-gray-900">
                Phone Number
              </th>
              <th class=" text-start font-medium text-gray-900">ID</th>
              <th class=" text-start font-medium text-gray-900">Status</th>
              <th class=" text-start font-medium text-gray-900">Delete</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200">
            {allUsers?.map((user) => (
              <tr>
                <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {user.name}
                </td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                  {user.role}
                </td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                  {user.phoneNumber}
                </td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                  {user?.studentID
                    ? user?.studentID
                    : user?.teacherId
                    ? user?.teacherId
                    : user?.employeeId}
                </td>
                <td class="whitespace-nowrap px-4 py-2">
                  <button
                    onClick={() => handleVerifyUser(user._id)}
                    class={
                      user?.isVerified === true
                        ? "bg-green-400 px-3 py-2 rounded-full text-white"
                        : "bg-yellow-300 px-3 py-2  rounded-full"
                    }
                  >
                    {user?.isVerified === true ? "Verified" : "Pending"}
                  </button>
                </td>
                <td>
                  <button
                    className="bg-red-500 px-4 text-white py-2 rounded-md"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
