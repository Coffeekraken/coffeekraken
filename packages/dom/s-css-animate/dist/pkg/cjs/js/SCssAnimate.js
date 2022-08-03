"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __rematrix = __importStar(require("rematrix"));
const getAnimationsFromElement_1 = __importDefault(require("@coffeekraken/sugar/js/dom/style/getAnimationsFromElement"));
const getKeyframesFromStylesheets_1 = __importDefault(require("@coffeekraken/sugar/js/dom/style/getKeyframesFromStylesheets"));
const parseTransformRule_1 = __importDefault(require("@coffeekraken/sugar/js/dom/style/parseTransformRule"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const flatten_1 = __importDefault(require("@coffeekraken/sugar/shared/object/flatten"));
const get_1 = __importDefault(require("@coffeekraken/sugar/shared/object/get"));
const set_1 = __importDefault(require("@coffeekraken/sugar/shared/object/set"));
const easeInterval_1 = __importDefault(require("@coffeekraken/sugar/shared/function/easeInterval"));
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const cssEasingStrToJsFunction_1 = __importDefault(require("@coffeekraken/sugar/js/dom/style/cssEasingStrToJsFunction"));
class SCssKeyframesController extends s_class_1.default {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor($elm, settings) {
        var _a;
        super((0, deepMerge_1.default)({
            cssKeyframesController: {
                debug: false,
            },
        }, settings !== null && settings !== void 0 ? settings : {}));
        this.$elm = $elm;
        // get all the animations applied to the element
        this._animations = (0, getAnimationsFromElement_1.default)(this.$elm);
        this._animations.forEach((animationObj) => {
            // get keyframes
            animationObj.keyframes = (0, getKeyframesFromStylesheets_1.default)(animationObj.name, document.styleSheets).map((keyframeObj) => {
                var _a;
                if ((_a = keyframeObj.rules) === null || _a === void 0 ? void 0 : _a.transform) {
                    keyframeObj.rules.transform = (0, parseTransformRule_1.default)(keyframeObj.rules.transform);
                }
                return keyframeObj;
            });
            // get animated properties
            animationObj.animatedProperties = this._getAnimatedProperties(animationObj.name);
        });
        // pause the animation
        this.$elm.style.animation = 'none';
        // if the next element is a range, use it to control the animation
        (_a = this.$elm.nextElementSibling) === null || _a === void 0 ? void 0 : _a.addEventListener('input', (e) => {
            var _a;
            // @ts-ignore
            this.seekTo(parseFloat((_a = e.target) === null || _a === void 0 ? void 0 : _a.value));
        });
        // console.log('FD', this._animations);
        // start at 0
        this.seekTo(0);
        const easingFn = (0, cssEasingStrToJsFunction_1.default)('cubic-bezier(.72,-0.01,.42,.99)');
        setInterval(() => {
            (0, easeInterval_1.default)(2400, (p) => {
                this.seekTo(p);
            }, {
                easing: easingFn,
            });
            setTimeout(() => {
                (0, easeInterval_1.default)(2400, (p) => {
                    this.seekTo(100 - p);
                });
            }, 2400);
        }, 5000);
    }
    get matrix() {
        var _a;
        return (_a = this._tmpMatrix) !== null && _a !== void 0 ? _a : __rematrix.fromString(this.matrixStr);
    }
    /**
     * @name        matrixStr
     * @type        String
     * @readonly
     *
     * Get the matrix string of the current element
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get matrixStr() {
        return window.getComputedStyle(this.$elm).transform;
    }
    /**
     * @name        cssKeyframesControllerSettings
     * @type        ISCssKeyframesControllerSettings
     * @get
     *
     * Access the cssKeyframesController settings
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get cssKeyframesControllerSettings() {
        return this._settings.cssKeyframesController;
    }
    /**
     * @name        seekTo
     * @type        Function
     *
     * This method allows you to seek to a specific percentage of the animation
     *
     * @param       {Number}        percentage      The percentage you want to go in the animation
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    seekTo(percentage, animationName) {
        var _a;
        if (animationName === void 0) { animationName = (_a = this._animations[0]) === null || _a === void 0 ? void 0 : _a.name; }
        const animationObj = this.getAnimationByName(animationName);
        const newRules = {};
        for (let [animatedProperty, animatedPropertyObj] of Object.entries(animationObj.animatedProperties)) {
            // get the nearest frame(s) with the current animated property
            const nearestKeyframes = this._getNearestKeyframesAtPercentageWithProperty(percentage, animatedProperty, animationName);
            // if (animatedProperty.match(/translateX$/)) {
            //     console.log('-------');
            //     console.log('PERVEN', percentage);
            //     console.log('animated', animatedProperty);
            // }
            // we are on an exact keyframe
            if (nearestKeyframes.current) {
                const value = (0, get_1.default)(nearestKeyframes.current.rules, animatedProperty);
                // if (animatedProperty.match(/translateX$/)) {
                //     console.log('CURRENT', nearestKeyframes.current);
                //     console.log('val', value);
                // }
                // @ts-ignore
                (0, set_1.default)(newRules, animatedProperty, value);
                // pass to next property
                continue;
            }
            // interpolate
            if (nearestKeyframes.before && nearestKeyframes.after) {
                const previousValue = parseFloat((0, get_1.default)(nearestKeyframes.before.rules, animatedProperty)), nextValue = parseFloat((0, get_1.default)(nearestKeyframes.after.rules, animatedProperty));
                // console.log('r', previousValue, nextValue);
                // make sure we can interpolate the values
                if (isNaN(previousValue) || isNaN(nextValue)) {
                    return;
                }
                const offset = percentage - nearestKeyframes.before.percentage, total = nearestKeyframes.after.percentage -
                    nearestKeyframes.before.percentage, perc = (100 / total) * offset, diff = Math.abs(previousValue - nextValue), negative = previousValue > nextValue;
                let interpolatedValue = nextValue;
                if (diff !== 0) {
                    if (negative) {
                        interpolatedValue = previousValue - (diff / 100) * perc;
                    }
                    else {
                        interpolatedValue = previousValue + (diff / 100) * perc;
                    }
                }
                // if (animatedProperty.match(/translateX$/)) {
                //     console.log('negative', negative);
                //     console.log('before', nearestKeyframes.before);
                //     console.log('after', nearestKeyframes.after);
                //     console.log('previousValue', previousValue);
                //     console.log('nextValue', nextValue);
                //     console.log('perc', perc);
                //     console.log('diff', diff);
                //     console.log('interpolatedValue', interpolatedValue);
                // }
                // @ts-ignore
                if (animatedPropertyObj.unit) {
                    (0, set_1.default)(newRules, animatedProperty, 
                    // @ts-ignore
                    `${interpolatedValue}${animatedPropertyObj.unit}`);
                }
                else {
                    (0, set_1.default)(newRules, animatedProperty, interpolatedValue);
                }
            }
        }
        // handle transform
        const objStrs = {};
        for (let [key, value] of Object.entries(newRules)) {
            if (typeof value === 'object') {
                if (!objStrs[key]) {
                    objStrs[key] = '';
                }
                for (let [k, v] of Object.entries(value)) {
                    objStrs[key] += `${k}(${v}) `;
                    delete newRules[k];
                }
            }
        }
        // console.log('new', newRules);
        Object.assign(newRules, objStrs);
        for (let [key, value] of Object.entries(newRules)) {
            this.$elm.style[key] = value;
        }
    }
    /**
     * @name        _getAnimatedProperties
     * @type        Function
     * @private
     *
     * Get back end animated properties for the passed animation
     *
     * @param       {String}            [animationName=this._animations[0].name]    The animation name to get the properties from
     * @return      {String[]}                                                      The animated properties array
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _getAnimatedProperties(animationName) {
        var _a;
        if (animationName === void 0) { animationName = (_a = this._animations[0]) === null || _a === void 0 ? void 0 : _a.name; }
        const animationObj = this.getAnimationByName(animationName);
        const rules = (0, deepMerge_1.default)(...animationObj.keyframes.map((k) => k.rules));
        const animatedProps = Object.keys((0, flatten_1.default)(rules));
        const animatedPropsObj = {};
        animatedProps.forEach((prop) => {
            var _a, _b;
            const value = (0, get_1.default)(rules, prop);
            const floatValue = parseFloat(value);
            if (isNaN(floatValue)) {
                animatedPropsObj[prop] = {
                    unit: null,
                };
            }
            else {
                animatedPropsObj[prop] = {
                    unit: (_b = (_a = value.replace) === null || _a === void 0 ? void 0 : _a.call(value, floatValue, '')) !== null && _b !== void 0 ? _b : null,
                };
            }
        });
        return animatedPropsObj;
    }
    /**
     * @name        _getNearestKeyframesAtPercentageWithProperty
     * @type        Function
     * @private
     *
     * Allows you to get the keyframes near the "percentage" passed
     *
     * @param       {Number}        percentage          The percentage to get the nearest keyframes at
     * @param    {String}        property            The property you want on the searched keyframe. Can be a dotPath.
     * @param       {animationName}     [animationName=this._animations[0].name]    The animation name to get the properties from
     * @return      {INearestKeyframes}                                     The nearest keyframes object
     *
     * @since      2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _getNearestKeyframesAtPercentageWithProperty(percentage, property, animationName) {
        var _a, _b, _c, _d;
        if (animationName === void 0) { animationName = (_a = this._animations[0]) === null || _a === void 0 ? void 0 : _a.name; }
        // @ts-ignore
        percentage = parseFloat(percentage);
        let beforeKeyframe, afterKeyframe, currentKeyframe;
        for (let [idx, keyframeObj] of (_d = (_c = (_b = this.getAnimationByName(animationName)) === null || _b === void 0 ? void 0 : _b.keyframes) === null || _c === void 0 ? void 0 : _c.entries()) !== null && _d !== void 0 ? _d : []) {
            const hasRule = (0, get_1.default)(keyframeObj.rules, property) !== undefined;
            if (hasRule && keyframeObj.percentage === percentage) {
                currentKeyframe = keyframeObj;
            }
            if (hasRule && keyframeObj.percentage < percentage) {
                beforeKeyframe = keyframeObj;
            }
            if (hasRule && keyframeObj.percentage > percentage) {
                afterKeyframe = keyframeObj;
                return {
                    before: beforeKeyframe,
                    after: afterKeyframe,
                    current: currentKeyframe,
                };
            }
        }
        return {
            before: beforeKeyframe,
            after: afterKeyframe,
            current: currentKeyframe,
        };
    }
    /**
     * @name        _getNearestKeyframesAtPercentage
     * @type        Function
     * @private
     *
     * Allows you to get the keyframes near the "percentage" passed
     *
     * @param       {Number}        percentage          The percentage to get the nearest keyframes at
     * @param       {animationName}     [animationName=this._animations[0].name]    The animation name to get the properties from
     * @return      {INearestKeyframes}                                     The nearest keyframes object
     *
     * @since      2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _getNearestKeyframesAtPercentage(percentage, animationName) {
        var _a, _b, _c, _d;
        if (animationName === void 0) { animationName = (_a = this._animations[0]) === null || _a === void 0 ? void 0 : _a.name; }
        // @ts-ignore
        percentage = parseFloat(percentage);
        let beforeKeyframe, afterKeyframe;
        for (let [idx, keyframeObj] of (_d = (_c = (_b = this.getAnimationByName(animationName)) === null || _b === void 0 ? void 0 : _b.keyframes) === null || _c === void 0 ? void 0 : _c.entries()) !== null && _d !== void 0 ? _d : []) {
            if (keyframeObj.percentage < percentage) {
                beforeKeyframe = keyframeObj;
            }
            if (keyframeObj.percentage > percentage) {
                afterKeyframe = keyframeObj;
                return {
                    before: beforeKeyframe,
                    after: afterKeyframe,
                };
            }
        }
        return {
            before: beforeKeyframe,
            after: afterKeyframe,
        };
    }
    /**
     * @name        getAnimationByName
     * @type        Function
     *
     * This method allows you to get an animation object by it's name
     *
     * @param       {String}        name        The name of the animation to get
     * @return      {IGetAnimationsFromElementResult}       The animation corresponding to the passed name
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getAnimationByName(name) {
        for (let [idx, animationObj] of this._animations.entries()) {
            if (animationObj.name === name) {
                return animationObj;
            }
        }
        throw new Error(`No animation found with the name "${name}"`);
    }
}
exports.default = SCssKeyframesController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxREFBdUM7QUFFdkMseUhBRW1FO0FBQ25FLCtIQUVzRTtBQUN0RSw2R0FBdUY7QUFDdkYsNEZBQXNFO0FBQ3RFLHdGQUFrRTtBQUNsRSxnRkFBMEQ7QUFDMUQsZ0ZBQTBEO0FBRTFELG9HQUE4RTtBQUM5RSxvRUFBNkM7QUFDN0MseUhBQW1HO0FBb0VuRyxNQUFxQix1QkFBd0IsU0FBUSxpQkFBUTtJQWtFekQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDSSxJQUFpQixFQUNqQixRQUF1RDs7UUFFdkQsS0FBSyxDQUNELElBQUEsbUJBQVcsRUFDUDtZQUNJLHNCQUFzQixFQUFFO2dCQUNwQixLQUFLLEVBQUUsS0FBSzthQUNmO1NBQ0osRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQUVGLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWpCLGdEQUFnRDtRQUNoRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUEsa0NBQTBCLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXpELElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxFQUFFLEVBQUU7WUFDdEMsZ0JBQWdCO1lBQ2hCLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBQSxxQ0FBNkIsRUFDbEQsWUFBWSxDQUFDLElBQUksRUFDakIsUUFBUSxDQUFDLFdBQVcsQ0FDdkIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTs7Z0JBQ2xCLElBQUksTUFBQSxXQUFXLENBQUMsS0FBSywwQ0FBRSxTQUFTLEVBQUU7b0JBQzlCLFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUEsNEJBQW9CLEVBQzlDLFdBQVcsQ0FB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