import __SClass from '@coffeekraken/s-class';
import { __cssEasingStrToJsFunction, __parseTransformRule, } from '@coffeekraken/sugar/css';
import { default as __getAnimationsFromElement, default as __getKeyframesFromStylesheets, } from '@coffeekraken/sugar/dom';
import { __easeInterval } from '@coffeekraken/sugar/function';
import { __deepMerge, __flatten, __get, __set, } from '@coffeekraken/sugar/object';
import * as __rematrix from 'rematrix';
export default class SCssAnimation extends __SClass {
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
        super(__deepMerge({
            debug: false,
            easing: undefined,
            duration: undefined,
            iterations: undefined,
            yoyo: undefined,
        }, settings !== null && settings !== void 0 ? settings : {}));
        this.$elm = $elm;
        // get all the animations applied to the element
        this._animations = __getAnimationsFromElement(this.$elm);
        this._animations.forEach((animationObj) => {
            // get keyframes
            animationObj.keyframes = __getKeyframesFromStylesheets(animationObj.name, document.styleSheets).map((keyframeObj) => {
                var _a;
                if ((_a = keyframeObj.rules) === null || _a === void 0 ? void 0 : _a.transform) {
                    keyframeObj.rules.transform = __parseTransformRule(keyframeObj.rules.transform);
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
            ? __cssEasingStrToJsFunction('cubic-bezier(.72,-0.01,.42,.99)')
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
            this._currentEaseInterval = __easeInterval(finalSettings.duration / (finalSettings.yoyo ? 2 : 1), (p) => this.seekTo(p), {
                easing: finalSettings.easing,
            });
            if (finalSettings.yoyo) {
                this._currentYoyoTimeout = setTimeout(() => {
                    this._currentEaseInterval = __easeInterval(finalSettings.duration / 2, (p) => {
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
                const value = __get(nearestKeyframes.current.rules, animatedProperty);
                // if (animatedProperty.match(/translateX$/)) {
                //     console.log('CURRENT', nearestKeyframes.current);
                //     console.log('val', value);
                // }
                // @ts-ignore
                __set(newRules, animatedProperty, value);
                // pass to next property
                continue;
            }
            // interpolate
            if (nearestKeyframes.before && nearestKeyframes.after) {
                const previousValue = parseFloat(__get(nearestKeyframes.before.rules, animatedProperty)), nextValue = parseFloat(__get(nearestKeyframes.after.rules, animatedProperty));
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
                    __set(newRules, animatedProperty, 
                    // @ts-ignore
                    `${interpolatedValue}${animatedPropertyObj.unit}`);
                }
                else {
                    __set(newRules, animatedProperty, interpolatedValue);
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
                    ? __cssEasingStrToJsFunction(animationObj.timingFunction)
                    : animationObj.timingFunction;
        }
        else if (settings.easing) {
            easingFn =
                typeof settings.easing === 'string'
                    ? __cssEasingStrToJsFunction(settings.easing)
                    : settings.easing;
        }
        else if (this.settings.easing) {
            easingFn =
                typeof this.settings.easing === 'string'
                    ? __cssEasingStrToJsFunction(this.settings.easing)
                    : this.settings.easing;
        }
        else {
            easingFn = __cssEasingStrToJsFunction('linear');
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
        const rules = __deepMerge(...animationObj.keyframes.map((k) => k.rules));
        const animatedProps = Object.keys(__flatten(rules));
        const animatedPropsObj = {};
        animatedProps.forEach((prop) => {
            var _a, _b;
            const value = __get(rules, prop);
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
            const hasRule = __get(keyframeObj.rules, property) !== undefined;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFDSCwwQkFBMEIsRUFDMUIsb0JBQW9CLEdBQ3ZCLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUdILE9BQU8sSUFBSSwwQkFBMEIsRUFDckMsT0FBTyxJQUFJLDZCQUE2QixHQUMzQyxNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM5RCxPQUFPLEVBQ0gsV0FBVyxFQUNYLFNBQVMsRUFDVCxLQUFLLEVBQ0wsS0FBSyxHQUNSLE1BQU0sNEJBQTRCLENBQUM7QUFDcEMsT0FBTyxLQUFLLFVBQVUsTUFBTSxVQUFVLENBQUM7QUF1RHZDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sYUFBYyxTQUFRLFFBQVE7SUFrQy9DLElBQUksTUFBTTs7UUFDTixPQUFPLE1BQUEsSUFBSSxDQUFDLFVBQVUsbUNBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksU0FBUztRQUNULE9BQU8sTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDeEQsQ0FBQztJQUtEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksSUFBaUIsRUFBRSxRQUF5Qzs7UUFDcEUsS0FBSyxDQUNELFdBQVcsQ0FDUDtZQUNJLEtBQUssRUFBRSxLQUFLO1lBQ1osTUFBTSxFQUFFLFNBQVM7WUFDakIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsVUFBVSxFQUFFLFNBQVM7WUFDckIsSUFBSSxFQUFFLFNBQVM7U0FDbEIsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFF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