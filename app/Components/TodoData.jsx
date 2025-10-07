import React from "react";

const TodoData = () => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        1
      </th>
      <td className="px-6 py-4">test1</td>
      <td className="px-6 py-4">This is text description</td>
      <td className="px-6 py-4">pending</td>
      <td className="px-6 py-4 flex gap-3">
        <button className="bg-red-400 px-4 py-2 rounded cursor-pointer text-white">Delete</button>
        <button className="bg-green-600 px-4 py-2 rounded cursor-pointer text-white">Done</button>
      </td>
    </tr>
  );
};

export default TodoData;
