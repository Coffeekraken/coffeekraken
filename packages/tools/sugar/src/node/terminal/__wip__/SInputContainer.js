"use strict";
// @ts-nocheck
const __terminalKit = require('terminal-kit').terminal;
const __blessed = require('blessed');
const __cursorPos = require('./cursorPos');
const __splitEvery = require('../array/splitEvery');
const __deepMerge = require('../object/deepMerge');
const __parseHtml = require('./parseHtml');
const __countLine = require('./countLine');
/**
 * @name                            SInput
 * @namespace           sugar.node.terminal
 * @type                            Class
 *
 * Allows you to create some simple inputs.
 * This class inherits fromt he blessed.input package method
 *
 * @param             {Object}              [settings={}]     On object of settings to configure the SInput instance
 *
 * @example           js
 * const SInput = require('@coffeekraken/node/terminal/SInput');
 * const myInput = new SInput({
 * });
 * myForm.append(myInput);
 *
 * @see       https://github.com/chjj/blessed
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SInput extends __blessed.box {
    /**
     * @name                          constructor
     * @type                          Function
     *
     * Construct the STerminalScreen instance which inherit from the blessed.screen stack
     *
     * @param             {Object}                      [settings={}]               An object of blessed screen settings and some others described bellow...
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        settings = __deepMerge({
            input: {
                name: 'input',
                height: 1,
                width: '100%',
                input: true,
                keyable: true,
                clickable: true,
                inputOnFocus: true
            },
            label: {
                content: null
            }
        }, settings);
        super(settings);
        this._input = __blessed.textbox(__deepMerge({
            left: settings.label.content ? __countLine(settings.label.content) : 0
        }, settings.input));
        this._label = __blessed.text(__deepMerge({
            left: 0
        }, settings.label));
        this.append(this._label);
        this.append(this._input);
        // this._maxWidth = Math.round(process.env.STDOUT_WIDTH || process.stdout.columns) - (process.env.STDOUT_PADDING ? process.env.STDOUT_PADDING * 2 : 0);
        // this._events = new __events.EventEmitter();
        // // SInputen for keys
        // this._SInputenKeyPress();
        // SInputen end of process
        // process.on('SIGTERM', () => {
        //   this.destroy();
        // });
    }
    /**
     * @name                        setFormStyle
     * @type                        Function
     *
     * Set the form style. Normaly this is called automatically when you append/prepend your SInputContainer node to the SForm instance
     *
     * @param               {Object}              style               The style to apply to the form item
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    setFormStyle(style) {
        if (this._input) {
            this._input.style = style;
        }
    }
    /**
     * @name                        _SInputenKeyPress
     * @type                        Function
     * @private
     *
     * Listen for keys press like UP, DOWN, etc...
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _SInputenKeyPress() {
        __terminalKit.grabInput({ mouse: 'button' });
        __terminalKit.on('key', (name, matches, data) => {
            const eventName = name.toUpperCase();
            switch (eventName) {
                case 'ENTER':
                    break;
                case 'BACKSPACE':
                    if (this._value.length)
                        this._value = this._value.slice(0, -1);
                    this._events.emit('value', this._value);
                    break;
                default:
                    if (data.isCharacter)
                        this._value += name;
                    this._events.emit('value', this._value);
                    break;
            }
        });
    }
    /**
     * @name                          get
     * @type                          Function
     *
     * Get the SInput back in String or Array format depending on the passed settings
     *
     * @param         {Object}            [settings={}]             An object of settings. See bellow...
     * - width (100%) {Number|String}: The maximum width that will take the SInput
     * - columns (1) {Number}: On how many columns will be displayed the SInput
     * - format (string|array) {String}: Can be 'string' or 'array' depending on the format you want back
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get(settings = {}) {
        settings = __deepMerge({
            format: 'array',
            width: this._settings.width,
            columns: this._settings.columns
        }, settings);
        let lines = [];
        let inputLine = '';
        if (this._settings.message) {
            inputLine += this._settings.messageFormater
                ? this._settings.messageFormater(this._settings.message + ': ')
                : this._settings.message + ': ';
        }
        if (this._value.length) {
            inputLine += this._settings.valueFormater
                ? this._settings.valueFormater(this._value)
                : this._value;
        }
        lines.push(inputLine);
        // parse each lines
        lines = lines.map((l) => __parseHtml(l));
        if (settings.format && settings.format.toLowerCase() === 'array') {
            return lines;
        }
        return lines.join('\n');
    }
};
//# sourceMappingURL=module.js.map