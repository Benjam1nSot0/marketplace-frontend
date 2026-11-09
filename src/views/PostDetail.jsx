import { useParams, Link } from 'react-router-dom';
import { useContext } from 'react';
import { PostsContext } from '../context/PostsContext';

export default function PostDetail() {
  const { id } = useParams();
  const { posts } = useContext(PostsContext);
  const post = posts?.find((p) => String(p.id) === String(id));

  if (!post) {
    return (
      <div className="container my-5 text-center">
        <h4>Publicación no encontrada</h4>
        <Link to="/shop" className="btn btn-primary mt-3">Volver a la tienda</Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <Link to="/shop" className="btn btn-outline-secondary mb-4">
        &lt; Volver a la Galería
      </Link>
      
      <div className="card shadow-lg border-0 rounded-4 p-4">
        <h2 className="fw-bold border-bottom pb-2 mb-4">Vista de detalle de publicación</h2>
        <div className="row g-4">
          
          <div className="col-md-6">
            <div className="position-relative d-flex align-items-center justify-content-center bg-dark rounded-3 overflow-hidden" style={{ minHeight: '380px' }}>
              <button className="btn btn-light position-absolute start-0 ms-2 rounded-circle fw-bold shadow">&lt;</button>
              <img 
                src={post.image_url || 'https://via.placeholder.com/400'} 
                alt={post.title} 
                className="img-fluid" 
                style={{ maxHeight: '360px', objectFit: 'contain' }}
              />
              <button className="btn btn-light position-absolute end-0 me-2 rounded-circle fw-bold shadow">&gt;</button>
            </div>
          </div>

          <div className="col-md-6 d-flex flex-column justify-content-between">
            <div>
              <h3 className="fw-bold">{post.title}</h3>
              <h2 className="text-success fw-bold my-3">${Number(post.price).toLocaleString('es-CL')}</h2>
              
              <div className="d-flex gap-2 mb-3">
                <span className="badge bg-secondary fs-6">Categoría: {post.category || 'General'}</span>
                <span className="badge bg-info text-dark fs-6">Estado: {post.status || 'Usado'}</span>
              </div>

              <p className="lead fs-6 text-secondary border-top border-bottom py-3">
                {post.description}
              </p>

              <div className="p-3 bg-light rounded border mb-3">
                <h6 className="fw-bold text-dark mb-1">📍 Mapa de ubicación</h6>
                <p className="small text-muted mb-0">{post.location || 'Santiago, Chile'}</p>
              </div>
            </div>

            <button 
              className="btn btn-success btn-lg w-100 fw-bold py-3 shadow"
              onClick={() => alert(`Contactando al vendedor sobre: ${post.title}`)}
            >
              💬 Botón de contacto / Mensaje
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}