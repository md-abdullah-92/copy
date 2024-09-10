import Image from 'next/image';
import React from 'react';

const Footer = () => {
  return (
    <div style={{ backgroundColor: '#90EE90' }} className="pt-4 pb-4">
      <div className="max-w-screen-xl w-full mx-auto px-6 sm:px-8 lg:px-16 grid grid-rows-6 sm:grid-rows-1 grid-flow-row sm:grid-flow-col grid-cols-3 sm:grid-cols-12 gap-4">
        <div className="row-span-2 sm:col-span-4 col-start-1 col-end-4 sm:col-end-5 flex flex-col items-start">
          <div className="col-start-1 col-end-2 flex items-center">
          <img src="/assets/logo.png" className="h-12 w-auto" />
            <div style={{ fontFamily: 'Caveat Brush, cursive', fontSize: '35px' }}>
              AgriBazar
            </div>
          </div>
          <p className="font-bold text-black">
            ©{new Date().getFullYear()} - Team SUST_UNKNOWNS
          </p>
        </div>
        <div className="row-span-2 sm:col-span-4 col-start-9 col-end-12 sm:col-end-13 flex flex-col items-end text-right">
          <p className="font-bold text-black">Contact</p>
          <p className="text-black">Md Abdullah al Mahadi Apurbo</p>
          <p className="text-black">Nobel Ahmad Badhon</p>
          <p className="text-black">01603252292</p>
          
        </div>
      </div>
    </div>
  );
};

export default Footer;
