import React from 'react';

const BannerTwo = () => {
  return (
    <div className='py-5 bg-[#eff8f2] flex flex-col items-center justify-center gap-8 md:flex-row md:gap-14'>
      <h1 className='text-lg md:text-2xl text-center md:text-left'>
        Spend a day immersed in nature with<br />
        Leafy Farm Tours!!!<br />
        Registration is now open
      </h1>
      {/* Uncomment and adjust this button if needed */}
      {/* <button className='uppercase font-semibold bg-[#149253] text-white px-6 py-2 rounded-md md:px-8 md:py-3'>register now</button> */}
    </div>
  );
};

export default BannerTwo;
