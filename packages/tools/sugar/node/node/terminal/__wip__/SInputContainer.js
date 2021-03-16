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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0lucHV0Q29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL25vZGUvdGVybWluYWwvX193aXBfXy9TSW5wdXRDb250YWluZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFFZCxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsUUFBUSxDQUFDO0FBQ3ZELE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUVyQyxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDM0MsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDcEQsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDbkQsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzNDLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUUzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLE1BQU8sU0FBUSxTQUFTLENBQUMsR0FBRztJQUNqRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBQ3ZCLFFBQVEsR0FBRyxXQUFXLENBQ3BCO1lBQ0UsS0FBSyxFQUFFO2dCQUNMLElBQUksRUFBRSxPQUFPO2dCQUNiLE1BQU0sRUFBRSxDQUFDO2dCQUNULEtBQUssRUFBRSxNQUFNO2dCQUNiLEtBQUssRUFBRSxJQUFJO2dCQUNYLE9BQU8sRUFBRSxJQUFJO2dCQUNiLFNBQVMsRUFBRSxJQUFJO2dCQUNmLFlBQVksRUFBRSxJQUFJO2FBQ25CO1lBQ0QsS0FBSyxFQUFFO2dCQUNMLE9BQU8sRUFBRSxJQUFJO2FBQ2Q7U0FDRixFQUNELFFBQVEsQ0FDVCxDQUFDO1FBRUYsS0FBSyxDQUFD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