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
     * @name      getAnimationProperties
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Get the css animation properties from an HTMLElement in an object format
     *
     * @param 		{HTMLElement} 					elm  		The element to get the properties from
     * @return 		{Object} 									The animation properties
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example  	js
     * import getAnimationProperties from '@coffeekraken/sugar/js/dom/getAnimationProperties'
     * const props = getAnimationProperties(myCoolHTMLElement);
     * // output format
     * // {
     * // 	name : ['animation1'],
     * // 	duration : [200],
     * // 	delay : [0],
     * // 	timingFunction : ['linear'],
     * // 	iterationCount : [1],
     * // 	direction : ['forward'],
     * // 	totalDuration : 200
     * // }
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function getAnimationProperties(elm) {
        // get the animation properties
        var name = getStyleProperty_1.default(elm, 'animation-name') || '';
        var duration = getStyleProperty_1.default(elm, 'animation-duration') || '0s';
        var timingFunction = getStyleProperty_1.default(elm, 'animation-timing-function') || 'linear';
        var delay = getStyleProperty_1.default(elm, 'animation-delay') || '0s';
        var iterationCount = getStyleProperty_1.default(elm, 'animation-iteration-count') || 1;
        var direction = getStyleProperty_1.default(elm, 'animation-direction') || 'normal';
        // return the animation object
        var props = {
            name: name.split(','),
            duration: duration.split(',').map(function (value) { return convert_1.default(value, 'ms'); }),
            delay: ("" + delay).split(',').map(function (value) { return convert_1.default(value, 'ms'); }),
            timingFunction: timingFunction.split(','),
            iterationCount: ("" + iterationCount).split(','),
            direction: direction.split(',')
        };
        var totalDuration = 0;
        var i = 0;
        var delays = [0].concat(props.delay);
        [0].concat(props.duration).forEach(function (val) {
            if (val + delays[i] > totalDuration) {
                totalDuration = val + delays[i];
            }
        });
        props.totalDuration = totalDuration;
        return props;
    }
    return getAnimationProperties;
});
