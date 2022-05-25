import { FC, ReactNode } from 'react';

import cn from './styles.module.sass';

type Item = {
    label: string
    value: string | number
    checked?: boolean
}

interface RadioGroupProps {
    name: string
    items: Item[]
    label?: string
    children?: ReactNode
}

export const RadioGroup: FC<RadioGroupProps> = ({ name, label, items, children }) => {
    return (
        <div className={cn.root}>
            <label className={cn.label}>{label}</label>

            <div className={cn.elements}>
                {items.map(({ label, value, checked }) => (
                    <div key={label} className={cn.item}>
                        <input type="radio" id={label} value={value} name={name} className={cn.itemInput} defaultChecked={checked} />
                        <label htmlFor={label} className={cn.itemLabel}>{label}</label>
                    </div>
                ))}

                {children}
            </div>
        </div>
    );
};
