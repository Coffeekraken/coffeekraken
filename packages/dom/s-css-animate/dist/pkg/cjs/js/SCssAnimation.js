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
const cssEasingStrToJsFunction_1 = __importDefault(require("@coffeekraken/sugar/js/dom/style/cssEasingStrToJsFunction"));
const getAnimationsFromElement_1 = __importDefault(require("@coffeekraken/sugar/js/dom/style/getAnimationsFromElement"));
const getKeyframesFromStylesheets_1 = __importDefault(require("@coffeekraken/sugar/js/dom/style/getKeyframesFromStylesheets"));
const parseTransformRule_1 = __importDefault(require("@coffeekraken/sugar/js/dom/style/parseTransformRule"));
const easeInterval_1 = __importDefault(require("@coffeekraken/sugar/shared/function/easeInterval"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const flatten_1 = __importDefault(require("@coffeekraken/sugar/shared/object/flatten"));
const get_1 = __importDefault(require("@coffeekraken/sugar/shared/object/get"));
const set_1 = __importDefault(require("@coffeekraken/sugar/shared/object/set"));
const __rematrix = __importStar(require("rematrix"));
class SCssAnimation extends s_class_1.default {
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
        // start at 0
        this.seekTo(0);
        // handle easing from settings
        const easingFn = typeof this.settings.easing === 'string'
            ? (0, cssEasingStrToJsFunction_1.default)('cubic-bezier(.72,-0.01,.42,.99)')
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
            this._currentEaseInterval = (0, easeInterval_1.default)(finalSettings.duration / (finalSettings.yoyo ? 2 : 1), (p) => this.seekTo(p), {
                easing: finalSettings.easing,
            });
            if (finalSettings.yoyo) {
                this._currentYoyoTimeout = setTimeout(() => {
                    this._currentEaseInterval = (0, easeInterval_1.default)(finalSettings.duration / 2, (p) => {
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
        console.log('SET', newRules);
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
                    ? (0, cssEasingStrToJsFunction_1.default)(animationObj.timingFunction)
                    : animationObj.timingFunction;
        }
        else if (settings.easing) {
            easingFn =
                typeof settings.easing === 'string'
                    ? (0, cssEasingStrToJsFunction_1.default)(settings.easing)
                    : settings.easing;
        }
        else if (this.settings.easing) {
            easingFn =
                typeof this.settings.easing === 'string'
                    ? (0, cssEasingStrToJsFunction_1.default)(this.settings.easing)
                    : this.settings.easing;
        }
        else {
            easingFn = (0, cssEasingStrToJsFunction_1.default)('linear');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBNkM7QUFDN0MseUhBQW1HO0FBQ25HLHlIQUVtRTtBQUNuRSwrSEFFc0U7QUFDdEUsNkdBQXVGO0FBQ3ZGLG9HQUE4RTtBQUM5RSw0RkFBc0U7QUFDdEUsd0ZBQWtFO0FBQ2xFLGdGQUEwRDtBQUMxRCxnRkFBMEQ7QUFDMUQscURBQXVDO0FBdUR2QyxNQUFxQixhQUFjLFNBQVEsaUJBQVE7SUF1RC9DOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksSUFBaUIsRUFBRSxRQUF5Qzs7UUFDcEUsS0FBSyxDQUNELElBQUEsbUJBQVcsRUFDUDtZQUNJLEtBQUssRUFBRSxLQUFLO1lBQ1osTUFBTSxFQUFFLFNBQVM7WUFDakIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsVUFBVSxFQUFFLFNBQVM7WUFDckIsSUFBSSxFQUFFLFNBQVM7U0FDbEIsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQUVGLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWpCLGdEQUFnRDtRQUNoRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUEsa0NBQTBCLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXpELElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxFQUFFLEVBQUU7WUFDdEMsZ0JBQWdCO1lBQ2hCLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBQSxxQ0FBNkIsRUFDbEQsWUFBWSxDQUFDLElBQUksRUFDakIsUUFBUSxDQUFDLFdBQVcsQ0FDdkIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTs7Z0JBQ2xCLElBQUksTUFBQSxXQUFXLENBQUMsS0FBSywwQ0FBRSxTQUFTLEVBQUU7b0JBQzlC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