import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUser, FaClipboardList, FaCogs } from "react-icons/fa"; // Icons for dashboard sections
import SessionContext from '../context/Session'; // Import session context

const AdminDashboard = () => {
  const { sessionId, role, setSessionId } = useContext(SessionContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    if (sessionId === -1 || role !== 'admin') {
      navigate('/');
      return;
    }

    // const fetchAdminData = async () => {
    //   try {
    //     const response = await fetch('http://localhost:8080/admin', {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     });

    //     if (!response.ok) {
    //       throw new Error('Error fetching admin data');
    //     }

    //     const data = await response.json();
    //     // setAdminData(data);
    //     console.log({data});
    //   } catch (error) {
    //     console.error('Error:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchAdminData();
  }, [sessionId, role, navigate]);

  const handleLogout = () => {
    setSessionId(-1);
    navigate('/');
  };



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fefefe] p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-green-500 text-center mb-6">Admin Dashboard</h1>

        <div className="flex flex-wrap justify-between gap-6">
          <div className="w-full md:w-48 bg-[#eff8f2] p-4 rounded-lg shadow-md text-center">
            <FaRegUser className="text-4xl text-green-500 mb-4" />
            <h3 className="text-xl font-semibold">Customer Info </h3>
            <p>View and manage customer data</p>
            <Link to="/AdminDashboard/Userinfo" className="text-green-500 mt-4 inline-block">Go to Section</Link>
          </div>
          <div className="w-full md:w-48 bg-[#eff8f2] p-4 rounded-lg shadow-md text-center">
            <FaClipboardList className="text-4xl text-green-500 mb-4" />
            <h3 className="text-xl font-semibold">Services Section</h3>
            <p>View  booked services</p>
            <Link to="/AdminDashboard/Services" className="text-green-500 mt-4 inline-block">Go to Section</Link>
          </div>
          <div className="w-full md:w-48 bg-[#eff8f2] p-4 rounded-lg shadow-md text-center">
            <FaCogs className="text-4xl text-green-500 mb-4" />
            <h3 className="text-xl font-semibold">Contact info</h3>
            <p>View the contact data</p>
            <Link to="/AdminDashboard/Contact" className="text-green-500 mt-4 inline-block">Go to Section</Link>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
