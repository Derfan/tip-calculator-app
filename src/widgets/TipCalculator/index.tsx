import { Input, RadioGroup } from '../../components';
import { CalculationResults } from './CalculationResults';
import billIcon from '../../images/icon-dollar.svg';
import personIcon from '../../images/icon-person.svg';
import cn from './styles.module.sass';

export const TipCalculator = () => {
    const tipAmountPerPerson = 0
    const totalAmountPerPerson = 0

    return (
        <form className={cn.root}>
            <div className={cn.controllers}>
                <Input
                    name="bill"
                    label="Bill"
                    type="number"
                    icon={billIcon}
                    placeholder="0"
                />

                <RadioGroup
                    name="tip"
                    label="Select Tip %"
                    items={[
                        { label: '5%', value: 5 },
                        { label: '10%', value: 10 },
                        { label: '15%', value: 15 },
                        { label: '25%', value: 25 },
                        { label: '50%', value: 50 },
                    ]}
                >
                    <Input
                        type='number'
                        name='custom'
                        placeholder="Custom"
                        className={cn.customInput}
                    />
                </RadioGroup>

                <Input
                    type="number"
                    placeholder="0"
                    icon={personIcon}
                    name="numberOfPeople"
                    label="Number of People"
                />
            </div>

            <CalculationResults
                tipAmountPerPerson={tipAmountPerPerson}
                totalAmountPerPerson={totalAmountPerPerson}
            />
        </form>
    );
};
