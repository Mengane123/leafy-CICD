import React from 'react';
import { Link } from 'react-router-dom';

const Service = () => {
  return (
    <>
      <div className='mt-10 sm:mt-12 md:mt-12 lg:mt-14'>
        <img 
          src="/services.png"
          alt="Service Banner"
          className="w-[1750px] h-[600px]"
          
        />
      </div>
      
      <div className="py-10 px-4 lg:px-24 ">
        {/* Garden Maintenance Section */}
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-16 mb-12">
          <div className="w-full lg:w-7/12">
            <img 
              src="https://www.ugaoo.com/cdn/shop/files/Garden-Maintenance-Banner.png?v=1666235265"
              className="w-full mb-8 lg:mb-16"
              alt="Garden Maintenance"
            />
          </div>
          <div className="w-full lg:w-5/12 text-center lg:text-left font-serif">
            <h1 className="text-2xl lg:text-4xl mb-4">Garden Maintenance</h1>
            <ol className="text-lg lg:text-xl mb-8">
              <li className="my-2">1. Single Day Maintenance Services</li>
              <li className="my-2">2. Flower Garden Setup</li>
            </ol>
            <div className="flex justify-center lg:justify-start">
              <Link to="/Forms">
                <button className="bg-green-800 flex items-center justify-center py-2 px-6 lg:px-10 text-white rounded-lg uppercase">
                  Fill Out Form
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Vertical Garden Section */}
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-16">
          <div className="w-full lg:w-5/12 text-center lg:text-left font-serif">
            <h1 className="text-2xl lg:text-4xl mb-4">Vertical Garden</h1>
            <ol className="text-lg lg:text-xl mb-8">
              <li className="my-2">1. New Installation in Bio-Wall System</li>
              <li className="my-2">2. Maintenance / Existing as well as New</li>
            </ol>
            <div className="flex justify-center lg:justify-start">
              <Link to="/Form">
                <button className="bg-green-800 flex items-center justify-center py-2 px-6 lg:px-10 text-white rounded-lg uppercase">
                  Fill Out Form
                </button>
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-7/12">
            <img 
              src="https://www.ugaoo.com/cdn/shop/files/Vertical-Garden-Banner.png?v=1666235479"
              className="w-full mb-8 lg:mb-16"
              alt="Vertical Garden"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
