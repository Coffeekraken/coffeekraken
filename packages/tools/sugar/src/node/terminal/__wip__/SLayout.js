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
 * @name                            SLayout
 * @namespace           sugar.node.terminal
 * @type                            Class
 *
 * Create a layout in which you can render all others items.
 * This class uses blessed under the hood to work properly.
 *
 * @param             {Object}              [settings={}]     On object of settings to configure the SLayout like paddings, etc...
 *
 * @example           js
 * const SLayout = require('@coffeekraken/node/terminal/SLayout');
 * const myLayout = new SLayout({
 *    // see settings above...
 * });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SLayout extends __blessed.box {
    /**
     * @name                          constructor
     * @type                          Function
     *
     * Construct the SLayout instance which inherit from the blessed.box stack
     *
     * @param             {String|Array}                content                     The content of the layout in string or array format
     * @param             {Object}                      [settings={}]               An object of blessed screen settings and some others described bellow...
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(content, settings = {}) {
        settings = __deepMerge({}, settings);
        super(settings);
        // set the content if we have one
        if (content)
            this.setContent(content);
    }
    /**
     * @name                    setContent
     * @type                    Function
     *
     * Set the layout content by passing either a string or an array that will be joined using a "\n" character
     *
     * @param               {String|Array}                content             The content to set
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    setContent(content) {
        if (Array.isArray(content)) {
            return super.setContent(content.join('\n'));
        }
        return super.setContent(content);
    }
};
