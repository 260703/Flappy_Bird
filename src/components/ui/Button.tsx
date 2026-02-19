import React from 'react';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
}

export const PixelButton: React.FC<PixelButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  ...props 
}) => {
  const baseStyles = "relative font-game font-bold uppercase tracking-wider transition-transform active:translate-y-1 border-4 border-black disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[#54ac42] text-white hover:bg-[#68bd56] shadow-[0_4px_0_#367d2a]",
    secondary: "bg-[#e86101] text-white hover:bg-[#f57a22] shadow-[0_4px_0_#b34b00]",
    accent: "bg-[#4682b4] text-white hover:bg-[#5b9bd5] shadow-[0_4px_0_#2a5a8a]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-8 py-4 text-xl",
    lg: "px-10 py-5 text-2xl",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
