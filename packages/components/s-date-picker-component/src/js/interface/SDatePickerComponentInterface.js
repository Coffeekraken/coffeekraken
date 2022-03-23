var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var SDatePickerComponentInterface_exports = {};
__export(SDatePickerComponentInterface_exports, {
  default: () => SDatePickerComponentInterface
});
module.exports = __toCommonJS(SDatePickerComponentInterface_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"), 1);
var import_node = __toESM(require("@coffeekraken/sugar/shared/is/node"), 1);
class SDatePickerComponentInterface extends import_s_interface.default {
  static get _definition() {
    var _a, _b, _c;
    return {
      name: {
        descrition: "Specify the name for your input name",
        type: "String",
        required: true
      },
      value: {
        description: "Specify the initial value",
        type: "String"
      },
      placeholder: {
        description: "Specify a placeholder for your input",
        type: "String",
        default: "Select a date"
      },
      format: {
        description: "Specify the format to use for your datepicker",
        type: "String",
        default: (_a = import_s_sugar_config.default.get("datetime.dateFormat")) != null ? _a : "YYYY-MM-DD"
      },
      firstDay: {
        type: "Number",
        description: "Specify the first day of the week. 0 is sunday, 1 monday, etc...",
        default: 1
      },
      minDate: {
        type: "String",
        description: "the minimum/earliest date that can be selected (this should be a native Date object - e.g. new Date() or moment().toDate())"
      },
      maxDate: {
        type: "String",
        description: "the maximum/latest date that can be selected (this should be a native Date object - e.g. new Date() or moment().toDate())"
      },
      disableWeekends: {
        type: "Boolean",
        description: "disallow selection of Saturdays or Sundays",
        default: false
      },
      disabled: {
        type: "Boolean",
        description: "Specify if your date picker is disabled",
        default: false
      },
      yearRange: {
        type: {
          type: "Array<Number>",
          splitChars: [","]
        },
        description: "number of years either side (e.g. 10) or array of upper/lower range (e.g. [1900,2015])"
      },
      rtl: {
        type: "Boolean",
        description: "reverse the calendar for right-to-left languages",
        default: !(0, import_node.default)() ? ((_b = document.querySelector("html")) == null ? void 0 : _b.getAttribute("dir")) === "rtl" : false
      },
      i18n: {
        type: "String",
        description: "language defaults for month and weekday names",
        default: (_c = import_s_sugar_config.default.get("datetime.i18n")) != null ? _c : {
          previousMonth: "Previous Month",
          nextMonth: "Next Month",
          months: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
          ],
          weekdays: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          weekdaysShort: [
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat"
          ]
        }
      },
      numberOfMonths: {
        type: "Number",
        description: "number of visible calendars",
        default: 1
      },
      events: {
        type: {
          type: "Array<String>",
          splitChars: [","]
        },
        description: `array of dates that you would like to differentiate from regular days (e.g. ['Sat Jun 28 2017', 'Sun Jun 29 2017', 'Tue Jul 01 2017',])`,
        default: []
      },
      input: {
        description: "Specify if you want a visible input injected if you don't have specified yours.",
        type: "Boolean",
        default: false,
        physical: true
      },
      button: {
        description: "Specify if you want a button attached to your input or not",
        type: "Boolean",
        default: false,
        physical: true
      },
      arrowIcon: {
        description: "Specify the svg code for the arrow used across the datepicker",
        type: "String",
        default: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z"/></svg>'
      },
      calendarIcon: {
        description: "Specify the svg code for the calendar icon used in the button",
        type: "String"
      }
    };
  }
}
