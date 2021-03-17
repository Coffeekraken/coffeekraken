// @ts-nocheck
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @name 		SLocalStorageFonts
     * @namespace           sugar.js.class
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
    var SLocalStorageFonts = /** @class */ (function () {
        /**
         * @constructor
         * @param 		{Object} 	settings 	The settings
         */
        function SLocalStorageFonts(settings) {
            if (settings === void 0) { settings = {}; }
            /**
             * Settings
             * @type 	{Object}
             */
            this._settings = {
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
                json_path: '/fonts/fonts.json',
                /**
                 * Set if want the debug messages in the console
                 * @setting
                 * @type 		{Boolean}
                 * @default 	false
                 */
                debug: false
            };
            this._settings = __assign(__assign({}, this._settings), settings);
            // init
            this._init();
        }
        /**
         * Init
         */
        SLocalStorageFonts.prototype._init = function () {
            var _this = this;
            // check cachebuster
            var cb = this._settings.json_path.split('#');
            if (cb.length == 2) {
                this._settings.version = cb[1];
                this._settings.json_path = cb[0];
            }
            try {
                this._cache = window.localStorage.getItem('sugar-fonts');
                if (this._cache) {
                    this._cache = JSON.parse(this._cache);
                    if (this._cache.version == this._settings.version) {
                        this._debug('No new version of you fonts');
                        this._insertFonts(this._cache.value);
                    }
                    else {
                        this._debug('New version of your fonts');
                        // busting the cache
                        window.localStorage.removeItem('sugar-fonts');
                        this._cache = null;
                    }
                }
            }
            catch (e) {
                // localstorage not available
                this._debug('Your browser seems to not support the localStorage api');
            }
            // if no cache, load the fonts file
            if (!this._cache) {
                window.addEventListener('load', function (e) {
                    var request = new XMLHttpRequest(), response = undefined;
                    request.open('GET', _this._settings.json_path, true);
                    request.onload = function () {
                        if (request.status == 200) {
                            try {
                                response = JSON.parse(request.responseText);
                                var fontface_1 = '';
                                response.fonts.forEach(function (font) {
                                    fontface_1 += '@font-face{';
                                    for (var prop in font) {
                                        var value = font[prop];
                                        if (prop == 'font-family') {
                                            value = '"' + value + '"';
                                        }
                                        fontface_1 += prop + ':' + value + ';';
                                    }
                                    fontface_1 += '}';
                                });
                                // insert fonts
                                _this._insertFonts(fontface_1);
                                // save fonts in localstorage
                                window.localStorage.setItem('sugar-fonts', JSON.stringify({
                                    version: _this._settings.version,
                                    value: fontface_1
                                }));
                            }
                            catch (e) { }
                        }
                    };
                    request.send();
                });
            }
        };
        /**
         * Insert font
         */
        SLocalStorageFonts.prototype._insertFonts = function (value) {
            this._debug('inserting fonts');
            var style = document.createElement('style');
            style.innerHTML = value;
            document.head.appendChild(style);
        };
        /**
         * Debug
         */
        SLocalStorageFonts.prototype._debug = function () {
            if (this._settings.debug) {
                console.log('SUGAR-LOCALSTORAGEFONTS', arguments);
            }
        };
        return SLocalStorageFonts;
    }());
    // export modules
    exports.default = SLocalStorageFonts;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xvY2FsU3RvcmFnZUZvbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vaHRtbC9fX3dpcF9fLndpcC9TTG9jYWxTdG9yYWdlRm9udHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXNCRztJQUNIO1FBZ0NFOzs7V0FHRztRQUNILDRCQUFZLFFBQWE7WUFBYix5QkFBQSxFQUFBLGFBQWE7WUFuQ3pCOzs7ZUFHRztZQUNILGNBQVMsR0FBRztnQkFDVjs7Ozs7O21CQU1HO2dCQUNILE9BQU8sRUFBRSxHQUFHO2dCQUVaOzs7OzttQkFLRztnQkFDSCxTQUFTLEVBQUUsbUJBQW1CO2dCQUU5Qjs7Ozs7bUJBS0c7Z0JBQ0gsS0FBSyxFQUFFLEtBQUs7YUFDYixDQUFDO1lBT0EsSUFBSSxDQUFDLFNBQVMseUJBQ1QsSUFBSSxDQUFDLFNBQVMsR0FDZCxRQUFRLENBQ1osQ0FBQztZQUNGLE9BQU87WUFDUCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZixDQUFDO1FBRUQ7O1dBRUc7UUFDSCxrQ0FBSyxHQUFMO1lBQUEsaUJBaUVDO1lBaEVDLG9CQUFvQjtZQUNwQixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0MsSUFBSSxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDbEM7WUFFRCxJQUFJO2dCQUNGLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFB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