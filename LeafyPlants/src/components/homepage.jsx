import React from 'react'
import Banner from './banner';
import Services from './services';
import BannerTwo from './banner-2';
import Cards from './cards';

const Homepage = () => {
  return (
    <div className='mt-12 sm:mt-14 md:mt-14 lg:mt-14 '>
      <div className='w-[1700px]'>

      <img className='lg:w-full sm:w-[600px] md:w-[855px] lg:h-[800px]' src="/Data2.png" alt="" />
      </div>
        <Banner />
        <Services />
        <BannerTwo />
        <Cards />
    </div>
  )
}

export default Homepage;