// @ts-nocheck
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
export default SLocalStorageFonts;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xvY2FsU3RvcmFnZUZvbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0xvY2FsU3RvcmFnZUZvbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILE1BQU0sa0JBQWtCO0lBZ0N0Qjs7O09BR0c7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBbkN6Qjs7O1dBR0c7UUFDSCxjQUFTLEdBQUc7WUFDVjs7Ozs7O2VBTUc7WUFDSCxPQUFPLEVBQUUsR0FBRztZQUVaOzs7OztlQUtHO1lBQ0gsU0FBUyxFQUFFLG1CQUFtQjtZQUU5Qjs7Ozs7ZUFLRztZQUNILEtBQUssRUFBRSxLQUFLO1NBQ2IsQ0FBQztRQU9BLElBQUksQ0FBQyxTQUFTLG1DQUNULElBQUksQ0FBQyxTQUFTLEdBQ2QsUUFBUSxDQUNaLENBQUM7UUFDRixPQUFPO1FBQ1AsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSztRQUNILG9CQUFvQjtRQUNwQixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0MsSUFBSSxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2xDO1FBRUQsSUFBSTtZQUNGLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDekQsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtB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