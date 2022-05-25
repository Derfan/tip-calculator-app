import { FC, ReactNode } from 'react';

import cn from './styles.module.sass';

type Item = {
    label: string
    value: string | number
    checked?: boolean
}

interface RadioGroupProps {
    name: string
    value: number
    items: Item[]
    label?: string
    children?: ReactNode
    onChange: (name: string, field: string) => void
}

export const RadioGroup: FC<RadioGroupProps> = ({ name, value: formValue, label, items, children, onChange }) => {
    function changeHandler(event: any) {
        onChange(name, event.target.value);
    }

    return (
        <div className={cn.root}>
            <label className={cn.label}>{label}</label>

            <div className={cn.elements}>
                {items.map(({ label, value, checked }) => (
                    <div key={label} className={cn.item}>
                        <input type="radio" id={label} value={value} name={name} className={cn.itemInput} checked={value === formValue} defaultChecked={checked} onChange={changeHandler} />
                        <label htmlFor={label} className={cn.itemLabel}>{label}</label>
                    </div>
                ))}

                {children}
            </div>
        </div>
    );
};
