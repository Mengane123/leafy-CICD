import React, { useContext, useEffect, useState } from 'react';
import { FaRegUser } from "react-icons/fa";
import { FiBox } from "react-icons/fi";
// import { MdOutlineLocationOn } from "react-icons/md";
import { Link } from 'react-router-dom';
import SessionContext from '../../context/Session';
import Avatar from 'react-avatar';
import { MdOutlineMiscellaneousServices } from "react-icons/md";
const Userpage = () => {
  const session = useContext(SessionContext);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/userdata?id=${session?.sessionId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Response:', data);
        setUserData(data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (session?.sessionId) {
      fetchUserData();
    }
  }, [session?.sessionId]);

  return (
    <>
      <div className='w-full h-full flex items-center justify-center mt-12 sm:mt-14 md:mt-14 lg:mt-14 '>
        <div className='w-10/12 h-80 my-12 rounded-md bg-[#eff8f2] flex'>
          <div className='flex items-center mx-10'>
            <Avatar className='rounded-full' facebookId="100008343750912" size="100" />
          </div>
          <div className='flex flex-col justify-center my-12 mx-14 text-6xl text-gray-500'>
            <h1>Hi, {userData?.FName} {userData?.LName}</h1>
            <p>I hope you love the plants</p>
          </div>
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='border-2 w-96 flex items-center px-10 text-xl m-10 h-20 border-gray-300'>
          <Link to={`/profile`} className='flex gap-10'>
            <FaRegUser className='text-4xl' /> Profile
          </Link>
        </div>
        <div className='border-2 w-96 flex items-center px-10 text-xl m-10 h-20 border-gray-300'>
          <Link to={'/User_orders'} className='flex gap-10'>
            <FiBox className='text-4xl' /> Order History
          </Link>
        </div>
        <div className='border-2 w-96 flex items-center px-10 text-xl m-10 h-20 border-gray-300'>
          <Link to={'/userservice'} className='flex gap-10'>
            {/* <MdOutlineLocationOn className='text-4xl' /> Address */}
            <MdOutlineMiscellaneousServices  className='text-4xl'/> Service History
          </Link>
        </div>
      </div>
      <Link
        to="/"
        className='uppercase text-xl my-10 gap-y-10 underline flex items-center justify-center'
        onClick={() => session?.setSessionId(-1)}
      >
        Log out
      </Link>
    </>
  );
};

export default Userpage;
