// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./getStyleProperty", "../time/convert"], factory);
    }
})(function (require, exports) {
    "use strict";
    var getStyleProperty_1 = __importDefault(require("./getStyleProperty"));
    var convert_1 = __importDefault(require("../time/convert"));
    /**
     * @name      getTransitionProperties
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Get the css transition properties from an HTMLElement in an object format
     *
     * @param 		{HTMLElement} 					elm  		The element to get the properties from
     * @return 		{Object} 									The animation properties
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example  	js
     * import getTransitionProperties from '@coffeekraken/sugar/js/dom/getTransitionProperties'
     * const props = getTransitionProperties(myCoolHTMLElement);
     * // output format
     * // {
     * // 	property : ['all'],
     * // 	duration : [200],
     * // 	delay : [0],
     * // 	timingFunction : ['linear'],
     * // 	totalDuration : 200
     * // }
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function splitIfNeeded(what, separator) {
        if (what.indexOf(separator) !== -1) {
            return what.split(separator).map(function (item) { return item.trim(); });
        }
        return [what];
    }
    function getTransitionProperties(elm) {
        // get the transition properties
        var property = getStyleProperty_1.default(elm, 'transition-property');
        var duration = getStyleProperty_1.default(elm, 'transition-duration') || 0;
        var timingFunction = getStyleProperty_1.default(elm, 'transition-timing-function');
        var delay = getStyleProperty_1.default(elm, 'transition-delay');
        // return the transition object
        var props = {
            property: splitIfNeeded(property, ','),
            duration: splitIfNeeded(duration, ',').map(function (value) {
                return convert_1.default(value, 'ms');
            }),
            delay: splitIfNeeded(delay, ',').map(function (value) { return convert_1.default(value, 'ms'); }),
            timingFunction: splitIfNeeded(timingFunction, ',')
        };
        var totalDuration = 0;
        var i = 0;
        var delays = [0].concat(props.delay);
        [0].concat(props.duration).forEach(function (val) {
            if (val + delays[i] > totalDuration) {
                totalDuration = val + delays[i];
            }
            i++;
        });
        props.totalDuration = totalDuration;
        return props;
    }
    return getTransitionProperties;
});
