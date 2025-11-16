import React from 'react';
import { Link } from 'react-router-dom';
import { GoArrowUpRight } from "react-icons/go";

const nurseries = [
  {
    name: 'Rudra Nursery',
    address: 'At post Tambave, Bargevasti, Satara - Lonand Rd, Lonand, Maharashtra 415521',
    time: '10:30 am - 7:30 pm',
    contact: '9867581588',
    mapLink: 'https://maps.app.goo.gl/v64GTBTtGoTaqxK58',
  },
  {
    name: 'Trimurti Nursery',
    address: 'Shop No 1near, Nira - Satara Rd, Padegaon, Maharashtra 412102',
    time: '9:00 am - 10:00 pm',
    contact: '09730465591',
    mapLink: 'https://maps.app.goo.gl/Pj7REgV5hKtC7wRA9',
  },
  {
    name: 'Hindavi Agro',
    address: '6VVX+6W5, Pune - Satara Rd, Pune, Maharashtra 412205',
    time: '9:00 am - 10:00 pm',
    contact: '9645598053',
    mapLink: 'https://maps.app.goo.gl/JqKoAdKrqnATaJMM8',
  },
];

const Satara = () => {
  return (
    <div className='flex flex-col justify-center mx-4 md:mx-20 font-sans'>
      <div className='my-10 font-bold text-4xl md:text-6xl text-center'>Satara</div>
      
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

export default Satara;
