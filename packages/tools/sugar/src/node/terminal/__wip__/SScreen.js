"use strict";
const __terminalKit = require('terminal-kit').terminal;
const __blessed = require('blessed');
const __events = require('events');
const __cursorPos = require('./cursorPos');
const __splitEvery = require('../array/splitEvery');
const __deepMerge = require('../object/deepMerge');
const __parseHtml = require('./parseHtml');
const __countLine = require('./countLine');
/**
 * @name                            STerminalScreen
 * @namespace           sugar.node.terminal
 * @type                            Class
 *
 * Create a screen in which you can render all others items.
 * This class uses blessed under the hood to work properly.
 *
 * @param             {Object}              [settings={}]     On object of settings to configure the STerminalScreen like paddings, etc...
 *
 * @example           js
 * const STerminalScreen = require('@coffeekraken/node/terminal/STerminalScreen');
 * const myScreen = new STerminalScreen({
 *    // see settings above...
 * });
 * myScreen.render();
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class STerminalScreen extends __blessed.screen {
    /**
     * @name                          constructor
     * @type                          Function
     *
     * Construct the STerminalScreen instance which inherit from the blessed.screen stack
     *
     * @param             {Object}                      [settings={}]               An object of blessed screen settings and some others described bellow...
     * - padding (process.env.STDOUT_PADDING || 3) {Number}: The amount of paddings that you want around your screen
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        settings = __deepMerge({
            router: null,
            smartCSR: true,
            // autoPadding: true,
            padding: process.env.STDOUT_PADDING
                ? {
                    top: process.env.STDOUT_PADDING - 1,
                    bottom: process.env.STDOUT_PADDING - 1,
                    left: process.env.STDOUT_PADDING,
                    right: process.env.STDOUT_PADDING
                }
                : {
                    top: 2,
                    bottom: 2,
                    left: 3,
                    right: 3
                }
        }, settings);
        super(settings);
        this._box = __blessed.box({
            top: typeof settings.padding === 'object'
                ? settings.padding.top || 3
                : settings.padding,
            bottom: typeof settings.padding === 'object'
                ? settings.padding.bottom || 3
                : settings.padding,
            left: typeof settings.padding === 'object'
                ? settings.padding.left || 3
                : settings.padding,
            right: typeof settings.padding === 'object'
                ? settings.padding.right || 3
                : settings.padding
        });
        super.append(this._box);
        if (settings.router && settings.router.setOutput) {
            settings.router.setOutput(this._box);
        }
        // listen for closing the app
        // this.key(['C-c', 'escape'], function () {
        //   this.destroy();
        //   process.exit();
        // });
    }
    /**
     * @name                            append
     * @type                            Function
     *
     * Append an element to the screen
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    append(node) {
        this._box.append(node);
    }
    /**
     * @name                            prepend
     * @type                            Function
     *
     * Prepend an element to the screen
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    prepend(node) {
        this._box.prepend(node);
    }
};
