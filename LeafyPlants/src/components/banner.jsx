import React from 'react';

const Banner = () => {
  return (
    <div className='py-5 bg-[#ffd02a] flex flex-col items-center justify-center gap-8 md:flex-row md:gap-14'>
      <h1 className='text-lg md:text-2xl text-center md:text-left'>
        Our very new shades of green.<br />Check out our latest sales and offers.
      </h1>
      {/* Uncomment this button and adjust styling as needed */}
      {/* <button className='uppercase font-semibold bg-[#149253] text-white px-6 py-2 rounded-md md:px-8 md:py-3'>view all offers</button> */}
    </div>
  );
};

export default Banner;
