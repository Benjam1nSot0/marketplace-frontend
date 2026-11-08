import { createContext, useState } from 'react';

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Batería electrónica Alesis Nitro Mesh',
      description: 'La mejor batería para iniciar en el mundo de la percusión, poco uso.',
      price: 350000,
      author: 'Travis Barker',
      img: 'https://via.placeholder.com/300'
    }
  ]);

  const addPost = (newPost) => {
    setPosts([...posts, { ...newPost, id: Date.now() }]);
  };

  return (
    <PostsContext.Provider value={{ posts, addPost }}>
      {children}
    </PostsContext.Provider>
  );
};