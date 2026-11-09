import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext, UserProvider } from './context/UserContext';
import { PostsProvider } from './context/PostsContext';

import NavigationBar from './components/NavigationBar.jsx';
import Home from './views/Home.jsx';
import Login from './views/Login.jsx';
import Register from './views/Register.jsx';
import Profile from './views/Profile.jsx';
import Shop from './views/Shop.jsx';
import CreatePost from './views/CreatePost.jsx';
import PostDetail from './views/PostDetail.jsx';

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(UserContext);
  return token ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<Shop />} />

        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/create-post" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
        <Route path="/post/:id" element={<ProtectedRoute><PostDetail /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <UserProvider>
      <PostsProvider>
        <AppRoutes />
      </PostsProvider>
    </UserProvider>
  );
}