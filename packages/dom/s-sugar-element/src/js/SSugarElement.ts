import * as __rematrix from 'rematrix';

export interface ISActivateFeatureProps {}

/**
 * @name            SActivateFeature
 * @namespace       js
 * @type            Class
 * @interface       ./interface/SSugarElementInterface.ts
 * @platform        js
 * @status          wip
 *
 * This class allows you to wrap any HTMLElement and enhance it with some sugar methods like `translate`, `translateX`, `rotateY`, etc...
 *
 * @feature             Apply transformations with ease
 *
 * @support          chromium
 * @support          firefox
 * @support          safari
 * @support          edge
 *
 * @example         js
 * import __SSugarElement from '@coffeekraken/s-sugar-element';
 * const $elm = new __SSugarElement(document.querySelector('#my-element'));
 * $elm.translate(100, 0, 0);
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
    matrix?: string;
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
    }

    /**
     * @name       simulateTransform
     * @type      Function
     *
     * Allows you to get back a new matrix by adding the properties passed
     * to the current element matrix. This mean that if the element is currently
     * in translateX 50 and you pass to the translateX argument 10, it will be 60 at the end.
     * To override the 
     *
     * @param       {Number}        [x=null]            The x translation in px
     * @param       {Number}        [y=null]            The y translation in px
     * @param      {Number}        [z=null]            The z translation in px
     * @return     {SSugarElement}                     The sugar element instance
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    simulateTransform(transform: Partial<ISugarElementTransforms>): ISugarElementTransforms {
        const translateMatrix = __rematrix.translate3d(transform.translateX ?? 0, transform.translateY ?? 0, transform.translateZ ?? 0),
            rotateXMatrix = __rematrix.rotateX(transform.rotateX ?? 0),
            rotateYMatrix = __rematrix.rotateY(transform.rotateY ?? 0),
            rotateZMatrix = __rematrix.rotateZ(transform.rotateZ ?? 0);
        let newMatrix: number[] = this.matrix;
         // @ts-ignore
         newMatrix = [newMatrix, translateMatrix, rotateXMatrix, rotateYMatrix, rotateZMatrix].reduce(__rematrix.multiply);

         const newTranslates = this.getTranslates(newMatrix),
            newRotates = this.getRotates(newMatrix);

         return {
            translateX: newTranslates.x,
            translateY: newTranslates.y,
            translateZ: newTranslates.z,
            rotateX: newRotates.x,
            rotateY: newRotates.y,
            rotateZ: newRotates.z,
            matrix: __rematrix.toString(newMatrix)
         };
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

    /**
     * @name        getTranslates
     * @type       Function
     *
     * This method allows you to get the current translation of the element at a this specific time
     *
     * @return      {ISSugarElementTranslates}          The translates object
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getTranslates(fromMatrix: number[] = this.matrix): ISugarElementTranslates {
        return {
            x: isNaN(fromMatrix[12]) ? 0 : fromMatrix[12],
            y: isNaN(fromMatrix[13]) ? 0 : fromMatrix[13],
            z: isNaN(fromMatrix[14]) ? 0 : fromMatrix[14],
        };
    }

    /**
     * @name        getRotates
     * @type       Function
     *
     * This method allows you to get the current translation of the element at a this specific time
     *
     * @return      {ISSugarElementTranslates}          The translates object
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getRotates(fromMatrix: number[] = this.matrix): ISugarElementRotates {
        const matrix = fromMatrix.toString();
        var values = matrix.split(','),
            pi = Math.PI,
            sinB = parseFloat(values[8]),
            b = Math.round((Math.asin(sinB) * 180) / pi),
            cosB = Math.cos((b * pi) / 180),
            matrixVal10 = parseFloat(values[9]),
            a = Math.round((Math.asin(-matrixVal10 / cosB) * 180) / pi),
            matrixVal1 = parseFloat(values[0]),
            c = Math.round((Math.acos(matrixVal1 / cosB) * 180) / pi);

        return {
            x: a,
            y: b,
            z: c,
        };
    }

    /**
     * @name       setTranslate
     * @type      Function
     *
     * Allows you to set the translate of an HTMLElement by setting his translates properties.
     * This will override the previous matrix translates. If you want to "add" a translation, use the `translate` method instead;
     *
     * @param       {Number}        [x=null]            The x translation in px
     * @param       {Number}        [y=null]            The y translation in px
     * @param      {Number}        [z=null]            The z translation in px
     * @return     {SSugarElement}                     The sugar element instance
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    setTranslate(x?: number, y?: number, z?: number): SSugarElement {
        const newMatrix = this.matrix;
        if (x !== undefined) newMatrix[12] = x;
        if (y !== undefined) newMatrix[13] = y;
        if (z !== undefined) newMatrix[14] = z;
        return this.overrideMatrix(newMatrix);
    }

    /**
     * @name       translate
     * @type      Function
     *
     * Allows you to translate an HTMLElement by setting his translate properties
     *
     * @param       {Number}        [x=null]            The x translation in px
     * @param       {Number}        [y=null]            The y translation in px
     * @param      {Number}        [z=null]            The z translation in px
     * @return     {SSugarElement}                     The sugar element instance
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    translate(x?: number, y?: number, z?: number): SSugarElement {
        const translateMatrix = __rematrix.translate3d(x ?? 0, y ?? 0, z ?? 0);
        return this.applyMatrix(translateMatrix);
    }

    /**
     * @name       rotate
     * @type      Function
     *
     * Allows you to rotate an HTMLElement by setting his transformation properties
     *
     * @param       {Number}        [x=null]            The x rotation in px
     * @param       {Number}        [y=null]            The y rotation in px
     * @param      {Number}        [z=null]            The z rotation in px
     * @return     {SSugarElement}                     The sugar element instance
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    rotate(x?: number, y?: number, z?: number): SSugarElement {
        const rotateXMatrix = __rematrix.rotateX(x ?? 0),
            rotateYMatrix = __rematrix.rotateY(y ?? 0),
            rotateZMatrix = __rematrix.rotateZ(z ?? 0);
        return this.applyMatrix(rotateXMatrix, rotateYMatrix, rotateZMatrix);
    }

    /**
     * @name       setRotates
     * @type      Function
     *
     * Allows you to set the rotates of any HTMLElement by setting his transformation properties
     *
     * @param       {Number}        [x=null]            The x rotation in px
     * @param       {Number}        [y=null]            The y rotation in px
     * @param      {Number}        [z=null]            The z rotation in px
     * @return     {SSugarElement}                     The sugar element instance
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    setRotate(x?: number, y?: number, z?: number): SSugarElement {

        const rotateMatrix = [__rematrix.rotateX(x ?? 0), __rematrix.rotateX(y ?? 0), __rematrix.rotateX(z ?? 0)].reduce(__rematrix.multiply);

        const newMatrix = this.matrix;
        if (x !== undefined) {
            newMatrix[5] = rotateMatrix[5];
            newMatrix[6] = rotateMatrix[6];
            newMatrix[9] = rotateMatrix[9];
        }
        if (y !== undefined) {
            newMatrix[0] = rotateMatrix[0];
            newMatrix[2] = rotateMatrix[2];
        }
        if (z !== undefined) {
            newMatrix[0] = rotateMatrix[0];
            newMatrix[1] = rotateMatrix[1];
            newMatrix[4] = rotateMatrix[4];
        }
        return this.overrideMatrix(newMatrix);
    }
}
