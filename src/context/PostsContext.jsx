import { createContext, useState, useEffect } from 'react';

export const PostsContext = createContext();

// Reemplaza esta URL con la tuya de Render (sin la barra / al final)
const BASE_URL = 'https://marketplace-backend-aq32.onrender.com';

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  // Cargar publicaciones desde PostgreSQL en Render
  const getPosts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/posts`);
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Error al obtener las publicaciones:', error);
    }
  };

  // Guardar una nueva publicación en Render
  const addPost = async (newPost) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newPost)
      });

      if (res.ok) {
        await getPosts(); // Recargar el feed con la nueva publicación
      }
    } catch (error) {
      console.error('Error al crear la publicación:', error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <PostsContext.Provider value={{ posts, getPosts, addPost }}>
      {children}
    </PostsContext.Provider>
  );
};