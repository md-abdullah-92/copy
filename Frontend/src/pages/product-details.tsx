import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import Head from 'next/head'; // Import the Head component
import { useAddComment } from '@/hooks/useAddComment';
import { useFetchComments } from '@/hooks/useFetchComments';
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
  productid: string,
  userid:string,
  comment:string,
  username:string,
  date: string;
  useravatar: string;
}





const ProductDetails: React.FC = () => {
 
  const router = useRouter();
  const { id } = router.query; // Get the product ID from the query parameters4
  const productid = id as string;
  const { comments} =useFetchComments(productid);
  const [product, setProduct] = useState<Product | null>(null); // State for storing the fetched product details
  const [comment, setComment] = useState<Comment[]>(comments); // State for comments
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
  const { addComment } = useAddComment(); // Custom hook for adding a new comment
  const [storedEmail, setStoredEmail] = useState<string | null>(null); // State for email from localStorage
  const [storedName, setStoredName] = useState<string | null>(null); // State for name from localStorage
  const [storedAvatar, setStoredAvatar] = useState<string | null>(null); // State for avatar from localStorage
  const [storedId, setStoredId] = useState<string | null>(null); 
  const [isBrowser, setIsBrowser] = useState(false); // State to check if the app is running in the browser
  useEffect(() => {
    // Ensure localStorage is accessed only on the client-side
    if (typeof window !== 'undefined') {
      setIsBrowser(true);
      setStoredEmail(localStorage.getItem('email'));
      setStoredName(localStorage.getItem('name'));
      setStoredAvatar(localStorage.getItem('avatar') || '/default-avatar.png');
      setStoredId(localStorage.getItem('id'));
    }
  }, []);


  useEffect(() => {
    // Fetch email from local storage on component mount
  
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
   
  
  // Function to handle adding a new comment
  const handleAddComment = () => {
      
      const comment: Comment = {
        id: comments.length + 1,
        productid: id as string,
        userid: storedId as string,
        username: storedName as string, // Use name from localStorage
        useravatar: storedAvatar as string, // Use avatar from localStorage
        date: new Date().toLocaleDateString() as string, // Format current date
        comment: newComment,
      
       // date: new Date().toLocaleDateString(), // Format current date
      };
      const username = storedName as string; // Use name from localStorage
      const useravatar = storedAvatar as string; // Use avatar from localStorage
      const date = new Date().toLocaleDateString(); // Format current date
      const userid = storedId as string;
      const productid = id as string;
     console.log('Productid:', productid);
      console.log('Userid:', userid);
      console.log('Username:', username);
      console.log('Useravatar:', useravatar);
      console.log('Date:', date);

      console.log('Comment:', comment);
      setComment([...comments, comment]); // Add new comment to comments array
      setNewComment(''); // Clear new comment input
      setName(''); // Clear name input
      addComment(newComment,username,userid,productid,useravatar,date,productname); // Call the addComment function from the custom hook
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
    return <div>looding</div>;
  }

  
    return (
      <>
        {/* Head component to set the page title and favicon */}
        <Head>
          <title>Product Details | AgriBazaar</title>
          <link rel="icon" href="/assets/logo.png" />
        </Head>
  
        {/* Main page layout */}
        <div className="bg-gradient-to-r from-green-100 to-sky-100 min-h-screen flex flex-col">
          <Header /> {/* Header component */}
          <main className="max-w-7xl mx-auto py-32 px-6 sm:px-8 lg:px-10 flex-grow grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Product Details Section */}
            <section className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="relative group">
                  <img
                    src={product.image}
                    alt={product.productname}
                    className="w-full h-96 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                </div>
                <div className="p-10">
                  <p className="text-2xl font-bold text-indigo-900 mb-6 leading-tight">
                    {product.productname}
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6 font-serif italic">
                    {product.description}
                  </p>
                  <p className="text-xl text-green-900 font-extrabold mb-8">
                    ${product.price}
                  </p>
                  <div className="flex items-center mb-8">
                    <p className="text-yellow-500 mr-2 text-2xl font-semibold">
                      {product.rating} ⭐
                    </p>
                    <span className="text-sm text-gray-500">
                      ({product.rating} ratings)
                    </span>
                  </div>
                  <div className="space-y-4 text-gray-700 text-lg font-serif">
                    <p>
                      <strong>Category:</strong> <span className="text-indigo-600">{product.category}</span>
                    </p>
                    <p>
                      <strong>Quantity Available:</strong> <span className="text-red-600">{product.quantity}</span>
                    </p>
                  </div>
  
                  {/* Seller Information */}
                  <div className="mt-10 bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-sm border border-green-200">
                    <p className="text-xl font-bold text-indigo-800 mb-4">
                      Contact the Seller
                    </p>
                    <p className="text-gray-700 text-lg">
                      <strong>Name:</strong> {product.ownername}
                    </p>
                    <p className="text-gray-700 text-lg">
                      <strong>Phone:</strong> {product.ownerphone}
                    </p>
                    <p className="text-gray-700 text-lg">
                      <strong>Email:</strong> {mail}
                    </p>
                    <p className="text-gray-700 text-lg">
                      <strong>Address:</strong> {product.ownerupzila}, {product.ownerzila}, {product.ownerdivision}
                    </p>
                  </div>
  
                  {/* Buy Product Button */}
                  <button
                    onClick={handleBuyProduct}
                    className="block mx-auto mt-10 bg-gradient-to-r from-green-500 to-green-400 text-white text-lg px-12 py-4 rounded-full shadow-lg hover:bg-green-600 hover:scale-105 transition-transform duration-300"
                  >
                    Buy Product
                  </button>
                </div>
              </div>
            </section>
  
            {/* Comment Section */}
            <aside className="bg-white p-10 rounded-3xl shadow-xl lg:sticky lg:top-10">
              <h2 className="text-xl font-extrabold text-indigo-900 mb-8">Customer Feedback</h2>
              <div className="space-y-6 overflow-y-auto max-h-80">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-green-100 p-6 rounded-xl shadow-sm flex items-start space-x-4"
                  >
                    {/* Avatar Section */}
                    <img
                      src={comment.useravatar || '/default-avatar.png'}
                      alt="User Avatar"
                      className="w-12 h-12 rounded-full object-cover border-2 border-green-300"
                    />
                    <div>
                      <p className="text-gray-700 font-serif italic">{comment.comment}</p>
                      <span className="text-sm text-gray-500">{comment.date}</span>
                    </div>
                  </div>
                ))}
              </div>
  
              {/* Add Comment Form */}
              <div className="mt-8 bg-green-100 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-indigo-900">Leave Your Feedback</h3>
                <textarea
                  placeholder="Your Feedback"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full p-3 h-32 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-400 font-serif"
                />
                <button
                  onClick={handleAddComment}
                  className="mt-4 bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-green-700 transition-transform duration-300 hover:scale-105"
                >
                  Submit
                </button>
              </div>
            </aside>
          </main>
          <Footer /> {/* Footer component */}
        </div>
      </>
    );
  };
  
  export default ProductDetails;
  