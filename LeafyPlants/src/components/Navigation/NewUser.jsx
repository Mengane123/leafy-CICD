import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import validation from "../validation";

const NewUser = () => {
  const [values, setValues] = useState({
    FName: "",
    LName: "",
    Email: "",
    Password: "",
  });

  const [errors, setErrors] = useState({});
  const [emailExists, setEmailExists] = useState(false);
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const checkEmailExists = async (Email) => {
    try {
      const response = await fetch("http://localhost:8080/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Email }),
      });
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const emailExists = await checkEmailExists(values.Email);
      if (emailExists) {
        setEmailExists(true);
        return; // Stop the form submission if email already exists
      } else {
        setEmailExists(false);
      }

      try {
        const response = await fetch("http://localhost:8080/NewUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result);
          navigate("/Account");
        } else {
          console.error("Server error:", response.statusText);
        }
      } catch (error) {
        console.error("Error creating user:", error);
      }
    }
  };

  return (
    <div className="flex flex-col m-auto justify-center bg-[#fefefe] items-center border-2 w-96 h-3/5 my-14 text-xl rounded-xl font-sans">
      <h1 className="my-4 text-4xl text-green-500 font-bold">Leafy</h1>
      <p>Welcome back! Sign in with</p>
      <div className="font-thin to-transparent">or use your email</div>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First name"
          name="FName"
          onChange={handleInput}
          className="w-80 h-12 py-3.5 my-2 px-4 rounded-md border-2 border-[#dadce0] text-base"
          autoComplete="Fname-name"
        />
        {errors.FName && (
          <span key="Fname-error" className="text-red-500 text-sm">
            {errors.FName}
          </span>
        )}
        <input
          type="text"
          placeholder="Last name"
          name="LName"
          onChange={handleInput}
          className="w-80 h-12 my-2 px-4 rounded-md border-2 border-[#dadce0] text-base"
          autoComplete="Last-name"
        />
        {errors.LName && (
          <span key="lname-error" className="text-red-500 text-sm">
            {errors.LName}
          </span>
        )}
        <input
          type="email"
          placeholder="Email"
          name="Email"
          onChange={handleInput}
          className="w-80 h-12 my-2 px-4 rounded-md border-2 border-[#dadce0] text-base"
          autoComplete="Email"
        />
        {errors.Email && (
          <span key="email-error" className="text-red-500 text-sm">
            {errors.Email}
          </span>
        )}
        <input
          type="password"
          placeholder="Password"
          name="Password"
          onChange={handleInput}
          className="w-80 h-12 my-2 px-4 rounded-md border-2 border-[#dadce0] text-base"
          autoComplete="new-password"
        />
        {errors.Password && (
          <span key="password-error" className="text-red-500 text-sm">
            {errors.Password}
          </span>
        )}
        {emailExists && (
          <span className="text-red-500 text-sm mb-2">
            Email already exists. Please use a different email.
          </span>
        )}
        <button
          type="submit"
          className="uppercase bg-[#149253] rounded-md w-80 h-10 text-white my-4 cursor-pointer"
        >
          Create Account
        </button>
      </form>
      <div className="flex my-4 items-center text-base">
        <p>Already have an account?</p>
        <Link to="/Account" className="text-[#129253]">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default NewUser;
