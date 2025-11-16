import React from 'react';
import { Link } from 'react-router-dom';
import { GoArrowUpRight } from "react-icons/go";

const nurseries = [
  {
    name: 'Watermelon Nursery',
    address: '6X7H+84R, Ghodbunder Rd, Sainath Nagar, Thane West, Thane, Maharashtra 400601',
    time: '8:00 am - 8:30 pm',
    contact: '7972162633',
    mapLink: 'https://maps.app.goo.gl/YPeoJTN4tpqPiaU48',
  },
  {
    name: 'Rambaug Nursery',
    address: 'Rambaug, Rambaug Ln, Keshar Upvan, Thane West, Thane, Maharashtra 400606',
    time: '9:00 am - 10:00 pm',
    contact: '8920223423',
    mapLink: 'https://maps.app.goo.gl/9Fh6qg1p6bPiGbwJA',
  },
  {
    name: 'Hariyali Nursery Thane',
    address: '7X87+VG7, Sai Nagar, Anand Nagar, Thane West, Thane, Maharashtra 400615',
    time: '9:00 am - 9:00 pm',
    contact: '9863312588',
    mapLink: 'https://maps.app.goo.gl/3rA1iRtb6mZPcKTV8',
  },
  {
    name: 'Garden Nursery',
    address: '5XWF+PFX Garden nursery, Charai, Thane West, Thane, Maharashtra 400601',
    time: '9:00 am - 9:00 pm',
    contact: '9821254013',
    mapLink: 'https://maps.app.goo.gl/HDXWxaaEY8Xh5tap8',
  },
  {
    name: 'Plants Market',
    address: '6X7H+84W, Thane Station Rd, Sainath Nagar, Majiwada, Thane, Maharashtra 400601',
    time: '9:00 am - 9:00 pm',
    contact: '7387087643',
    mapLink: 'https://maps.app.goo.gl/NDAuLb1dP45447cd8',
  },
];

const Thane = () => {
  return (
    <div className='flex flex-col justify-center mx-4 md:mx-20 font-sans'>
      <div className='my-10 font-bold text-4xl md:text-6xl text-center'>Thane</div>
      
      {/* Grid Container for Nurseries */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        {nurseries.map((nursery, index) => (
          <div key={index} className='bg-[#eff8f2] p-6 rounded-lg shadow-md'>
            <h1 className='text-2xl mb-2 font-bold'>{nursery.name}</h1>
            <p className='mb-4'>
              <span className='font-bold'>Address:</span> {nursery.address}
            </p>
            <p className='my-4 uppercase'><span className='font-bold'>Time:</span> {nursery.time}</p>
            <p className='mb-4'><span className='font-bold'>Contact No:</span> {nursery.contact}</p>
            <div className='flex'>
              <Link target='_blank' to={nursery.mapLink} className='flex items-center text-[#249452] bg-[#ffd10a] border-2 py-2 px-4 rounded-lg'>
                Map <div className='ml-2'><GoArrowUpRight /></div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Thane;
