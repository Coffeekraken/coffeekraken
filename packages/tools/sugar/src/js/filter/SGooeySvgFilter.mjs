import "../../../../../chunk-PG3ZPS4G.mjs";
import SSvgFilter from "./SSvgFilter";
class SGooeySvgFilter extends SSvgFilter {
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
export {
  SGooeySvgFilter_default as default
};
