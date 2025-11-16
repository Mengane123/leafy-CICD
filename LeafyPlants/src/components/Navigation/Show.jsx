import React from 'react';
import { Link } from 'react-router-dom';

const Show = () => {
  return (
    <div className='flex items-center justify-center min-h-screen p-4 bg-gray-100'>
      <div className='text-center bg-[#eff8f2] w-full max-w-md h-80 md:h-96 rounded-lg p-6'>
        <h1 className='text-4xl md:text-6xl text-green-500 font-serif mt-6 md:mt-12'>
          Thank You
        </h1>
        <p className='text-xl md:text-2xl text-[#ffd02a] mt-4'>
          I will give you response ASAP
        </p>
        <Link 
          to='/'
          className='block text-lg md:text-xl text-red-500 underline font-serif mt-6'
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default Show;
