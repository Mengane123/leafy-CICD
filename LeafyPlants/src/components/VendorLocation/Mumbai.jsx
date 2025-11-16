import React from 'react';
import { Link } from 'react-router-dom';
import { GoArrowUpRight } from "react-icons/go";

const Mumbai = () => {
  return (
    <>
      <div className='flex flex-col justify-center mx-4 md:mx-20 font-sans'>
        <div className='my-10 font-bold text-4xl md:text-6xl text-center'>Mumbai</div>
        
        {/* Grid Container for Nurseries */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
          {/* Toni Nursery */}
          <div className='bg-[#eff8f2] p-6 rounded-lg shadow-md'>
            <h1 className='text-2xl mb-2 font-bold'>Toni Nursery</h1>
            <p className='mb-4'>
              <span className='font-bold'>Address:</span> JQWR+34G, Old Mumbai - Pune Hwy, Kalbhor Nagar, MIDC, Chinchwad, Pimpri-Chinchwad, Maharashtra 411019
            </p>
            <p className='my-4 uppercase'><span className='font-bold'>Time:</span> 10:30 am - 7:30 pm</p>
            <p className='mb-4'><span className='font-bold'>Contact No:</span> 02114286008</p>
            <div className='flex '>
              <Link target='_blank' to={`https://maps.app.goo.gl/Y3co5uNuNqxE8FQy6`} className='flex items-center text-[#249452] bg-[#ffd10a] border-2 py-2 px-4 rounded-lg'>
                Map <div className='ml-2'><GoArrowUpRight /></div>
              </Link>
            </div>
          </div>
          
          {/* Vrukshvalli The Plants Mall */}
          <div className='bg-[#eff8f2] p-6 rounded-lg shadow-md'>
            <h1 className='text-2xl mb-2 font-bold'>Vrukshvalli The Plants Mall</h1>
            <p className='mb-4'>
              <span className='font-bold'>Address:</span> 54/19 Punavale, Mumbai, Road, Pune, Maharashtra 411033
            </p>
            <p className='my-4 uppercase'><span className='font-bold'>Time:</span> 9:00 am - 10:00 pm</p>
            <p className='mb-4'><span className='font-bold'>Contact No:</span> 8180001460</p>
            <div className='flex '>
              <Link target='_blank' to={`https://maps.app.goo.gl/TF1WrqwyY565tXSB9`} className='flex items-center text-[#249452] bg-[#ffd10a] border-2 py-2 px-4 rounded-lg'>
                Map <div className='ml-2'><GoArrowUpRight /></div>
              </Link>
            </div>
          </div>
          
          {/* Sunny Nursery */}
          <div className='bg-[#eff8f2] p-6 rounded-lg shadow-md'>
            <h1 className='text-2xl mb-2 font-bold'>Sunny Nursery</h1>
            <p className='mb-4'>
              <span className='font-bold'>Address:</span> 1, Orchard Ave, Panchkutir Ganesh Nagar, Powai, Mumbai, Maharashtra 400076
            </p>
            <p className='my-4 uppercase'><span className='font-bold'>Time:</span> 9:00 am - 9:00 pm</p>
            <p className='mb-4'><span className='font-bold'>Contact No:</span> 9665558053</p>
            <div className='flex '>
              <Link target='_blank' to={`https://maps.app.goo.gl/a1BUeVMT7cRPBy5DA`} className='flex items-center text-[#249452] bg-[#ffd10a] border-2 py-2 px-4 rounded-lg'>
                Map <div className='ml-2'><GoArrowUpRight /></div>
              </Link>
            </div>
          </div>
          
          {/* Plants World */}
          <div className='bg-[#eff8f2] p-6 rounded-lg shadow-md'>
            <h1 className='text-2xl mb-2 font-bold'>Plants World</h1>
            <p className='mb-4'>
              <span className='font-bold'>Address:</span> Banaji Fire Temple Compound, opp. Charni Road Station East, next to B J P C Institution, Charni Road East, Kranti Nagar, Thakurdwar, Girgaon, Mumbai, Maharashtra 400002
            </p>
            <p className='my-4 uppercase'><span className='font-bold'>Time:</span> 9:00 am - 9:00 pm</p>
            <p className='mb-4'><span className='font-bold'>Contact No:</span> 9820264013</p>
            <div className='flex'>
              <Link target='_blank' to={`https://maps.app.goo.gl/BpsVLcW21QB6teLL6`} className='flex items-center text-[#249452] bg-[#ffd10a] border-2 py-2 px-4 rounded-lg'>
                Map <div className='ml-2'><GoArrowUpRight /></div>
              </Link>
            </div>
          </div>
          
          {/* Lila Nursery */}
          <div className='bg-[#eff8f2] p-6 rounded-lg shadow-md'>
            <h1 className='text-2xl mb-2 font-bold'>Lila Nursery</h1>
            <p className='mb-4'>
              <span className='font-bold'>Address:</span> Kanti Kunj, Saraswati Rd, next to Punjab National Bank, GOI Staff Colony, Santacruz West, Mumbai, Maharashtra 400054
            </p>
            <p className='my-4 uppercase'><span className='font-bold'>Time:</span> 9:00 am - 9:00 pm</p>
            <p className='mb-4'><span className='font-bold'>Contact No:</span> 09930601299</p>
            <div className='flex '>
              <Link target='_blank' to={`https://maps.app.goo.gl/avLZ1bBq8wgL12gr9`} className='flex  text-[#249452] bg-[#ffd10a] border-2 py-2 px-4 rounded-lg'>
                Map <div className='ml-2'><GoArrowUpRight /></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mumbai;
