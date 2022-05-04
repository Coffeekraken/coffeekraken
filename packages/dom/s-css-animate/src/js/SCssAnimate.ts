import * as __rematrix from 'rematrix';
import __getTranslateProperties from '@coffeekraken/sugar/js/dom/style/getTranslateProperties';
import __getAnimationsFromElement, {
    IGetAnimationsFromElementResult,
} from '@coffeekraken/sugar/js/dom/style/getAnimationsFromElement';
import __getKeyframesFromStylesheets from '@coffeekraken/sugar/js/dom/style/getKeyframesFromStylesheets';
import __parseTransformRule from '@coffeekraken/sugar/js/dom/style/parseTransformRule';

/**
 * @name            SCssAnimate
 * @namespace       js
 * @type            Class
 * @interface       ./interface/SSugarElementInterface.js
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
 * const $elm = new __SSugarElement(document.querySelector('#my-element'));
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

export default class SSugarElement {
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
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor($elm: HTMLElement) {
        this.$elm = $elm;

        // get all the animations applied to the element
        this._animations = __getAnimationsFromElement(this.$elm);

        this._animations.forEach((animationObj) => {
            animationObj.keyframes = __getKeyframesFromStylesheets(
                animationObj.name,
                document.styleSheets,
            );
        });
        console.log('FD', this._animations);

        console.log(
            __parseTransformRule(
                'translate(-10px, 20px) scale(1.3) rotateZ(45deg)',
            ),
        );
    }

    /**
     * @name            applyMatrix
     * @type        Function
     *
     * Apply a matrix to the current element
     *
     * @param       {Array[]}           matrix           The matrix to apply
     * @return          {SSugarElement}                     The sugar element instance
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    applyMatrix(...matrix: Array<number>[]): SSugarElement {
        let newMatrix: number[] = this._tmpMatrix ?? this.matrix;
        matrix.forEach((m) => {
            // @ts-ignore
            newMatrix = __rematrix.multiply(newMatrix, m);
        });
        this._tmpMatrix = newMatrix;
        // apply the new matrix to the element
        setTimeout(() => {
            // @ts-ignore
            this.$elm.style.transform = __rematrix.toString(newMatrix);
            this._tmpMatrix = null;
        });
        return this;
    }

    /**
     * @name            overrideMatrix
     * @type        Function
     *
     * Apply a matrix to the current element
     *
     * @param       {Array[]}           matrix           The matrix to apply
     * @return          {SSugarElement}                     The sugar element instance
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    overrideMatrix(matrix: Array<number>): SSugarElement {
        this._tmpMatrix = matrix;
        // apply the new matrix to the element
        setTimeout(() => {
            // @ts-ignore
            this.$elm.style.transform = __rematrix.toString(matrix);
            this._tmpMatrix = null;
        });
        return this;
    }
}
