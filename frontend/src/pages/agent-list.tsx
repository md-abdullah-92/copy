import { useState, useEffect } from 'react';
import { FaSearch, FaUserTie } from 'react-icons/fa';
import { useAgents } from '@/hooks/useAgents';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout/Layout';

interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
}

const ContactAgent: React.FC = () => {
  const router = useRouter();
  const { agents, loading, error } = useAgents();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([]);

  useEffect(() => {
    const results = agents.filter((agent) =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAgents(results);
  }, [searchTerm, agents]);

  const handleContactClick = (email: string) => {
    router.push({
      pathname: '/agent-contact-form',
      query: { email },
    });
  };

  return (
    <Layout>
    <div className="min-h-screen bg-sky-200 py-8 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-2xl rounded-lg p-8">
        
          <div className="flex justify-between items-center mb-8">
            
            <h1 className="text-4xl font-bold text-green-800">Contact Agents</h1>

            {/* Search Bar */}
            <div className="relative w-80">
              <input
                type="text"
                placeholder="Search by name, id, or organization"
                className="w-full border border-green-400 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-green-400" />
            </div>
          </div>

          {/* Grid Layout Row-wise */}
          <div className="grid grid-cols-1 gap-6">
            {filteredAgents.length > 0 ? (
              filteredAgents.map((agent) => (
                <div key={agent.id} className="bg-green-100 border border-green-300 rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105">
                  <div className="flex items-center">
                    {agent.avatar ? (
                      <img
                        src={agent.avatar}
                        alt={`${agent.name}'s Avatar`}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                    ) : (
                      <FaUserTie className="text-5xl text-green-500 mr-4" />
                    )}

                    <div>
                      <h2 className="text-xl font-semibold text-green-900">{agent.name}</h2>
                      <p className="text-sm text-green-700">{agent.phone}</p>
                      <p className="text-sm text-green-700">{agent.address}</p>
                      <p className="text-sm text-green-700">{agent.email}</p>
                    </div>

                    {/* Button Container */}
                
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-green-500 col-span-full">No agents found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default ContactAgent;
