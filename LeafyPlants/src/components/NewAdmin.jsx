import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const NewAdmin = () => {
  const [values, setValues] = useState({
    adminName: "",
    adminEmail: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/newadmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        navigate("/admin");
      } else {
        console.error("Server error:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating admin:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col m-auto justify-center bg-[#fefefe] items-center border-2 w-96 h-3/5 my-14 text-xl rounded-xl font-sans">
        <h1 className="my-4 text-4xl text-green-500 font-bold">Admin Register</h1>

        {/* Uncomment if social media login options are needed */}
        {/* 
        <div className="flex gap-2 my-4">
          <div className="flex gap-1 bg-blue-500 py-5 px-5 rounded-lg text-white w-36 h-10 items-center justify-center cursor-pointer">
            <FaFacebookF /> Facebook
          </div>
          <div className="flex gap-1 bg-red-500 py-5 px-5 rounded-lg text-white w-36 h-10 items-center justify-center cursor-pointer">
            <FaGoogle /> Google
          </div>
        </div> 
        */}
        
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Admin Name"
            name="adminName"
            onChange={handleInput}
            className="w-80 h-12 py-3.5 my-2 px-4 rounded-md border-2 border-[#dadce0] text-base"
            autoComplete="off"
          />

          <input
            type="email"
            placeholder="Admin Email"
            name="adminEmail"
            onChange={handleInput}
            className="w-80 h-12 my-2 px-4 rounded-md border-2 border-[#dadce0] text-base"
            autoComplete="off"
          />
          
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleInput}
            className="w-80 h-12 my-2 px-4 rounded-md border-2 border-[#dadce0] text-base"
            autoComplete="off"
          />

          <button
            type="submit"
            className="uppercase bg-[#149253] rounded-md w-80 h-10 text-white my-4 cursor-pointer"
          >
            Create Account
          </button>
        </form>
        <div className="flex my-4 items-center text-base">
          <p>Already have an account?</p>
          <Link to="/Admin" className="text-[#129253]">
            Sign in
          </Link>
        </div>
      </div>
    </>
  );
};

export default NewAdmin;
