import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

// Reemplaza con tu URL real de Render
const BASE_URL = 'https://marketplace-backend-aq32.onrender.com';

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);

  const getProfile = async (jwtToken) => {
    if (!jwtToken) return;
    try {
      const res = await fetch(`${BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } catch (error) {
      console.error('Error al obtener perfil:', error);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (res.ok && data.token) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        await getProfile(data.token);
        return true;
      } else {
        alert(data.message || 'Error en el inicio de sesión');
        return false;
      }
    } catch (error) {
      console.error('Error en login:', error);
      return false;
    }
  };

  const register = async (username, email, password, profile_picture) => {
    try {
      const res = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, profile_picture })
      });
      const data = await res.json();

      if (res.ok) {
        alert('Usuario registrado con éxito. Ya puedes iniciar sesión.');
        return true;
      } else {
        alert(data.message || 'Error al registrar usuario');
        return false;
      }
    } catch (error) {
      console.error('Error en registro:', error);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    if (token) {
      getProfile(token);
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ token, user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};