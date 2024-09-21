import { useState, useEffect } from 'react';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { useFarmers } from '../hooks/useFarmers';
import router from 'next/router';
import { useSendOtp } from '../hooks/useSendOtp';
import { useRouter } from 'next/router';
import { useChat } from '../hooks/useChat';


interface Farmer {
  id: string;
  name: string;
  email: string;
  upazila: string;
  zila: string;
  division: string;
  avatar: string;
  phone: string;
  organization: string;
}
interface FarmerListProps {
  id: string;
}

const FarmerList: React.FC< FarmerListProps> = ({id}) => {
  const agentId = id;
  const router = useRouter();
  const { farmers, loading, error } = useFarmers();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredFarmers, setFilteredFarmers] = useState<Farmer[]>([]);
  const [isVerified, setIsVerified] = useState<boolean>(false); // Track if OTP is verified
  const { sendOtp } = useSendOtp();  
  const { createOrGetChat } = useChat();

  useEffect(() => {
    const results = farmers.filter((farmer) =>
      farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.upazila.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.zila.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFarmers(results);
  }, [searchTerm, farmers]);

   console.log(localStorage.getItem('id'));
  const handleManageProductClick = (email:string,pathchoice:string,farmer:Farmer) => {

    localStorage.setItem('name', farmer.name);
    localStorage.setItem('email', farmer.email);
    localStorage.setItem('organization', farmer.organization);
    localStorage.setItem('upazila', farmer.upazila);
    localStorage.setItem('zila', farmer.zila);
    localStorage.setItem('division', farmer.division);
    localStorage.setItem('phone', farmer.phone);
    localStorage.setItem('id', farmer.id);
   
    if (!isVerified) {
      alert('An OTP has been sent to the farmer. Please verify it to proceed.');
      sendOtp(email, id as string);
      router.push({
        pathname: '/agent-otp-verification',
        query: { id, email, pathchoice },
      }); 
      }
     else {
      // Proceed with managing products after OTP is verified
      alert('Managing products for the farmer.');
    }
  };

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
                placeholder="Search by name, id or location"
                className="w-full border border-green-400 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-green-400" />
            </div>
          </div>

          {/* Grid Layout Row-wise */}
          <div className="grid grid-cols-1 gap-6">
            {filteredFarmers.length > 0 ? (
              filteredFarmers.map((farmer) => (
                <div key={farmer.id} className="bg-green-100 border border-green-300 rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105">
                  <div className="flex items-center">
                    {farmer.avatar ? (
                      <img
                        src={farmer.avatar}
                        alt={`${farmer.name}'s Avatar`}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                    ) : (
                      <FaUserCircle className="text-5xl text-green-500 mr-4" />
                    )}

                    <div>
                      <h2 className="text-xl font-semibold text-green-900">{farmer.name}</h2>
                      <p className="text-sm text-green-700">{farmer.email}</p>
                      <p className="text-sm text-green-700">
                        {farmer.upazila}, {farmer.zila}.
                      </p>
                      <p className="text-sm text-green-700">{farmer.id}</p>
                    </div>

                    {/* Button Container */}
                    <div className="ml-auto">
                      <button
                        className="bg-transparent text-blue-500 px-3 py-1.5 border border-blue-500 rounded-md text-xs hover:bg-blue-500 hover:text-white transition-colors duration-300"
                        onClick={ () => handleManageProductClick(farmer.email,'Manage Product',farmer) }
                      >
                        Manage Product

                      </button>
                      <samp> </samp>
                      <button
                        className="bg-transparent text-red-500 px-3 py-1.5 border border-red-500 rounded-md text-xs hover:bg-red-500 hover:text-white transition-colors duration-300"
                        onClick={ () => handleManageProductClick(farmer.email,'Check Orders',farmer) }
                      >
                        Check Orders
                      </button>
                      <samp> </samp>
                      <button
                      className="bg-transparent text-green-500 px-3 py-1.5 border border-green-500 rounded-md text-xs hover:bg-green-500 hover:text-white transition-colors duration-300"
                      onClick={() => {
                        const user1Id = farmer.id;
                        const user2Id = id;
                        if (user1Id && user2Id) {
                          createOrGetChat(user1Id, user2Id);
                          router.push('/chatpage?id=' + id);
                        } else {
                          alert('Please enter both User IDs.');
                        }
                      }}
                    >
                      Contact Farmer
                    </button>
                    </div>
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
