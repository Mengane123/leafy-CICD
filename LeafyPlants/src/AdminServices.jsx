import React, { useEffect, useState } from 'react';

const AdminServices = () => {
  const [formsData, setFormsData] = useState([]);
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch forms data
  useEffect(() => {
    const fetchFormsData = async () => {
      try {
        const response = await fetch('http://localhost:8080/forms');
        if (!response.ok) {
          throw new Error('Error fetching forms data');
        }
        const data = await response.json();
        setFormsData(data);
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch users data (assuming the other GET API returns users)
    const fetchFormData = async () => {
      try {
        const response = await fetch('http://localhost:8080/form');
        if (!response.ok) {
          throw new Error('Error fetching user data');
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error(error);
      }
    };

    Promise.all([fetchFormsData(), fetchFormData()]).finally(() =>
      setLoading(false)
    );
  }, []);

  const handleDelete = (id, type) => {
    // Choose which table to delete from (formsData or formData)
    const url = type === 'form' ? `http://localhost:8080/deleteform/${id}` : `http://localhost:8080/deleteforms/${id}`;

    fetch(url, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error deleting form data');
        }
        // Remove the deleted form from the state
        if (type === 'form') {
          setFormData(prevData => prevData.filter(form => form.id !== id));
        } else {
          setFormsData(prevData => prevData.filter(form => form.id !== id));
        }
      })
      .catch(error => {
        console.error('Error deleting form data:', error);
      });
  };

  if (loading) {
    return <div className="text-center mt-24 text-xl">Loading...</div>;
  }

  return (
    <div className="mt-24 p-6 max-h-[1200px] h-[700px]">
      <h2 className="text-3xl font-bold underline flex items-center justify-center mb-4">Admin Services</h2>

      {/* Forms Table */}
      <h3 className="text-2xl font-semibold my-4">Vertical Garden</h3>
      <table className="min-w-full table-auto border-collapse mb-8">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-black px-4 py-2">ID</th>
            <th className="border border-black px-4 py-2">Name</th>
            <th className="border border-black px-4 py-2">Email</th>
            <th className="border border-black px-4 py-2">Mobile</th>
            <th className="border border-black px-4 py-2">Address</th>
            <th className="border border-black px-4 py-2">Location</th>
            <th className="border border-black px-4 py-2">Garden Service</th>
            <th className="border border-black px-4 py-2">Garden Area</th>
            <th className="border border-black px-4 py-2">Price</th>
            <th className="border border-black px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {formsData.map((form, index) => (
            <tr key={form.id} className="text-center">
              <td className="border border-black px-4 py-2">{index + 1}</td>
              <td className="border border-black px-4 py-2">{form.name}</td>
              <td className="border border-black px-4 py-2">{form.email}</td>
              <td className="border border-black px-4 py-2">{form.mobile}</td>
              <td className="border border-black px-4 py-2">{form.address}</td>
              <td className="border border-black px-4 py-2">{form.location}</td>
              <td className="border border-black px-4 py-2">{form.garden_service}</td>
              <td className="border border-black px-4 py-2">{form.garden_area}</td>
              <td className="border border-black px-4 py-2">{form.price}</td>
              <td className="border border-black px-4 py-2">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDelete(form.id, 'forms')}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Garden Maintenance Table */}
      <h3 className="text-2xl font-semibold my-4">Garden Maintenance</h3>
      <table className="min-w-full table-auto border-collapse mb-8">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-black px-4 py-2">ID</th>
            <th className="border border-black px-4 py-2">Name</th>
            <th className="border border-black px-4 py-2">Email</th>
            <th className="border border-black px-4 py-2">Mobile</th>
            <th className="border border-black px-4 py-2">Address</th>
            <th className="border border-black px-4 py-2">Location</th>
            <th className="border border-black px-4 py-2">Garden Service</th>
            <th className="border border-black px-4 py-2">Garden Area</th>
            <th className="border border-black px-4 py-2">Price</th>
            <th className="border border-black px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((form, index) => (
            <tr key={form.id} className="text-center">
              <td className="border border-black px-4 py-2">{index + 1}</td>
              <td className="border border-black px-4 py-2">{form.name}</td>
              <td className="border border-black px-4 py-2">{form.email}</td>
              <td className="border border-black px-4 py-2">{form.mobile}</td>
              <td className="border border-black px-4 py-2">{form.address}</td>
              <td className="border border-black px-4 py-2">{form.location}</td>
              <td className="border border-black px-4 py-2">{form.garden_service}</td>
              <td className="border border-black px-4 py-2">{form.garden_area}</td>
              <td className="border border-black px-4 py-2">{form.price}</td>
              <td className="border border-black px-4 py-2">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDelete(form.id, 'form')}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminServices;
