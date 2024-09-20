import { useProfile } from '@/hooks/useAgentProfile'; // Adjust this path based on your project structure
import { useSignOut } from '@/hooks/useSignOut'; // Assuming you have a hook for handling sign out
import Layout from '@/components/Layout/Layout';
import { useRouter } from 'next/router';
import { FaUserCircle, FaSignOutAlt, FaBox, FaCartPlus, FaChartLine, FaEnvelope, FaTractor } from 'react-icons/fa';
import FarmerList from '@/components/farmerlist'; // Assuming you have a component for displaying farmers
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useFarmers } from '@/hooks/useFarmers'; // Assuming you have a hook for fetching farmers

export default function DashboardProfile() {
  const { agentprofiles, loggedInUser } = useProfile();
  const { showSignOutConfirm, setShowSignOutConfirm, handleSignOut } = useSignOut();
  const router = useRouter();

  if (!loggedInUser) return <p>Loading profile...</p>;

  const storedNidNumber = loggedInUser.nidNumber;
  const storedId = loggedInUser.id;

  // Notify user to provide NID if missing
  const showNidWarning = !storedNidNumber;

  return (
    <Layout>
      <div className="min-h-screen bg-sky-200 py-8 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="bg-white rounded-xl shadow-lg p-6 transition-transform duration-500 ease-in-out transform hover:scale-105">
              <div className="flex flex-col items-center">
                {loggedInUser.avatarurl ? (
                  <img
                    src={loggedInUser.avatarurl}
                    alt={`${loggedInUser.name}'s Avatar`}
                    className="w-28 h-28 rounded-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="text-7xl text-green-600" />
                )}

                <h2 className="text-2xl font-bold text-gray-900 mt-4">
                  {loggedInUser.name || 'John Doe'}
                </h2>
                <p className="text-sm text-gray-600">Agent</p>
                <p className="text-sm text-gray-600">{loggedInUser.email}</p>

                {/* NID Warning */}
                {showNidWarning && (
                  <div className="mt-4 p-2 bg-red-100 text-red-700 text-center rounded">
                    <p>Please provide your NID number Image of NID.</p>
                    <p>Otherwise you cannot work as an Agent</p>
                  </div>
                )}

                <button
                  className="mt-6 w-full py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300"
                  onClick={() => router.push('/update-agent')}
                >
                  Update Profile
                </button>

                <button
                  className="mt-4 w-full py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-300 flex items-center justify-center"
                  onClick={() => setShowSignOutConfirm(true)}
                >
                  <FaSignOutAlt className="mr-2" />
                  Sign Out
                </button>
              </div>

              {/* Sidebar Navigation */}
              <nav className="mt-12">
                <ul className="space-y-6">
                  <li>
                    <Link href="#dashboard" className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-300">
                      <FaChartLine className="mr-3" />
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="#products" className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-300">
                      <FaBox className="mr-3" />
                      Farmers 
                    </Link>
                  </li>
                  <li>
                    <Link href="/BrowseProducts" className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-300">
                      <FaTractor className="mr-3" />
                      Browse Products
                    </Link>
                  </li>
                  {/* Messages */}
                  <li>
                    <Link href="/chatpage" className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-300">
                      <FaEnvelope className="mr-3" />
                      Messages
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
              {/* Main Content */}
              {!showNidWarning && (
              <div className="md:col-span-3">
            
                  {/* Farmers List Section */}
           
                      <FarmerList
                      id={storedId as string}/>
           
              </div>
            )}
            {/* Sign Out Confirmation Modal */}
            {showSignOutConfirm && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h3 className="text-xl font-semibold mb-4">Confirm Sign Out</h3>
                  <p className="mb-6">Are you sure you want to sign out of your account?</p>
                  <div className="flex justify-end">
                    <button
                      onClick={() => setShowSignOutConfirm(false)}
                      className="px-4 py-2 bg-gray-300 rounded-full mr-4 hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
