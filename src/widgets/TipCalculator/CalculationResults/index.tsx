import { FC } from 'react';
import { Button } from '../../../components';

import cn from './styles.module.sass';

interface CalculationResultsProps {
    tipAmountPerPerson: number
    totalAmountPerPerson: number
}

const formatCurrency = (amount: number): string => {
    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

    return formatter.format(amount);
};

export const CalculationResults: FC<CalculationResultsProps> = ({ tipAmountPerPerson, totalAmountPerPerson }) => {
    return (
        <div className={cn.root}>
            <div className={cn.item}>
                <div className={cn.itemText}>
                    <span>Tip Amount</span>
                    <span className={cn.modifier}>/ person</span>
                </div>
                <div className={cn.itemValue}>{formatCurrency(tipAmountPerPerson)}</div>
            </div>
            <div className={cn.item}>
                <div className={cn.itemText}>
                    <span>Total</span>
                    <span className={cn.modifier}>/ person</span>
                </div>
                <div className={cn.itemValue}>{formatCurrency(totalAmountPerPerson)}</div>
            </div>

            <Button
                type="reset"
                className={cn.button}
                disabled={tipAmountPerPerson === 0 || totalAmountPerPerson === 0}
            >
                Reset
            </Button>
        </div>
    );
};
