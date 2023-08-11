import React, { useEffect, useState } from "react";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState();
  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/all-users`)
      .then((res) => res.json())
      .then((data) => setAllUsers(data.data));
  }, []);
  console.log(allUsers);
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
                  <a
                    href="#"
                    class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
            <tr>
              <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                John Doe
              </td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                24/05/1995
              </td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                Web Developer
              </td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                $120,000
              </td>
              <td class="whitespace-nowrap px-4 py-2">
                <a
                  href="#"
                  class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                >
                  View
                </a>
              </td>
            </tr>

            <tr>
              <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Jane Doe
              </td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                04/11/1980
              </td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                Web Designer
              </td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                $100,000
              </td>
              <td class="whitespace-nowrap px-4 py-2">
                <a
                  href="#"
                  class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                >
                  View
                </a>
              </td>
            </tr>

            <tr>
              <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Gary Barlow
              </td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                24/05/1995
              </td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">Singer</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">$20,000</td>
              <td class="whitespace-nowrap px-4 py-2">
                <a
                  href="#"
                  class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                >
                  View
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
