import { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function NavigationBar() {
  const { token, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="warning" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">🛒 MarketPlace</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {token ? (
              <>
                <Nav.Link as={Link} to="/shop">Tienda</Nav.Link>
                <Nav.Link as={Link} to="/profile">Mi Perfil</Nav.Link>
                <Nav.Link as={Link} to="/create-post">Publicar</Nav.Link>
                <Button variant="danger" size="sm" onClick={handleLogout} className="ms-2">
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline-dark" as={Link} to="/login" className="me-2">
                  Iniciar Sesión
                </Button>
                <Button variant="success" as={Link} to="/register">
                  Registrate
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}