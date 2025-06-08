import React, { ReactNode } from "react";

type ButtonProps = {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  id?: string
};

const Button: React.FC<ButtonProps> = ({
  className = "",
  children,
  onClick,
  id
}) => {
  return (
    <button type="button" className={className} onClick={onClick} id={id}>
      {children}
    </button>
  );
};

export default Button;
