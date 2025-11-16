import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import AdminSessionContext from '../context/AdminSessionContext';

const Header = () => {
  const Adminsession = useContext(AdminSessionContext);

  useEffect(() => {
    // Initialize the carousel script if using vanilla JS
    const carousel = document.getElementById('default-carousel');
    const prevButton = carousel.querySelector('[data-carousel-prev]');
    const nextButton = carousel.querySelector('[data-carousel-next]');
    const slides = carousel.querySelectorAll('[data-carousel-item]');
    const indicators = carousel.querySelectorAll('[data-carousel-slide-to]');

    let currentIndex = 0;

    const updateCarousel = () => {
      slides.forEach((slide, index) => {
        slide.classList.toggle('hidden', index !== currentIndex);
        indicators[index].setAttribute('aria-current', index === currentIndex);
      });
    };

    prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    });

    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    });

    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
      });
    });

    updateCarousel();
  }, []);

  return (
    <header className='px-4 py-3 md:px-12 grid grid-cols-1 md:grid-cols-3 bg-[#0f4c36] text-white font-semibold'>
      <div className='hidden md:block'>
        <NavLink to='/Working' className='uppercase'>
          Vendor Register
        </NavLink>
      </div>
      <div className='hidden md:block text-center'>
        <NavLink to='/Working' className='uppercase'>
          Free Shipping above ₹499
        </NavLink>
      </div>
      <div className='hidden md:block text-right'>
        {Adminsession?.AdminSessionId >= 0 ? (
          <NavLink to='/admindashboard' className='uppercase'>
            Relevant Information
          </NavLink>
        ) : (
          <NavLink to='/admin' className='uppercase'>
            Relevant Information
          </NavLink>
        )}
      </div>

      {/* Carousel for mobile view */}
      <div id="default-carousel" className="relative w-full md:hidden" data-carousel="slide">
        {/* Carousel wrapper */}
        <div className="relative h-[56px] overflow-hidden rounded-lg md:h-96">
          {/* Item 1 */}
          <div className="duration-700 ease-in-out" data-carousel-item>
            <NavLink to='/Working' className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-center py-2 uppercase">
              Vendor Register
            </NavLink>
          </div>
          {/* Item 2 */}
          <div className="duration-700 ease-in-out hidden" data-carousel-item>
            <NavLink to='/Working' className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-center py-2 uppercase">
              Free Shipping above ₹499
            </NavLink>
          </div>
          {/* Item 3 */}
          <div className="duration-700 ease-in-out hidden" data-carousel-item>
            <NavLink to={Adminsession?.AdminSessionId >= 0 ? '/admindashboard' : '/admin'} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-center py-2 uppercase">
              Relevant Information
            </NavLink>
          </div>
        </div>
        {/* Slider indicators */}
        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 text-white left-1/2 space-x-3 rtl:space-x-reverse">
          <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
          <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
          <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
        </div>
        {/* Slider controls */}
        <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-transparent group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
            <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-transparent group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
            <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
