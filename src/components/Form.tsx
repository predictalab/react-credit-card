import { Dispatch, MutableRefObject, SetStateAction, useRef } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { CreditCardTypes, TextsTypes } from "../types/types";
import styles from "./Form.module.scss";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const months: string[] = [];
const years = [currentYear];
for (let i = 1; i <= 12; i++) {
  months.push(i < 10 ? `0${i}` : `${i}`);
  years.push(years[0] + i);
}

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

const Form = ({
  texts,
  creditCardValues: { creditCard, setCreditCard },
  refs,
  submitAction,
  buttonColor,
  buttonTextColor,
}: PropsTypes): JSX.Element => {
  const cvvInput = useRef() as MutableRefObject<HTMLInputElement>;

  // Get card type based on first numbers
  const getCardType = (cardNumber: string) => {
    let re = new RegExp("^4");
    if (cardNumber.match(re) != null) return "visa";
    re = new RegExp("^(34|37)");
    if (cardNumber.match(re) != null) return "amex";
    re = new RegExp("^5[1-5]");
    if (cardNumber.match(re) != null) return "mastercard";
    re = new RegExp("^6011");
    if (cardNumber.match(re) != null) return "discover";
    return "visa";
  };

  // Handle input changes
  const handleChange = (value: string, type: string) => {
    // Remove spaces
    if (type === ("cardNumber" || "cardCvv")) value = value.replace(/ /gi, "");

    // CARD NUMBER
    if (type === "cardNumber") {
      if (!isNaN(+value)) {
        setCreditCard((v) => ({
          ...v,
          number: value,
          type: getCardType(value),
        }));
      }

      // CARD HOLDER NAME
    } else if (type === "cardName") {
      const regName = /^[a-zA-Z\s]*$/;
      regName.test(value) && setCreditCard((v) => ({ ...v, name: value }));

      // CARD MONTH
    } else if (type === "cardMonth") {
      const valueToNumber = +value;
      setCreditCard((v) => ({ ...v, month: valueToNumber }));

      // CARD YEAR
    } else if (type === "cardYear") {
      const valueToNumber = +value;
      const { month: cardMonth } = creditCard;

      // If the year is the current year and the month set is before the current month,
      // set the month to '0' do not allow the user to select a passed month
      // ex : if the current month is '03' and the user selects '2022',
      // he souldn't be able to select '01, 02'
      if (valueToNumber === currentYear && cardMonth <= currentMonth) {
        setCreditCard((v) => ({ ...v, month: 0, year: valueToNumber }));
      } else {
        setCreditCard((v) => ({ ...v, year: valueToNumber }));
      }

      // CARD CVV
    } else if (type === "cardCvv") {
      !isNaN(+value) && setCreditCard((v) => ({ ...v, cvv: value }));
    }
  };

  // Format card number to display it as "xxxx xxxx xxxx xxxx"
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/\D/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    return parts.length ? parts.join(" ") : value;
  };

  // Format months to display it as "01" is value is "1"
  const formatMonthDisplayed = (month: number) =>
    month < 10 ? `0${month}` : month;

  // Allow submit checks
  const canSubmit = () => {
    const { number, name, month, year, cvv } = creditCard;
    return (
      number.length === 16 && name.length && cvv.length === 3 && month && year
    );
  };

  // Handle flipped status when needed
  const changeFlippedStatus = (status: boolean) =>
    setCreditCard((v) => ({ ...v, flipped: status }));

  // Revert flipped state when clicking outside CVV input
  useOnClickOutside(cvvInput, () => changeFlippedStatus(false));

  return (
    <div>
      <div className={styles.cardInputs}>
        <form onSubmit={(e) => e.preventDefault()}>
          {/* CARD NUMBER */}
          <div className={styles.inputsWrapper}>
            <div>
              <label htmlFor="cardNumber">{texts["Card number"]}</label>
              <input
                id="cardNumber"
                type="text"
                onChange={(event) =>
                  handleChange(event.target.value, "cardNumber")
                }
                value={formatCardNumber(creditCard.number)}
                ref={refs.numberInput}
                maxLength={19}
                placeholder={texts["Card number"]}
                autoComplete="off"
              />
            </div>

            {/* CARD HOLDER NAME */}
            <div>
              <label htmlFor="cardName">{texts["Card holder's name"]}</label>
              <input
                id="cardName"
                type="text"
                onChange={(event) =>
                  handleChange(event.target.value, "cardName")
                }
                ref={refs.nameInput}
                value={creditCard.name}
                maxLength={24}
                placeholder={texts["Card holder's name"]}
                autoComplete="off"
              />
            </div>
          </div>

          {/* CARD EXPIRATION DATE */}
          <div className={styles.inputsWrapper}>
            <div>
              <label htmlFor="cardMonth">{texts["Expiration date"]}</label>
              {/* Month */}
              <div className={styles.selectWrapper}>
                <select
                  className={styles.monthInput}
                  id="cardMonth"
                  value={
                    !creditCard.month
                      ? 0
                      : formatMonthDisplayed(creditCard.month)
                  }
                  onChange={(event) =>
                    handleChange(event.target.value, "cardMonth")
                  }
                  onFocus={() => changeFlippedStatus(false)}
                  ref={refs.monthInput}
                >
                  <option value="0" disabled>
                    {texts["Month"]}
                  </option>
                  {months.map((month, i) => (
                    <option
                      key={month}
                      value={month}
                      disabled={
                        creditCard.year === currentYear &&
                        +months[i] <= currentMonth
                      }
                    >
                      {month}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Year */}
            <div>
              <div className={styles.selectWrapper}>
                <select
                  className={styles.yearInput}
                  id="cardYear"
                  value={creditCard.year}
                  onChange={(event) =>
                    handleChange(event.target.value, "cardYear")
                  }
                  onFocus={() => changeFlippedStatus(false)}
                  ref={refs.yearInput}
                >
                  <option value="0" disabled>
                    {texts["Year"]}
                  </option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* CARD CVV */}
            <div>
              <label htmlFor="cardName">{texts["Card holder's name"]}</label>
              <input
                type="text"
                id="cardCvv"
                value={creditCard.cvv}
                onChange={(event) =>
                  handleChange(event.target.value, "cardCvv")
                }
                onFocus={() => changeFlippedStatus(true)}
                ref={cvvInput}
                maxLength={3}
                placeholder="CVV"
                autoComplete="off"
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            data-disabled={!canSubmit()}
            disabled={!canSubmit()}
            onClick={() => submitAction(creditCard)}
            style={{ backgroundColor: buttonColor, color: buttonTextColor }}
          >
            {texts["Proceed to checkout"]}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
