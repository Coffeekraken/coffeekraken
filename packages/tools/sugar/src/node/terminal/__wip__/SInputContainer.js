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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0lucHV0Q29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0lucHV0Q29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBRWQsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztBQUN2RCxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFckMsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzNDLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQ3BELE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQ25ELE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUMzQyxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFM0M7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxNQUFPLFNBQVEsU0FBUyxDQUFDLEdBQUc7SUFDakQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtRQUN2QixRQUFRLEdBQUcsV0FBVyxDQUNwQjtZQUNFLEtBQUssRUFBRTtnQkFDTCxJQUFJLEVBQUUsT0FBTztnQkFDYixNQUFNLEVBQUUsQ0FBQztnQkFDVCxLQUFLLEVBQUUsTUFBTTtnQkFDYixLQUFLLEVBQUUsSUFBSTtnQkFDWCxPQUFPLEVBQUUsSUFBSTtnQkFDYixTQUFTLEVBQUUsSUFBSTtnQkFDZixZQUFZLEVBQUUsSUFBSTthQUNuQjtZQUNELEtBQUssRUFBRTtnQkFDTCxPQUFPLEVBQUUsSUFBSTthQUNkO1NBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUVGLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVoQixJQUFJLENBQUMsTUFBTSxH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