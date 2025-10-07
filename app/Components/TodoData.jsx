import React from "react";

const TodoData = ({title,description,id,complete,deleteTodo,mongoId,completeTodo}) => {
    
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
         {id+1}
      </th>
      <td className="px-6 py-4 capitalize">{title}</td>
      <td className="px-6 py-4 hidden sm:table-cell">{description}</td>
      <td className="px-6 py-4 hidden sm:table-cell ">{complete ? "Completed":"Pending"}</td>
      <td className="px-6 py-4 flex gap-3">
        <button onClick={()=>deleteTodo(mongoId)} className="bg-red-400 px-4 py-2 rounded cursor-pointer text-white">Delete</button>
        <button onClick={()=>completeTodo(mongoId)} className="bg-green-600 px-4 py-2 rounded cursor-pointer text-white">Done</button>
      </td>
    </tr>
  );
};

export default TodoData;
