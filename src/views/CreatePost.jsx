import { useState, useContext } from 'react';
import { PostsContext } from '../context/PostsContext';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Instrumentos');
  const [status, setStatus] = useState('Nuevo');
  const [location, setLocation] = useState('Santiago');
  const [imageUrl, setImageUrl] = useState('');

  const { addPost } = useContext(PostsContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await addPost({
      title,
      description,
      price: Number(price),
      category,
      status,
      location,
      image_url: imageUrl
    });
    if (ok) navigate('/');
  };

  return (
    <div className="container mt-4 mb-5">
      <h2>Crear Nueva Publicación</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Título</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Descripción</label>
          <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Precio</label>
          <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Categoría</label>
          <input type="text" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Estado (ej: Nuevo / Usado)</label>
          <input type="text" className="form-control" value={status} onChange={(e) => setStatus(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Ubicación</label>
          <input type="text" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>URL Imagen del Producto</label>
          <input type="url" className="form-control" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." required />
        </div>
        <button type="submit" className="btn btn-success">Publicar Producto</button>
      </form>
    </div>
  );
}