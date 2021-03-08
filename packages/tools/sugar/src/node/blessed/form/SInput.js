"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blessed_1 = __importDefault(require("blessed"));
const SBlessedComponent_1 = __importDefault(require("../SBlessedComponent"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const color_1 = __importDefault(require("../../color/color"));
const escapeStack_1 = __importDefault(require("../../terminal/escapeStack"));
const activeSpace_1 = __importDefault(require("../../core/activeSpace"));
/**
 * @name                  SBlessedInput
 * @namespace           sugar.node.blessed.input
 * @type                  Class
 * @status              wip
 *
 * This class represent a simple input
 *
 * @param        {Object}         [settings = {}]         A settings object to configure your list. Here's the available settings:
 * - escapeKey (false) {Boolean}: Specify if you want to reject the input promise on escape key press
 * - placeholder (null) {String}: Specify a placeholder
 * - width (null) {String|Number}: This is the normal blessed component width parameter but you can specify "auto" if you want the input to adapt his width depending on his content
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import SBlessedInput from '@coffeekraken/sugar/node/blessed/form/SBlessedInput';
 * new SBlessedInput({});
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SBlessedInput extends SBlessedComponent_1.default {
    /**
     * @name                  constructor
     * @type                  Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        const inputSettings = deepMerge_1.default({
            id: 'SInput',
            focus: true,
            placeholder: null,
            blessed: {
                width: '100%',
                height: 3,
                keys: true,
                mouse: true,
                inputOnFocus: true,
                style: {
                    bg: color_1.default('terminal.cyan').toString(),
                    fg: color_1.default('terminal.black').toString()
                },
                padding: {
                    top: 1,
                    bottom: 1,
                    left: 2,
                    right: 2
                }
            }
        }, settings);
        super({
        // width: '100%',
        // height: null,
        });
        this._escapeKeyPromise = null;
        this.$input = blessed_1.default.textbox(inputSettings);
        this.promise = new s_promise_1.default({
            id: this._settings.id
        });
        this.$input.height =
            inputSettings.padding.top + inputSettings.padding.bottom + 1;
        this.height = inputSettings.padding.top + inputSettings.padding.bottom + 1;
        this.$input.on('blur', () => {
            console.log('blue');
            if (this.$input.focused) {
                console.log('remove');
            }
        });
        this.$input.on('focus', () => {
            activeSpace_1.default.append('form.input');
            this._escapeKeyPromise = escapeStack_1.default(() => {
                activeSpace_1.default.remove('.form.input');
            });
        });
        this.$input.on('attach', () => {
            setTimeout(() => {
                if (inputSettings.focus)
                    this.$input.focus();
                let placeholderPressed = false;
                if (inputSettings.placeholder) {
                    const placeholder = inputSettings.placeholder.toString();
                    if (inputSettings.width === 'auto') {
                        this.$input.width =
                            placeholder.length +
                                this.$input.padding.left +
                                this.$input.padding.right +
                                2;
                    }
                    this.$input.setValue(placeholder);
                }
                let isBackspace = false;
                this.$input.onceKey('backspace,space,escape', () => {
                    isBackspace = true;
                });
                this.$input.on('keypress', (value, key) => {
                    setTimeout(() => {
                        if (inputSettings.placeholder && !placeholderPressed) {
                            if (!isBackspace) {
                                this.$input.setValue(value);
                            }
                            placeholderPressed = true;
                        }
                        if (inputSettings.width === 'auto') {
                            this.$input.width =
                                this.$input.getValue().length +
                                    this.$input.padding.left +
                                    this.$input.padding.right +
                                    2;
                        }
                        this.update();
                    });
                });
                this.$input.on('submit', (value) => {
                    this.promise.resolve(value);
                    this.$input.style.bg = color_1.default('terminal.green').toString();
                    if (inputSettings.width === 'auto') {
                        this.$input.width =
                            this.$input.getValue().length +
                                this.$input.padding.left +
                                this.$input.padding.right;
                    }
                    activeSpace_1.default.remove('.form.input');
                    if (this._escapeKeyPromise)
                        this._escapeKeyPromise.cancel();
                    this.update();
                });
                this.$input.on('cancel', () => {
                    this.promise.cancel();
                    this.$input.style.bg = color_1.default('terminal.red').toString();
                    if (inputSettings.width === 'auto') {
                        this.$input.width =
                            this.$input.getValue().length +
                                this.$input.padding.left +
                                this.$input.padding.right;
                    }
                    activeSpace_1.default.remove('.form.input');
                    if (this._escapeKeyPromise)
                        this._escapeKeyPromise.cancel();
                    this.update();
                });
                this.update();
            });
        });
        this.append(this.$input);
    }
}
exports.default = SBlessedInput;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0lucHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0lucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHNEQUFnQztBQUNoQyw2RUFBdUQ7QUFDdkQsdUVBQWlEO0FBQ2pELHdFQUFpRDtBQUNqRCw4REFBd0M7QUFDeEMsNkVBQXVEO0FBQ3ZELHlFQUFtRDtBQUVuRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxNQUFxQixhQUFjLFNBQVEsMkJBQW1CO0lBQzVEOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtRQUN2QixNQUFNLGFBQWEsR0FBRyxtQkFBVyxDQUMvQjtZQUNFLEVBQUUsRUFBRSxRQUFRO1lBQ1osS0FBSyxFQUFFLElBQUk7WUFDWCxXQUFXLEVBQUUsSUFBSTtZQUNqQixPQUFPLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsWUFBWSxFQUFFLElBQUk7Z0JBQ2xCLEtBQUssRUFBRTtvQkFDTCxFQUFFLEVBQUUsZUFBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLFFBQVEsRUFBRTtvQkFDdkMsRUFBRSxFQUFFLGVBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFFBQVEsRUFBRTtpQkFDekM7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLEdBQUcsRUFBRSxDQUFDO29CQUNOLE1BQU0sRUFBRSxDQUFDO29CQUNULElBQUksRUFBRSxDQUFDO29CQUNQLEtBQUssRUFBRSxDQUFDO2lCQUNUO2FBQ0Y7U0FDRixFQUNELFFBQVEsQ0FDVCxDQUFDO1FBRUYsS0FBSyxDQUFDO1FBQ0osaUJBQWlCO1FBQ2pCLGdCQUFnQjtTQUNqQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1FBRTlCLElBQUksQ0FBQyxNQUFNLEdB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