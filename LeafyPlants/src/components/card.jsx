import React from 'react'

const Card = ({ image_url, title }) => {
  return (
    <div className='cursor-pointer flex flex-col space-y-3 items-center'>
      <div className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg overflow-hidden'>
        <img
          src={image_url}
          alt={title}
          className='w-full h-[500px] rounded-sm hover:scale-105 transition-all duration-300 ease-in-out'
        />
      </div>
      <h1 className='font-semibold text-base sm:text-lg md:text-xl'>{title}</h1>
    </div>
  )
}

export default Card;
