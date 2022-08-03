"use strict";
// @ts-nocheck
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
        this.settings = {
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
            debug: false,
        };
        this.settings = Object.assign(Object.assign({}, this.settings), settings);
        // init
        this._init();
    }
    /**
     * Init
     */
    _init() {
        // check cachebuster
        let cb = this.settings.json_path.split('#');
        if (cb.length == 2) {
            this.settings.version = cb[1];
            this.settings.json_path = cb[0];
        }
        try {
            this._cache = window.localStorage.getItem('sugar-fonts');
            if (this._cache) {
                this._cache = JSON.parse(this._cache);
                if (this._cache.version == this.settings.version) {
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
                request.open('GET', this.settings.json_path, true);
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
                                version: this.settings.version,
                                value: fontface,
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
        if (this.settings.debug) {
            console.log('SUGAR-LOCALSTORAGEFONTS', arguments);
        }
    }
}
// export modules
exports.default = SLocalStorageFonts;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsTUFBTSxrQkFBa0I7SUFnQ3BCOzs7T0FHRztJQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7UUFuQ3pCOzs7V0FHRztRQUNILGFBQVEsR0FBRztZQUNQOzs7Ozs7ZUFNRztZQUNILE9BQU8sRUFBRSxHQUFHO1lBRVo7Ozs7O2VBS0c7WUFDSCxTQUFTLEVBQUUsbUJBQW1CO1lBRTlCOzs7OztlQUtHO1lBQ0gsS0FBSyxFQUFFLEtBQUs7U0FDZixDQUFDO1FBT0UsSUFBSSxDQUFDLFFBQVEsbUNBQ04sSUFBSSxDQUFDLFFBQVEsR0FDYixRQUFRLENBQ2QsQ0FBQztRQUNGLE9BQU87UUFDUCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSztRQUNELG9CQUFvQjtRQUNwQixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUMsSUFBSSxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25DO1FBRUQsSUFBSTtZQUNBLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDekQsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNiLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFB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