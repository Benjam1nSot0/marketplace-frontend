import { createContext, useState, useEffect } from 'react';

export const PostsContext = createContext();

// Reemplaza con tu URL real de Render
const BASE_URL = 'https://marketplace-backend-aq32.onrender.com';

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

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
        await getPosts();
        return true;
      } else {
        const data = await res.json();
        alert(data.message || 'Error al crear la publicación');
        return false;
      }
    } catch (error) {
      console.error('Error al crear publicación:', error);
      return false;
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