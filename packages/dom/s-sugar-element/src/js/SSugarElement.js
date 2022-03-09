import * as __rematrix from 'rematrix';
export default class SSugarElement {
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
        matrix.forEach(m => {
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
    getTranslates() {
        return {
            x: this.matrix[12],
            y: this.matrix[13],
            z: this.matrix[14],
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
    getRotates() {
        const matrix = this.matrix.toString();
        var values = matrix.split(','), pi = Math.PI, sinB = parseFloat(values[8]), b = Math.round(Math.asin(sinB) * 180 / pi), cosB = Math.cos(b * pi / 180), matrixVal10 = parseFloat(values[9]), a = Math.round(Math.asin(-matrixVal10 / cosB) * 180 / pi), matrixVal1 = parseFloat(values[0]), c = Math.round(Math.acos(matrixVal1 / cosB) * 180 / pi);
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
     * Allows you to set the translate of an HTMLElement by setting his transformation properties.
     * This will override the previous matrix translates. If you want to "add" a translation, use the `translate` method instead;
     *
     * @param       {Number}        [x=null]            The x translation in px
     * @param       {Number}        [y=null]            The y translation in px
     * @param      {Number}        [z=null]            The z translation in px
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
     * Allows you to translate an HTMLElement by setting his transformation properties
     *
     * @param       {Number}        [x=null]            The x translation in px
     * @param       {Number}        [y=null]            The y translation in px
     * @param      {Number}        [z=null]            The z translation in px
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
     * @param       {Number}        [x=null]            The x rotation in px
     * @param       {Number}        [y=null]            The y rotation in px
     * @param      {Number}        [z=null]            The z rotation in px
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
     * @param       {Number}        [x=null]            The x rotation in px
     * @param       {Number}        [y=null]            The y rotation in px
     * @param      {Number}        [z=null]            The z rotation in px
     * @return     {SSugarElement}                     The sugar element instance
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    setRotate(x, y, z) {
        const rotateMatrix = __rematrix.multiply(__rematrix.rotateX(x !== null && x !== void 0 ? x : 0), __rematrix.rotateY(y !== null && y !== void 0 ? y : 0), __rematrix.rotateZ(z !== null && z !== void 0 ? z : 0));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyRWxlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTdWdhckVsZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLFVBQVUsTUFBTSxVQUFVLENBQUM7QUF5RHZDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sYUFBYTtJQXlDOUI7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxJQUFpQjtRQUN6QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBOUJELElBQUksTUFBTTs7UUFDTixPQUFPLE1BQUEsSUFBSSxDQUFDLFVBQVUsbUNBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksU0FBUztRQUNULE9BQU8sTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDeEQsQ0FBQztJQWdCRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILFdBQVcsQ0FBQyxHQUFHLE1BQXlCOztRQUNwQyxJQUFJLFNBQVMsR0FBYSxNQUFBLElBQUksQ0FBQyxVQUFVLG1DQUFJLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDekQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNmLGFBQWE7WUFDYixTQUFTLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixzQ0FBc0M7UUFDdEMsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNaLGFBQWE7WUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMzRCxJQUFJ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