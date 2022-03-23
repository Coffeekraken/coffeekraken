var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var SSugarElement_exports = {};
__export(SSugarElement_exports, {
  default: () => SSugarElement
});
module.exports = __toCommonJS(SSugarElement_exports);
var __rematrix = __toESM(require("rematrix"), 1);
class SSugarElement {
  get matrix() {
    var _a;
    return (_a = this._tmpMatrix) != null ? _a : __rematrix.fromString(this.matrixStr);
  }
  get matrixStr() {
    return window.getComputedStyle(this.$elm).transform;
  }
  constructor($elm) {
    this.$elm = $elm;
  }
  applyMatrix(...matrix) {
    var _a;
    let newMatrix = (_a = this._tmpMatrix) != null ? _a : this.matrix;
    matrix.forEach((m) => {
      newMatrix = __rematrix.multiply(newMatrix, m);
    });
    this._tmpMatrix = newMatrix;
    setTimeout(() => {
      this.$elm.style.transform = __rematrix.toString(newMatrix);
      this._tmpMatrix = null;
    });
    return this;
  }
  overrideMatrix(matrix) {
    this._tmpMatrix = matrix;
    setTimeout(() => {
      this.$elm.style.transform = __rematrix.toString(matrix);
      this._tmpMatrix = null;
    });
    return this;
  }
  getTranslates() {
    return {
      x: isNaN(this.matrix[12]) ? 0 : this.matrix[12],
      y: isNaN(this.matrix[13]) ? 0 : this.matrix[13],
      z: isNaN(this.matrix[14]) ? 0 : this.matrix[14]
    };
  }
  getRotates() {
    const matrix = this.matrix.toString();
    var values = matrix.split(","), pi = Math.PI, sinB = parseFloat(values[8]), b = Math.round(Math.asin(sinB) * 180 / pi), cosB = Math.cos(b * pi / 180), matrixVal10 = parseFloat(values[9]), a = Math.round(Math.asin(-matrixVal10 / cosB) * 180 / pi), matrixVal1 = parseFloat(values[0]), c = Math.round(Math.acos(matrixVal1 / cosB) * 180 / pi);
    return {
      x: a,
      y: b,
      z: c
    };
  }
  setTranslate(x, y, z) {
    const newMatrix = this.matrix;
    if (x !== void 0)
      newMatrix[12] = x;
    if (y !== void 0)
      newMatrix[13] = y;
    if (z !== void 0)
      newMatrix[14] = z;
    return this.overrideMatrix(newMatrix);
  }
  translate(x, y, z) {
    const translateMatrix = __rematrix.translate3d(x != null ? x : 0, y != null ? y : 0, z != null ? z : 0);
    return this.applyMatrix(translateMatrix);
  }
  rotate(x, y, z) {
    const rotateXMatrix = __rematrix.rotateX(x != null ? x : 0), rotateYMatrix = __rematrix.rotateY(y != null ? y : 0), rotateZMatrix = __rematrix.rotateZ(z != null ? z : 0);
    return this.applyMatrix(rotateXMatrix, rotateYMatrix, rotateZMatrix);
  }
  setRotate(x, y, z) {
    const rotateMatrix = __rematrix.multiply(__rematrix.rotateX(x != null ? x : 0), __rematrix.rotateY(y != null ? y : 0), __rematrix.rotateZ(z != null ? z : 0));
    const newMatrix = this.matrix;
    if (x !== void 0) {
      newMatrix[5] = rotateMatrix[5];
      newMatrix[6] = rotateMatrix[6];
      newMatrix[9] = rotateMatrix[9];
    }
    if (y !== void 0) {
      newMatrix[0] = rotateMatrix[0];
      newMatrix[2] = rotateMatrix[2];
    }
    if (z !== void 0) {
      newMatrix[0] = rotateMatrix[0];
      newMatrix[1] = rotateMatrix[1];
      newMatrix[4] = rotateMatrix[4];
    }
    return this.overrideMatrix(newMatrix);
  }
}
