import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

// Reemplaza esta URL con la tuya de Render (sin la barra / al final)
const BASE_URL = 'https://marketplace-backend-aq32.onrender.com';

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);

  // Obtener perfil del usuario autenticado mediante el JWT
  const getProfile = async (jwtToken) => {
    if (!jwtToken) return;
    try {
      const res = await fetch(`${BASE_URL}/usuarios`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        // Si la API devuelve un arreglo, tomar el primer registro
        setUser(Array.isArray(data) ? data[0] : data);
      }
    } catch (error) {
      console.error('Error al obtener perfil:', error);
    }
  };

  // Iniciar Sesión
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

  // Registro de Usuario
  const register = async (email, password) => {
    try {
      const res = await fetch(`${BASE_URL}/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
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

  // Cerrar Sesión
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