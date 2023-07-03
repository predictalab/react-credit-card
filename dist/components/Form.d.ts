import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { CreditCardTypes, TextsTypes } from "../types/types";
type PropsTypes = {
    texts: TextsTypes;
    creditCardValues: {
        creditCard: CreditCardTypes;
        setCreditCard: Dispatch<SetStateAction<CreditCardTypes>>;
    };
    refs: {
        nameInput: MutableRefObject<HTMLInputElement>;
        numberInput: MutableRefObject<HTMLInputElement>;
        monthInput: MutableRefObject<HTMLSelectElement>;
        yearInput: MutableRefObject<HTMLSelectElement>;
    };
    submitAction: (creditCard: CreditCardTypes) => void;
    buttonColor: string;
    buttonTextColor: string;
};
declare const Form: ({ texts, creditCardValues: { creditCard, setCreditCard }, refs, submitAction, buttonColor, buttonTextColor, }: PropsTypes) => JSX.Element;
export default Form;
