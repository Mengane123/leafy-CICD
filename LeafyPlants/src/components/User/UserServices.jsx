import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SessionContext from '../../context/Session';

const UserServices = () => {
  const session = useContext(SessionContext);
  const [userData, setUserData] = useState(null);
  const [serviceDetails, setServiceDetails] = useState([]);
  const [serviceDetail, setServiceDetail] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/userdata', {
          params: { id: session?.sessionId },
        });
        setUserData(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (session?.sessionId) {
      fetchUserData();
    }
  }, [session?.sessionId]);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      if (userData?.Email) {
        try {
            const response = await axios.get(`http://localhost:8080/forms/${encodeURIComponent(userData.Email)}`);


          console.log('Data Response:', response.data);
          setServiceDetails(response.data); // Assuming response.data is an array
        } catch (error) {
          console.error('Error fetching service details:', error);
        }
      }
    };
    const fetchServiceDetail = async () => {
      if (userData?.Email) {
        try {
            const response = await axios.get(`http://localhost:8080/form/${encodeURIComponent(userData.Email)}`);


          console.log('Data Response:', response.data);
          setServiceDetail(response.data); // Assuming response.data is an array
        } catch (error) {
          console.error('Error fetching service details:', error);
        }
      }
    };

    if (userData?.Email) {
      fetchServiceDetails();
      fetchServiceDetail();
    }
  }, [userData?.Email]);

  return (
    <div className='mt-14 min-h-8 max-h-[50rem] h-[1200px]'>
      {userData ? (
        <div className='my-20'>
          {serviceDetails.length > 0 ? (
            <div>
              <div className='flex justify-center my-10 text-4xl text-green-800 font-bold'>
                <h3>Vertical Garden Service </h3>
              </div>
              <table className="table-auto border-collapse border border-gray-300 w-full">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Service ID</th>
                    <th className="border px-4 py-2">Phone</th>
                    <th className="border px-4 py-2">Service Name</th>
                    <th className="border px-4 py-2">Garden Area</th>
                    <th className="border px-4 py-2">Price</th>
                    <th className="border px-4 py-2">Location</th>
                    <th className="border px-4 py-2">Address</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceDetails.map((service, index) => (
                    <tr key={service.id}>
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{service.mobile}</td>
                      <td className="border px-4 py-2">{service.garden_service}</td>
                      <td className="border px-4 py-2">{service.garden_area} sq.ft</td>
                      <td className="border px-4 py-2">₹{service.price}</td>
                      <td className="border px-4 py-2">{service.location}</td>
                      <td className="border px-4 py-2">{service.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No services found for this email.</p>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
      {userData ? (
        <div className='my-20'>
          {serviceDetail.length > 0 ? (
            <div>
              <div className='flex justify-center my-10 text-4xl text-green-800 font-bold'>
                <h3>Garden Maintenance Service </h3>
              </div>
              <table className="table-auto border-collapse border border-gray-300 w-full">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Service ID</th>
                    <th className="border px-4 py-2">Phone</th>
                    <th className="border px-4 py-2">Service Name</th>
                    <th className="border px-4 py-2">Garden Area</th>
                    <th className="border px-4 py-2">Price</th>
                    <th className="border px-4 py-2">Location</th>
                    <th className="border px-4 py-2">Address</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceDetail.map((service, index) => (
                    <tr key={service.id}>
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{service.mobile}</td>
                      <td className="border px-4 py-2">{service.garden_service}</td>
                      <td className="border px-4 py-2">{service.garden_area} sq.ft</td>
                      <td className="border px-4 py-2">₹{service.price}</td>
                      <td className="border px-4 py-2">{service.location}</td>
                      <td className="border px-4 py-2">{service.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No services found for this email.</p>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}

      <Link
        to="/"
        className='uppercase text-xl my-10 gap-y-10 underline flex items-center justify-center'
        onClick={() => session?.setSessionId()}
      >
        Log out
      </Link>
    </div>
  );
};

export default UserServices;
