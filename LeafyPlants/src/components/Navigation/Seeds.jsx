import React, { useState } from "react";
import PlantCard from "../PlantCard";
import { Link } from "react-router-dom";
import Buttons from "../Buttons";
import data from "../Data/data";

const Seeds = () => {
  const [items, setItems] = useState(data);
  const menuItems = [...new Set(data.map((val) => val.category))];

  const filterItems = (cat) => {
    const newItems = data.filter((newval) => newval.category === cat);
    setItems(newItems);
  };

  return (
    <>
      <div className=" mt-10 sm:mt-12 md:mt-12 lg:mt-14 ">
        {/* <span className="py-14 px-12 text-lg text-green-700">
          <Link className="mx-2" to={"/"}>
            Home
          </Link>
          /Seeds
        </span> */}
        <img
          src="https://www.ugaoo.com/cdn/shop/collections/Sub_Category_Banners__Trees___Grass_Desk.jpg?v=1689935474&width=1500"
          alt="Seeds Banner"
          className="w-full h-auto"
        />
      </div>
      <div className="px-4 md:px-12 py-5">
        <h1 className="text-3xl md:text-4xl font-semibold mb-8">Seeds</h1>
        <p className="text-gray-600 text-lg">
          With high-yielding varieties of vegetable and fruit seeds, flower
          seeds with high germination rates, and exotic flower bulbs, Ugaoo
          guarantees only the best organic seeds for you and your garden!
          Elevate your home garden with our carefully crafted selection of
          seeds.
        </p>

        <div className="flex flex-col md:flex-row gap-8 my-8">
          <div id="filter" className="w-full md:w-80">
            <Buttons
              menuItems={menuItems}
              filterItems={filterItems}
              setItems={setItems}
            />
          </div>

          <div
            className="w-full overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 200px)" }}
          >
            <PlantCard item={items} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Seeds;
