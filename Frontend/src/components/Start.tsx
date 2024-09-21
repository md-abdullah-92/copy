import React, { useMemo } from 'react';
import ButtonPrimary from './Buttons/ButtonPrimary';
import { motion } from 'framer-motion';
import getScrollAnimation from '../utils/getScrollAnimation';
import ScrollAnimationWrapper from './Layout/ScrollAnimationWrapper';
import { useRouter } from 'next/router';

const Start = ({
  listUser = [
    {
      name: 'Registered Farmers',
      number: '10k+',
      icon: '/assets/farmars.jpeg',
    },
    {
      name: 'Product Listings',
      number: '100k+',
      icon: '/assets/products.jpg',
    },
    {
      name: 'Satisfied Customers',
      number: '5k+',
      icon: '/assets/OIP.jpg',
    },

  ],
}) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  const router = useRouter();

  return (
    <div
      className="relative bg-gradient-to-b from-green-300 via-green-100 to-white max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto rounded-lg shadow-lg"
      id="about"
    >
      <ScrollAnimationWrapper>
        <motion.div
          className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16"
          variants={scrollAnimation}
        >
          <div className="flex flex-col justify-center items-start row-start-2 sm:row-start-1">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-green-900 leading-tight tracking-tight">
              The Digital Marketplace Where Agriculture Meets Innovation
            </h1>
            <p className="text-lg lg:text-xl text-green-700 mt-4 mb-6 leading-relaxed">
              Agri Bazaar: Empowering farmers, enhancing trade, and driving growth in agriculture.
              <br /> Join us today and experience the future of farming!
            </p>
            <ButtonPrimary onClick={() => router.push('/signup')}>
              Get Started
            </ButtonPrimary>
          </div>
          <div className="flex w-full p-6">
            <motion.div
              className="h-full w-full"
              variants={scrollAnimation}
              whileHover={{ scale: 1.05, transition: { duration: 0.5 } }}
            >
              <img
                src="/assets/farmers.jpeg"
                alt="Agri Bazaar Illustration"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </motion.div>
      </ScrollAnimationWrapper>
      <div className="relative w-full flex">
        <ScrollAnimationWrapper className="rounded-lg w-full grid grid-flow-row sm:grid-flow-row grid-cols-1 sm:grid-cols-3 py-9 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-gray-200 bg-white shadow-md z-10">
          {listUser.map((listUsers, index) => (
            <motion.div
              className="flex items-center justify-start sm:justify-center py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0"
              key={index}
              custom={{ duration: 2 + index }}
              variants={scrollAnimation}
            >
              <div className="flex mx-auto w-40 sm:w-auto">
                <div className="flex items-center justify-center bg-green-100 w-12 h-12 mr-6 rounded-full shadow-lg">
                  <img src={listUsers.icon} className="h-6 w-6" />
                </div>
                <div className="flex flex-col">
                  <p className="text-2xl text-green-900 font-extrabold">
                    {listUsers.number}
                  </p>
                  <p className="text-lg text-green-700">{listUsers.name}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </ScrollAnimationWrapper>
        <div
          className="absolute bg-green-600 opacity-5 w-11/12 rounded-lg h-64 sm:h-48 top-0 mt-8 mx-auto left-0 right-0"
          style={{ filter: 'blur(114px)' }}
        ></div>
      </div>
    </div>
  );
};

export default Start;
