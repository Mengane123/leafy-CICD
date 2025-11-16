import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegStar } from "react-icons/fa";

const PlantCard = ({ item }) => {
  return (
    <div className='px-4'>
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6'>
        {item.map((val) => (
          <div key={val.id} className='flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden'>
            <div className='relative w-full h-64 overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer'>
              <img src={val.image} alt={val.title} className='object-cover w-full h-full' />
              <span className='text-xs bg-[#fed02f] px-2 py-1 absolute top-2 left-2 rounded'>SALE</span>
            </div>
            <div className='flex flex-col items-center p-4'>
              <div className='font-semibold text-lg mb-2 text-center'>
                {val.title}
              </div>
              {/* <div className='flex items-center mb-2'>
                <FaRegStar className='text-yellow-500' />
                <span className='ml-1'>{val.rating}</span>
              </div> */}
              <div className='text-[#149253] text-lg font-semibold mb-2'>
                ₹ {val.price}
              </div>
              <Link to={`/SingleProduct/${val.id}`}>
                <button className='w-full uppercase px-4 py-2 bg-[#149253] text-white rounded hover:bg-[#127a4e] transition-colors'>
                  View Product
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlantCard;
