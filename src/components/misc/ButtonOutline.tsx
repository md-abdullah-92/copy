import React, { ReactNode } from 'react';

interface ButtonOutlineProps {
  children: ReactNode;
  onClick?: () => void;
}

const ButtonOutline: React.FC<ButtonOutlineProps> = ({ children, onClick }) => {
  return (
    <button
      className="btn-outline font-medium tracking-wide py-2 px-5 sm:px-8 rounded-full capitalize transition-all"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonOutline;
