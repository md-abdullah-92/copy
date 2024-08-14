import React from 'react';
import { FaCheckCircle, FaTruck, FaBoxOpen, FaMapMarkerAlt } from 'react-icons/fa';
import Header from '@/components/Layout/Header'; // Ensure the Header path is correct
import Footer from '@/components/Layout/Footer'; // Ensure the Footer path is correct
import ScrollAnimationWrapper from '@/components/Layout/ScrollAnimationWrapper';
import getScrollAnimation from '@/utils/getScrollAnimation';
import { motion } from 'framer-motion';

interface TrackingStage {
  id: number;
  label: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
}

export default function ProductTracking() {
  const trackingStages: TrackingStage[] = [
    {
      id: 1,
      label: 'Packaging Done',
      description: 'Your product has been packaged and is ready for shipment.',
      icon: <FaBoxOpen />,
      completed: true,
    },
    {
      id: 2,
      label: 'Waiting for Pickup',
      description: 'Your product is waiting to be picked up by the courier.',
      icon: <FaTruck />,
      completed: true,
    },
    {
      id: 3,
      label: 'On the Road',
      description: 'Your product is on its way to your location.',
      icon: <FaMapMarkerAlt />,
      completed: false,
    },
    {
      id: 4,
      label: 'Delivered',
      description: 'Your product has been delivered to the specified address.',
      icon: <FaCheckCircle />,
      completed: false,
    },
  ];

  return (
    <div className="bg-sky-100 min-h-screen flex flex-col">
      <Header /> {/* Include Header Component */}
      <ScrollAnimationWrapper>
        <motion.div
          className="max-w-7xl mx-auto mt-24 px-4 sm:px-6 lg:px-8"
          variants={getScrollAnimation()}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
            Track Your Order
          </h1>
          <p className="text-gray-600 text-sm text-center mb-6">
            Updated on: {new Date().toLocaleDateString()}
          </p>

          {/* Progress Indicator Bar */}
          <div className="relative mb-12">
            <div className="absolute top-0 left-0 h-1 w-full bg-gray-300 rounded-full"></div>
            <div
              className={`absolute top-0 left-0 h-1 bg-green-600 rounded-full`}
              style={{
                width: `${
                  (trackingStages.filter((stage) => stage.completed).length /
                    trackingStages.length) *
                  100
                }%`,
              }}
            ></div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8">
            <ul className="space-y-8">
              {trackingStages.map((stage) => (
                <li key={stage.id} className="flex flex-col md:flex-row items-center space-x-6">
                  {/* Step Number with Icon */}
                  <div className="relative group flex items-center justify-center w-12 h-12 rounded-full shadow-lg">
                    <div
                      className={`flex items-center justify-center w-full h-full rounded-full ${
                        stage.completed ? 'bg-green-600' : 'bg-gray-300'
                      } hover:bg-green-500 focus:bg-green-700 transition-colors`}
                    >
                      {React.cloneElement(stage.icon as React.ReactElement, {
                        className: 'text-white text-xl',
                      })}
                    </div>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max p-2 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                      {stage.description}
                    </div>
                  </div>

                  {/* Stage Details */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xl font-semibold text-gray-800">{stage.label}</h3>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded ${
                          stage.completed
                            ? 'bg-green-200 text-green-800'
                            : 'bg-yellow-200 text-yellow-800'
                        }`}
                      >
                        {stage.completed ? 'Completed' : 'In Progress'}
                      </span>
                    </div>
                    <p className="text-gray-600">{stage.description}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Print Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                Print Tracking Information
              </button>
            </div>
          </div>
        </motion.div>
      </ScrollAnimationWrapper>
      <Footer /> {/* Include Footer Component */}
    </div>
  );
}
