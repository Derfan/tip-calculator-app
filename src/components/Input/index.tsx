import { FC } from 'react';
import cns from 'classnames';

import cn from './styles.module.sass';

interface InputProps {
    type: string
    name: string
    icon?: string
    label?: string
    error?: string
    placeholder?: string
    className?: string
    defaultValue?: string | number
}

export const Input: FC<InputProps> = ({ type, name, label, placeholder, error, className, icon, defaultValue }) => {
    return (
        <div className={cns(cn.root, className)}>
            <div className={cn.header}>
                {label && <label className={cn.label} htmlFor={name}>{label}</label>}
                {error && <p>{error}</p>}
            </div>
            <input
                id={name}
                type={type}
                className={cn.input}
                placeholder={placeholder}
                defaultValue={defaultValue}
                style={{ backgroundImage: icon ? `url(${icon})` : 'none' }}
            />
        </div>
    );
};
