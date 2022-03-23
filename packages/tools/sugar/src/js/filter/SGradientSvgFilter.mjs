import "../../../../../chunk-PG3ZPS4G.mjs";
import SSvgFilter from "./SSvgFilter";
class SGradientSvgFilter extends SSvgFilter {
  constructor() {
    super(`
			<feImage xlink:href="" x="0" y="0" result="IMAGEFILL" preserveAspectRatio="none" />
			<feComposite operator="in" in="IMAGEFILL" in2="SourceAlpha" />
		`);
    this._image = this.filter.querySelector("feImage");
    this._tile = this.filter.querySelector("feTile");
  }
  linear(colors, settings = {}) {
    const width = settings.width || 512, height = settings.height || 512, x0 = settings.x0 || 0, x1 = settings.x1 || width, y0 = settings.y0 || 0, y1 = settings.y1 || 0;
    const can = document.createElement("canvas");
    can.setAttribute("width", width);
    can.setAttribute("height", height);
    const ctx = can.getContext("2d"), grad = ctx.createLinearGradient(x0, y0, x1, y1);
    let i = 0;
    colors.forEach((color) => {
      grad.addColorStop(1 / (colors.length - 1) * i, color);
      i++;
    });
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
    this.grad64 = can.toDataURL();
    this._image.setAttribute("xlink:href", this.grad64);
  }
  radial(colors, settings = {}) {
    const width = settings.width || 512, height = settings.height || 512, x0 = settings.x0 || width / 2, x1 = settings.x1 || width / 2, r0 = settings.r0 || 0, y0 = settings.y0 || height / 2, y1 = settings.y1 || height / 2, r1 = settings.r1 || width;
    const can = document.createElement("canvas");
    can.setAttribute("width", width);
    can.setAttribute("height", height);
    const ctx = can.getContext("2d"), grad = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
    let i = 0;
    colors.forEach((color) => {
      grad.addColorStop(1 / (colors.length - 1) * i, color);
      i++;
    });
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
    this.grad64 = can.toDataURL();
    this._image.setAttribute("xlink:href", this.grad64);
  }
  applyTo(elm) {
    super.applyTo(elm);
    this._setImageSize();
    window.addEventListener("resize", this._onWindowResize.bind(this));
  }
  unapplyFrom(elm) {
    super.unapplyFrom(elm);
    window.removeEventListener("resize", this._onWindowResize);
  }
  _onWindowResize(e) {
    this._setImageSize();
  }
  _setImageSize() {
    const width = this.elms[0].offsetWidth, height = this.elms[0].offsetHeight;
    if (width >= height) {
      this._image.setAttribute("width", width);
      this._image.removeAttribute("height");
    } else {
      this._image.setAttribute("height", height);
      this._image.removeAttribute("width");
    }
  }
}
var SGradientSvgFilter_default = SGradientSvgFilter;
export {
  SGradientSvgFilter_default as default
};
