import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await login(email, password);
    if (ok) navigate('/shop');
  };

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="card shadow-lg p-4 border-0 rounded-4" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold text-dark">Iniciar Sesión</h2>
          <p className="text-muted">Ingresa a tu cuenta de Marketplace</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input 
              type="email" 
              className="form-control" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="tu@email.com"
              required 
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-semibold">Contraseña</label>
            <input 
              type="password" 
              className="form-control" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-dark w-100 py-2 fw-bold rounded-3">
            Iniciar sesión
          </button>
        </form>
        <div className="text-center mt-3">
          <small className="text-muted">¿No tienes cuenta? <Link to="/register">Regístrate</Link></small>
        </div>
      </div>
    </div>
  );
}