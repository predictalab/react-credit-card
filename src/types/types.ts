export type CreditCardTypes = {
  number: string;
  name: string;
  month: number;
  year: number;
  cvv: string;
  type: string;
  flipped: boolean;
};

export type TextsTypes = {
  "Card holder": string;
  "FULL NAME": string;
  Expires: string;
  YY: string;
  MM: string;
  "Card number": string;
  "Card holder's name": string;
  "Expiration date": string;
  Month: string;
  Year: string;
  "Proceed to checkout": string;
  "Get back to credits selection": string;
};

// const textsFR = {
//   "Card holder": "Titulaire de la carte",
//   "FULL NAME": "NOM COMPLET",
//   Expires: "Expiration",
//   YY: "AA",
//   MM: "MM",
//   "Card number": "Numéro de carte",
//   "Card holder's name": "Titulaire de la carte",
//   "Expiration date": "Date d'expiration",
//   Month: "Mois",
//   Year: "Année",
//   "Proceed to checkout": "Procéder au paiement",
//   "Get back to credits selection": "Retourner à la sélection des crédits",
// };
