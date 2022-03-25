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
var SGooeySvgFilter_exports = {};
__export(SGooeySvgFilter_exports, {
  default: () => SGooeySvgFilter_default
});
module.exports = __toCommonJS(SGooeySvgFilter_exports);
var import_SSvgFilter = __toESM(require("./SSvgFilter"));
class SGooeySvgFilter extends import_SSvgFilter.default {
  constructor(amount = 8) {
    super(`
			<feGaussianBlur in="SourceGraphic" stdDeviation="${amount}" result="blur" />
			<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${parseInt(amount) + 9} -9" result="gooey" />
			<feComposite in="SourceGraphic" in2="gooey" operator="atop"/>
		`);
    this._blur = this.filter.querySelector("feGaussianBlur");
    this._color_matrix = this.filter.querySelector("feColorMatrix");
  }
  set blur(value) {
    this._blur.setAttribute("stdDeviation", value);
  }
  get blur() {
    return parseFloat(this._blur.getAttribute("stdDeviation"));
  }
  set contrast(value) {
    let v = this._color_matrix.getAttribute("values");
    v = v.split(" ");
    v[v.length - 2] = value;
    this._color_matrix.setAttribute("values", v.join(" "));
  }
  set shrink(value) {
    let v = this._color_matrix.getAttribute("values");
    v = v.split(" ");
    v[v.length - 1] = value;
    this._color_matrix.setAttribute("values", v.join(" "));
  }
  set amount(value) {
    this._blur.setAttribute("stdDeviation", value);
    this._color_matrix.setAttribute("values", `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${parseInt(value) + 9} -9`);
  }
}
var SGooeySvgFilter_default = SGooeySvgFilter;
