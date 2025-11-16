import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormValidation from "./Validations/FormValidation";

const Formes = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    location: "",
    garden_service: "",
    garden_area: "",
    price: "",
  });

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(FormValidation(values));
    console.log(values);

    // Replace axios with fetch API
    fetch("http://localhost:8080/forms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        navigate("/show");
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <>
      <div className="bg-[#f0ebf8] grid justify-center w-full items-center">
        <form
          id="save_service"
          className="border-2 my-8 rounded-md bg-white "
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl items-center mx-12 mt-12 uppercase font-medium">
            Leafy GARDEN SERVICE
          </h1>
          <div className="flex flex-col my-10 border-2 rounded-xl mx-10">
            <label className="mx-10 mt-4 font-bold" htmlFor="name">
              Name:
            </label>
            <br />
            <input
              type="text"
              className="w-96 h-12 rounded-lg border-none mx-10 outline-none text-lg"
              name="name"
              placeholder="Your answer"
              autoComplete="off"
              onChange={handleInput}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}
          </div>

          <div className="flex flex-col my-10 border-2 rounded-xl mx-10">
            <label className="mx-10 mt-4 font-bold" htmlFor="mobile">
              Mobile:
            </label>
            <br />
            <input
              type="text"
              className="w-96 h-12 rounded-lg border-none mx-10 outline-none text-lg"
              name="mobile"
              placeholder="Your Mobile"
              autoComplete="off"
              onChange={handleInput}
            />
            {errors.mobile && (
              <span className="text-red-500 text-sm">{errors.mobile}</span>
            )}
          </div>

          <div className="flex flex-col my-10 border-2 rounded-xl mx-10">
            <label className="mx-10 mt-4 font-bold" htmlFor="email">
              Email:
            </label>
            <br />
            <input
              className="w-96 h-12 rounded-lg border-none mx-10 outline-none text-lg"
              type="email"
              name="email"
              placeholder="Your email"
              autoComplete="off"
              onChange={handleInput}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>

          <div className="flex flex-col my-10 border-2 rounded-xl mx-10">
            <label className="mx-10 mt-4 font-bold" htmlFor="address">
              Address:
            </label>
            <br />
            <input
              className="w-96 h-12 rounded-lg border-none mx-10 outline-none text-lg"
              type="text"
              name="address"
              autoComplete="off"
              onChange={handleInput}
              placeholder="Your Address"
            />
            {errors.address && (
              <span className="text-red-500 text-sm">{errors.address}</span>
            )}
          </div>

          <div className="flex flex-col my-10 border-2 rounded-xl mx-10">
            <label className="mx-10 mt-4 font-bold" htmlFor="location">
              Location:
            </label>
            <select
              className="w-96 h-12 rounded-lg border-none mx-10 outline-none text-lg"
              name="location"
              onChange={handleInput}
            >
              <option value="">Select Location</option>
              <option value="Pune">Pune</option>
              <option value="Satara">Satara</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Thane">Thane</option>
            </select>
          </div>

          <div className="flex flex-col my-10 border-2 rounded-xl mx-10">
            <label className="mx-10 mt-4 font-bold" htmlFor="garden_area">
              Garden Area
            </label>
            <select
              className="w-96 h-12 rounded-lg border-none mx-10 outline-none text-lg"
              name="garden_area"
              onChange={handleInput}
            >
              <option value="">Select Garden Area and price</option>
              <option value="100">100 square feet</option>
              <option value="300">300 square feet</option>
            </select>
            {errors.garden_area && (
              <span className="text-red-500 text-sm">{errors.garden_area}</span>
            )}
          </div>

          <div className="flex flex-col my-10 border-2 rounded-xl mx-10">
            <label className="mx-10 mt-4 font-bold" htmlFor="price">
              Price on the Area
            </label>
            <select
              className="w-96 h-12 rounded-lg border-none mx-10 outline-none text-lg"
              name="price"
              onChange={handleInput}
            >
              <option value="">Select price related to area</option>
              <option value="3000">₹3000 - 100 ft</option>
              <option value="5000">₹5000 - 300 ft</option>
            </select>
            {errors.price && (
              <span className="text-red-500 text-sm">{errors.price}</span>
            )}
          </div>

          <div className="flex flex-col my-10 border-2 rounded-xl gap-4 mx-10">
            <label
              htmlFor="garden_service"
              className="uppercase font-bold mx-10"
            >
              Services Available
            </label>
            <div className="mx-10">
              <div>New Installation in Bio-Wall System</div>
              <div>Maintenance / Existing as well as New</div>
            </div>
            <input
              type="text"
              className="w-96 h-12 rounded-lg border-none mx-10 outline-none text-lg"
              name="garden_service"
              placeholder="Your answer"
              autoComplete="off"
              onChange={handleInput}
            />
            {errors.garden_service && (
              <span className="text-red-500 text-sm">
                {errors.garden_service}
              </span>
            )}
          </div>

          <input
            type="submit"
            value="submit"
            name="submit"
            className="uppercase bg-[#673ab7] text-white px-4 py-2 my-2 mx-10 cursor-pointer"
          />
        </form>
      </div>
    </>
  );
};

export default Formes;
