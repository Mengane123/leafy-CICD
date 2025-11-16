import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SessionContext from '../../context/Session';

const Profile = () => {
  const session = useContext(SessionContext);
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    gender: '',
    dob: '',
    address: '',
    phone: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch the user data using the sessionId as a parameter
        const response = await axios.get('http://localhost:8080/userdata', {
          params: { id: session?.sessionId }
        });
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load user data.');
      }
    };

    if (session?.sessionId) {
      fetchUser();
    }
  }, [session?.sessionId]);

  // Fetch user profile data on initial load
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/userprofile', {
          params: { id: session?.sessionId },
        });
        if (response.data.profile) {
          setUserData(response.data.profile);
          setFormData({
            gender: response.data.profile.gender || '',
            dob: response.data.profile.dob ? response.data.profile.dob.split('T')[0] : '', // Adjusting the date format
            address: response.data.profile.address || '',
            phone: response.data.profile.phone || '',
          });
        } else {
          setUserData(null); // No data found, keep form empty
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load user data.');
      }
    };

    if (session?.sessionId) {
      fetchUserData();
    }
  }, [session?.sessionId]);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save the updated user data
  const handleSave = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      // Check if userData exists (for POST or PUT request)
      if (userData) {
        // Use PUT method to update the existing user profile
        const response = await axios.put(`http://localhost:8080/updateUser/${session?.sessionId}`, {
          userId: session?.sessionId,
          gender: formData.gender,
          dob: formData.dob,
          address: formData.address,
          phone: formData.phone,
        });

        // Fetch updated user data after saving
        const updatedResponse = await axios.get('http://localhost:8080/userprofile', {
          params: { id: session?.sessionId },
        });
        setUserData(updatedResponse.data.profile);
        setFormData({
          gender: updatedResponse.data.profile?.gender || '',
          dob: updatedResponse.data.profile?.dob ? updatedResponse.data.profile?.dob.split('T')[0] : '',
          address: updatedResponse.data.profile?.address || '',
          phone: updatedResponse.data.profile?.phone || '',
        });

      } else {
        // If no user profile exists, create one with POST method
        const response = await axios.post('http://localhost:8080/updateUser', {
          userId: session?.sessionId,
          gender: formData.gender,
          dob: formData.dob,
          address: formData.address,
          phone: formData.phone,
        });

        // Fetch the newly created profile
        const newProfileResponse = await axios.get('http://localhost:8080/userprofile', {
          params: { id: session?.sessionId },
        });
        setUserData(newProfileResponse.data.profile);
      }

      setIsEditing(false); // Exit edit mode
      setLoading(false);

    } catch (error) {
      setError('Error saving user data');
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 mt-14 min-h-[60rem] h-[800px] ">
      <div className='flex flex-col items-center'>
        <h2 className="text-4xl font-semibold mb-6">User Profile</h2>
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl mb-8">
          <div className="flex items-center justify-center gap-16 text-xl mb-6">
            <p><span className="font-bold">Name: </span> {user?.FName} {user?.LName}</p>
            <p><span className="font-bold">Email: </span> {user?.Email}</p>
          </div>
        </div>
      </div>

      {userData ? (
        <div className="flex flex-col items-center">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
            <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label htmlFor="gender" className="block text-lg font-medium mb-2">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={!isEditing}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="dob" className="block text-lg font-medium mb-2">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={!isEditing}
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-lg font-medium mb-2">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={!isEditing}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-lg font-medium mb-2">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={!isEditing}
                />
              </div>

              {isEditing ? (
                <div className="flex gap-6 mt-4">
                  <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition duration-200"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition duration-200"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Edit Information
                </button>
              )}
            </form>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
            <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label htmlFor="gender" className="block text-lg font-medium mb-2">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="dob" className="block text-lg font-medium mb-2">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-lg font-medium mb-2">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-lg font-medium mb-2">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition duration-200"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
