import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTruck, FaBoxOpen, FaMapMarkerAlt } from 'react-icons/fa';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import ScrollAnimationWrapper from '@/components/Layout/ScrollAnimationWrapper';
import getScrollAnimation from '@/utils/getScrollAnimation';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface TrackingStage {
  id: number;
  label: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
  current: boolean;
}

export default function ProductTracking() {
  const router = useRouter();
  const { productid, deliverystatus } = router.query;
  const [trackingStages, setTrackingStages] = useState<TrackingStage[]>([]);
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const date = new Date().toLocaleDateString();
    setCurrentDate(date);

    if (!deliverystatus || !productid) return;

    const updatedStages: TrackingStage[] = [
      {
        id: 1,
        label: 'Order Received',
        description: 'Your order has been received and is being processed.',
        icon: <FaCheckCircle />,
        completed: ['Packaging Done', 'Waiting for Pickup', 'On the Road', 'Delivered'].includes(deliverystatus as string),
        current: deliverystatus === 'Order Received',
      },
      {
        id: 2,
        label: 'Packaging Done',
        description: 'Your product has been packaged and is ready for shipment.',
        icon: <FaBoxOpen />,
        completed: ['Waiting for Pickup', 'On the Road', 'Delivered'].includes(deliverystatus as string),
        current: deliverystatus === 'Packaging Done',
      },
      {
        id: 3,
        label: 'Waiting for Pickup',
        description: 'Your product is waiting to be picked up by the courier.',
        icon: <FaTruck />,
        completed: ['On the Road', 'Delivered'].includes(deliverystatus as string),
        current: deliverystatus === 'Waiting for Pickup',
      },
      {
        id: 4,
        label: 'On the Road',
        description: 'Your product is on its way to your location.',
        icon: <FaMapMarkerAlt />,
        completed: deliverystatus === 'Delivered',
        current: deliverystatus === 'On the Road',
      },
      {
        id: 5,
        label: 'Delivered',
        description: 'Your product has been delivered to the specified address.',
        icon: <FaCheckCircle />,
        completed: deliverystatus === 'Delivered',
        current: deliverystatus === 'Delivered',
      },
    ];

    setTrackingStages(updatedStages);
  }, [deliverystatus, productid]);

  return (
    <>
    <Head>
      <title>Track Your Order | AgriBazaar</title>
      <link rel="icon" href="/assets/logo.png" />
    </Head>
    <div className="bg-gradient-to-r from-sky-100 to-sky-200 min-h-screen flex flex-col">
      <Header />
      <ScrollAnimationWrapper>
        <motion.div
          className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex-grow mt-20"
          variants={getScrollAnimation()}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
            Track Your Order
          </h1>

          <div className="text-center mb-10">
            <h3 className="text-lg md:text-xl text-gray-700 mb-4">
              <span className="text-green-600 font-medium">Tracking ID:</span>
              <span className="text-red-700 font-semibold ml-1">{productid}</span>
            </h3>
            <p className="text-lg md:text-xl text-gray-700">
              <span className="text-green-600 font-medium">Updated on:</span>
              <span className="text-red-700 font-semibold ml-1">{currentDate}</span>
            </p>
          </div>

          <div className="relative mb-12">
            <div className="absolute top-0 left-0 h-1 w-full bg-gray-300 rounded-full"></div>
            <div
              className="absolute top-0 left-0 h-1 bg-green-500 rounded-full"
              style={{
                width: `${(trackingStages.filter((stage) => stage.completed).length / trackingStages.length) * 100}%`,
              }}
            ></div>
          </div>

          <div className="bg-gradient-to-r from-green-100 to-green-200 shadow-lg rounded-xl p-8 md:p-12">
            <ul className="space-y-10">
              {trackingStages.map((stage) => (
                <li key={stage.id} className="flex flex-col md:flex-row items-center space-x-8">
                  <div className="relative group flex items-center justify-center w-14 h-14 rounded-full shadow-xl">
                    <div
                      className={`flex items-center justify-center w-full h-full rounded-full ${
                        stage.completed
                          ? 'bg-green-500'
                          : stage.current
                          ? 'bg-yellow-500'
                          : 'bg-gray-300'
                      } hover:bg-green-500 focus:bg-green-700 transition-colors`}
                    >
                      {React.cloneElement(stage.icon as React.ReactElement, {
                        className: 'text-white text-3xl',
                      })}
                    </div>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max p-2 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                      {stage.description}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-2xl font-semibold text-gray-800">{stage.label}</h3>
                      <span
                        className={`text-sm font-medium px-3 py-1 rounded-full ${
                          stage.completed
                            ? 'bg-green-200 text-green-800'
                            : stage.current
                            ? 'bg-yellow-200 text-yellow-800'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        {stage.completed ? 'Completed' : stage.current ? 'Current' : 'Upcoming'}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-2">{stage.description}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex justify-center mt-10">
              <button
                onClick={() => window.print()}
                className="px-6 py-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105"
              >
                Print Tracking Information
              </button>
            </div>
          </div>
        </motion.div>
      </ScrollAnimationWrapper>
      <Footer />
    </div>
    </>
  );
}
