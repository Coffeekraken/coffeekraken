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
var SSvgFilter_exports = {};
__export(SSvgFilter_exports, {
  default: () => SSvgFilter
});
module.exports = __toCommonJS(SSvgFilter_exports);
var import_uniqid = __toESM(require("../../shared/string/uniqid"), 1);
class SSvgFilter {
  constructor(filter_content) {
    this.elms = [];
    this.filter_content = filter_content;
    this.id = "s-svg-filter-" + (0, import_uniqid.default)();
    if (!document.body.querySelector("#s-svg-filters"))
      SSvgFilter._injectFiltersContainer();
    this._insertFilter();
  }
  applyTo(elm) {
    ["-webkit-", "-moz-", "-ms-", "-o-", ""].forEach((vendor) => {
      elm.style[vendor + "filter"] = 'url("#' + this.id + '")';
    });
    this.elms.push(elm);
  }
  unapplyFrom(elm) {
    ["-webkit-", "-moz-", "-ms-", "-o-", ""].forEach((vendor) => {
      elm.style[vendor + "filter"] = null;
      delete elm.style[vendor + "filter"];
    });
    const idx = this.elms.indexOf(elm);
    if (idx)
      this.elms.splice(idx, 1);
  }
  _insertFilter() {
    const svg = `
			<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
				<defs>
				</defs>
			</svg>
		`;
    const div = document.createElement("div");
    div.innerHTML = svg;
    const defs = div.querySelector("defs");
    this.filter_content = '<filter id="' + this.id + '">' + this.filter_content + "</filter>";
    defs.innerHTML = this.filter_content;
    this.filter = defs.querySelector("#" + this.id);
    this.svg = div.querySelector("svg");
    SSvgFilter.filtersContainer.appendChild(this.svg);
  }
  destroy() {
    this.elms.forEach((elm) => {
      this.unapplyFrom(elm);
    });
    this.svg.parentNode.removeChild(this.svg);
  }
  static _injectFiltersContainer() {
    const style = ["position:absolute;", "left:-1000px;", "top:-300px;"];
    if (/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)) {
      style.push("display:none;");
    }
    SSvgFilter.filtersContainer = document.createElement("div");
    SSvgFilter.filtersContainer.id = "s-svg-filters";
    SSvgFilter.filtersContainer.style = style.join(" ");
    document.body.appendChild(SSvgFilter.filtersContainer);
  }
}
