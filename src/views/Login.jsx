import { useState, useContext } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(UserContext);
  const navigate = useNavigate(); // Redirección programática

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    navigate('/shop'); // Redirige a la tienda tras iniciar sesión
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Card style={{ width: '400px' }} className="bg-warning p-4">
        <h3>Iniciar Sesión</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </Form.Group>
          <Button variant="success" type="submit">Iniciar Sesión</Button>
          <Button variant="light" className="ms-2" onClick={() => navigate('/')}>Volver</Button>
        </Form>
      </Card>
    </Container>
  );
}