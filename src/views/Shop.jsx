import { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { PostsContext } from '../context/PostsContext';
import ProductCard from '../components/ProductCard';

export default function Shop() {
const { posts } = useContext(PostsContext);

return (
    <Container className="mt-4">
            <h2>Catálogo de Publicaciones</h2>
    <Row className="mt-3">
        {posts.map((post) => (
        <Col key={post.id} md={4}>
            <ProductCard post={post} />
        </Col>
        ))}
    </Row>
    </Container>
);
}