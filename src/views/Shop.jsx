import { useContext, useState } from 'react';
import { PostsContext } from '../context/PostsContext';
import { Link } from 'react-router-dom';

export default function Shop() {
  const { posts } = useContext(PostsContext);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const categories = ['Todas', 'Instrumentos', 'Electrónica', 'Hogar', 'Vehículos', 'Otros'];

  const filteredPosts = posts?.filter((post) => {
    const matchesSearch = post.title?.toLowerCase().includes(search.toLowerCase()) ||
                          post.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container my-4">
      {/* Buscador y Botón Crear */}
      <div className="row mb-4 align-items-center">
        <div className="col-md-7 mb-2 mb-md-0">
          <input 
            type="text" 
            className="form-control form-control-lg border-2" 
            placeholder="🔍 Búsqueda de productos..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-5 text-md-end">
          <Link to="/create-post" className="btn btn-success btn-lg fw-bold">
            + Crear publicación
          </Link>
        </div>
      </div>

      {/* Filtros */}
      <div className="mb-4">
        <h6 className="fw-bold mb-2">Filtros por categorías:</h6>
        <div className="d-flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button 
              key={cat} 
              className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary fw-bold' : 'btn-outline-secondary'}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grilla */}
      <div className="row">
        {filteredPosts && filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm border-0 rounded-3">
                <img 
                  src={post.image_url || 'https://via.placeholder.com/300'} 
                  className="card-img-top" 
                  alt={post.title} 
                  style={{ height: '220px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <span className="badge bg-secondary mb-2">{post.category || 'General'}</span>
                    <h5 className="card-title fw-bold text-dark">{post.title}</h5>
                    <p className="card-text text-muted small">{post.description}</p>
                  </div>
                  <div className="mt-3">
                    <p className="h4 text-success fw-bold">${Number(post.price).toLocaleString('es-CL')}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="badge bg-light text-dark border">{post.location}</span>
                      <Link to={`/post/${post.id}`} className="btn btn-outline-primary btn-sm fw-bold">
                        Ver detalle
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <p className="lead text-muted">No se encontraron productos disponibles.</p>
          </div>
        )}
      </div>
    </div>
  );
}