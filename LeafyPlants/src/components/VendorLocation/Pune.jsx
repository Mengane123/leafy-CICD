import React from 'react';
import { Link } from 'react-router-dom';
import { GoArrowUpRight } from "react-icons/go";

const Pune = () => {
  return (
    <>
      <div className='flex flex-col justify-center mx-4 md:mx-20 font-sans'>
        <div className='my-10 font-bold text-4xl md:text-6xl text-center'>Pune</div>
        
        {/* Grid Container for Nurseries */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
          {/* Sanjay Nursery */}
          <div className='bg-[#eff8f2] p-6 rounded-lg shadow-md'>
            <h1 className='text-2xl mb-2 font-bold'>Sanjay Nursery</h1>
            <p className='mb-4'>
              <span className='font-bold'>Address:</span> Arihant, S No-877, Kadam Wak Wasti Pune Solapur Road, Loni Kalbhor, near Datta Mandir, Pune, Maharashtra 412201
            </p>
            <p className='my-4 uppercase'><span className='font-bold'>Time:</span> 8:00 am - 9:30 pm</p>
            <p className='mb-4'><span className='font-bold'>Contact No:</span> 9225337601</p>
            <div className='flex'>
              <Link target='_blank' to={`https://maps.app.goo.gl/s25ZQ8WrxediVkhN7`} className='flex items-center text-[#249452] bg-[#ffd10a] border-2 py-2 px-4 rounded-lg'>
                Map <div className='ml-2'><GoArrowUpRight /></div>
              </Link>
            </div>
          </div>
          
          {/* Manoj Nursery */}
          <div className='bg-[#eff8f2] p-6 rounded-lg shadow-md'>
            <h1 className='text-2xl mb-2 font-bold'>Manoj Nursery</h1>
            <p className='mb-4'>
              <span className='font-bold'>Address:</span> Airport Rd, White House Society, Mhada Colony, Yerawada, Pune, Maharashtra 411006
            </p>
            <p className='my-4 uppercase'><span className='font-bold'>Time:</span> 9:00 am - 10:00 pm</p>
            <p className='mb-4'><span className='font-bold'>Contact No:</span> 8920229625</p>
            <div className='flex'>
              <Link target='_blank' to={`https://maps.app.goo.gl/prhFGWJgVwsZFh7CA`} className='flex items-center text-[#249452] bg-[#ffd10a] border-2 py-2 px-4 rounded-lg'>
                Map <div className='ml-2'><GoArrowUpRight /></div>
              </Link>
            </div>
          </div>
          
          {/* Garden Easy Nursery */}
          <div className='bg-[#eff8f2] p-6 rounded-lg shadow-md'>
            <h1 className='text-2xl mb-2 font-bold'>Garden Easy Nursery</h1>
            <p className='mb-4'>
              <span className='font-bold'>Address:</span> Shop Number 11, opposite WING-C, Kedari Nagar, Wanowrie, Pune, Maharashtra 411040
            </p>
            <p className='my-4 uppercase'><span className='font-bold'>Time:</span> 9:00 am - 9:00 pm</p>
            <p className='mb-4'><span className='font-bold'>Contact No:</span> 09623302588</p>
            <div className='flex'>
              <Link target='_blank' to={`https://maps.app.goo.gl/pFqEeiKhni1PRfRo8`} className='flex items-center text-[#249452] bg-[#ffd10a] border-2 py-2 px-4 rounded-lg'>
                Map <div className='ml-2'><GoArrowUpRight /></div>
              </Link>
            </div>
          </div>
          
          {/* Sai Exotic Nursery */}
          <div className='bg-[#eff8f2] p-6 rounded-lg shadow-md'>
            <h1 className='text-2xl mb-2 font-bold'>Sai Exotic Nursery</h1>
            <p className='mb-4'>
              <span className='font-bold'>Address:</span> Waghmare chowk, Survey no.167 Mumbai-Bangalore highway, near Sayaji Hotel, Wakad, Pune, Maharashtra 411057
            </p>
            <p className='my-4 uppercase'><span className='font-bold'>Time:</span> 9:00 am - 9:00 pm</p>
            <p className='mb-4'><span className='font-bold'>Contact No:</span> 9820254013</p>
            <div className='flex'>
              <Link target='_blank' to={`https://maps.app.goo.gl/QyrRd6X1aqxPbKoT6`} className='flex items-center text-[#249452] bg-[#ffd10a] border-2 py-2 px-4 rounded-lg'>
                Map <div className='ml-2'><GoArrowUpRight /></div>
              </Link>
            </div>
          </div>
          
          {/* Rahul Nursery */}
          <div className='bg-[#eff8f2] p-6 rounded-lg shadow-md'>
            <h1 className='text-2xl mb-2 font-bold'>Rahul Nursery</h1>
            <p className='mb-4'>
              <span className='font-bold'>Address:</span> Aundh DP Road, chowk, Baner, tamanaya, Pune, Maharashtra 411045
            </p>
            <p className='my-4 uppercase'><span className='font-bold'>Time:</span> 9:00 am - 9:00 pm</p>
            <p className='mb-4'><span className='font-bold'>Contact No:</span> 06202790455</p>
            <div className='flex'>
              <Link target='_blank' to={`https://maps.app.goo.gl/wxTAeKrsUsBeM4pn9`} className='flex items-center text-[#249452] bg-[#ffd10a] border-2 py-2 px-4 rounded-lg'>
                Map <div className='ml-2'><GoArrowUpRight /></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pune;
