import React, { useState, useEffect } from 'react';

const Userinfo = () => {
  const [customers, setCustomers] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from both APIs separately
    Promise.all([
      fetch('http://localhost:8080/userinfo').then(response => response.json()),
      fetch('http://localhost:8080/customerinfo').then(response => response.json())
    ])
      .then(([customerData, userData]) => {
        setCustomers(customerData); // Store customer data
        setUsers(userData); // Store user data
        console.log("Customers:", customerData);
        console.log("Users:", userData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id, type) => {
    const apiEndpoint = type === 'customer' ? 'deleteuser' : 'deletecustomer';
    
    fetch(`http://localhost:8080/${apiEndpoint}/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error deleting data');
        }
        // Update the state to remove the deleted entry
        if (type === 'customer') {
          setCustomers(prev => prev.filter(item => item.id !== id));
        } else {
          setUsers(prev => prev.filter(item => item.id !== id));
        }
      })
      .catch(error => {
        console.error('Error deleting:', error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='text-center mt-20 lg:my-24'>
      {/* Customer Details Section */}
      <section className="mb-12">
        <h2 className='text-4xl my-4 underline'>Customer Details</h2>
        <table className='min-w-full table-auto border-collapse'>
          <thead className='bg-gray-200'>
            <tr>
              <th className="border border-black px-4 py-2">Sr.no</th>
              <th className="border border-black px-4 py-2">First Name</th>
              <th className="border border-black px-4 py-2">Last Name</th>
              <th className="border border-black px-4 py-2">Email</th>
              <th className="border border-black px-4 py-2">Product Name</th>
              <th className="border border-black px-4 py-2">Phone</th>
              <th className="border border-black px-4 py-2">Quantity</th>
              <th className="border border-black px-4 py-2">Total Price</th>
              <th className="border border-black px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {customers.map((customer, index) => (
              <tr key={customer.id}>
                <td className="border border-black px-4 py-2">{index + 1}</td>
                <td className="border border-black px-4 py-2">{customer.FName}</td>
                <td className="border border-black px-4 py-2">{customer.LName}</td>
                <td className="border border-black px-4 py-2">{customer.Email}</td>
                <td className="border border-black px-4 py-2">{customer.Product_name}</td>
                <td className="border border-black px-4 py-2">{customer.Phone}</td>
                <td className="border border-black px-4 py-2">{customer.Quantity}</td>
                <td className="border border-black px-4 py-2">{customer.Total_price}</td>
                <td className="border border-black px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(customer.id, 'customer')}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* User Details Section */}
      <section>
        <h2 className='text-4xl my-4 underline'>User Details</h2>
        <table className='min-w-full table-auto border-collapse'>
          <thead className='bg-gray-200'>
            <tr>
              <th className="border border-black px-4 py-2">Sr.no</th>
              <th className="border border-black px-4 py-2">First Name</th>
              <th className="border border-black px-4 py-2">Last Name</th>
              <th className="border border-black px-4 py-2">Email</th>
              <th className="border border-black px-4 py-2">Product Name</th>
              <th className="border border-black px-4 py-2">Quantity</th>
              <th className="border border-black px-4 py-2">Subtotal</th>
              <th className="border border-black px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td className="border border-black px-4 py-2">{index + 1}</td>
                <td className="border border-black px-4 py-2">{user.FName}</td>
                <td className="border border-black px-4 py-2">{user.LName}</td>
                <td className="border border-black px-4 py-2">{user.Email}</td>
                <td className="border border-black px-4 py-2">{user.Product_name}</td>
                <td className="border border-black px-4 py-2">{user.Quantity}</td>
                <td className="border border-black px-4 py-2">{user.Subtotal}</td>
                <td className="border border-black px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(user.id, 'user')}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Userinfo;
