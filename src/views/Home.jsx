import { useContext } from 'react';
import { PostsContext } from '../context/PostsContext';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { posts } = useContext(PostsContext);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Catálogo del Marketplace</h1>
      <div className="row">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="col-md-4 mb-4">
              <ProductCard product={post} />
            </div>
          ))
        ) : (
          <p>No hay publicaciones registradas aún.</p>
        )}
      </div>
    </div>
  );
}
}