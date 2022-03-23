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
var SColor_exports = {};
__export(SColor_exports, {
  default: () => SColor_default
});
module.exports = __toCommonJS(SColor_exports);
var import_s_class = __toESM(require("@coffeekraken/s-class"), 1);
var import_convert = __toESM(require("@coffeekraken/sugar/shared/color/convert"), 1);
var import_hsla2rgba = __toESM(require("@coffeekraken/sugar/shared/color/hsla2rgba"), 1);
var import_rgba2hex = __toESM(require("@coffeekraken/sugar/shared/color/rgba2hex"), 1);
var import_rgba2hsla = __toESM(require("@coffeekraken/sugar/shared/color/rgba2hsla"), 1);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
var import_SColorApplyParamsInterface = __toESM(require("./interface/SColorApplyParamsInterface"), 1);
var import_SColorSettingsInterface = __toESM(require("./interface/SColorSettingsInterface"), 1);
const _SColor = class extends import_s_class.default {
  constructor(color, settings) {
    super((0, import_deepMerge.default)({
      color: import_SColorSettingsInterface.default.defaults()
    }, settings != null ? settings : {}));
    this._originalSColor = null;
    this._r = null;
    this._g = null;
    this._b = null;
    this._a = 1;
    color = this.getColor(color);
    this._originalSColor = color;
    this._parse(color);
  }
  get colorSettings() {
    return this._settings.color;
  }
  getColor(color) {
    if (typeof color == "string" && _SColor.colors[color.toLowerCase()]) {
      return _SColor.colors[color.toLowerCase()];
    }
    return color;
  }
  _parse(color) {
    color = (0, import_convert.default)(color, "rgba");
    this.r = color.r;
    this.g = color.g;
    this.b = color.b;
    this.a = color.a;
    return color;
  }
  _convert2(format) {
    switch (format) {
      case "rgba":
      case "rgb":
        return {
          r: this.r,
          g: this.g,
          b: this.b,
          a: this.a
        };
        break;
      case "hsla":
      case "hsl":
        return (0, import_rgba2hsla.default)(this.r, this.g, this.b, this.a);
        break;
      case "hex":
        return (0, import_rgba2hex.default)(this.r, this.g, this.b, this.a);
        break;
    }
  }
  toHex() {
    return this._convert2("hex");
  }
  toHsl() {
    return this._convert2("hsl");
  }
  toHsla() {
    return this._convert2("hsla");
  }
  toRgb() {
    return this._convert2("rgb");
  }
  toRgba() {
    return this._convert2("rgba");
  }
  get r() {
    return this._r;
  }
  set r(value) {
    value = parseInt(value);
    value = value > 255 ? 255 : value < 0 ? 0 : value;
    this._r = value;
  }
  get g() {
    return this._g;
  }
  set g(value) {
    value = parseInt(value);
    value = value > 255 ? 255 : value < 0 ? 0 : value;
    this._g = value;
  }
  get b() {
    return this._b;
  }
  set b(value) {
    value = parseInt(value);
    value = value > 255 ? 255 : value < 0 ? 0 : value;
    this._b = value;
  }
  get a() {
    return this._a;
  }
  set a(value) {
    value = parseFloat(value);
    value = value > 1 ? 1 : value < 0 ? 0 : value;
    this._a = value;
  }
  get l() {
    return this._convert2("hsl").l;
  }
  set l(value) {
    const hsl = this._convert2("hsl");
    value = parseInt(value);
    value = value > 100 ? 100 : value < 0 ? 0 : value;
    hsl.l = value;
    const rgba = (0, import_hsla2rgba.default)(hsl.h, hsl.s, hsl.l);
    this.r = rgba.r;
    this.g = rgba.g;
    this.b = rgba.b;
  }
  get s() {
    return this._convert2("hsl").s;
  }
  set s(value) {
    const hsl = this._convert2("hsl");
    value = parseInt(value);
    value = value > 100 ? 100 : value < 0 ? 0 : value;
    hsl.s = value;
    const rgba = (0, import_hsla2rgba.default)(hsl.h, hsl.s, hsl.l);
    this.r = rgba.r;
    this.g = rgba.g;
    this.b = rgba.b;
  }
  get h() {
    return this._convert2("hsl").h;
  }
  set h(value) {
    const hsl = this._convert2("hsl");
    value = parseInt(value);
    value = value > 360 ? 360 : value < 0 ? 0 : value;
    hsl.h = value;
    const rgba = (0, import_hsla2rgba.default)(hsl.h, hsl.s, hsl.l);
    this.r = rgba.r;
    this.g = rgba.g;
    this.b = rgba.b;
  }
  reset() {
    this._parse(this._originalSColor);
  }
  apply(params, returnNewInstance = this.colorSettings.returnNewInstance) {
    const intRes = import_SColorApplyParamsInterface.default.apply(params);
    params = intRes;
    let colorInstance = this;
    if (returnNewInstance) {
      colorInstance = new _SColor(this.toHex());
    }
    Object.keys(params).forEach((action) => {
      const value = params[action];
      if (!value)
        return;
      if (!colorInstance[action] || typeof colorInstance[action] !== "function")
        return;
      if (action === "invert") {
        colorInstance.invert();
      } else {
        colorInstance[action](value);
      }
    });
    return colorInstance;
  }
  desaturate(amount, returnNewInstance = this.colorSettings.returnNewInstance) {
    amount = parseInt(amount);
    if (returnNewInstance) {
      const n = new _SColor(this.toHex());
      n.s -= amount;
      return n;
    }
    this.s -= amount;
    return this;
  }
  saturate(amount, returnNewInstance = this.colorSettings.returnNewInstance) {
    amount = parseInt(amount);
    if (returnNewInstance) {
      const n = new _SColor(this.toHex());
      n.s += amount;
      return n;
    }
    this.s += amount;
    return this;
  }
  grayscale(returnNewInstance = this.colorSettings.returnNewInstance) {
    if (returnNewInstance) {
      const n = new _SColor(this.toHex());
      n.s = 0;
      return n;
    }
    this.s = 0;
    return this;
  }
  spin(amount, returnNewInstance = this.colorSettings.returnNewInstance) {
    amount = parseInt(amount);
    const hue = this.h;
    let newHue = hue + amount;
    if (newHue > 360) {
      newHue -= 360;
    }
    if (returnNewInstance) {
      const n = new _SColor(this.toHex());
      n.h = newHue;
      return n;
    }
    this.h = newHue;
    return this;
  }
  alpha(alpha, returnNewInstance = this.colorSettings.returnNewInstance) {
    alpha = parseFloat(alpha);
    if (returnNewInstance) {
      const n = new _SColor(this.toHex());
      n.a = alpha;
      return n;
    }
    this.a = alpha;
    return this;
  }
  darken(amount, returnNewInstance = this.colorSettings.returnNewInstance) {
    amount = parseInt(amount);
    if (returnNewInstance) {
      const n = new _SColor(this.toHex());
      n.l -= amount;
      return n;
    }
    this.l -= amount;
    if (this.l < 0)
      this.l = 0;
    else if (this.l > 100)
      this.l = 100;
    return this;
  }
  lighten(amount, returnNewInstance = this.colorSettings.returnNewInstance) {
    amount = parseInt(amount);
    if (returnNewInstance) {
      const n = new _SColor(this.toHex());
      n.l += amount;
      return n;
    }
    this.l += amount;
    if (this.l < 0)
      this.l = 0;
    else if (this.l > 100)
      this.l = 100;
    return this;
  }
  invert(returnNewInstance = this.colorSettings.returnNewInstance) {
    let lightness = this.l;
    if (this.l >= 50) {
      lightness -= 50;
    } else {
      lightness += 50;
    }
    if (returnNewInstance) {
      const n = new _SColor(this.toHex());
      n.l = lightness;
      return n;
    } else {
      this.l = lightness;
    }
    if (this.l < 0)
      this.l = 0;
    else if (this.l > 100)
      this.l = 100;
    return this;
  }
  toHexString() {
    return this._convert2("hex");
  }
  toRgbString() {
    return `rgb(${this._r},${this._g},${this._b})`;
  }
  toRgbaString() {
    return `rgba(${this._r},${this._g},${this._b},${this._a})`;
  }
  toHslString() {
    const hsl = this._convert2("hsl");
    return `hsl(${hsl.h},${hsl.s},${hsl.l})`;
  }
  toHslaString() {
    const hsla = this._convert2("hsla");
    return `hsla(${hsla.h},${hsla.s},${hsla.l},${hsla.a})`;
  }
  toString(format = this.colorSettings.defaultFormat) {
    switch (format) {
      case "hex":
        return this.toHexString();
        break;
      case "hsl":
        return this.toHslString();
        break;
      case "hsla":
        return this.toHslaString();
        break;
      case "rgb":
        return this.toRgbString();
        break;
      case "rgba":
      default:
        return this.toRgbaString();
        break;
    }
  }
};
let SColor = _SColor;
SColor.colors = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  gold: "#ffd700",
  goldenrod: "#daa520",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  "indianred ": "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavender: "#e6e6fa",
  lavenderblush: "#fff0f5",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgrey: "#d3d3d3",
  lightgreen: "#90ee90",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370d8",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#d87093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};
var SColor_default = SColor;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
