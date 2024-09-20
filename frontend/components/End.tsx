import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import getScrollAnimation from '../utils/getScrollAnimation';
import ScrollAnimationWrapper from './Layout/ScrollAnimationWrapper';

const features = [
  'Direct Farmer-to-Consumer Transactions',
  'AI-Powered Product Pricing',
  'Demand Forecasting for Better Planning',
  'Personalized Product Recommendations',
  'Secure and Transparent Transactions',
  '24/7 AI Customer Support',
  'Quality Assessment of Products',
];

const End = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div
      className="max-w-screen-xl mt-8 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto"
      id="feature"
    >
      <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-2 gap-8 p-8 my-12">
        <ScrollAnimationWrapper className="flex w-full justify-end">
          <motion.div 
            className="h-full w-full p-4"
            variants={scrollAnimation}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <img
              src="/assets/friuts.jpg"
              alt="Agri Bazaar Illustration"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </motion.div>
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>
          <motion.div
            className="flex flex-col items-end justify-center ml-auto w-full lg:w-9/12"
            variants={scrollAnimation}
          >
            <h3 className="text-3xl lg:text-4xl font-bold leading-relaxed text-green-900">
              Discover the Features of Agri Bazaar
            </h3>
            <p className="my-4 text-lg text-green-700">
              Explore the innovative features we offer to enhance your agricultural transactions and planning.
            </p>
            <ul className="text-green-700 self-start list-inside ml-8 space-y-3">
              {features.map((feature, index) => (
                <motion.li
                  className="relative pl-4 custom-list flex items-center"
                  custom={{ duration: 2 + index }}
                  variants={scrollAnimation}
                  key={feature}
                  whileHover={{
                    scale: 1.1,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                >
                  <span className="inline-block w-4 h-4 mr-2 bg-green-500 rounded-full"></span>
                  {feature}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </ScrollAnimationWrapper>
      </div>
    </div>
  );
};

export default End;
