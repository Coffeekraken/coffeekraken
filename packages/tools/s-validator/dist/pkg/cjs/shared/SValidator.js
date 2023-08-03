"use strict";
// @ts-nocheck
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const object_1 = require("@coffeekraken/sugar/object");
const en_js_1 = __importDefault(require("./i18n/en.js"));
const type_js_1 = __importStar(require("./validators/type.js"));
const alphanum_js_1 = __importStar(require("./validators/alphanum.js"));
const color_js_1 = __importStar(require("./validators/color.js"));
const creditCard_js_1 = __importStar(require("./validators/creditCard.js"));
const email_js_1 = __importStar(require("./validators/email.js"));
const hex_js_1 = __importStar(require("./validators/hex.js"));
const integer_js_1 = __importStar(require("./validators/integer.js"));
const isoDate_js_1 = __importStar(require("./validators/isoDate.js"));
const isoDateTime_js_1 = __importStar(require("./validators/isoDateTime.js"));
const isoTime_js_1 = __importStar(require("./validators/isoTime.js"));
const max_js_1 = __importStar(require("./validators/max.js"));
const min_js_1 = __importStar(require("./validators/min.js"));
const negative_js_1 = __importStar(require("./validators/negative.js"));
const number_js_1 = __importStar(require("./validators/number.js"));
const password_js_1 = __importStar(require("./validators/password.js"));
const pattern_js_1 = __importStar(require("./validators/pattern.js"));
const positive_js_1 = __importStar(require("./validators/positive.js"));
const required_js_1 = __importStar(require("./validators/required.js"));
class SValidator extends s_class_1.default {
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
            settings,
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
            settings,
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
        const definition = {};
        for (let [name, validatorObj] of Object.entries(SValidator._validators)) {
            if (!validatorObj.settings.definition)
                continue;
            definition[name] = validatorObj.settings.definition;
        }
        return definition;
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
        // save the settings
        super((0, object_1.__deepMerge)({
            i18n: en_js_1.default,
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
    validate(value, rulesOrPreset) {
        var _a, _b, _c;
        let result = {
            valid: true,
            rules: {},
            messages: [],
        };
        let rules = rulesOrPreset;
        if (typeof rulesOrPreset === 'string') {
            if (!SValidator._presets[rulesOrPreset]) {
                throw new Error(`Sorry but the preset "${rulesOrPreset}" is not registered`);
            }
            rules = SValidator._presets[rulesOrPreset].rules;
        }
        for (let [validator, valueOrObj] of Object.entries(rules)) {
            let validatorSettings = (_a = valueOrObj.settings) !== null && _a !== void 0 ? _a : {}, validatorValue = (_b = valueOrObj.value) !== null && _b !== void 0 ? _b : valueOrObj, res;
            // get the corresponding validator in the registered ones
            const validatorObj = SValidator._validators[validator];
            if (!validatorObj) {
                throw new Error(`Sorry but the validator "${validator}" is not registered`);
            }
            const finalValidatorSettings = Object.assign(Object.assign({}, validatorSettings), { i18n: (_c = this.settings.i18n[validator]) !== null && _c !== void 0 ? _c : {} });
            // validate using the validator
            res = validatorObj.validator(value, validatorValue, finalValidatorSettings);
            if (!res.valid) {
                // replace tokens in message
                res.message = res.message
                    .replace('%value', value)
                    .replace('%validator', validator);
                result.valid = false;
                result.rules[validator] = res;
                result.messages.push(res.message);
            }
            else {
                result.rules[validator] = res;
            }
        }
        // return the result
        return result;
    }
}
exports.default = SValidator;
/**
 * Store the registered validators
 */
SValidator._validators = {};
/**
 * Store the registered presets
 */
SValidator._presets = {};
// register default validators
SValidator.registerValidator('min', min_js_1.default, {
    definition: min_js_1.definition,
});
SValidator.registerValidator('max', max_js_1.default, {
    definition: max_js_1.definition,
});
SValidator.registerValidator('email', email_js_1.default, {
    definition: email_js_1.definition,
});
SValidator.registerValidator('required', required_js_1.default, {
    definition: required_js_1.definition,
});
SValidator.registerValidator('isoDate', isoDate_js_1.default, {
    definition: isoDate_js_1.definition,
});
SValidator.registerValidator('isoTime', isoTime_js_1.default, {
    definition: isoTime_js_1.definition,
});
SValidator.registerValidator('isoDateTime', isoDateTime_js_1.default, {
    definition: isoDateTime_js_1.definition,
});
SValidator.registerValidator('integer', integer_js_1.default, {
    definition: integer_js_1.definition,
});
SValidator.registerValidator('number', number_js_1.default, {
    definition: number_js_1.definition,
});
SValidator.registerValidator('negative', negative_js_1.default, {
    definition: negative_js_1.definition,
});
SValidator.registerValidator('positive', positive_js_1.default, {
    definition: positive_js_1.definition,
});
SValidator.registerValidator('pattern', pattern_js_1.default, {
    definition: pattern_js_1.definition,
});
SValidator.registerValidator('alphanum', alphanum_js_1.default, {
    definition: alphanum_js_1.definition,
});
SValidator.registerValidator('creditCard', creditCard_js_1.default, {
    definition: creditCard_js_1.definition,
});
SValidator.registerValidator('color', color_js_1.default, {
    definition: color_js_1.definition,
});
SValidator.registerValidator('hex', hex_js_1.default, {
    definition: hex_js_1.definition,
});
SValidator.registerValidator('type', type_js_1.default, {
    definition: type_js_1.definition,
});
SValidator.registerValidator('password', password_js_1.default, {
    definition: password_js_1.definition,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWQsb0VBQTZDO0FBQzdDLHVEQUF5RDtBQUN6RCx5REFBZ0M7QUFFaEMsZ0VBRThCO0FBRTlCLHdFQUVrQztBQUNsQyxrRUFFK0I7QUFDL0IsNEVBRW9DO0FBQ3BDLGtFQUUrQjtBQUMvQiw4REFFNkI7QUFDN0Isc0VBRWlDO0FBQ2pDLHNFQUVpQztBQUNqQyw4RUFFcUM7QUFDckMsc0VBRWlDO0FBQ2pDLDhEQUU2QjtBQUM3Qiw4REFFNkI7QUFDN0Isd0VBRWtDO0FBQ2xDLG9FQUVnQztBQUNoQyx3RUFFa0M7QUFDbEMsc0VBRWlDO0FBQ2pDLHdFQUVrQztBQUNsQyx3RUFFa0M7QUFpSGxDLE1BQXFCLFVBQVcsU0FBUSxpQkFBUTtJQU01Qzs7Ozs7Ozs7T0FRRztJQUNILE1BQU0sQ0FBQyxpQkFBaUIsQ0FDcEIsSUFBWSxFQUNaLFNBQW1CLEVBQ25CLFFBQStDO1FBRS9DLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUc7WUFDM0IsU0FBUztZQUNULFFBQVE7U0FDWCxDQUFDO0lBQ04sQ0FBQztJQU9EOzs7Ozs7OztPQVFHO0lBQ0gsTUFBTSxDQUFDLGNBQWMsQ0FDakIsSUFBWSxFQUNaLEtBQTZCLEVBQzdCLFFBQStDO1FBRS9DLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUc7WUFDeEIsS0FBSztZQUNMLFFBQVE7U0FDWCxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILE1BQU0sQ0FBQyx1QkFBdUI7UUFDMUIsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUMzQyxVQUFVLENBQUMsV0FBVyxDQUN6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