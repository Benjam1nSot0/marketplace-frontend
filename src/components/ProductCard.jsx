import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ post }) {
  const navigate = useNavigate();

  return (
    <Card className="mb-4 shadow-sm" style={{ width: '18rem' }}>
      <Card.Img variant="top" src={post.img} />
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.description}</Card.Text>
        <h5 className="text-primary">${post.price.toLocaleString('es-CL')}</h5>
        <small className="text-muted d-block mb-2">Publicado por: {post.author}</small>
        <Button variant="primary" onClick={() => navigate(`/post/${post.id}`)}>
          Ver Detalle
        </Button>
      </Card.Body>
    </Card>
  );
}