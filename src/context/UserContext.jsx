import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(true); // Cambiar a true/false para simular login
  const [user, setUser] = useState({
    username: 'Travis Barker',
    email: 'travis@blink182.com',
    avatar: 'https://via.placeholder.com/150'
  });

  const login = (email, password) => {
    setToken(true);
    setUser({ username: 'Travis Barker', email, avatar: 'https://via.placeholder.com/150' });
  };

  const logout = () => {
    setToken(false);
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ token, user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};