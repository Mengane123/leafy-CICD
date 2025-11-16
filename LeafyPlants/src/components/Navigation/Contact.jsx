import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ImFacebook2 } from "react-icons/im";
import { FaInstagram } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { PiTelegramLogo } from "react-icons/pi";
import ContactValidation from "../ContactValidation";

const Contact = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    number: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const validationErrors = ContactValidation(values);
    setErrors(validationErrors);

    if (Object.values(validationErrors).every((err) => err === "")) {
      try {
        const response = await fetch("http://localhost:8080/Contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          navigate("/Show");
        } else {
          console.error("Server error:", response.status);
        }
      } catch (err) {
        console.error("Network error:", err);
      }
    }
  };

  return (
    <>
      <div className="w-full min-h-[200px] max-h-[300px]">
        <img
          src="/i1.png"
          alt="Contact Us Banner"
          className="w-full h-[570px] object-cover"
        />
      </div>
      <div className="flex flex-col md:flex-row mx-4 md:mx-14 my-24 w-full">
        {/* Contact Form */}
        <div className="w-full md:mt-56 md:w-2/4 mb-12 md:mb-0">
          <h2 className="text-3xl mb-8">Contact With Us</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-5">
              <input
                type="text"
                placeholder="Name"
                name="username"
                onChange={handleInput}
                className="border-2 w-full h-12 p-5"
                autoComplete="off"
              />
              {errors.username && (
                <span className="text-red-500 text-sm">{errors.username}</span>
              )}
            </div>
            <div className="mb-5">
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleInput}
                className="border-2 w-full h-12 p-5"
                autoComplete="off"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>
            <div className="mb-5">
              <input
                type="tel"
                placeholder="Number"
                name="number"
                onChange={handleInput}
                className="border-2 w-full h-12 p-5"
                autoComplete="off"
              />
              {errors.number && (
                <span className="text-red-500 text-sm">{errors.number}</span>
              )}
            </div>
            <div className="mb-5">
              <textarea
                id="message"
                placeholder="Message"
                name="message"
                rows="5"
                onChange={handleInput}
                className="border-2 w-full h-32 p-5"
              ></textarea>
              {errors.message && (
                <span className="text-red-500 text-sm">{errors.message}</span>
              )}
            </div>
            <button
              type="submit"
              className="bg-[#149253] rounded px-12 py-4 font-semibold uppercase text-white"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="w-full md:w-2/4 md:mt-56 md:ml-56 text-slate-700">
          <h2 className="text-2xl mb-2">Name</h2>
          <p className="mb-8">LeafyPlants </p>
          <h2 className="text-2xl mb-2">Email</h2>
          <p className="mb-8">leafyPlantssupport12@gmail.com</p>
          <h2 className="text-2xl mb-2">Follow Us</h2>
          <div className="flex w-full mb-8">
            <Link
              to="https://www.facebook.com/"
              className="w-10 h-10 flex items-center justify-center text-xl hover:bg-black hover:text-white rounded-full transition-colors"
            >
              <ImFacebook2 />
            </Link>
            <Link
              to="https://web.telegram.org/k/"
              className="w-10 h-10 flex items-center justify-center text-xl hover:bg-black hover:text-white rounded-full transition-colors"
            >
              <PiTelegramLogo />
            </Link>
            <Link
              to="https://www.instagram.com/"
              className="w-10 h-10 flex items-center justify-center text-xl hover:bg-black hover:text-white rounded-full transition-colors"
            >
              <FaInstagram />
            </Link>
            <Link
              to="https://maps.app.goo.gl/D45LLJPxNRXZcHgZ8"
              className="w-10 h-10 flex items-center justify-center text-xl hover:bg-black hover:text-white rounded-full transition-colors"
            >
              <FiMapPin />
            </Link>
          </div>
        </div>
      </div>

      {/* Google Maps Embed */}
    </>
  );
};

export default Contact;
