import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import adminValidation from './adminValidation';
import AdminSessionContext from '../context/AdminSessionContext';

const Admin = () => {
  const { SessionId, setSessionId } = useContext(AdminSessionContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (SessionId >= 0) {
      navigate('/'); // Redirect to home page if already logged in
    }
  }, [SessionId, navigate]);

  const [values, setValues] = useState({
    adminEmail: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = adminValidation(values);
    setErrors(validationErrors);

    if (!validationErrors.Email && !validationErrors.Password) {
      try {
        const response = await fetch('http://localhost:8080/admin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();
        console.log("response:", data);
        if (data.Login) {
          setAdminSessionId(data.admin_session_id);
          navigate('/admindashboard');
        } else {
          alert("No record exists.");
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <>
      <main className='flex flex-col justify-center items-center min-h-screen bg-gray-100'>
        <div className='bg-white p-8 rounded-xl shadow-md w-full max-w-md mx-4'>
          <h1 className='text-4xl text-green-500 font-bold text-center mb-6'>Admin Login</h1>
          <form className='flex flex-col' onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder='Admin'
              onChange={handleInput}
              name='adminEmail'
              className='w-full h-10 my-4 px-4 rounded-md border border-gray-300'
            />
            {errors.adminEmail && <span className='text-red-500 text-sm'>{errors.adminEmail}</span>}
            <input
              type="password"
              placeholder='Password'
              onChange={handleInput}
              name='password'
              className='w-full h-10 my-4 px-4 rounded-md border border-gray-300'
            />
            {errors.password && <span className='text-red-500 text-sm'>{errors.password}</span>}
            <input
              type="submit"
              className='uppercase bg-[#149253] rounded-md w-full h-10 text-white my-4 cursor-pointer hover:bg-green-600'
              value="Sign in"
            />
            <div className="flex justify-between my-4 items-center text-base">
              <p>Create new account</p>
              <Link to="/newadmin" className="text-[#129253]">
                New
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default Admin;
