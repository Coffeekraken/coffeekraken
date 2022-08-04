import __SClass from '@coffeekraken/s-class';
import __cssEasingStrToJsFunction from '@coffeekraken/sugar/js/dom/style/cssEasingStrToJsFunction';
import __getAnimationsFromElement from '@coffeekraken/sugar/js/dom/style/getAnimationsFromElement';
import __getKeyframesFromStylesheets from '@coffeekraken/sugar/js/dom/style/getKeyframesFromStylesheets';
import __parseTransformRule from '@coffeekraken/sugar/js/dom/style/parseTransformRule';
import __easeInterval from '@coffeekraken/sugar/shared/function/easeInterval';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __get from '@coffeekraken/sugar/shared/object/get';
import __set from '@coffeekraken/sugar/shared/object/set';
import * as __rematrix from 'rematrix';
export default class SCssAnimation extends __SClass {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sMEJBQTBCLE1BQU0sMkRBQTJELENBQUM7QUFDbkcsT0FBTywwQkFFTixNQUFNLDJEQUEyRCxDQUFDO0FBQ25FLE9BQU8sNkJBRU4sTUFBTSw4REFBOEQsQ0FBQztBQUN0RSxPQUFPLG9CQUFvQixNQUFNLHFEQUFxRCxDQUFDO0FBQ3ZGLE9BQU8sY0FBYyxNQUFNLGtEQUFrRCxDQUFDO0FBQzlFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sU0FBUyxNQUFNLDJDQUEyQyxDQUFDO0FBQ2xFLE9BQU8sS0FBSyxNQUFNLHVDQUF1QyxDQUFDO0FBQzFELE9BQU8sS0FBSyxNQUFNLHVDQUF1QyxDQUFDO0FBQzFELE9BQU8sS0FBSyxVQUFVLE1BQU0sVUFBVSxDQUFDO0FBdUR2QyxNQUFNLENBQUMsT0FBTyxPQUFPLGFBQWMsU0FBUSxRQUFRO0lBdUQvQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLElBQWlCLEVBQUUsUUFBeUM7O1FBQ3BFLEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSxLQUFLLEVBQUUsS0FBSztZQUNaLE1BQU0sRUFBRSxTQUFTO1lBQ2pCLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFVBQVUsRUFBRSxTQUFTO1lBQ3JCLElBQUksRUFBRSxTQUFTO1NBQ2xCLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFFRixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUVqQixnREFBZ0Q7UUFDaEQsSUFBSSxDQUFDLFdBQVcsR0FBRywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFekQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLEVBQUUsRUFBRTtZQUN0QyxnQkFBZ0I7WUFDaEIsWUFBWSxDQUFDLFNBQVMsR0FBRyw2QkFBNkIsQ0FDbEQsWUFBWSxDQUFDLElBQUksRUFDakIsUUFBUSxDQUFDLFdBQVcsQ0FDdkIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTs7Z0JBQ2xCLElBQUksTUFBQSxXQUFXLENBQUMsS0FBSywwQ0FBRSxTQUFTLEVBQUU7b0JBQzlCLFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLG9CQUFvQixDQUM5QyxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FDOUIsQ0FBQztpQkFDTDtnQkFDRCxPQUFPLFdBQVcsQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztZQUNILDBCQUEwQjtZQUMxQixZQUFZLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUN6RCxZQUFZLENBQUMsSUFBSSxDQUNwQixDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7UUFFSCxzQkFBc0I7UUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztRQUVuQyxrRUFBa0U7UUFDbEUsTUFBQSxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQiwwQ0FBRSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTs7WUFDMUQsYUFBYTtZQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQUEsQ0FBQyxDQUFDLE1BQU0sMENBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztRQUVILGFBQWE7UUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWYsOEJBQThCO1FBQzlCLE1BQU0sUUFBUSxHQUNWLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssUUFBUTtZQUNwQyxDQUFDLENBQUMsMEJBQTBCLENBQUMsaUNBQWlDLENBQUM7WUFDL0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBRS9CLHNCQUFzQjtRQUN0QixzQkFBc0I7UUFDdEIsZ0JBQWdCO1FBQ2hCLG1CQUFtQjtRQUNuQiw4QkFBOEI7UUFDOUIsYUFBYTtRQUNiLFlBQVk7UUFDWixnQ0FBZ0M7UUFDaEMsYUFBYTtRQUNiLFNBQVM7UUFDVCx5QkFBeUI7UUFDekIsd0NBQXdDO1FBQ3hDLG9DQUFvQztRQUNwQyxjQUFjO1FBQ2QsZ0JBQWdCO1FBQ2hCLFlBQVk7UUFFWixxQkFBcUI7UUFDckIsa0JBQWtCO1FBQ2xCLHNCQUFzQjtRQUN0QixVQUFVO1FBQ1YseUJBQXlCO1FBQ3pCLHVCQUF1QjtRQUN2QixnQkFBZ0I7UUFDaEIsWUFBWTtJQUNoQixDQUFDO0lBaEhELElBQUksTUFBTTs7UUFDTixPQUFPLE1BQUEsSUFBSSxDQUFDLFVBQVUsbUNBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksU0FBUztRQUNULE9BQU8sTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDeEQsQ0FBQztJQWtHRDs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQkc7SUFDSCxJQUFJLENBQ0EsUUFBa0QsRUFDbEQsYUFBeUM7O2lDQUR6QyxFQUFBLGFBQWtEO3NDQUNsRCxFQUFBLHNCQUFnQixJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQywwQ0FBRSxJQUFJO1FBRXpDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUMzQixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFNUQsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUNoRCxZQUFZLEVBQ1osUUFBUSxDQUNYLENBQUM7WUFFRixJQUFJLENBQUMsb0JBQW9CLEdBQUcsY0FBYyxDQUN0QyxhQUFhLENBQUMsUUFBUSxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDckQsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQ3JCO2dCQUNJLE1BQU0sRUFBRSxhQUFhLENBQUMsTUFBTTthQUMvQixDQUNKLENBQUM7WUFDRixJQUFJLGFBQWEsQ0FBQyxJQUFJLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO29CQUN2QyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsY0FBYyxDQUN0QyxhQUFhLENBQUMsUUFBUSxHQUFHLENBQUMsRUFDMUIsQ0FBQyxDQUFDLEVBQUUsRUFBRTt3QkFDRixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDekIsQ0FBQyxFQUNEO3dCQUNJLE1BQU0sRUFBRSxhQUFhLENBQUMsTUFBTTtxQkFDL0IsQ0FDSixDQUFDO2dCQUNOLENBQUMsRUFBRSxhQUFhLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ2xDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILElBQUk7O1FBQ0EsTUFBQSxNQUFBLElBQUksQ0FBQyxvQkFBb0IsMENBQUUsTUFBTSxrREFBSSxDQUFDO1FBQ3RDLFlBQVksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUN2QyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDUCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUNGLFVBQWtCLEVBQ2xCLGFBQXlDOztzQ0FBekMsRUFBQSxzQkFBZ0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsMENBQUUsSUFBSTtRQUV6QyxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFNUQsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBRXBCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQztRQUVqRCxLQUFLLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxtQkFBbUIsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQzlELFlBQVksQ0FBQyxrQkFBa0IsQ0FDbEMsRUFBRTtZQUNDLDhEQUE4RDtZQUM5RCxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyw0Q0FBNEMsQ0FDdEUsVUFBVSxFQUNWLGdCQUFnQixFQUNoQixhQUFhLENBQ2hCLENBQUM7WUFFRiwrQ0FBK0M7WUFDL0MsOEJBQThCO1lBQzlCLHlDQUF5QztZQUN6QyxpREFBaUQ7WUFDakQsSUFBSTtZQUVKLDhCQUE4QjtZQUM5QixJQUFJLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtnQkFDMUIsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUNmLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQzlCLGdCQUFnQixDQUNuQixDQUFDO2dCQUVGLCtDQUErQztnQkFDL0Msd0RBQXdEO2dCQUN4RCxpQ0FBaUM7Z0JBQ2pDLElBQUk7Z0JBRUosYUFBYTtnQkFDYixLQUFLLENBQUMsUUFBUSxFQUFFLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUV6Qyx3QkFBd0I7Z0JBQ3hCLFNBQVM7YUFDWjtZQUVELGNBQWM7WUFDZCxJQUFJLGdCQUFnQixDQUFDLE1BQU0sSUFBSSxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUU7Z0JBQ25ELE1BQU0sYUFBYSxHQUFHLFVBQVUsQ0FDeEIsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsQ0FDekQsRUFDRCxTQUFTLEdBQUcsVUFBVSxDQUNsQixLQUFLLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxDQUN4RCxDQUFDO2dCQUNOLDhDQUE4QztnQkFFOUMsMENBQTBDO2dCQUMxQyxJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQzFDLE9BQU87aUJBQ1Y7Z0JBQ0QsTUFBTSxNQUFNLEdBQUcsVUFBVSxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQzFELEtBQUssR0FDRCxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsVUFBVTtvQkFDakMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFDdEMsSUFBSSxHQUFHLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLE1BQU0sRUFDN0IsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQyxFQUMxQyxRQUFRLEdBQUcsYUFBYSxHQUFHLFNBQVMsQ0FBQztnQkFFekMsSUFBSSxpQkFBaUIsR0FBRyxTQUFTLENBQUM7Z0JBQ2xDLElBQUksSUFBSSxLQUFLLENBQUMsRUFBRTtvQkFDWixJQUFJLFFBQVEsRUFBRTt3QkFDVixpQkFBaUIsR0FBRyxhQUFhLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO3FCQUMzRDt5QkFBTTt3QkFDSCxpQkFBaUIsR0FBRyxhQUFhLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO3FCQUMzRDtpQkFDSjtnQkFFRCwrQ0FBK0M7Z0JBQy9DLHlDQUF5QztnQkFDekMsc0RBQXNEO2dCQUN0RCxvREFBb0Q7Z0JBQ3BELG1EQUFtRDtnQkFDbkQsMkNBQTJDO2dCQUMzQyxpQ0FBaUM7Z0JBQ2pDLGlDQUFpQztnQkFDakMsMkRBQTJEO2dCQUMzRCxJQUFJO2dCQUVKLGFBQWE7Z0JBQ2IsSUFBSSxtQkFBbUIsQ0FBQyxJQUFJLEVBQUU7b0JBQzFCLEtBQUssQ0FDRCxRQUFRLEVBQ1IsZ0JBQWdCO29CQUNoQixhQUFhO29CQUNiLEdBQUcsaUJBQWlCLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxFQUFFLENBQ3BELENBQUM7aUJBQ0w7cUJBQU07b0JBQ0gsS0FBSyxDQUFDLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO2lCQUN4RDthQUNKO1NBQ0o7UUFFRCxtQkFBbUI7UUFDbkIsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ25CLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQy9DLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO2dCQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7aUJBQ3JCO2dCQUNELEtBQUssSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQzlCLE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUN0QjthQUNKO1NBQ0o7UUFFRCxnQ0FBZ0M7UUFFaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDN0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1NBQ2hDO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7T0FHRztJQUNILHlCQUF5QixDQUNyQixZQUFpQixFQUNqQixRQUE2Qzs7UUFFN0MsSUFBSSxRQUFRLENBQUM7UUFDYixJQUFJLFlBQVksQ0FBQyxjQUFjLEVBQUU7WUFDN0IsUUFBUTtnQkFDSixPQUFPLFlBQVksQ0FBQyxjQUFjLEtBQUssUUFBUTtvQkFDM0MsQ0FBQyxDQUFDLDBCQUEwQixDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUM7b0JBQ3pELENBQUMsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDO1NBQ3pDO2FBQU0sSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ3hCLFFBQVE7Z0JBQ0osT0FBTyxRQUFRLENBQUMsTUFBTSxLQUFLLFFBQVE7b0JBQy9CLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO29CQUM3QyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztTQUM3QjthQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDN0IsUUFBUTtnQkFDSixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLFFBQVE7b0JBQ3BDLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztvQkFDbEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1NBQ2xDO2FBQU07WUFDSCxRQUFRLEdBQUcsMEJBQTBCLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbkQ7UUFDRCxNQUFNLFFBQVEsR0FDTixNQUFBLE1BQUEsWUFBWSxDQUFDLFFBQVEsbUNBQ3JCLFFBQVEsQ0FBQyxRQUFRLG1DQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFDMUIsVUFBVSxHQUNOLE1BQUEsTUFBQSxNQUFBLFlBQVksQ0FBQyxVQUFVLG1DQUN2QixRQUFRLENBQUMsVUFBVSxtQ0FDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLG1DQUN4QixDQUFDLEVBQ0wsSUFBSSxHQUFHLE1BQUEsTUFBQSxRQUFRLENBQUMsSUFBSSxtQ0FBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksbUNBQUksS0FBSyxDQUFDO1FBRXhELE9BQU87WUFDSCxNQUFNLEVBQUUsUUFBUTtZQUNoQixRQUFRO1lBQ1IsVUFBVTtZQUNWLElBQUk7U0FDUCxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILHNCQUFzQixDQUFDLGFBQXlDOztzQ0FBekMsRUFBQSxzQkFBZ0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsMENBQUUsSUFBSTtRQUM1RCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDNUQsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUNyQixHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQ2hELENBQUM7UUFDRixNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRXBELE1BQU0sZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1FBRTVCLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTs7WUFDM0IsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztZQUVqQyxNQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckMsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQ25CLGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHO29CQUNyQixJQUFJLEVBQUUsSUFBSTtpQkFDYixDQUFDO2FBQ0w7aUJBQU07Z0JBQ0gsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUc7b0JBQ3JCLElBQUksRUFBRSxNQUFBLE1BQUEsS0FBSyxDQUFDLE9BQU8sc0RBQUcsVUFBVSxFQUFFLEVBQUUsQ0FBQyxtQ0FBSSxJQUFJO2lCQUNoRCxDQUFDO2FBQ0w7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sZ0JBQWdCLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsNENBQTRDLENBQ3hDLFVBQWtCLEVBQ2xCLFFBQWdCLEVBQ2hCLGFBQXlDOztzQ0FBekMsRUFBQSxzQkFBZ0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsMENBQUUsSUFBSTtRQUV6QyxhQUFhO1FBQ2IsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNwQyxJQUFJLGNBQWMsRUFBRSxhQUFhLEVBQUUsZUFBZSxDQUFDO1FBQ25ELEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsSUFBSSxNQUFBLE1BQUEsTUFBQSxJQUFJLENBQUMsa0JBQWtCLENBQ2xELGFBQWEsQ0FDaEIsMENBQUUsU0FBUywwQ0FBRSxPQUFPLEVBQUUsbUNBQUksRUFBRSxFQUFFO1lBQzNCLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLLFNBQVMsQ0FBQztZQUVqRSxJQUFJLE9BQU8sSUFBSSxXQUFXLENBQUMsVUFBVSxLQUFLLFVBQVUsRUFBRTtnQkFDbEQsZUFBZSxHQUFHLFdBQVcsQ0FBQzthQUNqQztZQUVELElBQUksT0FBTyxJQUFJLFdBQVcsQ0FBQyxVQUFVLEdBQUcsVUFBVSxFQUFFO2dCQUNoRCxjQUFjLEdBQUcsV0FBVyxDQUFDO2FBQ2hDO1lBQ0QsSUFBSSxPQUFPLElBQUksV0FBVyxDQUFDLFVBQVUsR0FBRyxVQUFVLEVBQUU7Z0JBQ2hELGFBQWEsR0FBRyxXQUFXLENBQUM7Z0JBQzVCLE9BQU87b0JBQ0gsTUFBTSxFQUFFLGNBQWM7b0JBQ3RCLEtBQUssRUFBRSxhQUFhO29CQUNwQixPQUFPLEVBQUUsZUFBZTtpQkFDM0IsQ0FBQzthQUNMO1NBQ0o7UUFDRCxPQUFPO1lBQ0gsTUFBTSxFQUFFLGNBQWM7WUFDdEIsS0FBSyxFQUFFLGFBQWE7WUFDcEIsT0FBTyxFQUFFLGVBQWU7U0FDM0IsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsZ0NBQWdDLENBQzVCLFVBQWtCLEVBQ2xCLGFBQXlDOztzQ0FBekMsRUFBQSxzQkFBZ0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsMENBQUUsSUFBSTtRQUV6QyxhQUFhO1FBQ2IsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNwQyxJQUFJLGNBQWMsRUFBRSxhQUFhLENBQUM7UUFDbEMsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxJQUFJLE1BQUEsTUFBQSxNQUFBLElBQUksQ0FBQyxrQkFBa0IsQ0FDbEQsYUFBYSxDQUNoQiwwQ0FBRSxTQUFTLDBDQUFFLE9BQU8sRUFBRSxtQ0FBSSxFQUFFLEVBQUU7WUFDM0IsSUFBSSxXQUFXLENBQUMsVUFBVSxHQUFHLFVBQVUsRUFBRTtnQkFDckMsY0FBYyxHQUFHLFdBQVcsQ0FBQzthQUNoQztZQUNELElBQUksV0FBVyxDQUFDLFVBQVUsR0FBRyxVQUFVLEVBQUU7Z0JBQ3JDLGFBQWEsR0FBRyxXQUFXLENBQUM7Z0JBQzVCLE9BQU87b0JBQ0gsTUFBTSxFQUFFLGNBQWM7b0JBQ3RCLEtBQUssRUFBRSxhQUFhO2lCQUN2QixDQUFDO2FBQ0w7U0FDSjtRQUNELE9BQU87WUFDSCxNQUFNLEVBQUUsY0FBYztZQUN0QixLQUFLLEVBQUUsYUFBYTtTQUN2QixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsa0JBQWtCLENBQUMsSUFBWTtRQUMzQixLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUN4RCxJQUFJLFlBQVksQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFFO2dCQUM1QixPQUFPLFlBQVksQ0FBQzthQUN2QjtTQUNKO1FBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQ0FBcUMsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNsRSxDQUFDO0NBQ0oifQ==