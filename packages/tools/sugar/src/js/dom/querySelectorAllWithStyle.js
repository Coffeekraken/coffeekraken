// @ts-nocheck
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./getStyleProperty"], factory);
    }
})(function (require, exports) {
    "use strict";
    var getStyleProperty_1 = __importDefault(require("./getStyleProperty"));
    /**
     * @name      querySelectorAllWithStyle
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Select all node that match the style object passed as parameter
     *
     * @param    {String}    selector    The css selector to use as base filter
     * @param    {Object}    style    The style that has to match
     * @param    {Object}    [settings={}]    A setting object
     * @return    [Array<HTMLElement>]    An array of HTMLElement that matches the style object
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import querySelectorAllWithStyle from '@coffeekraken/sugar/js/dom/querySelectorAllWithStyle'
     * querySelectorAllWithStyle('*', {
     * 	backgroundImage: true
     * })
     *
     * // style object can contains either:
     * const style = {
     * 	 backgroundImage: true, // has to have the background-image style
     *   backgroundPosition: false, // has to not have the background-position style
     *   backgroundSize: /cover|contain/, // has to have the background-size set to cover or contain
     *   background: 'none' // has to have to background set to "none"
     * }
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function querySelectorAllWithStyle(selector, style, settings) {
        if (settings === void 0) { settings = {}; }
        // extend settings
        settings = __assign({ rootNode: document.body }, settings);
        // select all the element from the selector
        var $elms = settings.rootNode.querySelectorAll(selector);
        // check that we have some nodes to process
        if (!$elms.length)
            return [];
        // init the ar$Elms stack that will be returned at the end
        var ar$Elms = [];
        // loop on each elements
        Array.from($elms).forEach(function ($elm) {
            // track if the $elm match all the properties
            var match = true;
            // loop on each properties of the style object
            // to check it against the dom computed style
            for (var key in style) {
                // get the value from the computed dom node
                var value = getStyleProperty_1.default($elm, key);
                // true as selector
                if (style[key] === true && !value) {
                    match = false;
                    break;
                }
                else if (style[key] === false && value) {
                    match = false;
                    break;
                }
                else if (style[key] instanceof RegExp &&
                    !value.toString().match(style[key])) {
                    match = false;
                    break;
                }
                else if (typeof style[key] === 'string' && style[key] !== value) {
                    match = false;
                    break;
                }
            }
            // add the dom node in stack if it match all the
            // style object
            if (match) {
                ar$Elms.push($elm);
            }
        });
        // return the elements found
        return ar$Elms;
    }
    return querySelectorAllWithStyle;
});
