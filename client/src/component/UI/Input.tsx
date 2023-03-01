import { FC } from 'react';

interface InputProps {
  className: string;
  type: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: () => void;
  disabled?: boolean;
}
export const Input: FC<InputProps> = ({
  className,
  type,
  name,
  value,
  placeholder,
  onChange,
  onBlur,
  disabled,
  ...props
}) => {
  return (
    <input
      disabled={disabled}
      placeholder={placeholder}
      className={className}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      {...props}></input>
  );
};
