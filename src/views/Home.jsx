import { useContext } from 'react';
import { PostsContext } from '../context/PostsContext';

export default function Home() {
  const { posts } = useContext(PostsContext);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Catálogo del Marketplace</h1>
      <div className="row">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img 
                  src={post.image_url || 'https://via.placeholder.com/300'} 
                  className="card-img-top" 
                  alt={post.title} 
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text text-muted">{post.description}</p>
                  </div>
                  <div className="mt-3">
                    <p className="h5 text-primary">${Number(post.price).toLocaleString('es-CL')}</p>
                    <span className="badge bg-secondary me-2">{post.category}</span>
                    <span className="badge bg-info text-dark">{post.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No hay publicaciones registradas aún.</p>
        )}
      </div>
    </div>
  );
}