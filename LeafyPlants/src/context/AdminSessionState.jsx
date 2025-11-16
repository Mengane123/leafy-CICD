import React, { useState, useEffect } from 'react';
import AdminSessionContext from './AdminSessionContext'; 
import SessionContext from './Session';

const AdminSessionState = ({ children }) => {
    const [SessionId, setSessionId] = useState(() => {
        // Get the admin session ID from sessionStorage if available
        const storedAdminSessionId = sessionStorage.getItem('adminSessionId');
        return storedAdminSessionId ? parseInt(storedAdminSessionId, 10) : -1;
    });

    // Fetch admin data and update session ID
    useEffect(() => {
        if (SessionId === -1) {
            const getAdminData = async () => {
                try {
                    const response = await fetch('http://localhost:8080/admin', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    console.log("Admin data:", data);
                    if (data.user_session_id) {
                        // Set admin session ID from the response and store in sessionStorage
                        setSessionId(data.user_session_id);
                        sessionStorage.setItem('adminSessionId', data.user_session_id);
                    }
                } catch (error) {
                    console.error("Error fetching admin data:", error);
                }
            };

            getAdminData();
        }
    }, [SessionId]); // Dependency array to prevent redundant API calls

    return (
        <AdminSessionContext.Provider value={{ SessionId, setSessionId }}>
            {children}
        </AdminSessionContext.Provider>
    );
};

export default AdminSessionState;
