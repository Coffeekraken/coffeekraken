"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const blessed_1 = __importDefault(require("blessed"));
const SBlessedComponent_1 = __importDefault(require("../SBlessedComponent"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SPromise_1 = __importDefault(require("../../promise/SPromise"));
const color_1 = __importDefault(require("../../color/color"));
const escapeStack_1 = __importDefault(require("../../terminal/escapeStack"));
const activeSpace_1 = __importDefault(require("../../core/activeSpace"));
module.exports = class SBlessedInput extends SBlessedComponent_1.default {
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
        this.promise = new SPromise_1.default({
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0lucHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0lucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7O0FBRWQsc0RBQWdDO0FBQ2hDLDZFQUF1RDtBQUN2RCx1RUFBaUQ7QUFDakQsc0VBQWdEO0FBQ2hELDhEQUF3QztBQUN4Qyw2RUFBdUQ7QUFDdkQseUVBQW1EO0FBMEJuRCxpQkFBUyxNQUFNLGFBQWMsU0FBUSwyQkFBbUI7SUFDdEQ7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sYUFBYSxHQUFHLG1CQUFXLENBQy9CO1lBQ0UsRUFBRSxFQUFFLFFBQVE7WUFDWixLQUFLLEVBQUUsSUFBSTtZQUNYLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLE9BQU8sRUFBRTtnQkFDUCxLQUFLLEVBQUUsTUFBTTtnQkFDYixNQUFNLEVBQUUsQ0FBQztnQkFDVCxJQUFJLEVBQUUsSUFBSTtnQkFDVixLQUFLLEVBQUUsSUFBSTtnQkFDWCxZQUFZLEVBQUUsSUFBSTtnQkFDbEIsS0FBSyxFQUFFO29CQUNMLEVBQUUsRUFBRSxlQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsUUFBUSxFQUFFO29CQUN2QyxFQUFFLEVBQUUsZUFBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsUUFBUSxFQUFFO2lCQUN6QztnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsR0FBRyxFQUFFLENBQUM7b0JBQ04sTUFBTSxFQUFFLENBQUM7b0JBQ1QsSUFBSSxFQUFFLENBQUM7b0JBQ1AsS0FBSyxFQUFFLENBQUM7aUJBQ1Q7YUFDRjtTQUNGLEVBQ0QsUUFBUSxDQUNULENBQUM7UUFFRixLQUFLLENBQUM7UUFDSixpQkFBaUI7UUFDakIsZ0JBQWdCO1NBQ2pCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFFOUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxpQkFBUyxDQUFDLE9BQU8sQ0FBQyxhQUFh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