import React from 'react';
import { FaChevronDown } from 'react-icons/fa'; // Import the down arrow icon

const Buttons = ({ menuItems, filterItems, setItems, originalItems }) => {
  const [showFilters, setShowFilters] = React.useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="font-serif w-full flex flex-col justify-center items-center md:items-start">
      {/* Button for small devices */}
      <button
        className="gap-2 md:hidden text-xl font-semibold mb-4 border border-1 border-solid border-[#07432d]   px-10 hover:text-white py-2 rounded-md flex items-center hover:bg-[#07432d] transition-colors duration-500"
        onClick={toggleFilters}
      >
        Filter
        <FaChevronDown className="ml-2 hover:text-white text-black" />
      </button>

      {/* Filters for small devices */}
      {showFilters && (
        <div className="w-full md:hidden">
          {menuItems.map((val, index) => (
            <div
              key={index}
              className="flex items-center justify-between w-full my-4 text-base border-b border-gray-300 pb-2"
            >
              <button
                className="flex flex-grow text-xl text-left"
                onClick={() => filterItems(val)}
              >
                {val}
              </button>
              <span className="text-xl ml-2">+</span>
            </div>
          ))}
          <br />
          <button
            className="flex flex-grow underline underline-offset-2 text-base border-b border-gray-300 pb-2 text-left"
            onClick={() => setItems(originalItems)} // Reset to the original items
          >
            ALL
          </button>
        </div>
      )}

      {/* Filters for larger devices */}
      <div className="hidden md:flex flex-col items-start w-full">
        <h1 className="text-xl md:text-2xl font-semibold mb-4">Filter</h1>
        {menuItems.map((val, index) => (
          <div
            key={index}
            className="flex items-center justify-between w-96 md:w-52 my-4 text-base md:text-lg border-b border-gray-300 pb-2"
          >
            <button
              className="flex flex-grow text-xl text-left"
              onClick={() => filterItems(val)}
            >
              {val}
            </button>
            <span className="text-xl md:text-2xl ml-2">+</span>
          </div>
        ))}
        <br />
        <button
          className="flex flex-grow underline underline-offset-2 text-base md:text-lg border-b border-gray-300 pb-2 text-left"
          onClick={() => setItems(originalItems)} // Reset to the original items
        >
          ALL
        </button>
      </div>
    </div>
  );
};

export default Buttons;
