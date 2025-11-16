import React, { useState, useEffect } from 'react';
import SessionContext from './Session'; // Ensure the correct path

const SessionState = ({ children }) => {
  const [sessionId, setSessionId] = useState(() => {
    const storedSessionId = sessionStorage.getItem('sessionId');
    return storedSessionId ? parseInt(storedSessionId, 10) : -1;
  });

  const [role, setRole] = useState(() => {
    const storedRole = sessionStorage.getItem('role');
    return storedRole ? storedRole : null;
  });

  useEffect(() => {
    // Save sessionId and role to sessionStorage when they change
    if (sessionId >= 0) {
      sessionStorage.setItem('sessionId', sessionId);
    } else {
      sessionStorage.removeItem('sessionId');
    }

    if (role) {
      sessionStorage.setItem('role', role);
    } else {
      sessionStorage.removeItem('role');
    }
  }, [sessionId, role]);

  return (
    <SessionContext.Provider value={{ sessionId, setSessionId, role, setRole }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionState;
