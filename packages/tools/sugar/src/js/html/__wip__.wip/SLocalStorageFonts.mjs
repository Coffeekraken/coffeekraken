import {
  __spreadValues
} from "../../../../../../chunk-PG3ZPS4G.mjs";
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
export {
  SLocalStorageFonts_default as default
};
