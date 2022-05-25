import { useReducer } from 'react';

enum ACTION_TYPES {
    CHANGE_FIELD = 'changeField',
    RECALCULATE_AMOUNT = 'recalculateAmount',
    RESET_FORM = 'resetForm'
}

enum FIELDS {
    BILL = 'bill',
    TIP = 'tip',
    CUSTOM_TIP = 'customTip',
    NUMBER_OF_PEOPLE = 'numberOfPeople',
}

export const initialState = {
    [FIELDS.BILL]: null,
    [FIELDS.TIP]: null,
    [FIELDS.CUSTOM_TIP]: null,
    [FIELDS.NUMBER_OF_PEOPLE]: null,
    tipAmountPerPerson: 0,
    totalAmountPerPerson: 0,
};

export const reducer = (state: any, action: any) => {
    switch (action.type) {
        case ACTION_TYPES.CHANGE_FIELD: {
            const { name, value } = action.payload;
            const result = { ...state, [name]: value || null };

            if (name === FIELDS.TIP) result[FIELDS.CUSTOM_TIP] = null;
            if (name === FIELDS.CUSTOM_TIP) result[FIELDS.TIP] = null;
            if (!value) {
                result.tipAmountPerPerson = 0;
                result.totalAmountPerPerson = 0;
            }

            return result;
        }
        case ACTION_TYPES.RECALCULATE_AMOUNT: {
            const { bill, tip, customTip, numberOfPeople } = state;
            const tipValue = customTip || tip;

            if (bill && tipValue && numberOfPeople) {
                const tipAmount = bill / 100 * tipValue;
                const totalAmount = bill + tipAmount;

                return {
                    ...state,
                    tipAmountPerPerson: tipAmount ? tipAmount / numberOfPeople : 0,
                    totalAmountPerPerson: totalAmount ? totalAmount / numberOfPeople : 0,
                };
            }

            return state;
        }
        case ACTION_TYPES.RESET_FORM:
            return initialState;
        default:
            throw new Error('Unknown action type');
    }
};

export const useCalculatorForm = () => {
    const [formState, dispatch] = useReducer(reducer, initialState);

    function onChangeHandler(fieldName: string, fieldValue: string) {
        dispatch({ type: ACTION_TYPES.CHANGE_FIELD, payload: { name: fieldName, value: +fieldValue } });
        dispatch({ type: ACTION_TYPES.RECALCULATE_AMOUNT });
    }
    function onResetForm() {
        dispatch({ type: ACTION_TYPES.RESET_FORM })
    }

    return {
        formState,
        changeFormField: onChangeHandler,
        resetForm: onResetForm
    }
}
