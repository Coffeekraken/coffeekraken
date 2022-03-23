var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var SLocalStorageFonts_exports = {};
__export(SLocalStorageFonts_exports, {
  default: () => SLocalStorageFonts_default
});
module.exports = __toCommonJS(SLocalStorageFonts_exports);
class SLocalStorageFonts {
  constructor(settings = {}) {
    this._settings = {
      version: 1,
      json_path: "/fonts/fonts.json",
      debug: false
    };
    this._settings = __spreadValues(__spreadValues({}, this._settings), settings);
    this._init();
  }
  _init() {
    let cb = this._settings.json_path.split("#");
    if (cb.length == 2) {
      this._settings.version = cb[1];
      this._settings.json_path = cb[0];
    }
    try {
      this._cache = window.localStorage.getItem("sugar-fonts");
      if (this._cache) {
        this._cache = JSON.parse(this._cache);
        if (this._cache.version == this._settings.version) {
          this._debug("No new version of you fonts");
          this._insertFonts(this._cache.value);
        } else {
          this._debug("New version of your fonts");
          window.localStorage.removeItem("sugar-fonts");
          this._cache = null;
        }
      }
    } catch (e) {
      this._debug("Your browser seems to not support the localStorage api");
    }
    if (!this._cache) {
      window.addEventListener("load", (e) => {
        let request = new XMLHttpRequest(), response = void 0;
        request.open("GET", this._settings.json_path, true);
        request.onload = () => {
          if (request.status == 200) {
            try {
              response = JSON.parse(request.responseText);
              let fontface = "";
              response.fonts.forEach((font) => {
                fontface += "@font-face{";
                for (let prop in font) {
                  let value = font[prop];
                  if (prop == "font-family") {
                    value = '"' + value + '"';
                  }
                  fontface += prop + ":" + value + ";";
                }
                fontface += "}";
              });
              this._insertFonts(fontface);
              window.localStorage.setItem("sugar-fonts", JSON.stringify({
                version: this._settings.version,
                value: fontface
              }));
            } catch (e2) {
            }
          }
        };
        request.send();
      });
    }
  }
  _insertFonts(value) {
    this._debug("inserting fonts");
    let style = document.createElement("style");
    style.innerHTML = value;
    document.head.appendChild(style);
  }
  _debug() {
    if (this._settings.debug) {
      console.log("SUGAR-LOCALSTORAGEFONTS", arguments);
    }
  }
}
var SLocalStorageFonts_default = SLocalStorageFonts;
