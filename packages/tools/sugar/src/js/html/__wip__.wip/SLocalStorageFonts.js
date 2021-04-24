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
     * @namespace            js.class
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xvY2FsU3RvcmFnZUZvbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0xvY2FsU3RvcmFnZUZvbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FzQkc7SUFDSDtRQWdDRTs7O1dBR0c7UUFDSCw0QkFBWSxRQUFhO1lBQWIseUJBQUEsRUFBQSxhQUFhO1lBbkN6Qjs7O2VBR0c7WUFDSCxjQUFTLEdBQUc7Z0JBQ1Y7Ozs7OzttQkFNRztnQkFDSCxPQUFPLEVBQUUsR0FBRztnQkFFWjs7Ozs7bUJBS0c7Z0JBQ0gsU0FBUyxFQUFFLG1CQUFtQjtnQkFFOUI7Ozs7O21CQUtHO2dCQUNILEtBQUssRUFBRSxLQUFLO2FBQ2IsQ0FBQztZQU9BLElBQUksQ0FBQyxTQUFTLHlCQUNULElBQUksQ0FBQyxTQUFTLEdBQ2QsUUFBUSxDQUNaLENBQUM7WUFDRixPQUFPO1lBQ1AsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsQ0FBQztRQUVEOztXQUVHO1FBQ0gsa0NBQUssR0FBTDtZQUFBLGlCQWlFQztZQWhFQyxvQkFBb0I7WUFDcEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzdDLElBQUksRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2xDO1lBRUQsSUFBSTtnQkFDRixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUN6RCxJQUFJLElBQUks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