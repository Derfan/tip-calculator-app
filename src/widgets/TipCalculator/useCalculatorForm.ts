import { useReducer } from "react";

enum ACTION_TYPE {
  CHANGE_FIELD,
  RECALCULATE_AMOUNT,
  RESET_FORM,
}

enum FIELD {
  BILL,
  TIP,
  CUSTOM_TIP,
  NUMBER_OF_PEOPLE,
}

interface FormReducerState {
  [FIELD.BILL]: number | null;
  [FIELD.TIP]: number | null;
  [FIELD.CUSTOM_TIP]: number | null;
  [FIELD.NUMBER_OF_PEOPLE]: number | null;
  tipAmountPerPerson: number;
  totalAmountPerPerson: number;
}

export const initialState = {
  [FIELD.BILL]: null,
  [FIELD.TIP]: null,
  [FIELD.CUSTOM_TIP]: null,
  [FIELD.NUMBER_OF_PEOPLE]: null,
  tipAmountPerPerson: 0,
  totalAmountPerPerson: 0,
};

export const reducer = (state: FormReducerState, action: any) => {
  switch (action.type) {
    case ACTION_TYPE.CHANGE_FIELD: {
      const { name, value } = action.payload;
      const result = { ...state, [name]: value || null };

      if (name === FIELD.TIP) result[FIELD.CUSTOM_TIP] = null;
      if (name === FIELD.CUSTOM_TIP) result[FIELD.TIP] = null;
      if (!value) {
        result.tipAmountPerPerson = 0;
        result.totalAmountPerPerson = 0;
      }

      return result;
    }
    case ACTION_TYPE.RECALCULATE_AMOUNT: {
      const {
        [FIELD.BILL]: bill,
        [FIELD.TIP]: tip,
        [FIELD.CUSTOM_TIP]: customTip,
        [FIELD.NUMBER_OF_PEOPLE]: numberOfPeople,
      } = state;
      const tipValue = customTip || tip || 0;

      if (bill && numberOfPeople) {
        const tipAmount = (bill / 100) * tipValue;
        const totalAmount = bill + tipAmount;

        return {
          ...state,
          tipAmountPerPerson: tipAmount ? tipAmount / numberOfPeople : 0,
          totalAmountPerPerson: totalAmount ? totalAmount / numberOfPeople : 0,
        };
      }

      return state;
    }
    case ACTION_TYPE.RESET_FORM:
      return initialState;
    default:
      throw new Error("Unknown action type");
  }
};

export const useCalculatorForm = () => {
  const [formState, dispatch] = useReducer(reducer, initialState);

  function onChangeHandler(fieldName: string, fieldValue: string) {
    dispatch({
      type: ACTION_TYPE.CHANGE_FIELD,
      payload: { name: fieldName, value: +fieldValue },
    });
    dispatch({ type: ACTION_TYPE.RECALCULATE_AMOUNT });
  }
  function onResetForm() {
    dispatch({ type: ACTION_TYPE.RESET_FORM });
  }

  return {
    formState,
    changeFormField: onChangeHandler,
    resetForm: onResetForm,
  };
};
