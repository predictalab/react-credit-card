'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var fa = require('react-icons/fa');
var ri = require('react-icons/ri');
var si = require('react-icons/si');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function useOnClickOutside(ref, handler) {
    react.useEffect(function () {
        var listener = function (event) {
            var element = ref === null || ref === void 0 ? void 0 : ref.current;
            if (!element || element.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return function () {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$2 = ".Form-module_cardInputs__LaFLB form {\n  margin: 0 auto;\n  padding: 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.Form-module_cardInputs__LaFLB form label {\n  display: block;\n  font-size: 12px;\n  margin-bottom: 5px;\n  font-weight: 500;\n  color: rgba(0, 0, 0, 0.5019607843);\n  width: 100%;\n}\n.Form-module_cardInputs__LaFLB form .Form-module_inputsWrapper__wTA-r {\n  display: flex;\n  align-items: flex-end;\n  width: 100%;\n  gap: 20px;\n}\n.Form-module_cardInputs__LaFLB form .Form-module_inputsWrapper__wTA-r > div {\n  flex: 1;\n  padding: 5px;\n  margin: 0;\n}\n.Form-module_cardInputs__LaFLB form .Form-module_selectWrapper__pdonU {\n  position: relative;\n}\n.Form-module_cardInputs__LaFLB form .Form-module_selectWrapper__pdonU:after {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%) rotate(135deg);\n  right: 20px;\n  content: \"\";\n  height: 5px;\n  width: 5px;\n  border-top: 1px solid #000;\n  border-right: 1px solid #000;\n  display: block;\n}\n.Form-module_cardInputs__LaFLB form input,\n.Form-module_cardInputs__LaFLB form select {\n  color: rgba(0, 0, 0, 0.5647058824);\n  width: 100%;\n  line-height: 40px;\n  background: white;\n  border: 1px solid #ededee;\n  border-radius: 5px;\n  padding: 0 20px;\n  transition: border-color 0.3s ease-in-out;\n  appearance: none;\n  outline: none;\n}\n.Form-module_cardInputs__LaFLB form input:hover, .Form-module_cardInputs__LaFLB form input:focus,\n.Form-module_cardInputs__LaFLB form select:hover,\n.Form-module_cardInputs__LaFLB form select:focus {\n  border-color: rgba(0, 0, 0, 0.3137254902);\n}\n.Form-module_cardInputs__LaFLB form button {\n  line-height: 50px;\n  border-radius: 5px;\n  border: none;\n  cursor: pointer;\n  transition: opacity 0.3s ease-in-out;\n}\n.Form-module_cardInputs__LaFLB form button[data-disabled=true] {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.Form-module_cardInputs__LaFLB form button:hover {\n  opacity: 0.8;\n}";
var styles$2 = {"cardInputs":"Form-module_cardInputs__LaFLB","inputsWrapper":"Form-module_inputsWrapper__wTA-r","selectWrapper":"Form-module_selectWrapper__pdonU"};
styleInject(css_248z$2);

var currentYear = new Date().getFullYear();
var currentMonth = new Date().getMonth();
var months = [];
var years = [currentYear];
for (var i = 1; i <= 12; i++) {
    months.push(i < 10 ? "0".concat(i) : "".concat(i));
    years.push(years[0] + i);
}
var Form = function (_a) {
    var texts = _a.texts, _b = _a.creditCardValues, creditCard = _b.creditCard, setCreditCard = _b.setCreditCard, refs = _a.refs, submitAction = _a.submitAction, buttonColor = _a.buttonColor, buttonTextColor = _a.buttonTextColor;
    var cvvInput = react.useRef();
    // Get card type based on first numbers
    var getCardType = function (cardNumber) {
        var re = new RegExp("^4");
        if (cardNumber.match(re) != null)
            return "visa";
        re = new RegExp("^(34|37)");
        if (cardNumber.match(re) != null)
            return "amex";
        re = new RegExp("^5[1-5]");
        if (cardNumber.match(re) != null)
            return "mastercard";
        re = new RegExp("^6011");
        if (cardNumber.match(re) != null)
            return "discover";
        return "visa";
    };
    // Handle input changes
    var handleChange = function (value, type) {
        // Remove spaces
        if (type === ("cardNumber" ))
            value = value.replace(/ /gi, "");
        // CARD NUMBER
        if (type === "cardNumber") {
            if (!isNaN(+value)) {
                setCreditCard(function (v) { return (__assign(__assign({}, v), { number: value, type: getCardType(value) })); });
            }
            // CARD HOLDER NAME
        }
        else if (type === "cardName") {
            var regName = /^[a-zA-Z\s]*$/;
            regName.test(value) && setCreditCard(function (v) { return (__assign(__assign({}, v), { name: value })); });
            // CARD MONTH
        }
        else if (type === "cardMonth") {
            var valueToNumber_1 = +value;
            setCreditCard(function (v) { return (__assign(__assign({}, v), { month: valueToNumber_1 })); });
            // CARD YEAR
        }
        else if (type === "cardYear") {
            var valueToNumber_2 = +value;
            var cardMonth = creditCard.month;
            // If the year is the current year and the month set is before the current month,
            // set the month to '0' do not allow the user to select a passed month
            // ex : if the current month is '03' and the user selects '2022',
            // he souldn't be able to select '01, 02'
            if (valueToNumber_2 === currentYear && cardMonth <= currentMonth) {
                setCreditCard(function (v) { return (__assign(__assign({}, v), { month: 0, year: valueToNumber_2 })); });
            }
            else {
                setCreditCard(function (v) { return (__assign(__assign({}, v), { year: valueToNumber_2 })); });
            }
            // CARD CVV
        }
        else if (type === "cardCvv") {
            !isNaN(+value) && setCreditCard(function (v) { return (__assign(__assign({}, v), { cvv: value })); });
        }
    };
    // Format card number to display it as "xxxx xxxx xxxx xxxx"
    var formatCardNumber = function (value) {
        var v = value.replace(/\s+/g, "").replace(/\D/gi, "");
        var matches = v.match(/\d{4,16}/g);
        var match = (matches && matches[0]) || "";
        var parts = [];
        for (var i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        return parts.length ? parts.join(" ") : value;
    };
    // Format months to display it as "01" is value is "1"
    var formatMonthDisplayed = function (month) {
        return month < 10 ? "0".concat(month) : month;
    };
    // Allow submit checks
    var canSubmit = function () {
        var number = creditCard.number, name = creditCard.name, month = creditCard.month, year = creditCard.year, cvv = creditCard.cvv;
        return (number.length === 16 && name.length && cvv.length === 3 && month && year);
    };
    // Handle flipped status when needed
    var changeFlippedStatus = function (status) {
        return setCreditCard(function (v) { return (__assign(__assign({}, v), { flipped: status })); });
    };
    // Revert flipped state when clicking outside CVV input
    useOnClickOutside(cvvInput, function () { return changeFlippedStatus(false); });
    return (jsxRuntime.jsx("div", { children: jsxRuntime.jsx("div", { className: styles$2.cardInputs, children: jsxRuntime.jsxs("form", { onSubmit: function (e) { return e.preventDefault(); }, children: [jsxRuntime.jsxs("div", { className: styles$2.inputsWrapper, children: [jsxRuntime.jsxs("div", { children: [jsxRuntime.jsx("label", { htmlFor: "cardNumber", children: texts["Card number"] }), jsxRuntime.jsx("input", { id: "cardNumber", type: "text", onChange: function (event) {
                                            return handleChange(event.target.value, "cardNumber");
                                        }, value: formatCardNumber(creditCard.number), ref: refs.numberInput, maxLength: 19, placeholder: texts["Card number"], autoComplete: "off" })] }), jsxRuntime.jsxs("div", { children: [jsxRuntime.jsx("label", { htmlFor: "cardName", children: texts["Card holder's name"] }), jsxRuntime.jsx("input", { id: "cardName", type: "text", onChange: function (event) {
                                            return handleChange(event.target.value, "cardName");
                                        }, ref: refs.nameInput, value: creditCard.name, maxLength: 24, placeholder: texts["Card holder's name"], autoComplete: "off" })] })] }), jsxRuntime.jsxs("div", { className: styles$2.inputsWrapper, children: [jsxRuntime.jsxs("div", { children: [jsxRuntime.jsx("label", { htmlFor: "cardMonth", children: texts["Expiration date"] }), jsxRuntime.jsx("div", { className: styles$2.selectWrapper, children: jsxRuntime.jsxs("select", { className: styles$2.monthInput, id: "cardMonth", value: !creditCard.month
                                                ? 0
                                                : formatMonthDisplayed(creditCard.month), onChange: function (event) {
                                                return handleChange(event.target.value, "cardMonth");
                                            }, onFocus: function () { return changeFlippedStatus(false); }, ref: refs.monthInput, children: [jsxRuntime.jsx("option", { value: "0", disabled: true, children: texts["Month"] }), months.map(function (month, i) { return (jsxRuntime.jsx("option", { value: month, disabled: creditCard.year === currentYear &&
                                                        +months[i] <= currentMonth, children: month }, month)); })] }) })] }), jsxRuntime.jsx("div", { children: jsxRuntime.jsx("div", { className: styles$2.selectWrapper, children: jsxRuntime.jsxs("select", { className: styles$2.yearInput, id: "cardYear", value: creditCard.year, onChange: function (event) {
                                            return handleChange(event.target.value, "cardYear");
                                        }, onFocus: function () { return changeFlippedStatus(false); }, ref: refs.yearInput, children: [jsxRuntime.jsx("option", { value: "0", disabled: true, children: texts["Year"] }), years.map(function (year) { return (jsxRuntime.jsx("option", { value: year, children: year }, year)); })] }) }) }), jsxRuntime.jsxs("div", { children: [jsxRuntime.jsx("label", { htmlFor: "cardName", children: texts["Card holder's name"] }), jsxRuntime.jsx("input", { type: "text", id: "cardCvv", value: creditCard.cvv, onChange: function (event) {
                                            return handleChange(event.target.value, "cardCvv");
                                        }, onFocus: function () { return changeFlippedStatus(true); }, ref: cvvInput, maxLength: 3, placeholder: "CVV", autoComplete: "off" })] })] }), jsxRuntime.jsx("button", { "data-disabled": !canSubmit(), disabled: !canSubmit(), onClick: function () { return submitAction(creditCard); }, style: { backgroundColor: buttonColor, color: buttonTextColor }, children: texts["Proceed to checkout"] })] }) }) }));
};

var css_248z$1 = ".Card-module_container__kuNIC {\n  perspective: 1500px;\n  animation: Card-module_bottom-777__PLcQt 1s ease-in-out forwards;\n}\n@keyframes Card-module_bottom-777__PLcQt {\n  from {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.Card-module_container__kuNIC .Card-module_inner__kgR5m {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  transition: transform 1s;\n  transform-style: preserve-3d;\n  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.1882352941);\n}\n.Card-module_container__kuNIC .Card-module_inner__kgR5m[data-flipped=true] {\n  transform: rotateY(180deg);\n}\n.Card-module_container__kuNIC .Card-module_inner__kgR5m .Card-module_back__ungjH,\n.Card-module_container__kuNIC .Card-module_inner__kgR5m .Card-module_front__W8SFG {\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  backface-visibility: hidden;\n}\n.Card-module_container__kuNIC .Card-module_inner__kgR5m .Card-module_back__ungjH {\n  transform: rotateY(180deg);\n}\n\n.Card-module_card__oiPVq, .Card-module_overlay__K-K18, .Card-module_overlay__K-K18 .Card-module_back__ungjH, .Card-module_overlay__K-K18 .Card-module_content__7oR2Y, .Card-module_card__oiPVq .Card-module_content__7oR2Y, .Card-module_container__kuNIC .Card-module_content__7oR2Y, .Card-module_card__oiPVq .Card-module_back__ungjH, .Card-module_container__kuNIC .Card-module_back__ungjH, .Card-module_container__kuNIC, .Card-module_container__kuNIC .Card-module_inner__kgR5m {\n  margin: 0 auto;\n  width: 430px;\n  height: 270px;\n  border-radius: 15px;\n  position: relative;\n}\n.Card-module_card__oiPVq .Card-module_back__ungjH, .Card-module_overlay__K-K18 .Card-module_back__ungjH, .Card-module_container__kuNIC .Card-module_back__ungjH {\n  transform: rotateY(180deg);\n  backface-visibility: hidden;\n  position: relative;\n}\n.Card-module_card__oiPVq .Card-module_back__ungjH .Card-module_strip__C6Qt9, .Card-module_overlay__K-K18 .Card-module_back__ungjH .Card-module_strip__C6Qt9, .Card-module_container__kuNIC .Card-module_back__ungjH .Card-module_strip__C6Qt9 {\n  background-color: #2a1d16;\n  position: absolute;\n  top: 40px;\n  left: 0;\n  height: 60px;\n  width: 100%;\n}\n.Card-module_card__oiPVq .Card-module_back__ungjH .Card-module_cvv__MxcTy, .Card-module_overlay__K-K18 .Card-module_back__ungjH .Card-module_cvv__MxcTy, .Card-module_container__kuNIC .Card-module_back__ungjH .Card-module_cvv__MxcTy {\n  position: absolute;\n  top: 120px;\n  right: 30px;\n  background: repeating-linear-gradient(0.1deg, #fff 20%, #fff 40%, #fea 40%, #fea 44%, #fff 44%);\n  height: 50px;\n  width: 75%;\n  color: lightgray;\n  padding: 0 20px;\n  font-size: 15px;\n  text-align: right;\n}\n.Card-module_card__oiPVq .Card-module_back__ungjH .Card-module_cvv__MxcTy small, .Card-module_overlay__K-K18 .Card-module_back__ungjH .Card-module_cvv__MxcTy small, .Card-module_container__kuNIC .Card-module_back__ungjH .Card-module_cvv__MxcTy small {\n  opacity: 1;\n  font-size: 10px;\n  line-height: 1;\n}\n.Card-module_card__oiPVq .Card-module_back__ungjH .Card-module_type__AJPAb, .Card-module_overlay__K-K18 .Card-module_back__ungjH .Card-module_type__AJPAb, .Card-module_container__kuNIC .Card-module_back__ungjH .Card-module_type__AJPAb {\n  opacity: 0.2;\n  top: unset;\n  right: unset;\n  bottom: 20px;\n  left: 50%;\n  transform: translateX(-50%);\n  animation: none;\n}\n.Card-module_card__oiPVq .Card-module_content__7oR2Y, .Card-module_overlay__K-K18 .Card-module_content__7oR2Y, .Card-module_container__kuNIC .Card-module_content__7oR2Y,\n.Card-module_card__oiPVq .Card-module_slider__pMlR6,\n.Card-module_overlay__K-K18 .Card-module_slider__pMlR6,\n.Card-module_container__kuNIC .Card-module_slider__pMlR6 {\n  position: absolute;\n  top: 0;\n}\n.Card-module_card__oiPVq .Card-module_content__7oR2Y, .Card-module_overlay__K-K18 .Card-module_content__7oR2Y, .Card-module_container__kuNIC .Card-module_content__7oR2Y {\n  padding: 25px 15px;\n  color: #fff;\n}\n.Card-module_card__oiPVq .Card-module_content__7oR2Y label, .Card-module_overlay__K-K18 .Card-module_content__7oR2Y label, .Card-module_container__kuNIC .Card-module_content__7oR2Y label {\n  color: #fff;\n  opacity: 0.7;\n  font-size: 10px;\n  margin-bottom: 5px;\n}\n.Card-module_card__oiPVq .Card-module_content__7oR2Y .Card-module_number__TdODr, .Card-module_overlay__K-K18 .Card-module_content__7oR2Y .Card-module_number__TdODr, .Card-module_container__kuNIC .Card-module_content__7oR2Y .Card-module_number__TdODr {\n  padding: 15px;\n  margin-bottom: 30px;\n  font-weight: 500;\n  line-height: 1;\n  color: #fff;\n  font-size: 27px;\n  position: relative;\n  cursor: pointer;\n}\n.Card-module_card__oiPVq .Card-module_content__7oR2Y .Card-module_number__TdODr .Card-module_digitWrapper__ZkvKn, .Card-module_overlay__K-K18 .Card-module_content__7oR2Y .Card-module_number__TdODr .Card-module_digitWrapper__ZkvKn, .Card-module_container__kuNIC .Card-module_content__7oR2Y .Card-module_number__TdODr .Card-module_digitWrapper__ZkvKn {\n  position: relative;\n  display: inline-block;\n  width: 16px;\n}\n.Card-module_card__oiPVq .Card-module_content__7oR2Y .Card-module_number__TdODr .Card-module_digitWrapper__ZkvKn .Card-module_digit__oe2Zk, .Card-module_overlay__K-K18 .Card-module_content__7oR2Y .Card-module_number__TdODr .Card-module_digitWrapper__ZkvKn .Card-module_digit__oe2Zk, .Card-module_container__kuNIC .Card-module_content__7oR2Y .Card-module_number__TdODr .Card-module_digitWrapper__ZkvKn .Card-module_digit__oe2Zk {\n  display: inline-block;\n  width: 100%;\n  vertical-align: middle;\n  transition: all 0.3s ease-in-out;\n  position: absolute;\n  top: 10px;\n}\n.Card-module_card__oiPVq .Card-module_content__7oR2Y .Card-module_number__TdODr .Card-module_digitWrapper__ZkvKn:nth-child(4n), .Card-module_overlay__K-K18 .Card-module_content__7oR2Y .Card-module_number__TdODr .Card-module_digitWrapper__ZkvKn:nth-child(4n), .Card-module_container__kuNIC .Card-module_content__7oR2Y .Card-module_number__TdODr .Card-module_digitWrapper__ZkvKn:nth-child(4n) {\n  margin-right: 20px;\n}\n.Card-module_card__oiPVq .Card-module_content__7oR2Y .Card-module_shown__IIq0g, .Card-module_overlay__K-K18 .Card-module_content__7oR2Y .Card-module_shown__IIq0g, .Card-module_container__kuNIC .Card-module_content__7oR2Y .Card-module_shown__IIq0g {\n  transform: translateY(0);\n  opacity: 1;\n}\n.Card-module_card__oiPVq .Card-module_content__7oR2Y .Card-module_hidden__7ZMFc:nth-child(1), .Card-module_overlay__K-K18 .Card-module_content__7oR2Y .Card-module_hidden__7ZMFc:nth-child(1), .Card-module_container__kuNIC .Card-module_content__7oR2Y .Card-module_hidden__7ZMFc:nth-child(1) {\n  transform: translateY(-15px);\n  opacity: 0;\n}\n.Card-module_card__oiPVq .Card-module_content__7oR2Y .Card-module_hidden__7ZMFc:nth-child(2), .Card-module_overlay__K-K18 .Card-module_content__7oR2Y .Card-module_hidden__7ZMFc:nth-child(2), .Card-module_container__kuNIC .Card-module_content__7oR2Y .Card-module_hidden__7ZMFc:nth-child(2) {\n  transform: translateY(15px);\n  opacity: 0;\n}\n.Card-module_card__oiPVq .Card-module_content__7oR2Y .Card-module_name__KX-YS, .Card-module_overlay__K-K18 .Card-module_content__7oR2Y .Card-module_name__KX-YS, .Card-module_container__kuNIC .Card-module_content__7oR2Y .Card-module_name__KX-YS {\n  width: 75%;\n  padding-left: 15px;\n  padding-top: 8px;\n  position: relative;\n  cursor: pointer;\n}\n.Card-module_card__oiPVq .Card-module_content__7oR2Y .Card-module_name__KX-YS .Card-module_placeholder__5opy0, .Card-module_overlay__K-K18 .Card-module_content__7oR2Y .Card-module_name__KX-YS .Card-module_placeholder__5opy0, .Card-module_container__kuNIC .Card-module_content__7oR2Y .Card-module_name__KX-YS .Card-module_placeholder__5opy0 {\n  transition: all 0.3s ease-in-out;\n}\n.Card-module_card__oiPVq .Card-module_content__7oR2Y .Card-module_name__KX-YS .Card-module_nameContainer__uiUCV, .Card-module_overlay__K-K18 .Card-module_content__7oR2Y .Card-module_name__KX-YS .Card-module_nameContainer__uiUCV, .Card-module_container__kuNIC .Card-module_content__7oR2Y .Card-module_name__KX-YS .Card-module_nameContainer__uiUCV {\n  position: absolute;\n  top: 25px;\n}\n.Card-module_card__oiPVq .Card-module_content__7oR2Y .Card-module_name__KX-YS .Card-module_character__-V2EU, .Card-module_overlay__K-K18 .Card-module_content__7oR2Y .Card-module_name__KX-YS .Card-module_character__-V2EU, .Card-module_container__kuNIC .Card-module_content__7oR2Y .Card-module_name__KX-YS .Card-module_character__-V2EU {\n  animation: Card-module_bottom-668__wi3HE 0.3s ease-in-out forwards;\n  display: inline-block;\n  margin-top: 5px;\n}\n@keyframes Card-module_bottom-668__wi3HE {\n  from {\n    opacity: 0;\n    transform: translateY(0);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.Card-module_card__oiPVq .Card-module_content__7oR2Y .Card-module_name__KX-YS .Card-module_character__-V2EU.Card-module_space__yQIBO, .Card-module_overlay__K-K18 .Card-module_content__7oR2Y .Card-module_name__KX-YS .Card-module_character__-V2EU.Card-module_space__yQIBO, .Card-module_container__kuNIC .Card-module_content__7oR2Y .Card-module_name__KX-YS .Card-module_character__-V2EU.Card-module_space__yQIBO {\n  height: 100%;\n  width: 8px;\n}\n.Card-module_card__oiPVq .Card-module_content__7oR2Y .Card-module_animated__qXD0f, .Card-module_overlay__K-K18 .Card-module_content__7oR2Y .Card-module_animated__qXD0f, .Card-module_container__kuNIC .Card-module_content__7oR2Y .Card-module_animated__qXD0f {\n  animation: Card-module_bottom-792__wOr1x 0.3s ease-in-out forwards;\n}\n@keyframes Card-module_bottom-792__wOr1x {\n  from {\n    opacity: 0;\n    transform: translateY(5px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.Card-module_card__oiPVq .Card-module_content__7oR2Y .Card-module_expiration__N0HsI, .Card-module_overlay__K-K18 .Card-module_content__7oR2Y .Card-module_expiration__N0HsI, .Card-module_container__kuNIC .Card-module_content__7oR2Y .Card-module_expiration__N0HsI {\n  width: 25%;\n  padding-right: 10px;\n  padding-left: 15px;\n  padding-top: 5px;\n  cursor: pointer;\n}\n.Card-module_card__oiPVq .Card-module_content__7oR2Y .Card-module_expiration__N0HsI .Card-module_expValues__WD9i5, .Card-module_overlay__K-K18 .Card-module_content__7oR2Y .Card-module_expiration__N0HsI .Card-module_expValues__WD9i5, .Card-module_container__kuNIC .Card-module_content__7oR2Y .Card-module_expiration__N0HsI .Card-module_expValues__WD9i5 {\n  display: flex;\n  align-items: center;\n  max-width: 80%;\n}\n.Card-module_card__oiPVq .Card-module_content__7oR2Y .Card-module_expiration__N0HsI .Card-module_expValues__WD9i5 > div, .Card-module_overlay__K-K18 .Card-module_content__7oR2Y .Card-module_expiration__N0HsI .Card-module_expValues__WD9i5 > div, .Card-module_container__kuNIC .Card-module_content__7oR2Y .Card-module_expiration__N0HsI .Card-module_expValues__WD9i5 > div {\n  text-align: center;\n  flex: 1;\n}\n.Card-module_card__oiPVq .Card-module_content__7oR2Y .Card-module_name__KX-YS, .Card-module_overlay__K-K18 .Card-module_content__7oR2Y .Card-module_name__KX-YS, .Card-module_container__kuNIC .Card-module_content__7oR2Y .Card-module_name__KX-YS,\n.Card-module_card__oiPVq .Card-module_content__7oR2Y .Card-module_expiration__N0HsI,\n.Card-module_overlay__K-K18 .Card-module_content__7oR2Y .Card-module_expiration__N0HsI,\n.Card-module_container__kuNIC .Card-module_content__7oR2Y .Card-module_expiration__N0HsI {\n  display: inline-block;\n  padding-bottom: 9px;\n  font-weight: 500;\n}\n.Card-module_card__oiPVq .Card-module_content__7oR2Y .Card-module_name__KX-YS div, .Card-module_overlay__K-K18 .Card-module_content__7oR2Y .Card-module_name__KX-YS div, .Card-module_container__kuNIC .Card-module_content__7oR2Y .Card-module_name__KX-YS div,\n.Card-module_card__oiPVq .Card-module_content__7oR2Y .Card-module_expiration__N0HsI div,\n.Card-module_overlay__K-K18 .Card-module_content__7oR2Y .Card-module_expiration__N0HsI div,\n.Card-module_container__kuNIC .Card-module_content__7oR2Y .Card-module_expiration__N0HsI div {\n  line-height: 1;\n  white-space: nowrap;\n  max-width: 100%;\n  text-transform: uppercase;\n}\n.Card-module_card__oiPVq .Card-module_chip__5qtgi, .Card-module_overlay__K-K18 .Card-module_chip__5qtgi, .Card-module_container__kuNIC .Card-module_chip__5qtgi {\n  margin-left: 20px;\n  margin-bottom: 20px;\n  margin-top: 10px;\n  width: 60px;\n  height: 50px;\n  background-image: url(\"../assets/creditcard-chip.png\");\n  background-size: cover;\n}\n.Card-module_card__oiPVq .Card-module_type__AJPAb, .Card-module_overlay__K-K18 .Card-module_type__AJPAb, .Card-module_container__kuNIC .Card-module_type__AJPAb {\n  width: 85px;\n  height: 70px;\n  position: absolute;\n  right: 25px;\n  top: 25px;\n  transition: opacity 0.3s ease-in-out;\n  animation: Card-module_changeCardLogo__OMv0q 0.3s ease-in-out forwards;\n}\n.Card-module_card__oiPVq .Card-module_type__AJPAb svg, .Card-module_overlay__K-K18 .Card-module_type__AJPAb svg, .Card-module_container__kuNIC .Card-module_type__AJPAb svg {\n  height: 100%;\n  width: 100%;\n  animation: Card-module_top-629__rbUV0 0.5s ease-in-out forwards;\n}\n@keyframes Card-module_top-629__rbUV0 {\n  from {\n    opacity: 0;\n    transform: translateY(0);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@keyframes Card-module_changeCardLogo__OMv0q {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n.Card-module_overlay__K-K18 {\n  position: relative;\n  overflow: hidden;\n  transform: scale(1);\n}";
var styles$1 = {"container":"Card-module_container__kuNIC","bottom-777":"Card-module_bottom-777__PLcQt","inner":"Card-module_inner__kgR5m","back":"Card-module_back__ungjH","front":"Card-module_front__W8SFG","card":"Card-module_card__oiPVq","overlay":"Card-module_overlay__K-K18","content":"Card-module_content__7oR2Y","strip":"Card-module_strip__C6Qt9","cvv":"Card-module_cvv__MxcTy","type":"Card-module_type__AJPAb","slider":"Card-module_slider__pMlR6","number":"Card-module_number__TdODr","digitWrapper":"Card-module_digitWrapper__ZkvKn","digit":"Card-module_digit__oe2Zk","shown":"Card-module_shown__IIq0g","hidden":"Card-module_hidden__7ZMFc","name":"Card-module_name__KX-YS","placeholder":"Card-module_placeholder__5opy0","nameContainer":"Card-module_nameContainer__uiUCV","character":"Card-module_character__-V2EU","bottom-668":"Card-module_bottom-668__wi3HE","space":"Card-module_space__yQIBO","animated":"Card-module_animated__qXD0f","bottom-792":"Card-module_bottom-792__wOr1x","expiration":"Card-module_expiration__N0HsI","expValues":"Card-module_expValues__WD9i5","chip":"Card-module_chip__5qtgi","changeCardLogo":"Card-module_changeCardLogo__OMv0q","top-629":"Card-module_top-629__rbUV0"};
styleInject(css_248z$1);

var Card = function (_a) {
    var texts = _a.texts, gradientStart = _a.gradientStart, gradientEnd = _a.gradientEnd, creditCard = _a.creditCard, refs = _a.refs;
    // Set focus on input when clicking on the cards's parts
    var setFocus = function (ref) {
        ref.current.focus();
    };
    // Render a credit card icon based on the card type
    var renderCardLogo = function (type) {
        if (type === "amex") {
            return jsxRuntime.jsx(si.SiAmericanexpress, {});
        }
        else if (type === "mastercard") {
            return jsxRuntime.jsx(ri.RiMastercardLine, {});
        }
        else if (type === "discover") {
            return jsxRuntime.jsx(fa.FaCcDiscover, {});
        }
        else {
            return jsxRuntime.jsx(ri.RiVisaLine, {});
        }
    };
    // Format months to display it as "01" is value is "1"
    var formatMonthDisplayed = function (month) {
        return month < 10 ? "0".concat(month) : month;
    };
    // Format card number to display it as "xxxx **** **** xxxx"
    var displayNumber = [];
    for (var i = 0; i < 16; i++) {
        var displayDigit = "#";
        if (typeof creditCard.number[i] !== "undefined") {
            displayDigit = i > 3 && i < 12 ? "*" : creditCard.number[i];
        }
        displayNumber.push(displayDigit);
    }
    return (jsxRuntime.jsx("div", { children: jsxRuntime.jsx("div", { className: styles$1.container, children: jsxRuntime.jsxs("div", { "data-flipped": creditCard.flipped, className: styles$1.inner, children: [jsxRuntime.jsxs("div", { className: styles$1.front, children: [jsxRuntime.jsx("div", { className: styles$1.overlay, style: {
                                    background: "linear-gradient(25deg, ".concat(gradientStart, ", ").concat(gradientEnd, ")"),
                                } }), jsxRuntime.jsxs("div", { className: styles$1.content, children: [jsxRuntime.jsx("div", { className: styles$1.chip }), jsxRuntime.jsx("div", { className: styles$1.type, children: renderCardLogo(creditCard.type) }), jsxRuntime.jsx("div", { className: styles$1.number, onClick: function () { return setFocus(refs.numberInput); }, children: displayNumber.map(function (digit, index) { return (jsxRuntime.jsxs("div", { className: styles$1.digitWrapper, children: [jsxRuntime.jsx("div", { className: [
                                                        styles$1.digit,
                                                        digit === "#" ? styles$1.shown : styles$1.hidden,
                                                    ].join(" "), children: "#" }), jsxRuntime.jsx("div", { className: [
                                                        styles$1.digit,
                                                        digit !== "#" ? styles$1.shown : styles$1.hidden,
                                                    ].join(" "), children: digit !== "#" && digit })] }, index)); }) }), jsxRuntime.jsxs("div", { className: styles$1.name, onClick: function () { return setFocus(refs.nameInput); }, children: [jsxRuntime.jsx("label", { htmlFor: "name", children: texts["Card holder"] }), jsxRuntime.jsxs("div", { id: "name", children: [jsxRuntime.jsx("div", { className: [
                                                            styles$1.placeholder,
                                                            creditCard.name.length > 0 ? styles$1.hidden : styles$1.shown,
                                                        ].join(" "), children: texts["FULL NAME"] }), jsxRuntime.jsx("div", { className: styles$1.nameContainer, children: creditCard.name.split("").map(function (char, index) { return (jsxRuntime.jsx("div", { className: [
                                                                styles$1.character,
                                                                /\s/.test(char) && styles$1.space,
                                                            ].join(" "), children: char }, index)); }) })] })] }), jsxRuntime.jsxs("div", { className: styles$1.expiration, children: [jsxRuntime.jsx("label", { htmlFor: "expiration", children: texts["Expires"] }), jsxRuntime.jsxs("div", { id: "expiration", className: styles$1.expValues, children: [jsxRuntime.jsx("div", { onClick: function () { return setFocus(refs.monthInput); }, children: !creditCard.month ? (texts["MM"]) : (jsxRuntime.jsx("div", { className: styles$1.animated, children: formatMonthDisplayed(creditCard.month) })) }), jsxRuntime.jsx("div", { children: "/" }), jsxRuntime.jsx("div", { onClick: function () { return setFocus(refs.yearInput); }, children: !creditCard.year ? (texts["YY"]) : (jsxRuntime.jsx("div", { className: styles$1.animated, children: "".concat(creditCard.year).slice(-2) })) })] })] })] })] }), jsxRuntime.jsxs("div", { className: styles$1.back, children: [jsxRuntime.jsx("div", { className: styles$1.overlay, style: {
                                    background: "linear-gradient(25deg, ".concat(gradientStart, ", ").concat(gradientEnd, ")"),
                                } }), jsxRuntime.jsxs("div", { className: styles$1.content, children: [jsxRuntime.jsx("div", { className: styles$1.strip }), jsxRuntime.jsxs("div", { className: styles$1.cvv, children: [jsxRuntime.jsx("small", { children: "CVV" }), " ", jsxRuntime.jsx("br", {}), creditCard.cvv] }), jsxRuntime.jsx("div", { className: styles$1.type, children: renderCardLogo(creditCard.type) })] })] })] }) }) }));
};

var css_248z = "@import url(\"https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap\");\n.CreditCard-module_paymentWrapper__jnfUM {\n  font-family: \"Noto Sans\", sans-serif;\n  margin: 0 auto;\n  display: flex;\n  gap: 20px;\n  align-items: center;\n}\n.CreditCard-module_paymentWrapper__jnfUM * {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n.CreditCard-module_paymentWrapper__jnfUM > div {\n  flex: 1;\n}";
var styles = {"paymentWrapper":"CreditCard-module_paymentWrapper__jnfUM"};
styleInject(css_248z);

const creditCardValues = {
    number: "",
    name: "",
    month: 0,
    year: 0,
    cvv: "",
    type: "visa",
    flipped: false,
};

const defaultTexts = {
    "Card holder": "Card holder",
    "FULL NAME": "FULL NAME",
    Expires: "Expires",
    YY: "YY",
    MM: "MM",
    "Card number": "Card number",
    "Card holder's name": "Card holder's name",
    "Expiration date": "Expiration date",
    Month: "Month",
    Year: "Year",
    "Proceed to checkout": "Proceed to checkout",
    "Get back to credits selection": "Get back to credits selection",
};

var CreditCard = function (_a) {
    var gradientStartColor = _a.gradientStartColor, gradientEndColor = _a.gradientEndColor, buttonColor = _a.buttonColor, buttonTextColor = _a.buttonTextColor, submitAction = _a.submitAction, translations = _a.translations;
    var _b = react.useState(creditCardValues), creditCard = _b[0], setCreditCard = _b[1];
    var texts = translations !== null && translations !== void 0 ? translations : defaultTexts;
    // Refs
    var nameInput = react.useRef();
    var numberInput = react.useRef();
    var monthInput = react.useRef();
    var yearInput = react.useRef();
    return (jsxRuntime.jsxs("div", { className: styles.paymentWrapper, children: [jsxRuntime.jsx(Card, { texts: texts, gradientStart: gradientStartColor, gradientEnd: gradientEndColor, creditCard: creditCard, refs: { nameInput: nameInput, numberInput: numberInput, monthInput: monthInput, yearInput: yearInput } }), jsxRuntime.jsx(Form, { texts: texts, buttonColor: buttonColor, buttonTextColor: buttonTextColor, submitAction: submitAction, creditCardValues: { creditCard: creditCard, setCreditCard: setCreditCard }, refs: { nameInput: nameInput, numberInput: numberInput, monthInput: monthInput, yearInput: yearInput } })] }));
};

module.exports = CreditCard;
//# sourceMappingURL=index.js.map
