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
//# sourceMappingURL=SInput.js.map