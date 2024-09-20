// components/Button.tsx
import React, { MouseEventHandler } from 'react';

type ButtonProps = {
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onMouseOverColor?: string;
  backgroundColor: string;
  textColor: string;
  flexGrow?: number;
  type?: 'button' | 'submit';
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  onMouseOverColor,
  backgroundColor,
  textColor,
  flexGrow = 1,
  type = 'button',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        padding: '12px',
        fontSize: '16px',
        borderRadius: '6px',
        border: 'none',
        backgroundColor,
        color: textColor,
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        flexGrow,
      }}
      onMouseOver={(e) => onMouseOverColor && (e.currentTarget.style.backgroundColor = onMouseOverColor)}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = backgroundColor)}
    >
      {label}
    </button>
  );
};

export default Button;
