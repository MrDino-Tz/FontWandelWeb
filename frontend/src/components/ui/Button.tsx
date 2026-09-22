import type { MouseEvent, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  to?: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: MouseEvent) => void;
}

const variants: Record<string, string> = {
  primary:
    'bg-gold-500 hover:bg-gold-600 focus:bg-gold-600 border border-transparent text-black',
  secondary:
    'hover:border-teal-700 hover:bg-teal-700 border-teal-800 border-2 text-slate-800 hover:text-white',
  tertiary: 'bg-teal-50 hover:bg-teal-50/80',
};

export default function Button({
  to,
  href,
  variant = 'primary',
  className = '',
  children,
  type = 'button',
  onClick,
}: ButtonProps) {
  const cls = `rounded-lg px-6 py-2.5 text-center font-medium transition-colors duration-300 focus:outline-hidden ${variants[variant]} ${className}`;
  if (to) {
    return (
      <Link to={to} className={cls} onClick={onClick}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick}>
      {children}
    </button>
  );
}
