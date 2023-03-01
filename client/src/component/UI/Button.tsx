import React from 'react';
import './Button.css';

interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  children: string;
  color:
    | 'orange'
    | 'blue'
    | 'red'
    | 'clear'
    | 'disabled_add'
    | 'update'
    | 'update_disabled'
    | 'logout'
    | 'login'
    | 'registration'
    | 'cancel';
}

export const Button: React.FC<ButtonProps> = ({ children, color, onClick, ...props }) => {
  const className = `${'button'} ${[`button_${color}`]}`;

  return (
    <button className={className} onClick={onClick} {...props}>
      {children}
    </button>
  );
};
