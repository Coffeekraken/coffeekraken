"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name 		SLocalStorageFonts
 * @namespace      sugar.js.class
 * @type    Class
 *
 * This class allows to easily store and load custom fonts from the localStorage
 *
 * @example 	js
 * new SLocalStorageFonts({
 *  	json_path : '/fonts/fonts.json#v1'
 * });
 *
 * // the fonts.json file looks like this
 * {
 * 		"fonts" : [{
 *	  		"font-family" : "Open Sans",
 *	    	"font-weight" : 300,
 *      	"src" : "url(data:application/font-woff;base64,d09GRgA..."
 *      }]
 * }
 *
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
let SLocalStorageFonts = /*#__PURE__*/function () {
  /**
   * Settings
   * @type 	{Object}
   */

  /**
   * @constructor
   * @param 		{Object} 	settings 	The settings
   */
  function SLocalStorageFonts(settings = {}) {
    _classCallCheck(this, SLocalStorageFonts);

    _defineProperty(this, "_settings", {
      /**
       * Store the version of the fonts to load.
       * Used for cache busting
       * @setting
       * @type 		{String}
       * @default 	1.0
       */
      version: 1.0,

      /**
       * Set the json file to load
       * @setting
       * @type 		{String}
       * @default 	/fonts/fonts.json
       */
      json_path: "/fonts/fonts.json",

      /**
       * Set if want the debug messages in the console
       * @setting
       * @type 		{Boolean}
       * @default 	false
       */
      debug: false
    });

    this._settings = { ...this._settings,
      ...settings
    }; // init

    this._init();
  }
  /**
   * Init
   */


  _createClass(SLocalStorageFonts, [{
    key: "_init",
    value: function _init() {
      // check cachebuster
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
            this._debug("New version of your fonts"); // busting the cache


            window.localStorage.removeItem("sugar-fonts");
            this._cache = null;
          }
        }
      } catch (e) {
        // localstorage not available
        this._debug("Your browser seems to not support the localStorage api");
      } // if no cache, load the fonts file


      if (!this._cache) {
        window.addEventListener("load", e => {
          let request = new XMLHttpRequest(),
              response = undefined;
          request.open("GET", this._settings.json_path, true);

          request.onload = () => {
            if (request.status == 200) {
              try {
                response = JSON.parse(request.responseText);
                let fontface = "";
                response.fonts.forEach(font => {
                  fontface += "@font-face{";

                  for (let prop in font) {
                    let value = font[prop];

                    if (prop == "font-family") {
                      value = '"' + value + '"';
                    }

                    fontface += prop + ":" + value + ";";
                  }

                  fontface += "}";
                }); // insert fonts

                this._insertFonts(fontface); // save fonts in localstorage


                window.localStorage.setItem("sugar-fonts", JSON.stringify({
                  version: this._settings.version,
                  value: fontface
                }));
              } catch (e) {}
            }
          };

          request.send();
        });
      }
    }
    /**
     * Insert font
     */

  }, {
    key: "_insertFonts",
    value: function _insertFonts(value) {
      this._debug("inserting fonts");

      let style = document.createElement("style");
      style.innerHTML = value;
      document.head.appendChild(style);
    }
    /**
     * Debug
     */

  }, {
    key: "_debug",
    value: function _debug() {
      if (this._settings.debug) {
        console.log("SUGAR-LOCALSTORAGEFONTS", arguments);
      }
    }
  }]);

  return SLocalStorageFonts;
}(); // export modules


var _default = SLocalStorageFonts;
exports.default = _default;
module.exports = exports.default;