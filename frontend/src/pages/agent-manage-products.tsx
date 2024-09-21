import { useProfile } from '@/hooks/useProfile'; // Adjust this path based on your project structure
import { useOwnerProducts } from '@/hooks/useOwnerProducts';
import { useSignOut } from '@/hooks/useSignOut';// Assuming you have a hook for handling the cart
import Layout from '@/components/Layout/Layout';
import ManageProduct from '@/components/Farmercomponents/ManageProducts';
import AddProduct from '@/components/Farmercomponents/Addproducts';
import { useRouter } from 'next/router';
import { FaUserCircle, FaSignOutAlt, FaBox, FaCartPlus, FaChartLine, FaEnvelope,FaTractor } from 'react-icons/fa';
import Link from 'next/link';

export default function DashboardProfile() {
  const { profiles, loggedInUser } = useProfile();
  const { products, loading, error } = useOwnerProducts();
  const { showSignOutConfirm, setShowSignOutConfirm, handleSignOut } = useSignOut();
 // const { cartItems, handleAddToCart } = useCart(); // Hook to manage cart items
  const router = useRouter();

  //if (loading) return <p>Loading products...</p>;
  //if (error) return <p>{error}</p>;

  return (
    <Layout>
      <div className="min-h-screen bg-sky-200 py-8 pt-24">
       

              {/* Manage Products Section */}
              <section
                id="products"
                className="bg-white rounded-xl shadow-lg p-8 transition-transform duration-500 ease-in-out transform hover:scale-105"
              >
                <div className="flex justify-between items-center mb-6">
                  <ManageProduct />
                </div>
              </section>

              {/* Add Product Section */}
              <section
                id="addproduct"
                className="bg-white rounded-xl shadow-lg p-8 transition-transform duration-500 ease-in-out transform hover:scale-105"
              >
                <div className="flex justify-between items-center mb-6">
                  <AddProduct />
                </div>
              </section>
            </div>
            
    </Layout>
  );
}
