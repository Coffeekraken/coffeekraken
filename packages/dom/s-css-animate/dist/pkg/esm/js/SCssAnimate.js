import * as __rematrix from 'rematrix';
import __getAnimationsFromElement from '@coffeekraken/sugar/js/dom/style/getAnimationsFromElement';
import __getKeyframesFromStylesheets from '@coffeekraken/sugar/js/dom/style/getKeyframesFromStylesheets';
import __parseTransformRule from '@coffeekraken/sugar/js/dom/style/parseTransformRule';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __get from '@coffeekraken/sugar/shared/object/get';
import __set from '@coffeekraken/sugar/shared/object/set';
import __easeInterval from '@coffeekraken/sugar/shared/function/easeInterval';
import __SClass from '@coffeekraken/s-class';
import __cssEasingStrToJsFunction from '@coffeekraken/sugar/js/dom/style/cssEasingStrToJsFunction';
export default class SCssKeyframesController extends __SClass {
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
            cssKeyframesController: {
                debug: false,
            },
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
        // console.log('FD', this._animations);
        // start at 0
        this.seekTo(0);
        const easingFn = __cssEasingStrToJsFunction('cubic-bezier(.72,-0.01,.42,.99)');
        setInterval(() => {
            __easeInterval(2400, (p) => {
                this.seekTo(p);
            }, {
                easing: easingFn,
            });
            setTimeout(() => {
                __easeInterval(2400, (p) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxVQUFVLE1BQU0sVUFBVSxDQUFDO0FBRXZDLE9BQU8sMEJBRU4sTUFBTSwyREFBMkQsQ0FBQztBQUNuRSxPQUFPLDZCQUVOLE1BQU0sOERBQThELENBQUM7QUFDdEUsT0FBTyxvQkFBb0IsTUFBTSxxREFBcUQsQ0FBQztBQUN2RixPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLFNBQVMsTUFBTSwyQ0FBMkMsQ0FBQztBQUNsRSxPQUFPLEtBQUssTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRCxPQUFPLEtBQUssTUFBTSx1Q0FBdUMsQ0FBQztBQUUxRCxPQUFPLGNBQWMsTUFBTSxrREFBa0QsQ0FBQztBQUM5RSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLDBCQUEwQixNQUFNLDJEQUEyRCxDQUFDO0FBb0VuRyxNQUFNLENBQUMsT0FBTyxPQUFPLHVCQUF3QixTQUFRLFFBQVE7SUFrRXpEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0ksSUFBaUIsRUFDakIsUUFBdUQ7O1FBRXZELEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSxzQkFBc0IsRUFBRTtnQkFDcEIsS0FBSyxFQUFFLEtBQUs7YUFDZjtTQUNKLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFFRixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUVqQixnREFBZ0Q7UUFDaEQsSUFBSSxDQUFDLFdBQVcsR0FBRywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFekQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLEVBQUUsRUFBRTtZQUN0QyxnQkFBZ0I7WUFDaEIsWUFBWSxDQUFDLFNBQVMsR0FBRyw2QkFB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