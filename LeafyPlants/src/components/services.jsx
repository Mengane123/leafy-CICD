import React, { useState } from 'react';

const Services = () => {
  const data = [
    {
      image: "/Plant_image.jpg",
      title: "Bestsellers"
    },
    {
      image: "https://www.ugaoo.com/cdn/shop/files/4._XL_Plants_35a5fe2d-ef9a-4505-98bd-11256c8987e3.png?v=1737519048&width=360",
      title: "Easy to Care"
    },
    {
      image: "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg",
      title: "XL Plants"
    },
    {
      image: "/pot.jpg",
      title: "Different Pots"
    },
    {
      image: "/air_puri.jpg",
      title: "Air Purifiers"
    },
    {
      image: "/Wall.jpg",
      title: "Gardening Services"
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  return (
    <div className='relative py-8 px-4 sm:px-8 lg:px-16'>
      {/* Carousel Slider for Mobile View */}
      <div className='block md:hidden relative overflow-hidden rounded-lg'>
        <div className='flex transition-transform duration-500' style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {data.map((item, index) => (
            <div key={index} className='flex-shrink-0 w-full'>
              <div className='text-center space-y-3'>
                <div className='outline outline-[#e3b4d5] outline-offset-4 rounded-full overflow-hidden w-[96px] h-[96px] mx-auto'>
                  <img src={item.image} alt={item.title} className='w-full h-full object-cover' />
                </div>
                <h1 className='text-sm'>{item.title}</h1>
              </div>
            </div>
          ))}
        </div>
        {/* Slider controls */}
        <button onClick={prevSlide} className='absolute top-1/2 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group -translate-y-1/2'>
          <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60'>
            <svg className='w-4 h-4 text-white dark:text-gray-800' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 6 10'>
              <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 1 1 5l4 4'/>
            </svg>
            <span className='sr-only'>Previous</span>
          </span>
        </button>
        <button onClick={nextSlide} className='absolute top-1/2 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group -translate-y-1/2'>
          <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60'>
            <svg className='w-4 h-4 text-white dark:text-gray-800' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 6 10'>
              <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 9 4-4-4-4'/>
            </svg>
            <span className='sr-only'>Next</span>
          </span>
        </button>
      </div>

      {/* Grid Layout for Larger Screens */}
      <div className='hidden md:grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
        {data.map((item, index) => (
          <div key={index} className='text-center space-y-3'>
            <div className='outline outline-[#e3b4d5] outline-offset-4 rounded-full overflow-hidden w-[96px] h-[96px] mx-auto'>
              <img src={item.image} alt={item.title} className='w-full h-full object-cover' />
            </div>
            <h1 className='text-sm'>{item.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
