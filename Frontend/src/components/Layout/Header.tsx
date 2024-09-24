import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { FaBox, FaUser, FaTractor, FaShoppingCart,FaSearch } from 'react-icons/fa'; // Import FaShoppingCart for cart
import ButtonOutline from '../Buttons/ButtonOutline'; // Import ButtonOutline if needed

const Header = () => {
  const router = useRouter();
  const { pathname, query } = router;
  //const pathname = router.pathname; // Get the current pathname
  const [scrollActive, setScrollActive] = useState(false);
  const [logged, setLogged] = useState<string | null>(null);

  useEffect(() => {
    const profile = localStorage.getItem('profile');
    if (profile) setLogged(profile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollActive(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={
        'fixed top-0 z-30 w-full bg-green-200 border-b border-green-300 transition-all ' +
        (scrollActive ? 'pt-0 shadow-md' : '')
      }
    >
      <nav className="flex items-center justify-between max-w-screen-xl px-6 py-4 mx-auto lg:px-16">
        {/* Logo and Site Name */}
        <a className="flex items-center">
          <img src="/assets/logo.png" alt="Logo" className="h-10 w-auto mr-3" />
          <span style={{ fontFamily: 'Caveat Brush, cursive', fontSize: '35px' }}>
            AgriBazaar
          </span>
        </a>

        {/* Conditional Navigation Links */}
        <div className="flex items-center space-x-4">
          {pathname === '/' && (
            <>
              <Link
                href="/login"
                className="capitalize tracking-wide text-black-600 transition-all hover:text-green-500"
              >
                Sign In
              </Link>
              <ButtonOutline onClick={() => router.push('/signup')}>
                Sign Up
              </ButtonOutline>
            </>
          )}
          {pathname == '/orders' && (
            <>
              <button
                onClick={() => router.push('/farmerdashboard#products')}
                className="flex items-center text-green-800 hover:text-green-600 transition-colors duration-300"
                aria-label="Manage Products"
              >
                <FaBox size={22} />
                <span
                  className="ml-2 text-sm font-semibold"
                  style={{ fontFamily: 'Caveat Brush, cursive', color: 'black' }}
                >
                  Manage Products
                </span>
              </button>
              <button
                onClick={() => router.push('/farmerdashboard')}
                className="flex items-center text-green-800 hover:text-green-600 transition-colors duration-300"
                aria-label="Dashboard"
              >
                <FaUser size={22} />
                <span
                  className="ml-2 text-sm font-semibold"
                  style={{ fontFamily: 'Caveat Brush, cursive', color: 'black' }}
                >
                  Dashboard
                </span>
              </button>
            </>
          )}
          
          
          
          {pathname === '/BrowseProducts' && (
            <div className="flex items-center space-x-4">
              {/* Cart Button */}
              <button
                onClick={() => router.push('/cartpage')}
                 className="flex items-center text-green-800 hover:text-green-600 transition-colors duration-300"
                aria-label="cart"
              >
                <FaShoppingCart size={22} />
                {/* Add cart count badge if needed */}
                <span
                className="ml-2 text-sm font-semibold"
                style={{ fontFamily: 'Caveat Brush, cursive', color: 'black' }}
              >
                Cart
              </span>
              </button>
              {/* Account Button */}
              <button
                onClick={() => router.push('/buyerdashboard')}
                  className="flex items-center text-green-800 hover:text-green-600 transition-colors duration-300"
                aria-label="dashboard"
              >
                <FaUser size={22} />
                <span
                className="ml-2 text-sm font-semibold"
                style={{ fontFamily: 'Caveat Brush, cursive', color: 'black' }}
              >
                Dashboard
              </span>
              </button>
            </div>
          )}
          {/* Product Details Icon */}
          {pathname === '/product-details' && query.id && (
                       <div className="flex items-center space-x-4">
                         <button
              onClick={() => router.push('/BrowseProducts')}
               className="flex items-center text-green-800 hover:text-green-600 transition-colors duration-300"
             // aria-label="cart"
            >
              <FaSearch size={22} />
              {/* Add cart count badge if needed */}
              <span
              className="ml-2 text-sm font-semibold"
              style={{ fontFamily: 'Caveat Brush, cursive', color: 'black' }}
            >
              Browse Products
            </span>
            </button>
                       {/* Cart Button */}
                       <button
                         onClick={() => router.push('/buyerdashboard')}
                          className="flex items-center text-green-800 hover:text-green-600 transition-colors duration-300"
                         aria-label="cart"
                       >
                      <FaShoppingCart size={22} />
                         {/* Add cart count badge if needed */}
                         <span
                         className="ml-2 text-sm font-semibold"
                         style={{ fontFamily: 'Caveat Brush, cursive', color: 'black' }}
                       >
                         Cart
                       </span>
                       </button>
                       {/* Account Button */}
                       <button
                         onClick={() => router.push('/buyerdashboard')}
                           className="flex items-center text-green-800 hover:text-green-600 transition-colors duration-300"
                         aria-label="dashboard"
                       >
                         <FaUser size={22} />
                         <span
                         className="ml-2 text-sm font-semibold"
                         style={{ fontFamily: 'Caveat Brush, cursive', color: 'black' }}
                       >
                         Dashboard
                       </span>
                       </button>
                     </div>
          )}
          {/* Buy Icon for /buy Route */}
          {pathname === '/buy' && query.productid && (
                                <div className="flex items-center space-x-4">
                                            <button
              onClick={() => router.push('/BrowseProducts')}
               className="flex items-center text-green-800 hover:text-green-600 transition-colors duration-300"
             // aria-label="cart"
            >
               <FaSearch size={22} />
              {/* Add cart count badge if needed */}
              <span
              className="ml-2 text-sm font-semibold"
              style={{ fontFamily: 'Caveat Brush, cursive', color: 'black' }}
            >
              Browse Products
            </span>
            </button>
                                {/* Cart Button */}
                                <button
                                  onClick={() => router.push('/cartpage')}
                                   className="flex items-center text-green-800 hover:text-green-600 transition-colors duration-300"
                                  aria-label="cart"
                                >
                                  <FaShoppingCart size={22} />
                                  {/* Add cart count badge if needed */}
                                  <span
                                  className="ml-2 text-sm font-semibold"
                                  style={{ fontFamily: 'Caveat Brush, cursive', color: 'black' }}
                                >
                                  Cart
                                </span>
                                </button>
                                {/* Account Button */}
                                <button
                                  onClick={() => router.push('/buyerdashboard')}
                                    className="flex items-center text-green-800 hover:text-green-600 transition-colors duration-300"
                                  aria-label="dashboard"
                                >
                                  <FaUser size={22} />
                                  <span
                                  className="ml-2 text-sm font-semibold"
                                  style={{ fontFamily: 'Caveat Brush, cursive', color: 'black' }}
                                >
                                  Dashboard
                                </span>
                                </button>
                              </div>
          )}
           {/* Payment Icon for /payment Route */}
           {pathname === '/payment' && query.productid && (
            <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <button
              onClick={() => router.push('/BrowseProducts')}
               className="flex items-center text-green-800 hover:text-green-600 transition-colors duration-300"
             // aria-label="cart"
            >
               <FaSearch size={22} />
              {/* Add cart count badge if needed */}
              <span
              className="ml-2 text-sm font-semibold"
              style={{ fontFamily: 'Caveat Brush, cursive', color: 'black' }}
            >
              Browse Products
            </span>
            </button>
            <button
              onClick={() => router.push('/cartpage')}
               className="flex items-center text-green-800 hover:text-green-600 transition-colors duration-300"
              aria-label="cart"
            >
              <FaShoppingCart size={22} />
              {/* Add cart count badge if needed */}
              <span
              className="ml-2 text-sm font-semibold"
              style={{ fontFamily: 'Caveat Brush, cursive', color: 'black' }}
            >
              Cart
            </span>
            </button>
            {/* Account Button */}
            <button
              onClick={() => router.push('/buyerdashboard')}
                className="flex items-center text-green-800 hover:text-green-600 transition-colors duration-300"
              aria-label="dashboard"
            >
              <FaUser size={22} />
              <span
              className="ml-2 text-sm font-semibold"
              style={{ fontFamily: 'Caveat Brush, cursive', color: 'black' }}
            >
              Dashboard
            </span>
            </button>
          </div>
          )}
             {pathname === '/confirmation' && query.productid && (
            <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <button
              onClick={() => router.push('/BrowseProducts')}
               className="flex items-center text-green-800 hover:text-green-600 transition-colors duration-300"
             // aria-label="cart"
            >
               <FaSearch size={22} />
              {/* Add cart count badge if needed */}
              <span
              className="ml-2 text-sm font-semibold"
              style={{ fontFamily: 'Caveat Brush, cursive', color: 'black' }}
            >
              Browse Products
            </span>
            </button>
            <button
              onClick={() => router.push('/cartpage')}
               className="flex items-center text-green-800 hover:text-green-600 transition-colors duration-300"
              aria-label="cart"
            >
              <FaShoppingCart size={22} />
              {/* Add cart count badge if needed */}
              <span
              className="ml-2 text-sm font-semibold"
              style={{ fontFamily: 'Caveat Brush, cursive', color: 'black' }}
            >
              Cart
            </span>
            </button>
            {/* Account Button */}
            <button
              onClick={() => router.push('/buyerdashboard')}
                className="flex items-center text-green-800 hover:text-green-600 transition-colors duration-300"
              aria-label="dashboard"
            >
              <FaUser size={22} />
              <span
              className="ml-2 text-sm font-semibold"
              style={{ fontFamily: 'Caveat Brush, cursive', color: 'black' }}
            >
              Dashboard
            </span>
            </button>
          </div>
          )}

          {pathname === '/paymentslip' && query.productid && (
            <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <button
              onClick={() => router.push('/BrowseProducts')}
               className="flex items-center text-green-800 hover:text-green-600 transition-colors duration-300"
             // aria-label="cart"
            >
               <FaSearch size={22} />
              {/* Add cart count badge if needed */}
              <span
              className="ml-2 text-sm font-semibold"
              style={{ fontFamily: 'Caveat Brush, cursive', color: 'black' }}
            >
              Browse Products
            </span>
            </button>
            <button
              onClick={() => router.push('/cartpage')}
               className="flex items-center text-green-800 hover:text-green-600 transition-colors duration-300"
              aria-label="cart"
            >
              <FaShoppingCart size={22} />
              {/* Add cart count badge if needed */}
              <span
              className="ml-2 text-sm font-semibold"
              style={{ fontFamily: 'Caveat Brush, cursive', color: 'black' }}
            >
              Cart
            </span>
            </button>
            {/* Account Button */}
            <button
              onClick={() => router.push('/buyerdashboard')}
                className="flex items-center text-green-800 hover:text-green-600 transition-colors duration-300"
              aria-label="dashboard"
            >
              <FaUser size={22} />
              <span
              className="ml-2 text-sm font-semibold"
              style={{ fontFamily: 'Caveat Brush, cursive', color: 'black' }}
            >
              Dashboard
            </span>
            </button>
          </div>
          )}

          {pathname === '/cartpage' && (
            <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <button
              onClick={() => router.push('/BrowseProducts')}
               className="flex items-center text-green-800 hover:text-green-600 transition-colors duration-300"
             // aria-label="cart"
            >
               <FaSearch size={22} />
              {/* Add cart count badge if needed */}
              <span
              className="ml-2 text-sm font-semibold"
              style={{ fontFamily: 'Caveat Brush, cursive', color: 'black' }}
            >
              Browse Products
            </span>
            </button>
            {/* Account Button */}
            <button
              onClick={() => router.push('/buyerdashboard')}
                className="flex items-center text-green-800 hover:text-green-600 transition-colors duration-300"
              aria-label="dashboard"
            >
              <FaUser size={22} />
              <span
              className="ml-2 text-sm font-semibold"
              style={{ fontFamily: 'Caveat Brush, cursive', color: 'black' }}
            >
              Dashboard
            </span>
            </button>
          </div>
          )}
          
        {pathname === '/agent-browse' && (
            <div className="flex items-center space-x-4">
            {/* Cart Button */}
          
            {/* Account Button */}
            <button
              onClick={() => router.push('/agentdashboard')}
                className="flex items-center text-green-800 hover:text-green-600 transition-colors duration-300"
              aria-label="dashboard"
            >
              <FaUser size={22} />
              <span
              className="ml-2 text-sm font-semibold"
              style={{ fontFamily: 'Caveat Brush, cursive', color: 'black' }}
            >
              Dashboard
            </span>
            </button>
          </div>
          )}
          {pathname === '/agent-otp-verification' && (
            <div className="flex items-center space-x-4">
            {/* Cart Button */}
          
            {/* Account Button */}
            <button
              onClick={() => router.push('/agentdashboard')}
                className="flex items-center text-green-800 hover:text-green-600 transition-colors duration-300"
              aria-label="dashboard"
            >
              <FaUser size={22} />
              <span
              className="ml-2 text-sm font-semibold"
              style={{ fontFamily: 'Caveat Brush, cursive', color: 'black' }}
            >
              Dashboard
            </span>
            </button>
          </div>
          )}
            {pathname === '/agent-orders' && (
            <div className="flex items-center space-x-4">
            {/* Cart Button */}
          
            {/* Account Button */}
            <button
              onClick={() => router.push('/agentdashboard')}
                className="flex items-center text-green-800 hover:text-green-600 transition-colors duration-300"
              aria-label="dashboard"
            >
              <FaUser size={22} />
              <span
              className="ml-2 text-sm font-semibold"
              style={{ fontFamily: 'Caveat Brush, cursive', color: 'black' }}
            >
              Dashboard
            </span>
            </button>
          </div>
          )}
             {pathname === '/agent-manage-products' && (
            <div className="flex items-center space-x-4">
            {/* Cart Button */}
          
            
            <button
              onClick={() => router.push('/agentdashboard')}
                className="flex items-center text-green-800 hover:text-green-600 transition-colors duration-300"
              aria-label="dashboard"
            >
              <FaUser size={22} />
              <span
              className="ml-2 text-sm font-semibold"
              style={{ fontFamily: 'Caveat Brush, cursive', color: 'black' }}
            >
              Dashboard
            </span>
            </button>
          </div>
          )}
           {pathname === '/chatpage' && (
            <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
                className="flex items-center text-green-800 hover:text-green-600 transition-colors duration-300"
              aria-label="dashboard"
            >
              <FaUser size={22} />
              <span
              className="ml-2 text-sm font-semibold"
              style={{ fontFamily: 'Caveat Brush, cursive', color: 'black' }}
            >
              Dashboard
            </span>
            </button>
          </div>
          )}

          {pathname === '/chatbot-farmer' && (
            <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
                className="flex items-center text-green-800 hover:text-green-600 transition-colors duration-300"
              aria-label="dashboard"
            >
              <FaUser size={22} />
              <span
              className="ml-2 text-sm font-semibold"
              style={{ fontFamily: 'Caveat Brush, cursive', color: 'black' }}
            >
              Dashboard
            </span>
            </button>
          </div>
          )}
           {pathname === '/agent-list' && (
            <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
                className="flex items-center text-green-800 hover:text-green-600 transition-colors duration-300"
              aria-label="dashboard"
            >
              <FaUser size={22} />
              <span
              className="ml-2 text-sm font-semibold"
              style={{ fontFamily: 'Caveat Brush, cursive', color: 'black' }}
            >
              Dashboard
            </span>
            </button>
          </div>
          )}

          {pathname === '/product-tracking' && (
            <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
                className="flex items-center text-green-800 hover:text-green-600 transition-colors duration-300"
              aria-label="dashboard"
            >
              <FaUser size={22} />
              <span
              className="ml-2 text-sm font-semibold"
              style={{ fontFamily: 'Caveat Brush, cursive', color: 'black' }}
            >
              Dashboard
            </span>
            </button>
          </div>
          )}
         {pathname === '/soldproduct-details' && (
            <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
                className="flex items-center text-green-800 hover:text-green-600 transition-colors duration-300"
              aria-label="dashboard"
            >
              <FaUser size={22} />
              <span
              className="ml-2 text-sm font-semibold"
              style={{ fontFamily: 'Caveat Brush, cursive', color: 'black' }}
            >
              Dashboard
            </span>
            </button>
          </div>
          )}
            {(pathname === '/login'||pathname==='/signup') && (
            <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/')}
                className="flex items-center text-green-800 hover:text-green-600 transition-colors duration-300"
              aria-label="dashboard"
            >
              <FaUser size={22} />
              <span
              className="ml-2 text-sm font-semibold"
              style={{ fontFamily: 'Caveat Brush, cursive', color: 'black' }}
            >
              Home
            </span>
            </button>
          </div>
          )}
          {logged && (
            <button
              onClick={() => {
                localStorage.removeItem('profile');
                setLogged(null);
                router.push('/');
              }}
              className="ml-4 px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-full hover:bg-green-400 transition-colors duration-300"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
