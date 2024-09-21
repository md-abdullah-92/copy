import React, { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{ backgroundColor: '#EEEFF2' }}>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
