import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("email");
    const fetchOwnerProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/product/getsameownerproduct`, {
          params: { owneremail: email },
        });
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchOwnerProducts();
    }
  }, []);

  

  const handleInputChange = (e, productName) => {
    const { name, value } = e.target;
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productname === productName ? { ...product, [name]: value } : product
      )
    );
  };

  const handleImageUpload = (e, productName) => {
    const file = e.target.files?.[0];
    if (file) {
      // Implement image upload logic, such as uploading to a server or Firebase
    }
  };

  const handleSaveClick = (productName) => {
    // Logic to save edited product details, such as sending updates to the server
  };

  const handleEditClick = (productName) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productname === productName ? { ...product, isEditing: true } : product
      )
    );
  };

  return (
    <div className="p-4">
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {products.map((product) => (
            <div key={product.productname} className="bg-white p-4 rounded-lg shadow-md">
              {product.isEditing ? (
                <>
                  <input
                    type="text"
                    name="productname"
                    value={product.productname}
                    onChange={(e) => handleInputChange(e, product.productname)}
                    className="w-full px-4 py-2 mb-2 border border-green-300 rounded-lg"
                    placeholder="Enter product name"
                  />
                  {/* Add other inputs and upload handlers as necessary */}
                  <button onClick={() => handleSaveClick(product.productname)} className="px-4 py-2 bg-green-500 text-white rounded-lg">
                    Save
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-bold">{product.productname}</h3>
                  <button onClick={() => handleEditClick(product.productname)} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                    Edit
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
