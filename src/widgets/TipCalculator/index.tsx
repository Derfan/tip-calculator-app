import { Input, RadioGroup } from '../../components';
import { CalculationResults } from './CalculationResults';
import { useCalculatorForm } from './useCalculatorForm';

import billIcon from '../../images/icon-dollar.svg';
import personIcon from '../../images/icon-person.svg';
import cn from './styles.module.sass';

const tipOptions = [
    { label: '5%', value: 5 },
    { label: '10%', value: 10 },
    { label: '15%', value: 15 },
    { label: '25%', value: 25 },
    { label: '50%', value: 50 },
];

export const TipCalculator = () => {
    const { formState, changeFormField, resetForm } = useCalculatorForm();

    return (
        <form className={cn.root}>
            <div className={cn.controllers}>
                <Input
                    name="bill"
                    value={formState.bill}
                    label="Bill"
                    type="number"
                    icon={billIcon}
                    placeholder="0"
                    onChange={changeFormField}
                />

                <RadioGroup
                    name="tip"
                    label="Select Tip %"
                    value={formState.tip}
                    items={tipOptions}
                    onChange={changeFormField}
                >
                    <Input
                        type='number'
                        name='customTip'
                        value={formState.customTip}
                        placeholder="Custom"
                        className={cn.customInput}
                        onChange={changeFormField}
                    />
                </RadioGroup>

                <Input
                    type="number"
                    value={formState.numberOfPeople}
                    placeholder="0"
                    icon={personIcon}
                    name="numberOfPeople"
                    label="Number of People"
                    onChange={changeFormField}
                />
            </div>

            <CalculationResults
                className={cn.results}
                tipAmountPerPerson={formState.tipAmountPerPerson}
                totalAmountPerPerson={formState.totalAmountPerPerson}
                onResetButtonClick={resetForm}
            />
        </form>
    );
};
