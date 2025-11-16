import React, { useState, useEffect } from 'react';

const AdminContact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/Contact')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setContacts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching contact data:', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    // Make a DELETE request to the API
    fetch(`http://localhost:8080/Contact/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error deleting contact');
        }
        // Remove the deleted contact from the state
        setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
      })
      .catch(error => {
        console.error('Error deleting contact:', error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='text-center mt-20 lg:my-24'>
      <h2 className='text-4xl my-4 underline'>Contact Form Data</h2>
      <table className='min-w-full table-auto border-collapse'>
        <thead className='bg-gray-200'>
          <tr>
            <th className="border border-black px-4 py-2">Sr.no</th>
            <th className="border border-black px-4 py-2">Username</th>
            <th className="border border-black px-4 py-2">Email</th>
            <th className="border border-black px-4 py-2">Number</th>
            <th className="border border-black px-4 py-2">Message</th>
            <th className="border border-black px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {contacts.map((contact, index) => (
            <tr key={contact.id}>
              <td className="border border-black px-4 py-2">{index + 1}</td>
              <td className="border border-black px-4 py-2">{contact.username}</td>
              <td className="border border-black px-4 py-2">{contact.email}</td>
              <td className="border border-black px-4 py-2">{contact.number}</td>
              <td className="border border-black px-4 py-2">{contact.message}</td>
              <td className="border border-black px-4 py-2">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDelete(contact.id)}
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

export default AdminContact;
