import Layout from '@/components/Layout/Layout';
import ManageProduct from '@/components/Farmercomponents/ManageProducts';
import AddProduct from '@/components/Farmercomponents/Addproducts';
import { useRouter } from 'next/router';

export default function DashboardProfile() {
  const router = useRouter();
  const farmer=router.query.farmer;
  

  return (
    <Layout>
      <div className="min-h-screen bg-sky-200 py-8 pt-24 flex justify-center">
        <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          
          <h2 className="text-3xl font-bold text-sky-900">{farmer}</h2>
            </div>
          {/* Manage Products Section */}
          <section
            id="products"
            className="bg-white rounded-xl shadow-lg p-8 mb-8 transition-transform duration-500 ease-in-out transform hover:scale-105"
          >
            <div className="flex flex-col items-center">
              <ManageProduct />
            </div>
          </section>

          {/* Add Product Section */}
          <section
            id="addproduct"
            className="bg-white rounded-xl shadow-lg p-8 transition-transform duration-500 ease-in-out transform hover:scale-105"
          >
            <div className="flex flex-col items-center">
              <AddProduct />
            </div>
          </section>

        </div>
      </div>
    </Layout>
  );
}
