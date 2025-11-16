import React from 'react';
import Card from './card';
import { Link } from 'react-router-dom';

const Cards = () => {
  return (
    <div className='py-5 px-4 sm:px-8'>
      <h1 className='text-3xl text-center md:text-left mb-5 font-medium'>Visit Our</h1>
      <div className='grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4'>
      
          <Card
            image_url={'/Plant_image.jpg'}
            title={'Plants'}
          />

     
          <Card
            image_url={'/Plant_tools.jpg'}
            title={'Gradening Tools'}
          />

       
          <Card
            image_url={'/Plant_care.jpg'}
            title={'Plant Care'}
          />
  
      
          <Card
            image_url={'/Garden.jpg'}
            title={'Services'}
          />
  
      </div>
    </div>
  );
}

export default Cards;
