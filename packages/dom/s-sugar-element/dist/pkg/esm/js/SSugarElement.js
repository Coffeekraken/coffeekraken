import * as __rematrix from 'rematrix';
export default class SSugarElement {
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
    constructor($elm) {
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
    simulateTransform(transform) {
        var _a, _b, _c, _d, _e, _f;
        const translateMatrix = __rematrix.translate3d((_a = transform.translateX) !== null && _a !== void 0 ? _a : 0, (_b = transform.translateY) !== null && _b !== void 0 ? _b : 0, (_c = transform.translateZ) !== null && _c !== void 0 ? _c : 0), rotateXMatrix = __rematrix.rotateX((_d = transform.rotateX) !== null && _d !== void 0 ? _d : 0), rotateYMatrix = __rematrix.rotateY((_e = transform.rotateY) !== null && _e !== void 0 ? _e : 0), rotateZMatrix = __rematrix.rotateZ((_f = transform.rotateZ) !== null && _f !== void 0 ? _f : 0);
        let newMatrix = this.matrix;
        // @ts-ignore
        newMatrix = [newMatrix, translateMatrix, rotateXMatrix, rotateYMatrix, rotateZMatrix].reduce(__rematrix.multiply);
        const newTranslates = this.getTranslates(newMatrix), newRotates = this.getRotates(newMatrix);
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
    applyMatrix(...matrix) {
        var _a;
        let newMatrix = (_a = this._tmpMatrix) !== null && _a !== void 0 ? _a : this.matrix;
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
    overrideMatrix(matrix) {
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
    getTranslates(fromMatrix = this.matrix) {
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
    getRotates(fromMatrix = this.matrix) {
        const matrix = fromMatrix.toString();
        var values = matrix.split(','), pi = Math.PI, sinB = parseFloat(values[8]), b = Math.round((Math.asin(sinB) * 180) / pi), cosB = Math.cos((b * pi) / 180), matrixVal10 = parseFloat(values[9]), a = Math.round((Math.asin(-matrixVal10 / cosB) * 180) / pi), matrixVal1 = parseFloat(values[0]), c = Math.round((Math.acos(matrixVal1 / cosB) * 180) / pi);
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
    setTranslate(x, y, z) {
        const newMatrix = this.matrix;
        if (x !== undefined)
            newMatrix[12] = x;
        if (y !== undefined)
            newMatrix[13] = y;
        if (z !== undefined)
            newMatrix[14] = z;
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
    translate(x, y, z) {
        const translateMatrix = __rematrix.translate3d(x !== null && x !== void 0 ? x : 0, y !== null && y !== void 0 ? y : 0, z !== null && z !== void 0 ? z : 0);
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
    rotate(x, y, z) {
        const rotateXMatrix = __rematrix.rotateX(x !== null && x !== void 0 ? x : 0), rotateYMatrix = __rematrix.rotateY(y !== null && y !== void 0 ? y : 0), rotateZMatrix = __rematrix.rotateZ(z !== null && z !== void 0 ? z : 0);
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
    setRotate(x, y, z) {
        const rotateMatrix = [__rematrix.rotateX(x !== null && x !== void 0 ? x : 0), __rematrix.rotateX(y !== null && y !== void 0 ? y : 0), __rematrix.rotateX(z !== null && z !== void 0 ? z : 0)].reduce(__rematrix.multiply);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxVQUFVLE1BQU0sVUFBVSxDQUFDO0FBd0R2QyxNQUFNLENBQUMsT0FBTyxPQUFPLGFBQWE7SUFzQjlCLElBQUksTUFBTTs7UUFDTixPQUFPLE1BQUEsSUFBSSxDQUFDLFVBQVUsbUNBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksU0FBUztRQUNULE9BQU8sTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDeEQsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksSUFBaUI7UUFDekIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7O09BZ0JHO0lBQ0gsaUJBQWlCLENBQUMsU0FBMkM7O1FBQ3pELE1BQU0sZUFBZSxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsTUFBQSxTQUFTLENBQUMsVUFBVSxtQ0FBSSxDQUFDLEVBQUUsTUFBQSxTQUFTLENBQUMsVUFBVSxtQ0FBSSxDQUFDLEVBQUUsTUFBQSxTQUFTLENBQUMsVUFBVSxtQ0FBSSxDQUFDLENBQUMsRUFDM0gsYUFBYSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBQSxTQUFTLENBQUMsT0FBTyxtQ0FBSSxDQUFDLENBQUMsRUFDMUQsYUFBYSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBQSxTQUFTLENBQUMsT0FBTyxtQ0FBSSxDQUFDLENBQUMsRUFDMUQsYUFBYSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBQSxTQUFTLENBQUMsT0FBTyxtQ0FBSSxDQUFDLENBQUMsQ0FBQztRQUMvRCxJQUFJLFNBQVMs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