import { useParams } from 'react';
import { useContext } from 'react';
import { PostsContext } from '../context/PostsContext';

export default function PostDetail() {
  const { id } = useParams();
  const { posts } = useContext(PostsContext);
  const post = posts.find((p) => String(p.id) === String(id));

  if (!post) return <div className="container mt-4">Publicación no encontrada.</div>;

  return (
    <div className="container mt-4">
      <h2>{post.title}</h2>
      <img src={post.image_url} alt={post.title} style={{ maxWidth: '400px' }} className="img-fluid my-3 rounded" />
      <p>{post.description}</p>
      <p><strong>Precio:</strong> ${Number(post.price).toLocaleString('es-CL')}</p>
      <p><strong>Ubicación:</strong> {post.location}</p>
      <p><strong>Estado:</strong> {post.status}</p>
    </div>
  );
}