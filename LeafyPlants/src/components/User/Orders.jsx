import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SessionContext from '../../context/Session';

const Orders = () => {
  const session = useContext(SessionContext);
  const [userData, setUserData] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/userdata', {
          params: { id: session?.sessionId }
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
    const fetchOrderDetails = async () => {
      if (userData?.Email) {
        try {
          const response = await axios.get('http://localhost:8080/orders', {
            params: { email: userData?.Email },
          });

          // Log the full response to ensure we are receiving the data as expected
          console.log("Full Response:", response.data);

          // Set the order details
          setOrderDetails(response.data);
        } catch (error) {
          console.error('Error fetching order details:', error);
        }
      }
    };

    if (userData?.Email) {
      fetchOrderDetails();
    }
  }, [userData?.Email]);

  return (
    <div className='mt-14 min-h-8 max-h-[50rem] h-[1200px]'>
      {userData ? (
        <div className='my-20'>
          {orderDetails && orderDetails.length > 0 ? (
            <div>
              <div className='flex justify-center my-10 text-4xl text-green-800 font-bold'>

              <h3>Your Orders</h3>
              </div>
              <table className="table-auto border-collapse border border-gray-300 w-full">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Order ID</th>
                    <th className="border px-4 py-2">Phone</th> 
                    <th className="border px-4 py-2">Product Name</th>
                    <th className="border px-4 py-2">Quantity</th>
                    <th className="border px-4 py-2">Price</th>
                    <th className="border px-4 py-2">Total Price</th>
                    <th className="border px-4 py-2">Order Date</th>
                  </tr>
                </thead>
                <tbody>
  {orderDetails.map((order, orderIndex) => (
    <React.Fragment key={order.OrderID}>
      {order.order_items.map((item) => (
        <tr key={item.ItemID}>
          <td className="border px-4 py-2">{orderIndex + 1}</td>
          <td className="border px-4 py-2">{order.Phone}</td> 
          <td className="border px-4 py-2">{item.Product_name}</td>
          <td className="border px-4 py-2">{item.Quantity}</td>
          <td className="border px-4 py-2">{item.Price}</td>
          <td className="border px-4 py-2">{item.Subtotal}</td>
          <td className="border px-4 py-2">{order.Created_at}</td>
        </tr>
      ))}
    </React.Fragment>
  ))}
</tbody>

              </table>
            </div>
          ) : (
            <p>No orders found for this email.</p>
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

export default Orders;
