import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center text-center text-white position-relative overflow-hidden" 
         style={{
           background: 'linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url("https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1400&q=80")',
           backgroundSize: 'cover',
           backgroundPosition: 'center'
         }}>
      <div className="p-5 rounded bg-dark bg-opacity-50 border border-secondary" style={{ maxWidth: '750px' }}>
        <h1 className="display-3 fw-bold mb-3 text-warning">Bienvenido a Marketplace</h1>
        <p className="lead mb-4 text-light">
          Encuentra y vende productos de forma rápida, segura y directa. Conéctate con miles de compradores.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/shop" className="btn btn-warning btn-lg px-4 fw-bold">
            Explorar Tienda
          </Link>
          <Link to="/register" className="btn btn-outline-light btn-lg px-4">
            Crear una Cuenta
          </Link>
        </div>
      </div>
    </div>
  );
}