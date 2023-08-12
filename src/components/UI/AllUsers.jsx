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
      });
  };

  return (
    <div>
      <div class="overflow-x-auto mx-20">
        <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead class="ltr:text-left rtl:text-right">
            <tr>
              <th class=" text-start pl-5  py-2 font-medium text-gray-900">
                Name
              </th>
              <th class=" pl-5  py-2 font-medium text-gray-900">Role</th>
              <th class=" pl-5 py-2 font-medium text-gray-900">Phone Number</th>
              <th class=" pl-5 py-2 font-medium text-gray-900">ID</th>
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
                  {user?.studentId ? user?.studentId : user?.employeeId}
                </td>
                <td class="whitespace-nowrap px-4 py-2">
                  <button
                    onClick={() => handleVerifyUser(user._id)}
                    class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                  >
                    Verify User
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
