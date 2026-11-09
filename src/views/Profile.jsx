import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { PostsContext } from '../context/PostsContext';

export default function Profile() {
  const { user, logout } = useContext(UserContext);
  const { posts } = useContext(PostsContext);

  const myPostsCount = posts ? posts.length : 0;

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg border-0 rounded-4 p-4">
            <div className="d-flex align-items-center gap-4 border-bottom pb-4 mb-4">
              <img 
                src={user?.profile_picture || 'https://via.placeholder.com/150'} 
                alt={user?.username || 'Foto'} 
                className="rounded-circle border border-3 border-warning"
                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
              />
              <div>
                <h2 className="fw-bold mb-1">{user?.username || 'Tu Nombre'}</h2>
                <p className="text-muted mb-2">{user?.email}</p>
                <button className="btn btn-outline-secondary btn-sm me-2">Editar perfil</button>
                <button onClick={logout} className="btn btn-danger btn-sm">Cerrar sesión</button>
              </div>
            </div>

            <h5 className="fw-bold mb-3">Estadísticas</h5>
            <div className="row text-center">
              <div className="col-md-4 mb-3">
                <div className="p-3 bg-light rounded-3 border">
                  <h3 className="fw-bold text-primary">{myPostsCount}</h3>
                  <small className="text-muted">Publicaciones activas</small>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="p-3 bg-light rounded-3 border">
                  <h3 className="fw-bold text-success">100%</h3>
                  <small className="text-muted">Reputación vendedor</small>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="p-3 bg-light rounded-3 border">
                  <h3 className="fw-bold text-warning">5★</h3>
                  <small className="text-muted">Calificación promedio</small>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}