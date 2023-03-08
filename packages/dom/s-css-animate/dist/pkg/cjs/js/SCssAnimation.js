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
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const css_1 = require("@coffeekraken/sugar/css");
const function_1 = require("@coffeekraken/sugar/function");
const getAnimationsFromElement_1 = __importDefault(require("@coffeekraken/sugar/js/dom/style/getAnimationsFromElement"));
const getKeyframesFromStylesheets_1 = __importDefault(require("@coffeekraken/sugar/js/dom/style/getKeyframesFromStylesheets"));
const object_1 = require("@coffeekraken/sugar/object");
const set_1 = __importDefault(require("@coffeekraken/sugar/shared/object/set"));
const __rematrix = __importStar(require("rematrix"));
class SCssAnimation extends s_class_1.default {
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
        super((0, object_1.__deepMerge)({
            debug: false,
            easing: undefined,
            duration: undefined,
            iterations: undefined,
            yoyo: undefined,
        }, settings !== null && settings !== void 0 ? settings : {}));
        this.$elm = $elm;
        // get all the animations applied to the element
        this._animations = (0, getAnimationsFromElement_1.default)(this.$elm);
        this._animations.forEach((animationObj) => {
            // get keyframes
            animationObj.keyframes = (0, getKeyframesFromStylesheets_1.default)(animationObj.name, document.styleSheets).map((keyframeObj) => {
                var _a;
                if ((_a = keyframeObj.rules) === null || _a === void 0 ? void 0 : _a.transform) {
                    keyframeObj.rules.transform = (0, css_1.__parseTransformRule)(keyframeObj.rules.transform);
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
        // start at 0
        this.seekTo(0);
        // handle easing from settings
        const easingFn = typeof this.settings.easing === 'string'
            ? (0, css_1.__cssEasingStrToJsFunction)('cubic-bezier(.72,-0.01,.42,.99)')
            : this.settings.easing;
        // setInterval(() => {
        //     __easeInterval(
        //         2400,
        //         (p) => {
        //             this.seekTo(p);
        //         },
        //         {
        //             easing: easingFn,
        //         },
        //     );
        //     setTimeout(() => {
        //         __easeInterval(2400, (p) => {
        //             this.seekTo(100 - p);
        //         });
        //     }, 2400);
        // }, 5000);
        // setTimeout(() => {
        //     this.play({
        //         yoyo: true,
        //     });
        //     setTimeout(() => {
        //         this.stop();
        //     }, 1700);
        // }, 3000);
    }
    /**
     * @name        play
     * @type        Function
     *
     * This method allows you to play the animation
     *
     * @param       {ISCssAnimationPlaySettings}        [settings={}]       Some settings to play your animation
     * @param       {String}        [animationName=this._animations[0]?.name]       The name of the animation you want to play
     * @return       {SCssAnimation}                     Return the SCssAnimation instance to maintain chainability
     *
     * @setting         {String|Function}       easing       The easing to use for the animation. If not set, take the css defined property
     * @setting         {Number}                duration         The duration of the animation. If not set, take the css defined property
     * @setting         {Number}                iterations         The number of iterations of the animation. If not set, take the css defined property
     * @setting         {Boolean}               [yoyo=false]        If set to true, the animation will be played in forwards AND backwards in each iteration(s)
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    play(settings, animationName) {
        var _a;
        if (settings === void 0) { settings = {}; }
        if (animationName === void 0) { animationName = (_a = this._animations[0]) === null || _a === void 0 ? void 0 : _a.name; }
        return new Promise((resolve) => {
            const animationObj = this.getAnimationByName(animationName);
            const finalSettings = this._applyAnimationSettingsTo(animationObj, settings);
            this._currentEaseInterval = (0, function_1.__easeInterval)(finalSettings.duration / (finalSettings.yoyo ? 2 : 1), (p) => this.seekTo(p), {
                easing: finalSettings.easing,
            });
            if (finalSettings.yoyo) {
                this._currentYoyoTimeout = setTimeout(() => {
                    this._currentEaseInterval = (0, function_1.__easeInterval)(finalSettings.duration / 2, (p) => {
                        this.seekTo(100 - p);
                    }, {
                        easing: finalSettings.easing,
                    });
                }, finalSettings.duration / 2);
            }
        });
    }
    /**
     * @name        stop
     * @type        Function
     *
     * This method allows you to stop the current animation if their's one and seek to 0.
     *
     * @return       {SCssAnimation}                     Return the SCssAnimation instance to maintain chainability
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    stop() {
        var _a, _b;
        (_b = (_a = this._currentEaseInterval) === null || _a === void 0 ? void 0 : _a.cancel) === null || _b === void 0 ? void 0 : _b.call(_a);
        clearTimeout(this._currentYoyoTimeout);
        setTimeout(() => {
            this.seekTo(0);
        }, 20);
        return this;
    }
    /**
     * @name        seekTo
     * @type        Function
     *
     * This method allows you to seek to a specific percentage of the animation
     *
     * @param       {Number}        percentage      The percentage you want to go in the animation
     * @param       {String}        [animationName=this._animations[0]?.name]       The name of the animation you want to seek to
     * @return       {SCssAnimation}                     Return the SCssAnimation instance to maintain chainability
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    seekTo(percentage, animationName) {
        var _a;
        if (animationName === void 0) { animationName = (_a = this._animations[0]) === null || _a === void 0 ? void 0 : _a.name; }
        const animationObj = this.getAnimationByName(animationName);
        const newRules = {};
        console.log('seek', animationObj, animationName);
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
                const value = (0, object_1.__get)(nearestKeyframes.current.rules, animatedProperty);
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
                const previousValue = parseFloat((0, object_1.__get)(nearestKeyframes.before.rules, animatedProperty)), nextValue = parseFloat((0, object_1.__get)(nearestKeyframes.after.rules, animatedProperty));
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
        return this;
    }
    /**
     * This method simply take an ISAnimationCssPlaySettings object and apply either the css animation defined settings or the instance level
     * ones to this object and returns it
     */
    _applyAnimationSettingsTo(animationObj, settings) {
        var _a, _b, _c, _d, _e, _f, _g;
        let easingFn;
        if (animationObj.timingFunction) {
            easingFn =
                typeof animationObj.timingFunction === 'string'
                    ? (0, css_1.__cssEasingStrToJsFunction)(animationObj.timingFunction)
                    : animationObj.timingFunction;
        }
        else if (settings.easing) {
            easingFn =
                typeof settings.easing === 'string'
                    ? (0, css_1.__cssEasingStrToJsFunction)(settings.easing)
                    : settings.easing;
        }
        else if (this.settings.easing) {
            easingFn =
                typeof this.settings.easing === 'string'
                    ? (0, css_1.__cssEasingStrToJsFunction)(this.settings.easing)
                    : this.settings.easing;
        }
        else {
            easingFn = (0, css_1.__cssEasingStrToJsFunction)('linear');
        }
        const duration = (_b = (_a = animationObj.duration) !== null && _a !== void 0 ? _a : settings.duration) !== null && _b !== void 0 ? _b : this.settings.duration, iterations = (_e = (_d = (_c = animationObj.iterations) !== null && _c !== void 0 ? _c : settings.iterations) !== null && _d !== void 0 ? _d : this.settings.iterations) !== null && _e !== void 0 ? _e : 1, yoyo = (_g = (_f = settings.yoyo) !== null && _f !== void 0 ? _f : this.settings.yoyo) !== null && _g !== void 0 ? _g : false;
        return {
            easing: easingFn,
            duration,
            iterations,
            yoyo,
        };
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
        const rules = (0, object_1.__deepMerge)(...animationObj.keyframes.map((k) => k.rules));
        const animatedProps = Object.keys((0, object_1.__flatten)(rules));
        const animatedPropsObj = {};
        animatedProps.forEach((prop) => {
            var _a, _b;
            const value = (0, object_1.__get)(rules, prop);
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
            const hasRule = (0, object_1.__get)(keyframeObj.rules, property) !== undefined;
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
     * @param       {String}        name        The name of the animation to get
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
exports.default = SCssAnimation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBNkM7QUFDN0MsaURBR2lDO0FBQ2pDLDJEQUE4RDtBQUM5RCx5SEFFbUU7QUFDbkUsK0hBRXNFO0FBQ3RFLHVEQUEyRTtBQUMzRSxnRkFBMEQ7QUFDMUQscURBQXVDO0FBdUR2QyxNQUFxQixhQUFjLFNBQVEsaUJBQVE7SUFrQy9DLElBQUksTUFBTTs7UUFDTixPQUFPLE1BQUEsSUFBSSxDQUFDLFVBQVUsbUNBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksU0FBUztRQUNULE9BQU8sTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDeEQsQ0FBQztJQUtEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksSUFBaUIsRUFBRSxRQUF5Qzs7UUFDcEUsS0FBSyxDQUNELElBQUEsb0JBQVcsRUFDUDtZQUNJLEtBQUssRUFBRSxLQUFLO1lBQ1osTUFBTSxFQUFFLFNBQVM7WUFDakIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsVUFBVSxFQUFFLFNBQVM7WUFDckIsSUFBSSxFQUFFLFNBQVM7U0FDbEIsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQUVGLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWpCLGdEQUFnRDtRQUNoRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUEsa0NBQTBCLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXpELElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxFQUFFLEVBQUU7WUFDdEMsZ0JB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