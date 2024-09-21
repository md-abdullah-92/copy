import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import Head from 'next/head'; // Import the Head component

// Interface for the Product type
interface Product {
  id: number;
  productname: string;
  description: string;
  image: string;
  rating: number;
  ownername: string;
  price: number;
  totalSold: number;
  category: string;
  onweremail: string;
  ownerorganization: string;
  ownerupzila: string;
  ownerzila: string;
  ownerdivision: string;
  ownerphone: string;
  quantity: number;
}

// Interface for the Comment type
interface Comment {
  id: number;
  name: string;
  text: string;
  date: string;
}

// Initial sample comments
const initialComments: Comment[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    text: 'These apples are amazing! They are so fresh and juicy. Definitely will buy again!',
    date: '08/13/2024',
  },
  {
    id: 2,
    name: 'Mark Spencer',
    text: 'The quality is top-notch, and the price is very reasonable. Highly recommend!',
    date: '08/14/2024',
  },
];

const ProductDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Get the product ID from the query parameters
  const [product, setProduct] = useState<Product | null>(null); // State for storing the fetched product details
  const [comments, setComments] = useState<Comment[]>(initialComments); // State for comments
  const [newComment, setNewComment] = useState<string>(''); // State for new comment text
  const [name, setName] = useState<string>(''); // State for the commenter's name
  const [mail, setMail] = useState<string>(''); // State to store the owner's email
  const [price, setPrice] = useState<string>(''); // State to store the product price
  const [quantity, setQuantity] = useState<string>(''); // State to store the product quantity
  const [category, setCategory] = useState<string >(''); // State to store the product category
  const [sellername, setSellername] = useState<string >(''); // State to store the seller's name
  const [selleremail, setSelleremail] = useState<string>(''); // State to store the seller's email
  const [totalsold, setTotalsold] = useState<string>(''); // State to store the total sold
  const [productname, setProductname] = useState<string >(''); // State to store the commenter's name
  const [image, setImage] = useState<string >(''); // State to store the commenter's name
  const [sellerphone, setSellerphone] = useState<string >(''); // State to store the commenter's name
  const [ownerorganization, setOwnerorganization] = useState<string>(''); // State to store the commenter's name
  const [ownerupzila, setOwnerupzila] = useState<string >(''); // State to store the commenter's name
  const [ownerzila, setOwnerzila] = useState<string >(''); // State to store the commenter's name
  const [ownerdivision, setOwnerdivision] = useState<string >(''); // State to store the commenter's name




  useEffect(() => {
    // Fetch email from local storage on component mount
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setMail(storedEmail);
    }

    if (id) {
      // Fetch the product details from the API when the component mounts or the ID changes
      const fetchProduct = async () => {
        try {
          const response = await fetch(`/api/getproduct?id=${id}`);
          const data = await response.json();
          console.log('Product data:', data);
          setProduct(data); // Set the fetched product data to state
          if (data.owneremail) setMail(data.owneremail); // Update email state if available from fetched data
          if (data.price) setPrice(data.price); // Update price state if available from fetched data
          if (data.quantity) setQuantity(data.quantity); // Update quantity state if available from fetched data
          if (data.category) setCategory(data.category); // Update category state if available from fetched data
          if (data.ownername) setSellername(data.ownername); // Update seller name state if available from fetched data
          if (data.owneremail) setSelleremail(data.owneremail); // Update seller email state if available from fetched data
          if (data.totalSold) setTotalsold(data.totalSold); // Update total sold state if available from fetched data
          if (data.productname) setProductname(data.productname); // Update product name state if available from fetched data
          if (data.image) setImage(data.image); // Update product name state if available from fetched data
          if (data.ownerphone) setSellerphone(data.ownerphone); // Update product name state if available from fetched data
          if (data.ownerorganization) setOwnerorganization(data.ownerorganization); // Update product name state if available from fetched data
          if (data.ownerupzila) setOwnerupzila(data.ownerupzila); // Update product name state if available from fetched data
          if (data.ownerzila) setOwnerzila(data.ownerzila); // Update product name state if available from fetched data
          if (data.ownerdivision) setOwnerdivision(data.ownerdivision); // Update product name state if available from fetched data



        } catch (err) {
          console.error('Error fetching product:', err);
        }
      };

      fetchProduct();
    }
  }, [id]); // Dependency array includes `id` so the effect runs when `id` changes
   
  console.log('Product:', product);
  console.log('selleremail:', mail);
  console.log('sellerphone:', sellerphone);
  console.log('sellername:', sellername);
  console.log('totalsold:', totalsold);
  console.log('category:', category);
  console.log('productname:', productname);
  console.log('price:', price);
  console.log('quantity:', quantity);
  console.log('ownerorganization:', ownerorganization);
  console.log('image:', image);
  // Function to handle adding a new comment
  const handleAddComment = () => {
    if (name && newComment) {
      const comment: Comment = {
        id: comments.length + 1,
        name,
        text: newComment,
        date: new Date().toLocaleDateString(), // Format current date
      };
      setComments([...comments, comment]); // Add new comment to comments array
      setNewComment(''); // Clear new comment input
      setName(''); // Clear name input
    }
  };

  console.log('Product:', product);
 
  console.log('selleremail:', mail);
   
  const sellerlocation = ownerupzila + ", " + ownerzila + ", " + ownerdivision;
  console.log('sellerlocation:', sellerlocation);
 

  // Function to handle the buy button click
 // Inside your ProductDetails component
const handleBuyProduct = () => {
  router.push({
    pathname: '/buy',  // Redirect to the new Buy Product page
    query: { 
      productid: product?.id, 
      name: productname, 
      price: price ,
      quantity:quantity,
      sellername:sellername,
      selleremail:mail,
      totalsold:totalsold,
      category:category,
      sellerlocation:sellerlocation,
      sellerphone:sellerphone,
      sellerorganization:ownerorganization,
      image:image,
    } // Pass product details as query parameters
  });
};


  // Show a loading state if the product data isn't available yet
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      {/* Head component to set the page title and favicon */}
      <Head>
        <title>Product Details | AgriBazaar</title>
        <link rel="icon" href="/assets/logo.png" />
      </Head>

      {/* Main page layout */}
      <div className="bg-sky-200 min-h-screen flex flex-col">
        <Header /> {/* Header component */}
        <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex-grow space-y-10">
          <div className="mt-20">
            <div className="bg-green-100 rounded-lg shadow-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.productname}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-900">{product.productname}</h1>
                <p className="text-gray-700 mt-4">{product.description}</p>
                <p className="text-gray-800 font-bold mt-6">${product.price}</p>
                <div className="flex items-center mt-4">
                  <p className="text-yellow-500 mr-2">{product.rating} ⭐</p>
                  <span className="text-sm text-gray-500">({product.rating})</span>
                </div>
                <p className="text-gray-700"><strong>Category:</strong> {product.category}</p>
                <p className="text-gray-700"><strong>Quantity:</strong> {product.quantity}</p>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Seller</h3>
                <p className="text-gray-700"><strong>Name:</strong> {product.ownername}</p>
                <p className="text-gray-700"><strong>Phone:</strong> {product.ownerphone}</p>
                <p className="text-gray-700"><strong>Email:</strong> {mail}</p> {/* Display email from state */}
                <p className="text-gray-700"><strong>Address:</strong> {product.ownerupzila}, {product.ownerzila}, {product.ownerdivision}</p>
              </div>

              {/* Buy Product Button */}
              <button
                onClick={handleBuyProduct}
                className="block mx-auto mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300"
              >
                Buy Product
              </button>
            </div>
          </div>

          {/* Comment Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Comments</h2>
            <div className="space-y-6">
              {/* Render each comment */}
              {comments.map((comment) => (
                <div key={comment.id} className="bg-green-100 p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-semibold text-gray-900">{comment.name}</h4>
                    <span className="text-sm text-gray-500">{comment.date}</span>
                  </div>
                  <p className="text-gray-700 mt-2">{comment.text}</p>
                </div>
              ))}
            </div>

            {/* Add Comment Form */}
            <div className="mt-10 bg-green-100 p-6 rounded-lg shadow-md">
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
        <Footer /> {/* Footer component */}
      </div>
    </>
  );
};

export default ProductDetails;
