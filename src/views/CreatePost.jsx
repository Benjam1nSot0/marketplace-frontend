import { useState, useContext } from 'react';
import { PostsContext } from '../context/PostsContext';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Lugar del mundo 123');
  const [imageUrl, setImageUrl] = useState('');

  const { addPost } = useContext(PostsContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await addPost({
      title,
      price: Number(price),
      category,
      status,
      description,
      location,
      image_url: imageUrl
    });
    if (ok) navigate('/shop');
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0 rounded-4 p-4 bg-light">
        <h3 className="fw-bold mb-4 border-bottom pb-2">Formulario para crear una publicación</h3>
        <form onSubmit={handleSubmit}>
          <div className="row g-4">
            
            {/* Foto e indicador 0/10 */}
            <div className="col-md-4">
              <div className="border border-2 border-secondary rounded-3 d-flex flex-column align-items-center justify-content-center p-3 text-center bg-white" style={{ minHeight: '300px' }}>
                {imageUrl ? (
                  <img src={imageUrl} alt="Preview" className="img-fluid rounded mb-2" style={{ maxHeight: '220px', objectFit: 'contain' }} />
                ) : (
                  <div className="text-muted">
                    <p className="fs-1 mb-0">📷</p>
                    <p className="fw-semibold">Agregar fotos: 0/10</p>
                  </div>
                )}
                <input 
                  type="url" 
                  className="form-control form-control-sm mt-2" 
                  placeholder="URL de la imagen" 
                  value={imageUrl} 
                  onChange={(e) => setImageUrl(e.target.value)}
                  required 
                />
              </div>
            </div>

            {/* Inputs del centro */}
            <div className="col-md-4 d-flex flex-column gap-3">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Título" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
              />
              <input 
                type="number" 
                className="form-control" 
                placeholder="Precio" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                required 
              />
              <input 
                type="text" 
                className="form-control" 
                placeholder="Categoría" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                required 
              />
              <input 
                type="text" 
                className="form-control" 
                placeholder="Estado (Nuevo / Usado)" 
                value={status} 
                onChange={(e) => setStatus(e.target.value)} 
                required 
              />
            </div>

            {/* Descripción y Ubicación */}
            <div className="col-md-4 d-flex flex-column justify-content-between">
              <div>
                <textarea 
                  className="form-control mb-3" 
                  rows="5" 
                  placeholder="Descripción" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  required 
                />
                <div className="p-2 bg-white rounded border">
                  <small className="fw-bold d-block text-muted">Ubicación:</small>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>{location}</span>
                    <button type="button" className="btn btn-link btn-sm text-decoration-none p-0" onClick={() => setLocation(prompt('Ingresa nueva ubicación:') || location)}>
                      Editar
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-end mt-4">
                <button type="submit" className="btn btn-dark btn-lg px-5 fw-bold">
                  Publicar
                </button>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}