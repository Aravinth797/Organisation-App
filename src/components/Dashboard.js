import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [allusers, setAllUsers] = useState([]);
  const [admin, setAdmin] = useState("");

  console.log("admin-->", admin)


  useEffect(() => {
    const storedUsername = localStorage.getItem("token");
    const decoded = jwtDecode(storedUsername);
    if (decoded) {
      setAdmin(decoded.role);
      if (admin == "user") {
        axios
          .get(`http://localhost:5000/users/${decoded.id}`)
          .then((response) => {
            setUsers(response.data);
          })
          .catch((error) => {
            console.error("Error fetching organizations:", error);
          });
      } else {
        axios
          .get(`http://localhost:5000/users`)
          .then((response) => {
            setAllUsers(response.data);
          })
          .catch((error) => {
            console.error("Error fetching organizations:", error);
          });
      }
    }
  }, [admin]);

  return (
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          Users
        </caption>
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              User name
            </th>
            <th scope="col" class="px-6 py-3">
              Email
            </th>
            <th scope="col" class="px-6 py-3">
              Role
            </th>
          </tr>
        </thead>
        <tbody>
          {/* {users.length > 0 && users?.map((item) => ( */}
          {/* console.log(item), */}
          {admin == "user" ? (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {users.username}
              </th>
              <td class="px-6 py-4">{users.email}</td>
              <td class="px-6 py-4">{users.role}</td>
            </tr>
          ) : (
            allusers?.map((item) => (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.username}
                </th>
                <td class="px-6 py-4">{item.email}</td>
                <td class="px-6 py-4">{item.role}</td>
              </tr>
            ))
          )}

          {/* ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
