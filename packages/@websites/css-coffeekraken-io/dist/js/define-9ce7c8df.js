import { _ as __deepMerge, c as __isColor, d as SClass, S as SInterface, f as format, a as SFeature, e as SComponentUtils, g as __camelCase, h as __parse, i as __querySelectorLive } from "./index-1ed0cb73.js";
import { _ as __querySelectorUp } from "./querySelectorUp-a70d0e18.js";
function __isCreditCard(value) {
  const re = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
  return re.test(value);
}
function __isEmail(value) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value.toLowerCase());
}
function __isIsoDate(value) {
  return value.match(/^([0-9]{4})-(1[0-2]|0[1-9])$/) || value.match(/^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])$/) || value.match(/^([0-9]{4})(-?)(1[0-2]|0[1-9])\2(3[01]|0[1-9]|[12][0-9])$/) || value.match(/^([0-9]{4})-?(36[0-6]|3[0-5][0-9]|[12][0-9]{2}|0[1-9][0-9]|00[1-9])$/);
}
function __isIsoDateTime(value) {
  return value.match(/^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])↵\s(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])$/) || value.match(/^(?:([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])\s(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])|([0-9]{4})(1[0-2]|0[1-9])(3[01]|0[1-9]|[12][0-9])\s(2[0-3]|[01][0-9])([0-5][0-9])([0-5][0-9]))$/);
}
function __isIsoTime(value) {
  return value.match(/^(2[0-3]|[01][0-9]):?([0-5][0-9])$/) || value.match(/^(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])$/) || value.match(/^(Z|[+-](?:2[0-3]|[01][0-9])(?::?(?:[0-5][0-9]))?)$/) || value.match(/^(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])(Z|[+-](?:2[0-3]|[01][0-9])(?::?(?:[0-5][0-9]))?)$/);
}
const __en = {
  min: {
    string: "Must have at least %n characters",
    object: "Must have at least %n properties",
    number: "Must be greater than %n",
    array: "Must have at least %n items"
  },
  max: {
    string: "Must have at max %n characters",
    object: "Must have at max %n properties",
    number: "Must be lower than %n",
    array: "Must have at max %n items"
  },
  email: {
    string: "Must be a valid email address"
  },
  required: {
    default: "This is required"
  },
  isoDate: {
    string: "Must be a valid ISO date"
  },
  isoTime: {
    string: "Must be a valid ISO time"
  },
  isoDateTime: {
    string: "Must be a valid ISO date time"
  },
  integer: {
    string: "Must be an integer"
  },
  number: {
    string: "Must be an number"
  },
  negative: {
    string: "Must be a negative number"
  },
  positive: {
    string: "Must be a positive number"
  },
  pattern: {
    string: "Must match the pattern %pattern"
  },
  alphanum: {
    string: "Must contain only alphanumeric characters"
  },
  creditCard: {
    string: "Must be a valid credit card number"
  },
  color: {
    string: "Must be a valid color (hex, rgb, rgba, hsl, hsla)"
  },
  hex: {
    string: "Must be a valid hex color"
  },
  password: {
    weak: "",
    medium: "Must be >=6 characters, at least 1 lowercase/uppercase/special character",
    strong: "Must be >=8 characters, at least 1 lowercase/uppercase/digit/special character"
  }
};
const definition$g = {
  description: "Validate an alphanum string",
  type: "String"
};
function alphanum(value, settings) {
  var _a;
  let message, valid;
  const finalSettings = __deepMerge({
    i18n: __en.alphanum,
    trim: true
  }, settings !== null && settings !== void 0 ? settings : {});
  if (typeof value !== "string") {
    throw new Error(`Sorry but the "alphanum" validation only works with string`);
  }
  if (finalSettings.trim) {
    value = value.trim();
  }
  valid = value.match(/^[a-z0-9]+$/i);
  if (!valid) {
    message = (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a.string;
  }
  return {
    valid,
    message
  };
}
const definition$f = {
  description: "Validate a color string",
  type: "String"
};
function color(value, settings) {
  var _a;
  let message, valid;
  const finalSettings = __deepMerge({
    i18n: __en.color,
    trim: true
  }, settings !== null && settings !== void 0 ? settings : {});
  if (typeof value !== "string") {
    throw new Error(`Sorry but the "color" validation only works with string`);
  }
  if (finalSettings.trim) {
    value = value.trim();
  }
  valid = __isColor(value);
  if (!valid) {
    message = (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a.string;
  }
  return {
    valid,
    message
  };
}
const definition$e = {
  description: "Validate a credit card string",
  type: "String"
};
function creditCard(value, settings) {
  var _a;
  let message, valid;
  const finalSettings = __deepMerge({
    i18n: __en.creditCard,
    trim: true
  }, settings !== null && settings !== void 0 ? settings : {});
  if (typeof value !== "string") {
    throw new Error(`Sorry but the "creditCard" validation only works with string`);
  }
  if (finalSettings.trim) {
    value = value.trim();
  }
  valid = __isCreditCard(value);
  if (!valid) {
    message = (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a.string;
  }
  return {
    valid,
    message
  };
}
const definition$d = {
  description: "Validate an email string",
  type: "String"
};
function email(value, settings) {
  var _a;
  let message, valid;
  const finalSettings = __deepMerge({
    i18n: __en.email,
    trim: true
  }, settings !== null && settings !== void 0 ? settings : {});
  if (typeof value !== "string") {
    throw new Error(`Sorry but the "email" validation only works with string`);
  }
  if (finalSettings.trim) {
    value = value.trim();
  }
  valid = __isEmail(value);
  if (!valid) {
    message = (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a.string;
  }
  return {
    valid,
    message
  };
}
const definition$c = {
  description: "Validate a hexadecimal string",
  type: "String"
};
function hex(value, settings) {
  var _a;
  let message, valid;
  const finalSettings = __deepMerge({
    i18n: __en.hex,
    trim: true
  }, settings !== null && settings !== void 0 ? settings : {});
  if (typeof value !== "string") {
    throw new Error(`Sorry but the "hex" validation only works with string`);
  }
  if (finalSettings.trim) {
    value = value.trim();
  }
  valid = value.match(/^#[a-zA-Z0-9]{3,6}$/);
  if (!valid) {
    message = (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a.string;
  }
  return {
    valid,
    message
  };
}
const definition$b = {
  description: "Validate an integer",
  type: "number"
};
function integer(value, settings) {
  var _a;
  let message, valid;
  const finalSettings = __deepMerge({
    i18n: __en.integer,
    cast: true,
    trim: true
  }, settings !== null && settings !== void 0 ? settings : {});
  if (typeof value !== "string" && typeof value !== "number") {
    throw new Error(`Sorry but the "integer" validation only works with string and number`);
  }
  if (typeof value === "string" && finalSettings.trim) {
    value = value.trim();
  }
  if (typeof value === "string" && finalSettings.cast) {
    value = Number(value);
  }
  if (isNaN(value)) {
    valid = false;
  } else {
    valid = Number.isInteger(value);
  }
  if (!valid) {
    message = (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a.string;
  }
  return {
    valid,
    message
  };
}
const definition$a = {
  description: "Validate an iso date string",
  type: "String"
};
function isoDate(value, settings) {
  var _a;
  let message, valid;
  const finalSettings = __deepMerge({
    i18n: __en.isoDate,
    trim: true
  }, settings !== null && settings !== void 0 ? settings : {});
  if (typeof value !== "string") {
    throw new Error(`Sorry but the "isoDate" validation only works with string`);
  }
  if (finalSettings.trim) {
    value = value.trim();
  }
  valid = __isIsoDate(value);
  if (!valid) {
    message = (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a.string;
  }
  return {
    valid,
    message
  };
}
const definition$9 = {
  description: "Validate an iso date string",
  type: "String"
};
function isoDateTime(value, settings) {
  var _a;
  let message, valid;
  const finalSettings = __deepMerge({
    i18n: __en.isoDateTime,
    trim: true
  }, settings !== null && settings !== void 0 ? settings : {});
  if (typeof value !== "string") {
    throw new Error(`Sorry but the "isoDateTime" validation only works with string`);
  }
  if (finalSettings.trim) {
    value = value.trim();
  }
  valid = __isIsoDateTime(value);
  if (!valid) {
    message = (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a.string;
  }
  return {
    valid,
    message
  };
}
const definition$8 = {
  description: "Validate an iso time string",
  type: "String"
};
function isoTime(value, settings) {
  var _a;
  let message, valid;
  const finalSettings = __deepMerge({
    i18n: __en.isoTime,
    trim: true
  }, settings !== null && settings !== void 0 ? settings : {});
  if (typeof value !== "string") {
    throw new Error(`Sorry but the "isoTime" validation only works with string`);
  }
  if (finalSettings.trim) {
    value = value.trim();
  }
  valid = __isIsoTime(value);
  if (!valid) {
    message = (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a.string;
  }
  return {
    valid,
    message
  };
}
const definition$7 = {
  description: 'Validate string, array, object and number using the "max" rule',
  type: "String|Array|Object|Number"
};
function max(value, n, settings) {
  var _a, _b, _c, _d;
  let message, valid;
  const finalSettings = __deepMerge({
    i18n: __en.max,
    trim: true
  }, settings !== null && settings !== void 0 ? settings : {});
  switch (true) {
    case typeof value === "string":
      if (finalSettings.trim) {
        value = value.trim();
      }
      valid = value.length <= n;
      message = (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a.string.replace("%n", n);
      break;
    case typeof value === "number":
      valid = value <= n;
      message = (_b = finalSettings.i18n) === null || _b === void 0 ? void 0 : _b.number.replace("%n", n);
      break;
    case Array.isArray(value):
      valid = value.length <= n;
      message = (_c = finalSettings.i18n) === null || _c === void 0 ? void 0 : _c.array.replace("%n", n);
      break;
    case typeof value === "object":
      valid = Object.keys(value).length <= n;
      message = (_d = finalSettings.i18n) === null || _d === void 0 ? void 0 : _d.object.replace("%n", n);
      break;
    default:
      throw new Error(`Sorry but the "max" validation only works with string, number, array or object values.`);
  }
  return {
    valid,
    message
  };
}
const definition$6 = {
  description: 'Validate string, array, object and number using the "min" rule',
  type: "String|Array|Object|Number"
};
function min(value, n, settings) {
  var _a, _b, _c, _d;
  let message, valid;
  const finalSettings = __deepMerge({
    i18n: __en.min,
    trim: true
  }, settings !== null && settings !== void 0 ? settings : {});
  switch (true) {
    case typeof value === "string":
      if (finalSettings.trim) {
        value = value.trim();
      }
      valid = value.length >= n;
      message = (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a.string.replace("%n", n);
      break;
    case typeof value === "number":
      valid = value >= n;
      message = (_b = finalSettings.i18n) === null || _b === void 0 ? void 0 : _b.number.replace("%n", n);
      break;
    case Array.isArray(value):
      valid = value.length >= n;
      message = (_c = finalSettings.i18n) === null || _c === void 0 ? void 0 : _c.array.replace("%n", n);
      break;
    case typeof value === "object":
      valid = Object.keys(value).length >= n;
      message = (_d = finalSettings.i18n) === null || _d === void 0 ? void 0 : _d.object.replace("%n", n);
      break;
    default:
      throw new Error(`Sorry but the "min" validation only works with string, number, array or object values.`);
  }
  return {
    valid,
    message
  };
}
const definition$5 = {
  description: "Validate an negative number",
  type: "number"
};
function negative(value, settings) {
  var _a;
  let message, valid;
  const finalSettings = __deepMerge({
    i18n: __en.negative,
    cast: true,
    trim: true
  }, settings !== null && settings !== void 0 ? settings : {});
  if (typeof value !== "string" && typeof value !== "number") {
    throw new Error(`Sorry but the "negative" validation only works with string and number`);
  }
  if (typeof value === "string" && finalSettings.trim) {
    value = value.trim();
  }
  if (typeof value === "string" && finalSettings.cast) {
    value = Number(value);
  }
  if (isNaN(value)) {
    valid = false;
  } else {
    valid = value < 0;
  }
  if (!valid) {
    message = (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a.string;
  }
  return {
    valid,
    message
  };
}
const definition$4 = {
  description: "Validate an number",
  type: "number"
};
function number(value, settings) {
  var _a;
  let message, valid;
  const finalSettings = __deepMerge({
    i18n: __en.number,
    cast: true,
    trim: true
  }, settings !== null && settings !== void 0 ? settings : {});
  if (typeof value !== "string" && typeof value !== "number") {
    throw new Error(`Sorry but the "number" validation only works with string and number`);
  }
  if (typeof value === "string" && finalSettings.trim) {
    value = value.trim();
  }
  if (typeof value === "string" && finalSettings.cast) {
    value = Number(value);
  }
  if (isNaN(value)) {
    valid = false;
  } else {
    valid = true;
  }
  if (!valid) {
    message = (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a.string;
  }
  return {
    valid,
    message
  };
}
const definition$3 = {
  description: "Validate a password string",
  type: "String"
};
function password(value, level, settings) {
  var _a;
  let message, valid = false;
  const finalSettings = __deepMerge({
    i18n: __en.password,
    trim: true,
    weakReg: /.*/,
    mediumReg: /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/,
    strongReg: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/
  }, settings !== null && settings !== void 0 ? settings : {});
  if (typeof value !== "string") {
    throw new Error(`Sorry but the "password" validation only works with string`);
  }
  if (finalSettings.trim) {
    value = value.trim();
  }
  let validLevels = [];
  if (finalSettings.weakReg.test(value)) {
    if (value) {
      validLevels.push("weak");
    }
    if (level === "weak") {
      valid = true;
    }
  }
  if (finalSettings.mediumReg.test(value)) {
    if (value) {
      validLevels.push("medium");
    }
    if (level === "medium") {
      valid = true;
    }
  }
  if (finalSettings.strongReg.test(value)) {
    if (value) {
      validLevels.push("strong");
    }
    if (level === "strong") {
      valid = true;
    }
  }
  if (!valid) {
    message = (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a[level];
  }
  return {
    valid,
    message,
    metas: {
      levels: ["weak", "medium", "strong"],
      validLevels
    }
  };
}
const definition$2 = {
  description: "Validate a string using a regex pattern",
  type: "String"
};
function pattern(value, pattern2, settings) {
  var _a;
  let message, valid;
  const finalSettings = __deepMerge({
    i18n: __en.pattern,
    trim: true
  }, settings !== null && settings !== void 0 ? settings : {});
  if (typeof value !== "string") {
    throw new Error(`Sorry but the "pattern" validation only works with string`);
  }
  if (finalSettings.trim) {
    value = value.trim();
  }
  const reg = new RegExp(pattern2);
  valid = reg.test(value);
  if (!valid) {
    message = (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a.string.replace("%pattern", pattern2);
  }
  return {
    valid,
    message
  };
}
const definition$1 = {
  description: "Validate an positive number",
  type: "number"
};
function positive(value, settings) {
  var _a;
  let message, valid;
  const finalSettings = __deepMerge({
    i18n: __en.positive,
    cast: true,
    trim: true
  }, settings !== null && settings !== void 0 ? settings : {});
  if (typeof value !== "string" && typeof value !== "number") {
    throw new Error(`Sorry but the "positive" validation only works with string and number`);
  }
  if (typeof value === "string" && finalSettings.trim) {
    value = value.trim();
  }
  if (typeof value === "string" && finalSettings.cast) {
    value = Number(value);
  }
  if (isNaN(value)) {
    valid = false;
  } else {
    valid = value >= 0;
  }
  if (!valid) {
    message = (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a.string;
  }
  return {
    valid,
    message
  };
}
const definition = {
  description: "Make sure a value has been provided",
  type: "Boolean"
};
function required(value, settings) {
  var _a;
  let message, valid;
  const finalSettings = __deepMerge({
    i18n: __en.required,
    trim: true
  }, settings !== null && settings !== void 0 ? settings : {});
  if (typeof value === "string" && finalSettings.trim) {
    value = value.trim();
  }
  valid = value !== void 0 && value !== null && value !== "";
  if (!valid) {
    message = (_a = finalSettings.i18n) === null || _a === void 0 ? void 0 : _a.default;
  }
  return {
    valid,
    message
  };
}
class SValidator extends SClass {
  /**
   * @name            registerValidator
   * @type            Function
   * @static
   *
   * This static method allows you to register a new validator
   *
   * @param       {}
   */
  static registerValidator(name, validator, settings) {
    SValidator._validators[name] = {
      validator,
      settings
    };
  }
  /**
   * @name            registerPreset
   * @type            Function
   * @static
   *
   * This static method allows you to register a new validator
   *
   * @param       {}
   */
  static registerPreset(name, rules, settings) {
    SValidator._presets[name] = {
      rules,
      settings
    };
  }
  /**
   * @name         getValidatorsDefinition
   * @type        Function
   * @static
   *
   * Get back an definition of the validators in the SValidator class
   *
   * @since           2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  static getValidatorsDefinition() {
    const definition2 = {};
    for (let [name, validatorObj] of Object.entries(SValidator._validators)) {
      if (!validatorObj.settings.definition)
        continue;
      definition2[name] = validatorObj.settings.definition;
    }
    return definition2;
  }
  /**
   * @name                    constructor
   * @type                    Function
   *
   * Constructor
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  constructor(settings) {
    super(__deepMerge({
      i18n: __en
    }, settings !== null && settings !== void 0 ? settings : {}));
  }
  /**
   * @name            validate
   * @type            Function
   *
   * This method allows you to validate any data using a lot of validators like "email", "url", "min", "max", etc...
   * The passed rules have to be an object with one or multiple properties representing the validations you want to make on your passed value.
   *
   * @param       {any}             value        The value to validate
   * @param       {ISValidatorRules}      rules        The rules to validate the value with
   * @param       {Partial<ISValidatorSettings>}         [settings={}]          Some settings to override from the constructor passed ones
   * @return      {ISValidatorValidateResult}                         The result object
   *
   * @example         js
   * import __SValidator from '@coffeekraken/s-validation';
   * const validator = new __SValidator();
   *
   * // min 2
   * validator.validate('Hello World Plop', {
   *      min: 2
   * });
   *
   * // email
   * validator.validate('plop', {
   *     email: true
   * });
   *
   * // with some custom settings
   * validator.validate('Hello World Plop', {
   *    min: {
   *       value: 2,
   *       settings: {
   *          i18n: {
   *             string: 'Something goes wrong'
   *          }
   *       }
   *    },
   * });
   *
   * // multiple rules
   * validator.validate('Hello World Plop', {
   *      min: 2,
   *      max: 10,
   *     email: true
   * });
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  validate(value, rulesOrPreset, settings) {
    var _a, _b, _c;
    let result = {
      valid: true,
      rules: {},
      messages: []
    };
    let rules = rulesOrPreset;
    if (typeof rulesOrPreset === "string") {
      if (!SValidator._presets[rulesOrPreset]) {
        throw new Error(`Sorry but the preset "${rulesOrPreset}" is not registered`);
      }
      rules = SValidator._presets[rulesOrPreset].rules;
    }
    for (let [validator, valueOrObj] of Object.entries(rules)) {
      let validatorSettings = (_a = valueOrObj.settings) !== null && _a !== void 0 ? _a : {}, validatorValue = (_b = valueOrObj.value) !== null && _b !== void 0 ? _b : valueOrObj, res;
      const validatorObj = SValidator._validators[validator];
      if (!validatorObj) {
        throw new Error(`Sorry but the validator "${validator}" is not registered`);
      }
      const finalValidatorSettings = Object.assign(Object.assign({}, validatorSettings), { i18n: (_c = this.settings.i18n[validator]) !== null && _c !== void 0 ? _c : {} });
      if (typeof rulesOrPreset === "boolean") {
        res = validatorObj.validator(value, finalValidatorSettings);
      } else {
        res = validatorObj.validator(value, validatorValue, finalValidatorSettings);
      }
      if (!res.valid) {
        res.message = res.message.replace("%value", value).replace("%validator", validator);
        result.valid = false;
        result.rules[validator] = res;
        result.messages.push(res.message);
      } else {
        result.rules[validator] = res;
      }
    }
    return result;
  }
}
SValidator._validators = {};
SValidator._presets = {};
SValidator.registerValidator("min", min, {
  definition: definition$6
});
SValidator.registerValidator("max", max, {
  definition: definition$7
});
SValidator.registerValidator("email", email, {
  definition: definition$d
});
SValidator.registerValidator("required", required, {
  definition
});
SValidator.registerValidator("isoDate", isoDate, {
  definition: definition$a
});
SValidator.registerValidator("isoTime", isoTime, {
  definition: definition$8
});
SValidator.registerValidator("isoDateTime", isoDateTime, {
  definition: definition$9
});
SValidator.registerValidator("integer", integer, {
  definition: definition$b
});
SValidator.registerValidator("number", number, {
  definition: definition$4
});
SValidator.registerValidator("negative", negative, {
  definition: definition$5
});
SValidator.registerValidator("positive", positive, {
  definition: definition$1
});
SValidator.registerValidator("pattern", pattern, {
  definition: definition$2
});
SValidator.registerValidator("alphanum", alphanum, {
  definition: definition$g
});
SValidator.registerValidator("creditCard", creditCard, {
  definition: definition$e
});
SValidator.registerValidator("color", color, {
  definition: definition$f
});
SValidator.registerValidator("hex", hex, {
  definition: definition$c
});
SValidator.registerValidator("password", password, {
  definition: definition$3
});
const __css = `@keyframes error-message-appear {
    from {
        line-height: 1;
        max-height: 0;
    }
    to {
        max-height: 2em;
        line-height: 2;
    }
}

.sbmO + .sbmP {
    text-align: end;
    color: hsla(calc(var(--sfx, 0) + var(--smf ,0)),calc((var(--sfy, 0)) * 1%),calc((var(--sfz, 0)) * 1%),var(--sfA, 1));
    overflow: hidden;
    max-height: 0;
    line-height: 1;
    margin: 0;
    animation: 0.2s error-message-appear var(--sgF, 0) forwards;
}body:after {
                    display: none;;
                    content: '{"lod":{"enabled":false,"defaultLevel":3,"botLevel":1,"levels":{"0":{"name":"bare","speedIndex":0},"1":{"name":"lnf","speedIndex":30},"2":{"name":"theme","speedIndex":40},"3":{"name":"high","speedIndex":50},"4":{"name":"ultra","speedIndex":60}},"method":"class","defaultAction":">=","cssProperties":{"animation":2,"animation-delay":2,"animation-direction":2,"animation-duration":2,"animation-fill-mode":2,"animation-iteration-count":2,"animation-name":2,"animation-play-state":2,"animation-timing-function":2,"backdrop-filter":3,"background":1,"background-attachment":1,"background-blend-mode":3,"background-clip":1,"background-color":1,"background-image":1,"background-origin":1,"background-position":1,"background-repeat":1,"background-size":1,"border":1,"border-bottom":1,"border-bottom-color":1,"border-bottom-left-radius":1,"border-bottom-right-radius":1,"border-bottom-style":1,"border-bottom-width":1,"border-collapse":1,"border-color":1,"border-image":1,"border-image-outset":1,"border-image-repeat":1,"border-image-slice":1,"border-image-source":1,"border-image-width":1,"border-left":1,"border-left-color":1,"border-left-style":1,"border-left-width":1,"border-radius":1,"border-right":1,"border-right-color":1,"border-right-style":1,"border-right-width":1,"border-spacing":1,"border-style":1,"border-top":1,"border-top-color":1,"border-top-left-radius":1,"border-top-right-radius":1,"border-top-style":1,"border-top-width":1,"border-width":1,"box-shadow":1,"caret-color":1,"color":1,"column-count":1,"column-fill":1,"column-rule":1,"column-rule-color":1,"column-rule-style":1,"column-rule-width":1,"counter-increment":1,"counter-reset":1,"filter":1,"list-style-image":1,"outline":1,"outline-color":1,"outline-offset":1,"outline-style":1,"outline-width":1,"text-decoration":1,"text-decoration-color":1,"text-decoration-line":1,"text-indent":1,"text-justify":1,"text-overflow":1,"text-shadow":2,"text-transform":1,"transition":1,"transition-delay":1,"transition-duration":1,"transition-property":1,"transition-timing-function":1,"word-break":1,"word-spacing":1,"word-wrap":1}},"clean":{"variables":false},"compress":{"variables":false}}';
}
`;
const validatorsDefinition = SValidator.getValidatorsDefinition(), validatorsMessagesDefinition = {};
for (let [validator, definition2] of Object.entries(validatorsDefinition)) {
  validatorsMessagesDefinition[`${validator}Message`] = {
    description: `The message to display when the validator "${validator}" fails`,
    type: "String"
  };
}
class SFormValidateFeatureInterface extends SInterface {
  static get _definition() {
    return Object.assign(Object.assign(Object.assign({}, validatorsDefinition), validatorsMessagesDefinition), { type: {
      description: "Specify the validation type. Usually automatically detected depending on the field type",
      type: "String",
      default: "text"
    }, on: {
      description: 'Specify when to trigger a validation. Can be "change","submit","enter" and/or "reset"',
      type: "Array<String>",
      values: ["keyup", "change", "submit", "enter", "reset"],
      default: ["keyup", "change", "submit", "enter", "reset"]
    }, format: {
      description: 'Specify if you want your value to be formatted a certain way. You can specify every "import { __format } from `@coffeekraken/sugar/string`" supported formats',
      type: "String",
      values: format.formats
    }, errorClass: {
      description: "Specify the class to apply when theres an error",
      type: "String",
      default: "s-form-validate--error s-color--error"
    }, validClass: {
      description: "Specify the class to apply on your s-form-validate element when validation is passed successfully",
      type: "String",
      default: "s-form-validate--valid s-color--success"
    }, handlers: {
      description: 'Specify some custom handlers by validator that will be executed in addition to the default validate behavior. The handler will take as argument an object containing the "result" SValidator result, the "$feature" that represent the s-validate node, the "$form" node if exists, the "$node" attached node if using the "nodes" property, the "$field" that represent the input field handled and the "props" that represent the feature properties',
      type: "Object",
      default: {}
    }, nodes: {
      description: 'Specify a css selector that target some HTMLElements used for the validation. Every HTMLElement has to specify 1 validator by using element attributes (same as on the feature itself). Classes are applied on each "node" to specify if the validator is valid or not',
      type: "String"
    }, language: {
      description: "Specify the language you want to use for messages",
      type: "String",
      default: "en"
    }, displayError: {
      description: "Specify if you want to display the error messages or not",
      type: "Boolean",
      default: true
    }, errorContainerAttr: {
      description: "Specify the attribute to search for the error container. If not found, a default container will be created and inserted after your s-form-validate element",
      type: "String",
      default: "s-form-validate-error"
    } });
  }
}
var __awaiter = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class SFormValidateFeature extends SFeature {
  // @ts-ignore
  constructor(name, node, settings) {
    var _a, _b, _c, _d;
    Object.keys((_b = (_a = SComponentUtils.getDefaultProps(name)) === null || _a === void 0 ? void 0 : _a.customValidations) !== null && _b !== void 0 ? _b : {}).forEach((validationName) => {
      if (SFormValidateFeatureInterface.definition[validationName])
        return;
      SFormValidateFeatureInterface.definition[validationName] = {
        type: "String|Boolean"
      };
    });
    super(name, node, __deepMerge({
      name: "s-form-validate",
      interface: SFormValidateFeatureInterface,
      style: __css
    }, settings !== null && settings !== void 0 ? settings : {}));
    this._nodeByValidator = {};
    this._isDirty = false;
    this._isValidating = false;
    if (!((_c = this.props.handlers) === null || _c === void 0 ? void 0 : _c.password)) {
      (_d = this.props.handlers) === null || _d === void 0 ? void 0 : _d.password = this._passwordDefaultHandler;
    }
    this._validator = new SValidator();
    this._$form = __querySelectorUp(this.node, "form");
    if (this._$form) {
      this._$form.addEventListener("submit", (e) => {
        var _a2;
        if (!this._$form._submitHandler) {
          this._$form._submitHandler = true;
          const collectedErrors = [];
          const errorHandler = (e2) => {
            collectedErrors.push(e2.detail);
          };
          this._$form.addEventListener("s-form-validate.error", errorHandler);
          e.preventDefault();
          if (e instanceof CustomEvent && !((_a2 = e.detail) === null || _a2 === void 0 ? void 0 : _a2.internal))
            ;
          else {
            e.stopPropagation();
          }
          setTimeout(() => {
            delete this._$form._submitHandler;
            this._$form.removeEventListener("s-form-validate.error", errorHandler);
            if (!collectedErrors.length) {
              this._$form.submit();
              if (e instanceof CustomEvent)
                ;
              else {
                this._$form.dispatchEvent(new CustomEvent("submit", {
                  bubbles: true,
                  cancelable: true
                }));
              }
            }
          });
        }
      });
    }
    this.utils.exposeApi({
      validate: this.validate
    }, this);
    if (this.props.nodes) {
      this._$nodes = this.node.querySelectorAll(this.props.nodes);
      this._$nodes.forEach(($node) => {
        for (let i = 0; i < $node.attributes.length; i++) {
          const attr = $node.attributes[i];
          if (attr.name in this.props) {
            this.props[__camelCase(attr.name)] = __parse(attr.value);
            this._nodeByValidator[__camelCase(attr.name)] = $node;
          }
        }
      });
    }
  }
  mount() {
    __querySelectorLive("input,textarea,select", ($field) => {
      this._initField($field);
    }, {
      rootNode: this.node,
      scopes: false
    });
    if (this.props.type) {
      if (this.props.type === "text")
        this._validationType = "string";
      else
        this._validationType = this.props.type;
    }
  }
  _passwordDefaultHandler({ result, $feature }) {
    var _a;
    if (result.valid) {
      $feature.classList.remove(`password-weak`);
      $feature.classList.remove(`password-medium`);
      $feature.classList.remove(`password-strong`);
    } else if ((_a = result.metas) === null || _a === void 0 ? void 0 : _a.levels) {
      result.metas.levels.forEach((level) => {
        if (level !== result.metas.validLevels.slice(-1)[0]) {
          $feature.classList.remove(`password-${level}`);
        } else {
          $feature.classList.add(`password-${level}`);
        }
      });
    }
  }
  _initField($field) {
    this._$field = $field;
    this._$field = this.node;
    const $insideField = this.node.querySelector("input,textarea,select");
    if ($insideField)
      this._$field = $insideField;
    this._$field.setAttribute("novalidate", "true");
    ["required", "maxlength", "minlength", "max", "min", "pattern"].forEach((type) => {
      if (this._$field.hasAttribute(type)) {
        if (this.props[type])
          return;
        this.props[type] = this._$field.getAttribute(type);
        if (type !== "maxlength" && type !== "minlength") {
          this._$field.removeAttribute(type);
        }
      }
    });
    ["keydown", "change"].forEach((eventType) => {
      this._$field.addEventListener(eventType, (e) => {
        if (this.props.format && (e.target.type === "text" || e.target.tagName.toLowerCase() === "textarea")) {
          setTimeout(() => {
            var _a;
            const newValue = this.format((_a = e.target.value) !== null && _a !== void 0 ? _a : "", this.props.format);
            if (newValue !== e.target.value) {
              this._$field.value = newValue;
            }
          });
        }
      });
    });
    this.props.on.forEach((on) => {
      var _a, _b;
      if (on === "enter") {
        this._$field.addEventListener("keyup", (e) => {
          if (e.keyCode !== 13)
            return;
          if (this._$form) {
            this._$form.dispatchEvent(new CustomEvent("submit", {
              bubbles: false,
              detail: {
                internal: true
                // internal marker to let the validation be made globally on all the validators
              }
            }));
          } else {
            this.validate(e);
          }
        });
      } else if (on === "reset") {
        (_a = this._$field.form) === null || _a === void 0 ? void 0 : _a.addEventListener(on, (e) => {
          setTimeout(() => {
            this.validate(e);
          });
        });
      } else if (on === "submit") {
        (_b = this._$field.form) === null || _b === void 0 ? void 0 : _b.addEventListener(on, (e) => {
          var _a2;
          e.preventDefault();
          if (e instanceof CustomEvent && !((_a2 = e.detail) === null || _a2 === void 0 ? void 0 : _a2.internal))
            return;
          e.stopPropagation();
          this.validate(e);
        });
      } else if (on === "keyup") {
        this.node.addEventListener(on, (e) => {
          if (!this._isDirty)
            return;
          this.validate(e);
        });
      } else {
        this.node.addEventListener(on, (e) => {
          this.validate(e);
        });
      }
    });
  }
  format(value, format$1) {
    const newValue = format(value, format$1);
    return newValue;
  }
  validate(event) {
    var _a;
    if (!this._$field) {
      throw new Error(`No $field has been found to be validated...`);
    }
    let value = this._getFieldValue();
    if (((_a = event === null || event === void 0 ? void 0 : event.currentTarget) === null || _a === void 0 ? void 0 : _a.tagName.toLowerCase()) === "form" && event.type !== "reset") {
      event.preventDefault();
    }
    if (this._isValidating)
      return;
    this._isValidating = true;
    setTimeout(() => {
      this._isValidating = false;
    });
    let resultObj;
    const validatorRules = {};
    for (let [validator, definition2] of Object.entries(SValidator.getValidatorsDefinition())) {
      if (this.props[validator] !== void 0) {
        validatorRules[validator] = this.props[validator];
      }
    }
    resultObj = this._validator.validate(value, validatorRules);
    if (event.type === "reset") {
      resultObj = {
        valid: true
      };
    }
    this._applyResult(resultObj, event);
  }
  _getFieldValue() {
    switch (true) {
      case this._$field.type === "checkbox":
        return this._getCheckboxValues();
      case this._$field.type === "range":
        return this._getRangeValue();
      case this._$field.tagName.toLowerCase() === "select":
        return this._getSelectValues();
      case this._$field.type === "radio":
        return this._getRadioValue();
      default:
        return this._$field.value;
    }
  }
  _getCheckboxValues() {
    return Array.from(
      // @ts-ignore
      this.node.querySelectorAll('input[type="checkbox"]:checked')
    ).map(($item) => $item.value);
  }
  _getRadioValue() {
    return this.node.querySelector('input[type="radio"]:checked').value;
  }
  _getRangeValue() {
    return parseFloat(this._$field.value);
  }
  _getSelectValues() {
    return Array.from(this._$field.querySelectorAll("option")).filter(($item) => $item.selected).map(($item) => $item.value);
  }
  _applyResult(res, event) {
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, void 0, function* () {
      for (let [validator, definition2] of Object.entries(SValidator.getValidatorsDefinition())) {
        if (!this.props[validator]) {
          continue;
        }
        if (this.props.handlers[validator]) {
          yield this.props.handlers[validator]({
            result: Object.assign({}, (_b = (_a = res.rules) === null || _a === void 0 ? void 0 : _a[validator]) !== null && _b !== void 0 ? _b : res),
            props: this.props,
            $feature: this.node,
            $form: this._$form,
            $field: this._$field,
            $node: (_c = this._nodeByValidator) === null || _c === void 0 ? void 0 : _c[validator]
          });
        }
      }
      if (!res.valid) {
        this._isDirty = true;
        this.node.classList.add(...this.props.errorClass.split(" "));
        this.node.classList.remove(...this.props.validClass.split(" "));
        const firstInvalidValidator = Object.keys(res.rules)[0];
        if (!Object.keys(this._nodeByValidator).length) {
          const finalMessage = this.props[`${firstInvalidValidator}Message`] || res.messages[0];
          if (this.props.displayError) {
            this._$error = (_d = this.node.querySelector(`[${this.props.errorContainerAttr}]`)) !== null && _d !== void 0 ? _d : this.node.nextElementSibling;
            if (!this._$error || !this._$error.hasAttribute("s-form-validate-error")) {
              this._$error = document.createElement("p");
              this._$error.setAttribute("s-form-validate-error", "true");
              this._$error.classList.add("s-form-validate-error-message");
              this.node.parentNode.insertBefore(this._$error, this.node.nextSibling);
            }
            this._$error.innerHTML = finalMessage;
          }
        } else {
          for (let [validator, validationObj] of Object.entries(res.rules)) {
            if (!this._nodeByValidator[validator])
              continue;
            if (validationObj.valid) {
              this._nodeByValidator[validator].classList.remove(...this.props.errorClass.split(" "));
              this._nodeByValidator[validator].classList.add(...this.props.validClass.split(" "));
            } else {
              this._nodeByValidator[validator].classList.remove(...this.props.validClass.split(" "));
              this._nodeByValidator[validator].classList.add(...this.props.errorClass.split(" "));
            }
          }
        }
        this.utils.dispatchEvent("error", {
          detail: res
        });
      } else {
        this._isDirty = false;
        if (event.type !== "reset") {
          this.node.classList.add(...this.props.validClass.split(" "));
        } else {
          this.node.classList.remove(...this.props.validClass.split(" "));
        }
        this.node.classList.remove(...this.props.errorClass.split(" "));
        if ((_e = this._$error) === null || _e === void 0 ? void 0 : _e.hasAttribute("s-form-validate-error")) {
          (_f = this._$error) === null || _f === void 0 ? void 0 : _f.remove();
        }
        if (Object.keys(this._nodeByValidator).length) {
          for (let [validator, validationObj] of Object.entries(res.rules)) {
            if (!this._nodeByValidator[validator])
              continue;
            this._nodeByValidator[validator].classList.remove(...this.props.errorClass.split(" "));
            this._nodeByValidator[validator].classList.add(...this.props.validClass.split(" "));
          }
        }
        this.utils.dispatchEvent("valid", {
          detail: res
        });
      }
    });
  }
}
function define(props = {}, name = "s-form-validate") {
  SFormValidateFeature.define(name, SFormValidateFeature, Object.assign({ mountWhen: "inViewport" }, props));
}
export {
  define as default
};
