import { createContext } from 'react';

// Create the SessionContext with default values
const SessionContext = createContext({
  sessionId: -1,  // Default session ID (assuming -1 means no session)
  setSessionId: () => {},  // Placeholder function to update sessionId
  role: null,  // Default role is null
  setRole: () => {}  // Placeholder function to update role
});

export default SessionContext;
