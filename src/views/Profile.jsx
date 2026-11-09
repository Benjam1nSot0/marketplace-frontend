import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function Profile() {
  const { user, logout } = useContext(UserContext);

  return (
    <div className="container mt-4">
      <h2>Mi Perfil</h2>
      {user ? (
        <div className="card p-3 mt-3" style={{ maxWidth: '400px' }}>
          {user.profile_picture && (
            <img src={user.profile_picture} alt={user.username} className="card-img-top rounded mb-3" style={{ maxHeight: '250px', objectFit: 'cover' }} />
          )}
          <h4>{user.username}</h4>
          <p className="text-muted">{user.email}</p>
          <button onClick={logout} className="btn btn-danger mt-2">Cerrar Sesión</button>
        </div>
      ) : (
        <p>Cargando datos del usuario...</p>
      )}
    </div>
  );
}