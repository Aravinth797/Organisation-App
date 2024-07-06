import axios from "axios";
import React, { useEffect, useState } from "react";

export const Organisation = () => {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    // Fetch organizations
    axios
      .get("http://localhost:5000/organizations")
      .then((response) => {
        setOrganizations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching organizations:", error);
      });
  }, []);
  return (
    <div>
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <caption class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Organisation
          </caption>
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Address
              </th>
              <th scope="col" class="px-6 py-3">
                Industry
              </th>
              <th scope="col" class="px-6 py-3">
                Website
              </th>
            </tr>
          </thead>
          <tbody>
            {organizations.map((item) => (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.name}
                </th>
                <td class="px-6 py-4">{item.address}</td>
                <td class="px-6 py-4">{item.industry}</td>
                <td class="px-6 py-4">{item.website}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
