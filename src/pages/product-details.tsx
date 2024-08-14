import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
  owner: string;
  price: number;
  category: string;
}

interface Comment {
  id: number;
  name: string;
  text: string;
  date: string;
}

const productsData: Product[] = [
  {
    id: 1,
    name: 'Organic Apples',
    description: 'Premium organic apples, sourced from trusted local farms. These apples are known for their crisp texture and delightful taste.',
    image: '/assets/products/apple.jpg',
    rating: 4.5,
    owner: 'John Doe',
    price: 3.5,
    category: 'Fruits',
  },
  // ... other products
];

const ProductDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [name, setName] = useState<string>('');

  useEffect(() => {
    if (id) {
      const foundProduct = productsData.find((p) => p.id === Number(id));
      setProduct(foundProduct || null);
    }
  }, [id]);

  const handleAddComment = () => {
    if (name && newComment) {
      const comment: Comment = {
        id: comments.length + 1,
        name,
        text: newComment,
        date: new Date().toLocaleDateString(),
      };
      setComments([...comments, comment]);
      setNewComment('');
      setName('');
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="bg-sky-100 min-h-screen flex flex-col">
      <Header />
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex-grow space-y-10">
        <div className="bg-light-green-300 rounded-lg shadow-lg overflow-hidden mt-10">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-gray-700 mt-4">{product.description}</p>
            <p className="text-gray-800 font-bold mt-6">${product.price.toFixed(2)}</p>
            <div className="flex items-center mt-4">
              <p className="text-yellow-500 mr-2">{product.rating} ⭐</p>
              <span className="text-sm text-gray-500">({product.rating})</span>
            </div>
            <p className="text-gray-700 mt-4"><strong>Owner:</strong> {product.owner}</p>
            <p className="text-gray-700"><strong>Category:</strong> {product.category}</p>
          </div>
        </div>

        {/* Comment Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Comments</h2>
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-light-green-300 p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold text-gray-900">{comment.name}</h4>
                  <span className="text-sm text-gray-500">{comment.date}</span>
                </div>
                <p className="text-gray-700 mt-2">{comment.text}</p>
              </div>
            ))}
          </div>

          {/* Add Comment Form */}
          <div className="mt-10 bg-light-green-300 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Leave a Comment</h3>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <textarea
              placeholder="Your Comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 h-32 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleAddComment}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300"
            >
              Submit
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetails;
