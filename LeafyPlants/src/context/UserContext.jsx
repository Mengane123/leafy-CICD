import { createContext, useState, useContext } from 'react';

// Create the context
const UsersContext = createContext();

// Custom hook to use the context
export const useUser = () => useContext(UsersContext);

// Provider component
const UsersProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UsersContext.Provider value={{ user, login, logout }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
