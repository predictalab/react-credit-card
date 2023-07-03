import { MutableRefObject } from "react";
import { FaCcDiscover as DiscoverIcon } from "react-icons/fa";
import {
  RiMastercardLine as MasterCardIcon,
  RiVisaLine as VisaIcon,
} from "react-icons/ri";
import { SiAmericanexpress as AmexIcon } from "react-icons/si";
import { CreditCardTypes, TextsTypes } from "../types/types";
import styles from "./Card.module.scss";

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

const Card = ({
  texts,
  gradientStart,
  gradientEnd,
  creditCard,
  refs,
}: PropsTypes): JSX.Element => {
  // Set focus on input when clicking on the cards's parts
  const setFocus = (
    ref: MutableRefObject<HTMLInputElement | HTMLSelectElement>
  ) => {
    ref.current.focus();
  };

  // Render a credit card icon based on the card type
  const renderCardLogo = (type: string): JSX.Element => {
    if (type === "amex") {
      return <AmexIcon />;
    } else if (type === "mastercard") {
      return <MasterCardIcon />;
    } else if (type === "discover") {
      return <DiscoverIcon />;
    } else {
      return <VisaIcon />;
    }
  };

  // Format months to display it as "01" is value is "1"
  const formatMonthDisplayed = (month: number) =>
    month < 10 ? `0${month}` : month;

  // Format card number to display it as "xxxx **** **** xxxx"
  const displayNumber = [];
  for (let i = 0; i < 16; i++) {
    let displayDigit = "#";
    if (typeof creditCard.number[i] !== "undefined") {
      displayDigit = i > 3 && i < 12 ? "*" : creditCard.number[i];
    }
    displayNumber.push(displayDigit);
  }

  return (
    <div>
      <div className={styles.container}>
        <div data-flipped={creditCard.flipped} className={styles.inner}>
          <div className={styles.front}>
            <div
              className={styles.overlay}
              style={{
                background: `linear-gradient(25deg, ${gradientStart}, ${gradientEnd})`,
              }}
            />
            <div className={styles.content}>
              <div className={styles.chip} />
              <div className={styles.type}>
                {renderCardLogo(creditCard.type)}
              </div>
              <div
                className={styles.number}
                onClick={() => setFocus(refs.numberInput)}
              >
                {displayNumber.map((digit, index) => (
                  <div className={styles.digitWrapper} key={index}>
                    <div
                      className={[
                        styles.digit,
                        digit === "#" ? styles.shown : styles.hidden,
                      ].join(" ")}
                    >
                      #
                    </div>
                    <div
                      className={[
                        styles.digit,
                        digit !== "#" ? styles.shown : styles.hidden,
                      ].join(" ")}
                    >
                      {digit !== "#" && digit}
                    </div>
                  </div>
                ))}
              </div>
              <div
                className={styles.name}
                onClick={() => setFocus(refs.nameInput)}
              >
                <label htmlFor="name">{texts["Card holder"]}</label>
                <div id="name">
                  <div
                    className={[
                      styles.placeholder,
                      creditCard.name.length > 0 ? styles.hidden : styles.shown,
                    ].join(" ")}
                  >
                    {texts["FULL NAME"]}
                  </div>
                  <div className={styles.nameContainer}>
                    {creditCard.name.split("").map((char, index) => (
                      <div
                        className={[
                          styles.character,
                          /\s/.test(char) && styles.space,
                        ].join(" ")}
                        key={index}
                      >
                        {char}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.expiration}>
                <label htmlFor="expiration">{texts["Expires"]}</label>
                <div id="expiration" className={styles.expValues}>
                  <div onClick={() => setFocus(refs.monthInput)}>
                    {!creditCard.month ? (
                      texts["MM"]
                    ) : (
                      <div className={styles.animated}>
                        {formatMonthDisplayed(creditCard.month)}
                      </div>
                    )}
                  </div>
                  <div>/</div>
                  <div onClick={() => setFocus(refs.yearInput)}>
                    {!creditCard.year ? (
                      texts["YY"]
                    ) : (
                      <div className={styles.animated}>
                        {`${creditCard.year}`.slice(-2)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.back}>
            <div
              className={styles.overlay}
              style={{
                background: `linear-gradient(25deg, ${gradientStart}, ${gradientEnd})`,
              }}
            />
            <div className={styles.content}>
              <div className={styles.strip} />
              <div className={styles.cvv}>
                <small>CVV</small> <br />
                {creditCard.cvv}
              </div>
              <div className={styles.type}>
                {renderCardLogo(creditCard.type)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
