// @ts-nocheck
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
    class SLocalStorageFonts {
        /**
         * @constructor
         * @param 		{Object} 	settings 	The settings
         */
        constructor(settings = {}) {
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
            this._settings = Object.assign(Object.assign({}, this._settings), settings);
            // init
            this._init();
        }
        /**
         * Init
         */
        _init() {
            // check cachebuster
            let cb = this._settings.json_path.split('#');
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
                window.addEventListener('load', (e) => {
                    let request = new XMLHttpRequest(), response = undefined;
                    request.open('GET', this._settings.json_path, true);
                    request.onload = () => {
                        if (request.status == 200) {
                            try {
                                response = JSON.parse(request.responseText);
                                let fontface = '';
                                response.fonts.forEach((font) => {
                                    fontface += '@font-face{';
                                    for (let prop in font) {
                                        let value = font[prop];
                                        if (prop == 'font-family') {
                                            value = '"' + value + '"';
                                        }
                                        fontface += prop + ':' + value + ';';
                                    }
                                    fontface += '}';
                                });
                                // insert fonts
                                this._insertFonts(fontface);
                                // save fonts in localstorage
                                window.localStorage.setItem('sugar-fonts', JSON.stringify({
                                    version: this._settings.version,
                                    value: fontface
                                }));
                            }
                            catch (e) { }
                        }
                    };
                    request.send();
                });
            }
        }
        /**
         * Insert font
         */
        _insertFonts(value) {
            this._debug('inserting fonts');
            let style = document.createElement('style');
            style.innerHTML = value;
            document.head.appendChild(style);
        }
        /**
         * Debug
         */
        _debug() {
            if (this._settings.debug) {
                console.log('SUGAR-LOCALSTORAGEFONTS', arguments);
            }
        }
    }
    // export modules
    exports.default = SLocalStorageFonts;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xvY2FsU3RvcmFnZUZvbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0xvY2FsU3RvcmFnZUZvbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7OztJQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bc0JHO0lBQ0gsTUFBTSxrQkFBa0I7UUFnQ3RCOzs7V0FHRztRQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7WUFuQ3pCOzs7ZUFHRztZQUNILGNBQVMsR0FBRztnQkFDVjs7Ozs7O21CQU1HO2dCQUNILE9BQU8sRUFBRSxHQUFHO2dCQUVaOzs7OzttQkFLRztnQkFDSCxTQUFTLEVBQUUsbUJBQW1CO2dCQUU5Qjs7Ozs7bUJBS0c7Z0JBQ0gsS0FBSyxFQUFFLEtBQUs7YUFDYixDQUFDO1lBT0EsSUFBSSxDQUFDLFNBQVMsbUNBQ1QsSUFBSSxDQUFDLFNBQVMsR0FDZCxRQUFRLENBQ1osQ0FBQztZQUNGLE9BQU87WUFDUCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZixDQUFDO1FBRUQ7O1dBRUc7UUFDSCxLQUFLO1lBQ0gsb0JBQW9CO1lBQ3BCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3QyxJQUFJLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO2dCQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNsQztZQUVELElBQUk7Z0JBQ0YsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDekQsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUNmLElBQUksQ0FB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