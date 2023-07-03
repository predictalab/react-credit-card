import { MutableRefObject, useRef, useState } from "react";
import Form from "./Form";
import Card from "./Card";
import { CreditCardTypes, TextsTypes } from "../types/types";
import styles from "./CreditCard.module.scss";
import { creditCardValues, defaultTexts } from "./defaultValues";

type PropsTypes = {
  gradientStartColor: string;
  gradientEndColor: string;
  buttonColor: string;
  buttonTextColor: string;
  translations?: TextsTypes;
  submitAction: (creditCardInfo: CreditCardTypes) => void;
};

const CreditCard = ({
  gradientStartColor,
  gradientEndColor,
  buttonColor,
  buttonTextColor,
  submitAction,
  translations,
}: PropsTypes): JSX.Element => {
  const [creditCard, setCreditCard] =
    useState<CreditCardTypes>(creditCardValues);

  const texts = translations ?? defaultTexts;

  // Refs
  const nameInput = useRef() as MutableRefObject<HTMLInputElement>;
  const numberInput = useRef() as MutableRefObject<HTMLInputElement>;
  const monthInput = useRef() as MutableRefObject<HTMLSelectElement>;
  const yearInput = useRef() as MutableRefObject<HTMLSelectElement>;

  return (
    <div className={styles.paymentWrapper}>
      <Card
        texts={texts}
        gradientStart={gradientStartColor}
        gradientEnd={gradientEndColor}
        creditCard={creditCard}
        refs={{ nameInput, numberInput, monthInput, yearInput }}
      />
      <Form
        texts={texts}
        buttonColor={buttonColor}
        buttonTextColor={buttonTextColor}
        submitAction={submitAction}
        creditCardValues={{ creditCard, setCreditCard }}
        refs={{ nameInput, numberInput, monthInput, yearInput }}
      />
    </div>
  );
};

export default CreditCard;
