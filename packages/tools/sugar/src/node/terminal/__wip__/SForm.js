"use strict";
// @ts-nocheck
const __blessed = require('blessed');
const __cursorPos = require('./cursorPos');
const __splitEvery = require('../array/splitEvery');
const __deepMerge = require('../object/deepMerge');
const __parseHtml = require('./parseHtml');
const __countLine = require('./countLine');
/**
 * @name                            SForm
 * @namespace           sugar.node.terminal
 * @type                            Class
 *
 * Create a form that can contains some inputs, textarea, etc...
 * This class inherits from the blessed.form package
 *
 * @param             {Object}              [settings={}]     On object of settings to configure the SForm like paddings, etc...
 *
 * @example           js
 * const SForm = require('@coffeekraken/node/terminal/SForm');
 * const myForm = new SForm({
 *    // see settings above...
 * });
 * myScreen.append(myForm);
 *
 * @see     https://github.com/chjj/blessed
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SForm extends __blessed.form {
    /**
     * @name                          constructor
     * @type                          Function
     *
     * Construct the SForm instance which inherit from the blessed.form stack
     *
     * @param             {Object}                      [settings={}]               An object of blessed form settings and some others described bellow...
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        settings = __deepMerge({}, settings);
        super(settings);
        /**
         * @name                        style
         * @type                        Object
         * @private
         *
         * Store the form style object to apply at each form items
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._style = {};
    }
    /**
     * @name                              setStyle
     * @type                              Function
     *
     * Allows you to set the styles used by each elements inside.
     * This works only with the classes of type SSomething of the terminal scope.
     *
     * @param           {Object}              style             The object style to set for the form
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    setStyle(style) {
        this._style = style;
    }
    prepend(node) {
        if (this._style && node.setFormStyle) {
            node.setFormStyle(this._style);
        }
        super.prepend(node);
    }
    append(node) {
        if (this._style && node.setFormStyle) {
            sugar.node.setFormStyle(this._style);
        }
        super.append(node);
    }
};
