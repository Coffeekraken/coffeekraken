"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const parseHtml_1 = __importDefault(require("../../terminal/parseHtml"));
const splitEvery_1 = __importDefault(require("../../string/splitEvery"));
const countLine_1 = __importDefault(require("../../string/countLine"));
const uniqid_1 = __importDefault(require("../../string/uniqid"));
const color_1 = __importDefault(require("../../color/color"));
const SBlessedComponent_1 = __importDefault(require("../SBlessedComponent"));
const q_i_1 = require("q-i");
module.exports = class SLogPanel extends SBlessedComponent_1.default {
    /**
     * @name              constructor
     * @type              Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        // save the settings
        super(deepMerge_1.default({
            name: uniqid_1.default(),
            beforeLog: '',
            beforeEachLine: '',
            padBeforeLog: true,
            // input: {
            //   width: 3,
            //   height: 1,
            //   placeholder: null,
            //   bottom: 0,
            //   left: 0,
            //   focus: true,
            //   keys: true,
            //   mouse: true,
            //   inputOnFocus: true,
            //   style: {
            //     fg: __color('terminal.black').toString(),
            //     bg: __color('terminal.yellow').toString()
            //   },
            //   padding: {
            //     top: 0,
            //     left: 1,
            //     right: 1,
            //     bottom: 0
            //   }
            // },
            mouse: true,
            keys: true,
            // vi: true,
            scrollable: true,
            // alwaysScroll: true,
            scrollbar: {
                ch: ' ',
                inverse: true
            },
            style: {
                bg: color_1.default('terminal.black').toString(),
                scrollbar: {
                    bg: color_1.default('terminal.primary').toString()
                }
            },
            padding: {
                top: 1,
                bottom: 0,
                left: 1,
                right: 1
            }
        }, settings));
        /**
         * @name              _name
         * @type              String
         * @private
         *
         * Store the panel name
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._name = null;
        // save the name
        if (!/^[a-zA-Z0-9\._-\s]+$/.test(this._settings.name)) {
            throw new Error(`The name of an SLog instance can contain only letters like [a-zA-Z0-9_-. ]...`);
        }
        this._name = this._settings.name;
        // render the screen
        if (this.screen) {
            this.screen.title = this._name;
        }
    }
    // /**
    //  * @name                  _input
    //  * @type                  Function
    //  * @private
    //  *
    //  * This method return a pre-configured textbox
    //  *
    //  * @param       {Object}      [settings={}]       A blessed textbox settings object with some additional settings:
    //  * - focus (true) {Boolean}: Specify if you want the input to have focus directly
    //  * - placeholder (null) {String}: Specify a placeholder to set in the input
    //  * @return      {Textbox}             A blessed textbox
    //  *
    //  * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //  */
    // _input(settings = {}) {
    //   settings = __deepMerge(
    //     {
    //       focus: true,
    //       placeholder: null
    //     },
    //     __clone(this._settings.input, true),
    //     settings
    //   );
    //   const input = __blessed.textbox(settings);
    //   input.promise = new __SPromise((resolve, reject, trigger, cancel) => {});
    //   input.on('attach', () => {
    //     setTimeout(() => {
    //       if (settings.focus) input.focus();
    //       let placeholderPressed = false;
    //       if (settings.placeholder) {
    //         const placeholder = settings.placeholder.toString();
    //         input.setValue(placeholder);
    //         input.width =
    //           placeholder.length + input.padding.left + input.padding.right;
    //       }
    //       let isBackspace = false;
    //       input.onceKey('backspace', () => {
    //         isBackspace = true;
    //       });
    //       input.on('keypress', (value) => {
    //         setTimeout(() => {
    //           if (settings.placeholder && !placeholderPressed) {
    //             if (!isBackspace) {
    //               input.setValue(value);
    //             }
    //             placeholderPressed = true;
    //           }
    //           input.width =
    //             input.getValue().length +
    //             input.padding.left +
    //             input.padding.right +
    //             2;
    //           this.update();
    //         });
    //       });
    //       input.on('submit', (value) => {
    //         input.promise.resolve(value);
    //         input.style.bg = __color('terminal.green').toString();
    //         input.width =
    //           input.getValue().length + input.padding.left + input.padding.right;
    //         this.update();
    //       });
    //       input.on('cancel', () => {
    //         input.promise.cancel();
    //         input.style.bg = __color('terminal.red').toString();
    //         input.width =
    //           input.getValue().length + input.padding.left + input.padding.right;
    //         this.update();
    //       });
    //       this.update();
    //     });
    //   });
    //   return input;
    // }
    // /**
    //  * @name                   input
    //  * @type                  Function
    //  *
    //  * Allow to display an input to ask something to the user
    //  *
    //  * @param       {Object}      [settings = {}]       A settings object to configure your input. Here's the available settings:
    //  * - width (100%) {String|Number}: Specify the width of your input
    //  * - height (1) {String|Number}: Specify the height of your input
    //  * - placeholder (null) {String}: Specify a placeholder to display before the user starts to write something
    //  *
    //  * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //  */
    // input(settings = {}) {
    //   settings = __deepMerge(
    //     this._settings.input,
    //     {
    //       top: this._settings.logBox.content.split('\n').length,
    //       left:
    //         __countLine(__parseHtml(this._settings.beforeLog)) +
    //         __countLine(__parseHtml(this._settings.beforeEachLine))
    //     },
    //     settings
    //   );
    //   const input = this._input(settings);
    //   setTimeout(() => {
    //     const _beforeLog =
    //       __parseHtml(this._settings.beforeLog) +
    //       __parseHtml(this._settings.beforeEachLine);
    //     const beforeBox = __blessed.box({
    //       top: this._settings.logBox.content.split('\n').length,
    //       left: 0,
    //       width: __countLine(_beforeLog),
    //       height: 1,
    //       content: _beforeLog
    //     });
    //     this.log(' ');
    //     this._settings.logBox.append(beforeBox);
    //     this._settings.logBox.append(input);
    //   });
    //   this._settings.logBox.setScrollPerc(100);
    //   return input;
    // }
    // /**
    //  * @name                  summary
    //  * @type                  Function
    //  *
    //  * Allow to display some editable informations in a list format.
    //  * This is usefull when you want to propose to the user some default informations that he can update if wanted
    //  * then send back to the command process
    //  *
    //  * @param      {Object}             settings = {}               A settings object to configure your summary input
    //  *
    //  * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //  */
    // summary(settings = {}) {}
    /**
     * @name                  log
     * @type                  Function
     *
     * Allow to log some content in the panel
     *
     * @param       {String}        message         The message to log
     * @param       {Object}        [settings={}]   Some settings to override for this particular log
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    log(message, settings = {}) {
        if (!Array.isArray(message))
            message = [message];
        const logSettings = deepMerge_1.default(this._settings, settings);
        let lines = [];
        message.forEach((m) => {
            // check message type
            switch (typeof m) {
                case 'object':
                    m = q_i_1.stringify(m);
                    break;
            }
            if (Array.isArray(m))
                m = q_i_1.stringify(m);
            m = parseHtml_1.default(m || '');
            let beforeLog = logSettings.beforeLog;
            if (beforeLog) {
                if (typeof beforeLog === 'function') {
                    beforeLog = beforeLog(m);
                }
                if (typeof beforeLog === 'number') {
                    beforeLog = ' '.repeat(parseInt(beforeLog));
                }
            }
            else {
                beforeLog = '';
            }
            let beforeEachLine = logSettings.beforeEachLine;
            if (beforeEachLine) {
                if (typeof beforeEachLine === 'function') {
                    beforeEachLine = beforeEachLine(m);
                }
                if (typeof beforeEachLine === 'number') {
                    beforeEachLine = ' '.repeat(parseInt(beforeEachLine));
                }
            }
            else {
                beforeEachLine = '';
            }
            const formatedBeforeEachLine = parseHtml_1.default(beforeEachLine);
            const formatedBeforeLog = parseHtml_1.default(beforeLog);
            let formatedMessage = m;
            // split lines
            formatedMessage = formatedMessage.split('\n');
            formatedMessage.map((line, i) => {
                line = splitEvery_1.default(line, this.width -
                    logSettings.padding.left -
                    logSettings.padding.right -
                    countLine_1.default(formatedBeforeLog) -
                    countLine_1.default(formatedBeforeEachLine));
                line = line.map((l, j) => {
                    if (i === 0 && j === 0) {
                        return formatedBeforeLog + formatedBeforeEachLine + l;
                    }
                    else {
                        return (' '.repeat(countLine_1.default(formatedBeforeLog)) +
                            formatedBeforeEachLine +
                            l);
                    }
                });
                lines = [...lines, ...line];
            });
            // append the content to the panel
            this.pushLine(lines.join('\n'));
        });
        this.update();
        this.setScrollPerc(100);
        // return the lines
        return lines;
    }
};
