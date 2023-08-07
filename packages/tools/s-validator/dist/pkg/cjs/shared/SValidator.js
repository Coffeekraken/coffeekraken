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
const i18n_js_1 = __importDefault(require("./i18n.js"));
const type_js_1 = __importStar(require("./validators/type.js"));
const base64_js_1 = __importStar(require("./validators/base64.js"));
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
            i18n: i18n_js_1.default,
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
        var _a, _b, _c, _d;
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
        // empty value when no required rule
        if (!rules.required) {
            if (value === undefined || value === null || value === '') {
                return {
                    valid: true,
                    messages: null,
                };
            }
        }
        for (let [validator, valueOrObj] of Object.entries(rules)) {
            let validatorSettings = (_a = valueOrObj === null || valueOrObj === void 0 ? void 0 : valueOrObj.settings) !== null && _a !== void 0 ? _a : {}, validatorValue = (_b = valueOrObj === null || valueOrObj === void 0 ? void 0 : valueOrObj.value) !== null && _b !== void 0 ? _b : valueOrObj, res;
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
                res.message = (_d = res.message) === null || _d === void 0 ? void 0 : _d.replace('%value', value).replace('%validator', validator);
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
SValidator.registerValidator('base64', base64_js_1.default, {
    definition: base64_js_1.definition,
});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWQsb0VBQTZDO0FBQzdDLHVEQUF5RDtBQUN6RCx3REFBK0I7QUFFL0IsZ0VBRzhCO0FBRTlCLG9FQUVnQztBQUVoQyx3RUFHa0M7QUFDbEMsa0VBRytCO0FBQy9CLDRFQUdvQztBQUNwQyxrRUFHK0I7QUFDL0IsOERBRzZCO0FBQzdCLHNFQUdpQztBQUNqQyxzRUFHaUM7QUFDakMsOEVBR3FDO0FBQ3JDLHNFQUdpQztBQUNqQyw4REFHNkI7QUFDN0IsOERBRzZCO0FBQzdCLHdFQUdrQztBQUNsQyxvRUFFZ0M7QUFDaEMsd0VBR2tDO0FBQ2xDLHNFQUdpQztBQUNqQyx3RUFHa0M7QUFDbEMsd0VBR2tDO0FBcUpsQyxNQUFxQixVQUFXLFNBQVEsaUJBQVE7SUFNNUM7Ozs7Ozs7O09BUUc7SUFDSCxNQUFNLENBQUMsaUJBQWlCLENBQ3BCLElBQVksRUFDWixTQUFtQixFQUNuQixRQUErQztRQUUvQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHO1lBQzNCLFNBQVM7WUFDVCxRQUFRO1NBQ1gsQ0FBQztJQUNOLENBQUM7SUFPRDs7Ozs7Ozs7T0FRRztJQUNILE1BQU0sQ0FBQyxjQUFjLENBQ2pCLElBQVksRUFDWixLQUE2QixFQUM3QixRQUErQztRQUUvQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHO1lBQ3hCLEtBQUs7WUFDTCxRQUFRO1NBQ1gsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxNQUFNLENBQUMsdUJBQXVCO1FBQzFCLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUN0QixLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FDM0MsVUFBVSxD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