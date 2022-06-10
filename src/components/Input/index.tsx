import { FC } from "react";
import cns from "classnames";

import cn from "./styles.module.sass";

interface InputProps {
  type: string;
  name: string;
  value: string;
  icon?: string;
  label?: string;
  error?: string;
  placeholder?: string;
  className?: string;
  defaultValue?: string | number;
  onChange: (name: string, value: string) => void;
  onClick?: () => void;
}

export const Input: FC<InputProps> = ({
  type,
  name,
  value,
  label,
  placeholder,
  error,
  className,
  icon,
  defaultValue,
  onChange,
  onClick,
}) => {
  function changeHandler(event: any) {
    onChange(name, event.target.value);
  }

  return (
    <div className={cns(cn.root, className)} onClick={onClick}>
      {label && (
        <div className={cn.header}>
          <label className={cn.label} htmlFor={name}>
            {label}
          </label>
          {error && <p className={cn.error}>{error}</p>}
        </div>
      )}

      <input
        id={name}
        type={type}
        value={value ?? ""}
        className={cns(cn.input, { [cn.error]: error })}
        placeholder={placeholder}
        defaultValue={defaultValue}
        style={{ backgroundImage: icon ? `url(${icon})` : "none" }}
        onChange={changeHandler}
      />
    </div>
  );
};
