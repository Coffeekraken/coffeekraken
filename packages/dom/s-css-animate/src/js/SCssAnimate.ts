import * as __rematrix from 'rematrix';
import __getTranslateProperties from '@coffeekraken/sugar/js/dom/style/getTranslateProperties';
import __getAnimationsFromElement, {
    IGetAnimationsFromElementResult,
} from '@coffeekraken/sugar/js/dom/style/getAnimationsFromElement';
import __getKeyframesFromStylesheets, {
    IKeyframe,
} from '@coffeekraken/sugar/js/dom/style/getKeyframesFromStylesheets';
import __parseTransformRule from '@coffeekraken/sugar/js/dom/style/parseTransformRule';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __get from '@coffeekraken/sugar/shared/object/get';
import __set from '@coffeekraken/sugar/shared/object/set';
import __deepMap from '@coffeekraken/sugar/shared/object/deepMap';
import __easeInterval from '@coffeekraken/sugar/shared/function/easeInterval';
import __SClass from '@coffeekraken/s-class';
import __cssEasingStrToJsFunction from '@coffeekraken/sugar/js/dom/style/cssEasingStrToJsFunction';

/**
 * @name            SCssAnimate
 * @namespace       js
 * @type            Class
 * @interface       ./interface/SCssKeyframesControllerInterface.js
 * @platform        js
 * @status          beta
 *
 * This class allows you to get the css animation applied to the passed element and to control
 * it's duration, state, etc...
 * You will also be able to scrub into your animation by passing a time value or a percentage.
 *
 * @support          chromium
 * @support          firefox
 * @support          safari
 * @support          edge
 *
 * @example         js
 * import __SCssAnimate from '@coffeekraken/s-css-animate';
 * const $elm = new __SCssKeyframesController(document.querySelector('#my-element'));
 * const player = new __SCssAnimate($elm);
 * player.play();
 *
 * @example         html
 * <div id="my-element">
 *      Hello world
 * </div>
 *
 * @see         https://www.npmjs.com/package/rematrix?activeTab=readme#Rematrix.translateX
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISugarElementTranslates {
    x: number;
    y: number;
    z: number;
}
export interface ISugarElementRotates {
    x: number;
    y: number;
    z: number;
}
export interface ISugarElementTransforms {
    translateX: number;
    translateY: number;
    translateZ: number;
    rotateX: number;
    rotateY: number;
    rotateZ: number;
}

export interface INearestKeyframes {
    before?: IKeyframe;
    after?: IKeyframe;
    current?: IKeyframe;
}

export interface ISCssKeyframesControllerCtorSettings {
    cssKeyframesController: Partial<ISCssKeyframesControllerSettings>;
}

export interface ISCssKeyframesControllerSettings {
    debug: boolean;
}

export default class SCssKeyframesController extends __SClass {
    /**
     * @name        $elm
     * @type    HTMLElement
     *
     * Store the HTMLElement reference
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    $elm: HTMLElement;

    /**
     * @name        _animations
     * @type        Object[]
     * @private
     *
     * Store all the animations applied on the element
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    private _animations: IGetAnimationsFromElementResult;

    /**
     * @name        matrix
     * @type    Array
     *
     * Access the matrix array of the current element
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _tmpMatrix;
    get matrix(): Array<number> {
        return this._tmpMatrix ?? __rematrix.fromString(this.matrixStr);
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
    get matrixStr(): string {
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
    get cssKeyframesControllerSettings(): ISCssKeyframesControllerSettings {
        return (<any>this)._settings.cssKeyframesController;
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
    constructor(
        $elm: HTMLElement,
        settings: Partial<ISCssKeyframesControllerCtorSettings>,
    ) {
        super(
            __deepMerge(
                {
                    cssKeyframesController: {
                        debug: false,
                    },
                },
                settings ?? {},
            ),
        );

        this.$elm = $elm;

        // get all the animations applied to the element
        this._animations = __getAnimationsFromElement(this.$elm);

        this._animations.forEach((animationObj) => {
            // get keyframes
            animationObj.keyframes = __getKeyframesFromStylesheets(
                animationObj.name,
                document.styleSheets,
            ).map((keyframeObj) => {
                if (keyframeObj.rules?.transform) {
                    keyframeObj.rules.transform = __parseTransformRule(
                        keyframeObj.rules.transform,
                    );
                }
                return keyframeObj;
            });
            // get animated properties
            animationObj.animatedProperties = this._getAnimatedProperties(
                animationObj.name,
            );
        });

        // pause the animation
        this.$elm.style.animation = 'none';

        // if the next element is a range, use it to control the animation
        this.$elm.nextElementSibling?.addEventListener('input', (e) => {
            // @ts-ignore
            this.seekTo(parseFloat(e.target?.value));
        });

        // console.log('FD', this._animations);

        // start at 0
        this.seekTo(0);

        const easingFn = __cssEasingStrToJsFunction(
            'cubic-bezier(.72,-0.01,.42,.99)',
        );

        setInterval(() => {
            __easeInterval(
                2400,
                (p) => {
                    this.seekTo(p);
                },
                {
                    easing: easingFn,
                },
            );
            setTimeout(() => {
                __easeInterval(2400, (p) => {
                    this.seekTo(100 - p);
                });
            }, 2400);
        }, 5000);
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
    seekTo(
        percentage: number,
        animationName = this._animations[0]?.name,
    ): void {
        const animationObj = this.getAnimationByName(animationName);

        const newRules = {};

        for (let [animatedProperty, animatedPropertyObj] of Object.entries(
            animationObj.animatedProperties,
        )) {
            // get the nearest frame(s) with the current animated property
            const nearestKeyframes = this._getNearestKeyframesAtPercentageWithProperty(
                percentage,
                animatedProperty,
                animationName,
            );

            // if (animatedProperty.match(/translateX$/)) {
            //     console.log('-------');
            //     console.log('PERVEN', percentage);
            //     console.log('animated', animatedProperty);
            // }

            // we are on an exact keyframe
            if (nearestKeyframes.current) {
                const value = __get(
                    nearestKeyframes.current.rules,
                    animatedProperty,
                );

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
                const previousValue = parseFloat(
                        __get(nearestKeyframes.before.rules, animatedProperty),
                    ),
                    nextValue = parseFloat(
                        __get(nearestKeyframes.after.rules, animatedProperty),
                    );
                // console.log('r', previousValue, nextValue);

                // make sure we can interpolate the values
                if (isNaN(previousValue) || isNaN(nextValue)) {
                    return;
                }
                const offset = percentage - nearestKeyframes.before.percentage,
                    total =
                        nearestKeyframes.after.percentage -
                        nearestKeyframes.before.percentage,
                    perc = (100 / total) * offset,
                    diff = Math.abs(previousValue - nextValue),
                    negative = previousValue > nextValue;

                let interpolatedValue = nextValue;
                if (diff !== 0) {
                    if (negative) {
                        interpolatedValue = previousValue - (diff / 100) * perc;
                    } else {
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
                    __set(
                        newRules,
                        animatedProperty,
                        // @ts-ignore
                        `${interpolatedValue}${animatedPropertyObj.unit}`,
                    );
                } else {
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
    _getAnimatedProperties(animationName = this._animations[0]?.name) {
        const animationObj = this.getAnimationByName(animationName);
        const rules = __deepMerge(
            ...animationObj.keyframes.map((k) => k.rules),
        );
        const animatedProps = Object.keys(__flatten(rules));

        const animatedPropsObj = {};

        animatedProps.forEach((prop) => {
            const value = __get(rules, prop);

            const floatValue = parseFloat(value);
            if (isNaN(floatValue)) {
                animatedPropsObj[prop] = {
                    unit: null,
                };
            } else {
                animatedPropsObj[prop] = {
                    unit: value.replace?.(floatValue, '') ?? null,
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
    _getNearestKeyframesAtPercentageWithProperty(
        percentage: number,
        property: string,
        animationName = this._animations[0]?.name,
    ): INearestKeyframes {
        // @ts-ignore
        percentage = parseFloat(percentage);
        let beforeKeyframe, afterKeyframe, currentKeyframe;
        for (let [idx, keyframeObj] of this.getAnimationByName(
            animationName,
        )?.keyframes?.entries() ?? []) {
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
    _getNearestKeyframesAtPercentage(
        percentage: number,
        animationName = this._animations[0]?.name,
    ): INearestKeyframes {
        // @ts-ignore
        percentage = parseFloat(percentage);
        let beforeKeyframe, afterKeyframe;
        for (let [idx, keyframeObj] of this.getAnimationByName(
            animationName,
        )?.keyframes?.entries() ?? []) {
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
    getAnimationByName(name: string): IGetAnimationsFromElementResult {
        for (let [idx, animationObj] of this._animations.entries()) {
            if (animationObj.name === name) {
                return animationObj;
            }
        }
        throw new Error(`No animation found with the name "${name}"`);
    }
}
