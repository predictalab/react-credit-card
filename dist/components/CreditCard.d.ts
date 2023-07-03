/// <reference types="react" />
import { CreditCardTypes, TextsTypes } from "../types/types";
type PropsTypes = {
    gradientStartColor: string;
    gradientEndColor: string;
    buttonColor: string;
    buttonTextColor: string;
    translations?: TextsTypes;
    submitAction: (creditCardInfo: CreditCardTypes) => void;
};
declare const CreditCard: ({ gradientStartColor, gradientEndColor, buttonColor, buttonTextColor, submitAction, translations, }: PropsTypes) => JSX.Element;
export default CreditCard;
