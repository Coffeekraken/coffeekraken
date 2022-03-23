import "../../../../../chunk-PG3ZPS4G.mjs";
import SSvgFilter from "./SSvgFilter";
class SOutlineSvgFilter extends SSvgFilter {
  constructor(radius = 8) {
    super(`
			<feMorphology operator="dilate" radius="${radius}"
			in="SourceGraphic" result="THICKNESS" />
			<feComposite operator="out" in="THICKNESS" in2="SourceGraphic" ></feComposite>
		`);
    this._$morphology = this.filter.querySelector("feMorphology");
  }
  set radius(value) {
    this._$morphology.setAttribute("radius", value);
  }
  get radius() {
    return parseFloat(this._$morphology.getAttribute("radius"));
  }
}
var SOutlineSvgFilter_default = SOutlineSvgFilter;
export {
  SOutlineSvgFilter_default as default
};
