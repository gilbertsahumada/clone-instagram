import React from 'react';

interface ButtonProps {
    variant?: 'ghost' | 'default' | 'outline';
    size?: 'icon' | 'default';
    onClick?: () => void;
    children: React.ReactNode;
  }
  


  const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="bg-black hover:bg-white hover:text-black hover:border text-white font-bold py-2 px-4 rounded-xl"
    >
      {children}
    </button>
  );
};

export default Button;