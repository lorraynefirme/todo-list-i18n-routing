import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, type, ...props }: ButtonProps) => {
  return (
    <button {...props} type={type}>
      {children}
    </button>
  );
};
