"use client";
import React, { useEffect, useState } from "react";
import TodoData from "./Components/TodoData";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Page = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [todos,setTodos] = useState([]);

  const fetchTodos = async()=>{
    const response = await axios.get("/api");
    console.log(response.data);
    setTodos(response.data.todos);
  }
  /* delete todos */
  const deleteTodo =async(mongoId)=>{
      const response = await axios.delete('/api',{
        params:{mongoId:mongoId}
      });
      
      toast.success(response.data.message);
      fetchTodos();
      
  }
  /* complete todos */
    const completeTodo =async(mongoId)=>{
      const response = await axios.put('/api',{},{params:{mongoId:mongoId}});
      
      toast.success(response.data.message);
      fetchTodos();
      
  }
  // handle input changes
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      /* api call here to send data to backend */
      const response = await axios.post("/api", formData);
      toast.success(response.data.message);
      setFormData({
        title: "",
        description: "",
      });
      fetchTodos();
    } catch (error) {
      toast.error("Error");
    }
  };
  useEffect(()=>{
    fetchTodos()
  },[])
  return (
    <div className="container mx-auto">
      <ToastContainer theme="dark" />
      {/* form */}
        <h1 className="text-xl w-28 capitalize mx-auto font-medium text-blue-900 border-b text-center my-5">
          Todo app
        </h1>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:max-w-2/4  border border-gray-200 p-5 mt-5 rounded mx-auto"
      >

        <div className="flex flex-col gap-5">
          <input
            name="title"
            className="border-b border-gray-500 py-2 outline-0"
            type="text"
            onChange={onChangeHandler}
            placeholder="Title"
            required
            value={formData.title}
          />
          <textarea
            className="border border-gray-200 rounded-2xl p-5  ouline-none focus:outline-0"
            name="description"
            onChange={onChangeHandler}
            required
            placeholder="description"
            value={formData.description}
          ></textarea>
          <div className="mx-auto">
            <button
              type="submit"
              className="px-6 py-1  bg-blue-700 text-white hover:bg-blue-400 rounded-md my-2 cursor-pointer"
            >
              Add Todo
            </button>
          </div>
        </div>
      </form>
      {/* table data */}
      <div>
        <div className="relative overflow-x-auto sm:max-w-[60%] mx-auto mt-10">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  id
                </th>
                <th scope="col" className="px-6 py-3">
                  title
                </th>
                <th scope="col" className="px-6 py-3">
                  description
                </th>
                <th scope="col" className="px-6 py-3">
                  status and time
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {
                todos.map((todos,index)=>(
                  <TodoData completeTodo={completeTodo} mongoId ={todos._id} deleteTodo ={deleteTodo} key={index} id={index} title={todos.title} createdAt={todos.createdAt} description ={todos.description} complete = {todos.isCompleted}  />
                ))
              }
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
