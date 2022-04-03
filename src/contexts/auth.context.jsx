import { createContext, useState } from "react";

export const AuthContext = createContext({
  currentUser: null,
  setCurrentUser: () => null
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('user'));
  const value = { currentUser, setCurrentUser };
  
  return <AuthContext.Provider value={ value }>{ children }</AuthContext.Provider>
};