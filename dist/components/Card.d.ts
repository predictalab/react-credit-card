import { MutableRefObject } from "react";
import { CreditCardTypes, TextsTypes } from "../types/types";
type PropsTypes = {
    texts: TextsTypes;
    gradientStart: string;
    gradientEnd: string;
    creditCard: CreditCardTypes;
    refs: {
        nameInput: MutableRefObject<HTMLInputElement>;
        numberInput: MutableRefObject<HTMLInputElement>;
        monthInput: MutableRefObject<HTMLSelectElement>;
        yearInput: MutableRefObject<HTMLSelectElement>;
    };
};
declare const Card: ({ texts, gradientStart, gradientEnd, creditCard, refs, }: PropsTypes) => JSX.Element;
export default Card;
