import "../../../../../chunk-PG3ZPS4G.mjs";
import uniqid from "../../shared/string/uniqid";
class SSvgFilter {
  constructor(filter_content) {
    this.elms = [];
    this.filter_content = filter_content;
    this.id = "s-svg-filter-" + uniqid();
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
export {
  SSvgFilter as default
};
