import { FC, ReactNode } from "react";
import cns from "classnames";

import cn from "./styles.module.sass";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  children?: ReactNode;
  onClick: () => void;
}

export const Button: FC<ButtonProps> = ({
  type,
  className,
  disabled,
  children,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={cns(className, cn.button, { [cn.disabled]: disabled })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
