// @ts-nocheck
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
export default SLocalStorageFonts;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILE1BQU0sa0JBQWtCO0lBZ0NwQjs7O09BR0c7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBbkN6Qjs7O1dBR0c7UUFDSCxhQUFRLEdBQUc7WUFDUDs7Ozs7O2VBTUc7WUFDSCxPQUFPLEVBQUUsR0FBRztZQUVaOzs7OztlQUtHO1lBQ0gsU0FBUyxFQUFFLG1CQUFtQjtZQUU5Qjs7Ozs7ZUFLRztZQUNILEtBQUssRUFBRSxLQUFLO1NBQ2YsQ0FBQztRQU9FLElBQUksQ0FBQyxRQUFRLG1DQUNOLElBQUksQ0FBQyxRQUFRLEdBQ2IsUUFBUSxDQUNkLENBQUM7UUFDRixPQUFPO1FBQ1AsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUs7UUFDRCxvQkFBb0I7UUFDcEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVDLElBQUksRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNuQztRQUVELElBQUk7WUFDQSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3pELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDYixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0s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