import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  
  const { register } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const ok = await register(username, email, password, profilePicture);
    if (ok) navigate('/login');
  };

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="card shadow-lg p-4 border-0 rounded-4" style={{ maxWidth: '450px', width: '100%' }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold text-dark">Registro</h2>
          <p className="text-muted">Crea tu cuenta para comenzar a publicar</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Nombre de usuario</label>
            <input 
              type="text" 
              className="form-control" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Ej: juanperez"
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Correo electrónico</label>
            <input 
              type="email" 
              className="form-control" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="correo@ejemplo.com"
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Foto de perfil (URL)</label>
            <input 
              type="url" 
              className="form-control" 
              value={profilePicture} 
              onChange={(e) => setProfilePicture(e.target.value)} 
              placeholder="https://ejemplo.com/foto.jpg"
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Contraseña</label>
            <input 
              type="password" 
              className="form-control" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-semibold">Confirmar contraseña</label>
            <input 
              type="password" 
              className="form-control" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 py-2 fw-bold rounded-3">
            Crear cuenta
          </button>
        </form>
        <div className="text-center mt-3">
          <small className="text-muted">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></small>
        </div>
      </div>
    </div>
  );
}