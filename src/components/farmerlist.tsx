import { useState, useEffect } from 'react';
import { FaSearch, FaUserCircle } from 'react-icons/fa';

interface Farmer {
  id: string;
  name: string;
  email: string;
  location: string;
  products: string[];
}

const FarmerList: React.FC = () => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredFarmers, setFilteredFarmers] = useState<Farmer[]>([]);

  useEffect(() => {
    // Simulating fetching farmers from an API or database
    const fetchFarmers = async () => {
      const farmerData: Farmer[] = [
        { id: '1', name: 'John Doe', email: 'john@example.com', location: 'Texas', products: ['Tomatoes', 'Corn'] },
        { id: '2', name: 'Alice Green', email: 'alice@example.com', location: 'California', products: ['Lettuce', 'Carrots'] },
        { id: '3', name: 'Mark White', email: 'mark@example.com', location: 'Florida', products: ['Potatoes', 'Peppers'] },
      ];
      setFarmers(farmerData);
    };

    fetchFarmers();
  }, []);

  useEffect(() => {
    const results = farmers.filter(farmer =>
      farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFarmers(results);
  }, [searchTerm, farmers]);

  return (
    <div className="bg-green-50 py-8 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-2xl rounded-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-green-800">Farmers List</h1>

            {/* Search Bar */}
            <div className="relative w-80">
              <input
                type="text"
                placeholder="Search by name or location"
                className="w-full border border-green-400 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-green-400" />
            </div>
          </div>

          {/* Farmers Card View */}
          {/* Grid Layout should row wise */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6">
            {filteredFarmers.length > 0 ? (
              filteredFarmers.map((farmer) => (
                <div key={farmer.id} className="bg-green-100 border border-green-300 rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105">
                  <div className="flex items-center">
                    {farmer.avatarUrl ? (
                      <img
                        src={farmer.avatarUrl}
                        alt={`${farmer.name}'s Avatar`}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                    ) : (
                      <FaUserCircle className="text-5xl text-green-500 mr-4" />
                    )}
                    <div>
                      <h2 className="text-xl font-semibold text-green-900">{farmer.name}</h2>
                      <p className="text-sm text-green-700">{farmer.email}</p>
                      <p className="text-sm text-green-700">{farmer.location}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-md font-semibold text-green-800">Products</h3>
                    <p className="text-sm text-green-600">{farmer.products.join(', ')}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-green-500 col-span-full">No farmers found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerList;
