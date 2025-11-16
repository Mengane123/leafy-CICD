import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormValidation from "./Validations/FormValidation";

const Forms = () => {
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
console.log(values)
fetch("http://localhost:8080/form", {
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
          className="border-2 my-8 rounded-md bg-white"
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
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
            <input
              className="w-96 h-12 rounded-lg border-none mx-10 outline-none text-lg"
              type="email"
              name="email"
              placeholder="Your email"
              autoComplete="off"
              onChange={handleInput}
            />
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
              <option value="select Location">Select Location</option>
              <option value="Pune">Pune</option>
              <option value="Satara">Satara</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Thane">Thane</option>
            </select>
          </div>

          <div className="flex flex-col my-10 border-2 rounded-xl mx-10">
            <label className="mx-10 mt-4 font-bold" htmlFor="garden_area">
              Garden Area:
            </label>
            <select
              className="w-96 h-12 rounded-lg border-none mx-10 outline-none text-lg"
              name="garden_area"
              onChange={handleInput}
            >
              <option value="Garden Area">Select Garden Area</option>
              <option value="200">200 square feet</option>
              <option value="500">500 square feet</option>
              <option value="1000">1000 square feet</option>
              <option value="1500">1500 square feet</option>
              <option value="2000">2000 square feet</option>
              <option value="3000">Greater than 2000 square feet</option>
            </select>
            {errors.garden_area && (
              <span className="text-red-500 text-sm">{errors.garden_area}</span>
            )}
          </div>

          <div className="flex flex-col my-10 border-2 rounded-xl mx-10">
            <label className="mx-10 mt-4 font-bold" htmlFor="price">
              Price:
            </label>
            <select
              className="w-96 h-12 rounded-lg border-none mx-10 outline-none text-lg"
              name="price"
              onChange={handleInput}
            >
              <option value="">Select price as per garden area</option>
              <option value="3000">₹3000 - 200 square feet</option>
              <option value="5000">₹5000 - 500 square feet</option>
              <option value="9000">₹9000 - 1000 square feet</option>
              <option value="14000">₹14000 - 1500 square feet</option>
              <option value="21000">₹21000 - 2000 square feet</option>
              <option value="30000">₹30000 - Greater than 2000 square feet</option>
            </select>
            {errors.price && (
              <span className="text-red-500 text-sm">{errors.price}</span>
            )}
          </div>

          <div className="flex flex-col my-10 border-2 rounded-xl mx-10 gap-4">
            <label htmlFor="garden_service" className="uppercase font-bold mx-10">
              Services Available
            </label>
            <div className="mx-10">
              <div>Single Day Maintenance Services</div>
              <div>Flower Garden Setup</div>
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
              <span className="text-red-500 text-sm">{errors.garden_service}</span>
            )}
          </div>

          <input
            type="submit"
            value="Submit"
            name="submit"
            className="uppercase bg-[#673ab7] text-white px-4 py-2 my-2 mx-10 cursor-pointer"
          />
        </form>
      </div>
    </>
  );
};

export default Forms;
