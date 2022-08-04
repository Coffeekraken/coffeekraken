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
Object.defineProperty(exports, "__esModule", { value: true });
const __rematrix = __importStar(require("rematrix"));
class SSugarElement {
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
exports.default = SSugarElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxREFBdUM7QUF3RHZDLE1BQXFCLGFBQWE7SUF3QzlCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksSUFBaUI7UUFDekIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQTlCRCxJQUFJLE1BQU07O1FBQ04sT0FBTyxNQUFBLElBQUksQ0FBQyxVQUFVLG1DQUFJLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLFNBQVM7UUFDVCxPQUFPLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ3hELENBQUM7SUFnQkQ7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQkc7SUFDSCxpQkFBaUIsQ0FBQyxTQUEyQzs7UUFDekQsTUFBTSxlQUFlLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxNQUFBLFNBQVMsQ0FBQyxVQUFVLG1DQUFJLENBQUMsRUFBRSxNQUFBLFNBQVMsQ0FBQyxVQUFVLG1DQUFJLENBQUMsRUFBRSxNQUFBLFNBQVMsQ0FBQyxVQUFVLG1DQUFJLENBQUMsQ0FBQyxFQUMzSCxhQUFhLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFBLFNBQVMsQ0FBQyxPQUFPLG1DQUFJLENBQUMsQ0FBQyxFQUMxRCxhQUFhLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFBLFNBQVMsQ0FBQyxPQUFPLG1DQUFJLENBQUMsQ0FBQyxFQUMxRCxhQUFhLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFBLFNBQVMsQ0FBQyxPQUFPLG1DQUFJLENBQUMsQ0FBQyxDQUFDO1FBQy9ELElBQUksU0FBUyxHQUFhLElBQUks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