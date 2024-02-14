# Predicta Lab - React Credit Card

An animated Credit Card component, built with React 18 and Typescript

## Screenshot

![An animated Credit Card component, built with React 18 and Typescript](https://github.com/predictalab/react-credit-card/assets/115979786/89e0cd53-2438-47a9-9aeb-f3a7b5b526cf)

## Installation

`npm i @predictalab/react-credit-card`

https://www.npmjs.com/package/@predictalab/react-credit-card

## Usage

```js
import CreditCard from 'predictalab-react-credit-card'

const Example = () : JSX.Element => {
    return (
        <CreditCard
            gradientStartColor: "#113e9f"
            gradientEndColor: "#3083f7"
            buttonColor: "#113e9f"
            buttonTextColor: "#fff"
            submitAction: (values) => console.log(values)
        />
    )
}

export default Example
```

## Props and types

```js
type ComponentProps = {
  gradientStartColor: string,
  gradientEndColor: string,
  buttonColor: string,
  buttonTextColor: string,
  translations?: TextsTypes,
  submitAction: (creditCardInfo: CreditCardTypes) => void,
};

// Returned in the 'submitAction' function
type CreditCardTypes = {
  number: string,
  name: string,
  month: number,
  year: number,
  cvv: string,
  type: string,
  flipped: boolean,
};

// Can be provided to translate the module
type TextsTypes = {
  "Card holder": string,
  "FULL NAME": string,
  Expires: string,
  YY: string,
  MM: string,
  "Card number": string,
  "Card holder's name": string,
  "Expiration date": string,
  Month: string,
  Year: string,
  "Proceed to checkout": string,
  "Get back to credits selection": string,
};
```

## Contribution

Feel free to contribute to this project by sending your custom PR
