
import { ReactNode } from "react";
import clsx from "clsx";
import Link from "next/link";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline"; 
  size?: "sm" | "md" | "lg"; 
  disabled?: boolean;
  className?: string; 
  icon?: ReactNode; 
  href?: string;
}

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  className,
  icon,
  href,
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium  transition duration-300 ease-in-out focus:outline-none";
  
  const variants = {
    primary: "bg-text-purple-600 hover:bg-secondary-theme text-white  focus:bg-secondary-theme focus:text-primary-1 focus:border-none font-bold",
    secondary: "bg-white text-primary-theme hover:bg-secondary-theme hover:text-white  leading-4 tracking-wider focus:bg-secondary-theme focus:text-white",
    outline: "bg-transparent border border-text-purple-600  text-primary-theme hover:bg-secondary-theme hover:text-white focus:bg-secondary-theme focus:text-primary-1 focus:border-none",
  };

  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-md",
    lg: "px-6 py-3 text-lg",
  };

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";


  if (href) {
    return (
      <Link href={href} className={clsx(baseStyles, variants[variant], sizes[size], disabledStyles, className)}
      onClick={onClick} 
      aria-disabled={disabled} >       
          {icon && <span className="mr-2">{icon}</span>}
          {children}     
      </Link>
    );
  }


  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        disabledStyles,
        className 
      )}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;

