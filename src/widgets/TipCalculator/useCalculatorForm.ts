import { useReducer } from 'react';

enum ACTION_TYPES {
    CHANGE_FIELD = 'changeField',
    RECALCULATE_AMOUNT = 'recalculateAmount',
    RESET_FORM = 'resetForm'
}

export const initialState = {
    bill: null,
    tip: null,
    numberOfPeople: null,
    tipAmountPerPerson: null,
    totalAmountPerPerson: null,
};

export const reducer = (state: any, action: any) => {
    switch (action.type) {
        case ACTION_TYPES.CHANGE_FIELD: {
            const { name, value } = action.payload;

            return {
                ...state,
                [name]: value || 0,
            };
        }
        case ACTION_TYPES.RECALCULATE_AMOUNT: {
            const { bill, tip, numberOfPeople } = state;
            let tipAmount = 0;
            let totalAmount = 0;

            if (bill && tip && numberOfPeople) {
                tipAmount = state.bill / 100 * state.tip;
                totalAmount = state.bill + tipAmount;
            }

            return {
                ...state,
                tipAmountPerPerson: tipAmount ? tipAmount / state.numberOfPeople : 0,
                totalAmountPerPerson: totalAmount ? totalAmount / state.numberOfPeople : 0,
            };
        }
        case ACTION_TYPES.RESET_FORM:
            return initialState;
        default:
            throw new Error();
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
