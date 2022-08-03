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
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const en_1 = __importDefault(require("./i18n/en"));
const alphanum_1 = __importStar(require("./validators/alphanum"));
const color_1 = __importStar(require("./validators/color"));
const creditCard_1 = __importStar(require("./validators/creditCard"));
const email_1 = __importStar(require("./validators/email"));
const hex_1 = __importStar(require("./validators/hex"));
const integer_1 = __importStar(require("./validators/integer"));
const isoDate_1 = __importStar(require("./validators/isoDate"));
const isoDateTime_1 = __importStar(require("./validators/isoDateTime"));
const isoTime_1 = __importStar(require("./validators/isoTime"));
const max_1 = __importStar(require("./validators/max"));
const min_1 = __importStar(require("./validators/min"));
const negative_1 = __importStar(require("./validators/negative"));
const number_1 = __importStar(require("./validators/number"));
const password_1 = __importStar(require("./validators/password"));
const pattern_1 = __importStar(require("./validators/pattern"));
const positive_1 = __importStar(require("./validators/positive"));
const required_1 = __importStar(require("./validators/required"));
class SValidator extends s_class_1.default {
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
        super((0, deepMerge_1.default)({
            i18n: en_1.default,
        }, settings !== null && settings !== void 0 ? settings : {}));
    }
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
            if (typeof rulesOrPreset === 'boolean') {
                res = validatorObj.validator(value, finalValidatorSettings);
            }
            else {
                res = validatorObj.validator(value, validatorValue, finalValidatorSettings);
            }
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
SValidator.registerValidator('min', min_1.default, {
    definition: min_1.definition,
});
SValidator.registerValidator('max', max_1.default, {
    definition: max_1.definition,
});
SValidator.registerValidator('email', email_1.default, {
    definition: email_1.definition,
});
SValidator.registerValidator('required', required_1.default, {
    definition: required_1.definition,
});
SValidator.registerValidator('isoDate', isoDate_1.default, {
    definition: isoDate_1.definition,
});
SValidator.registerValidator('isoTime', isoTime_1.default, {
    definition: isoTime_1.definition,
});
SValidator.registerValidator('isoDateTime', isoDateTime_1.default, {
    definition: isoDateTime_1.definition,
});
SValidator.registerValidator('integer', integer_1.default, {
    definition: integer_1.definition,
});
SValidator.registerValidator('number', number_1.default, {
    definition: number_1.definition,
});
SValidator.registerValidator('negative', negative_1.default, {
    definition: negative_1.definition,
});
SValidator.registerValidator('positive', positive_1.default, {
    definition: positive_1.definition,
});
SValidator.registerValidator('pattern', pattern_1.default, {
    definition: pattern_1.definition,
});
SValidator.registerValidator('alphanum', alphanum_1.default, {
    definition: alphanum_1.definition,
});
SValidator.registerValidator('creditCard', creditCard_1.default, {
    definition: creditCard_1.definition,
});
SValidator.registerValidator('color', color_1.default, {
    definition: color_1.definition,
});
SValidator.registerValidator('hex', hex_1.default, {
    definition: hex_1.definition,
});
SValidator.registerValidator('password', password_1.default, {
    definition: password_1.definition,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWQsb0VBQTZDO0FBQzdDLDRGQUFzRTtBQUN0RSxtREFBNkI7QUFFN0Isa0VBRStCO0FBQy9CLDREQUU0QjtBQUM1QixzRUFFaUM7QUFDakMsNERBRTRCO0FBQzVCLHdEQUUwQjtBQUMxQixnRUFFOEI7QUFDOUIsZ0VBRThCO0FBQzlCLHdFQUVrQztBQUNsQyxnRUFFOEI7QUFDOUIsd0RBRTBCO0FBQzFCLHdEQUUwQjtBQUMxQixrRUFFK0I7QUFDL0IsOERBRTZCO0FBQzdCLGtFQUUrQjtBQUMvQixnRUFFOEI7QUFDOUIsa0VBRStCO0FBQy9CLGtFQUUrQjtBQWtHL0IsTUFBcUIsVUFBVyxTQUFRLGlCQUFRO0lBd0U1Qzs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBdUM7UUFDL0Msb0JBQW9CO1FBQ3BCLEtBQUssQ0FDRCxJQUFBLG1CQUFXLEVBQ1A7WUFDSSxJQUFJLEVBQUUsWUFBSTtTQUNiLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7SUFDTixDQUFDO0lBckZEOzs7Ozs7OztPQVFHO0lBQ0gsTUFBTSxDQUFDLGlCQUFpQixDQUNwQixJQUFZLEVBQ1osU0FBbUIsRUFDbkIsUUFBK0M7UUFFL0MsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRztZQUMzQixTQUFTO1lBQ1QsUUFBUTtTQUNYLENBQUM7SUFDTixDQUFDO0lBT0Q7Ozs7Ozs7O09BUUc7SUFDSCxNQUFNLENBQUMsY0FBYyxDQUNqQixJQUFZLEVBQ1osS0FBNkIsRUFDN0IsUUFBK0M7UUFFL0MsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRztZQUN4QixLQUFLO1lBQ0wsUUFBUTtTQUNYLENBQUM7SUFDTixDQUFD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