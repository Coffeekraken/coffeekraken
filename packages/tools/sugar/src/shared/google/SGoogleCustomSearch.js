// @ts-nocheck
// @shared
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../http/SRequest"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const SRequest_1 = __importDefault(require("../http/SRequest"));
    /**
     * @name 		                SGoogleCustomSearch
     * @namespace           sugar.js.google
     * @type                    Class
     * @stable
     *
     * This class let you make with ease search requests to the google custom search service
     * with useful features like:
     * - Simple pagination system
     * - Promise support
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example 	            js
     * // create a google search instance
     * const googleSearch = new SGoogleCustomSearch('myApiKey', 'myCustomSearchContextKey');
     *
     * // make a search...
     * googleSearch.search('hello world').then((response) => {
     * 		// do something with the google response...
     * });
     *
     * // get the nexts results
     * googleSearch.next().then((response) => {
     * 		// do something with the new response...
     * });
     *
     * @see 		https://developers.google.com/custom-search/
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    class SGoogleCustomSearch {
        /**
         * @name                constructor
         * @type                Function
         *
         * Constructor
         *
         * @param 	        {String} 	        apiKey 		          The google api key to reach the services
         * @param 	        {String}        	cx 		            	The google custom search context
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        constructor(apiKey, cx) {
            /**
             * @name              _apiKey
             * @type              String
             * @private
             *
             * Store the api key used to reach the google services
             *
             * @author 		Olivier Bossel<olivier.bossel@gmail.com>
             */
            this._apiKey = null;
            /**
             * @name              _cx
             * @type              String
             * @private
             *
             * Store the context key used to reach the good google search instance
             *
             * @author 		Olivier Bossel<olivier.bossel@gmail.com>
             */
            this._cx = null;
            /**
             * @name              _settings
             * @type              Object
             * @private
             *
             * Store the actual query object to be able to call
             * next page etc...
             *
             * @author 		Olivier Bossel<olivier.bossel@gmail.com>
             */
            this._settings = {
                /**
                 * @name              num
                 * @type              Number
                 * @default           10
                 *
                 * How many results by page wanted
                 * Can be between 1 and 10
                 *
                 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
                 */
                num: 10,
                /**
                 * @name                page
                 * @type                Number
                 * @default             1
                 *
                 * The page to request
                 *
                 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
                 */
                page: 1
            };
            /**
             * @name            _searchUrl
             * @type            String
             * @private
             *
             * Store the google search url
             *
             * @author 		Olivier Bossel<olivier.bossel@gmail.com>
             */
            this._searchUrl = 'https://www.googleapis.com/customsearch/v1';
            /**
             * @name              _page
             * @type              Number
             * @private
             *
             * Store the current page
             *
             * @author 		Olivier Bossel<olivier.bossel@gmail.com>
             */
            this._page = 1;
            /**
             * @name        _keywords
             * @type        String
             * @private
             *
             * The keywords searched
             *
             * @author 		Olivier Bossel<olivier.bossel@gmail.com>
             */
            this._keywords = null;
            // save the props
            this._apiKey = apiKey;
            this._cx = cx;
        }
        /**
         * @name            _generateSearchUrl
         * @type            Function
         * @private
         *
         * Generate and return the correct search url depending on
         * parameters like the current page, etc...
         *
         * @return 	{String} 	The generated url
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        _generateSearchUrl() {
            // construct url
            let queryString = '';
            for (const key in this._settings) {
                queryString += `&${key}=${this._settings[key]}`;
            }
            queryString = queryString.substr(1);
            queryString = `?${queryString}`;
            // process the url
            return this._searchUrl + queryString;
        }
        /**
         * @name              search
         * @type              Function
         * @async
         *
         * Launch a search
         *
         * @param 	      {String} 	          keywords 	            The keywords to search
         * @param       	{Object} 	          settings            	The settings object
         * @return      	{Promise} 		                        		A promise of results
         */
        search(keywords, settings = {}) {
            return __awaiter(this, void 0, void 0, function* () {
                // save the keywords into the instance
                this._keywords = keywords;
                // reset the page count
                this._page = settings.page || 1;
                // construct query object
                const num = settings.num || 10;
                this._settings = Object.assign({ key: this._apiKey, cx: this._cx, q: keywords, num: num, start: (this._page - 1) * num + 1 }, settings);
                // get the url
                const url = this._generateSearchUrl();
                // process to the ajax query
                const ajx = new SRequest_1.default({
                    method: 'GET',
                    url
                });
                // launch the request end send back the promise
                return ajx.send();
            });
        }
        /**
         * @name            next
         * @type            Function
         * @async
         *
         * Load the next page
         *
         * @return 		{Promise} 		The promise of next page results
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        next() {
            return __awaiter(this, void 0, void 0, function* () {
                // update the page count
                return this.search(this._keywords, Object.assign(Object.assign({}, this._settings), { page: this._page + 1 }));
            });
        }
        /**
         * @name            previous
         * @type            Function
         * @async
         *
         * Load the previous page
         *
         * @return 		{Promise} 		The promise of previous page results
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        previous() {
            return __awaiter(this, void 0, void 0, function* () {
                // update the page count
                return this.search(this._keywords, Object.assign(Object.assign({}, this._settings), { page: this._page - (this._page <= 1 ? 0 : 1) }));
            });
        }
    }
    exports.default = SGoogleCustomSearch;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0dvb2dsZUN1c3RvbVNlYXJjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNHb29nbGVDdXN0b21TZWFyY2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVWLGdFQUEwQztJQUUxQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQ0c7SUFDSCxNQUFxQixtQkFBbUI7UUEyRnRDOzs7Ozs7Ozs7O1dBVUc7UUFDSCxZQUFZLE1BQU0sRUFBRSxFQUFFO1lBckd0Qjs7Ozs7Ozs7ZUFRRztZQUNILFlBQU8sR0FBRyxJQUFJLENBQUM7WUFFZjs7Ozs7Ozs7ZUFRRztZQUNILFFBQUcsR0FBRyxJQUFJLENBQUM7WUFFWDs7Ozs7Ozs7O2VBU0c7WUFDSCxjQUFTLEdBQUc7Z0JBQ1Y7Ozs7Ozs7OzttQkFTRztnQkFDSCxHQUFHLEVBQUUsRUFBRTtnQkFFUDs7Ozs7Ozs7bUJBUUc7Z0JBQ0gsSUFBSSxFQUFFLENBQUM7YUFDUixDQUFDO1lBRUY7Ozs7Ozs7O2VBUUc7WUFDSCxlQUFVLEdBQUcsNENBQTRDLENBQUM7WUFFMUQ7Ozs7Ozs7O2VBUUc7WUFDSCxVQUFLLEdBQUcsQ0FBQyxDQUFDO1lBRVY7Ozs7Ozs7O2VBUUc7WUFDSCxjQUFTLEdBQUcsSUFBSSxDQUFDO1lBY2YsaUJBQWlCO1lBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLENBQUM7UUFFRDs7Ozs7Ozs7Ozs7V0FXRztRQUNILGtCQUFrQjtZQUNoQixnQkFBZ0I7WUFDaEIsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDaEMsV0FBVyxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQzthQUNqRDtZQUNELFdBQVcsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLFdBQVcsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1lBRWhDLGtCQUFrQjtZQUNsQixPQUFPLElBQUksQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDO1FBQ3ZDLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0csTUFBTSxDQUFDLFFBQVEsRUFBRSxRQUFRLEdBQUcsRUFBRTs7Z0JBQ2xDLHNDQUFzQztnQkFDdEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7Z0JBRTFCLHVCQUF1QjtnQkFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztnQkFFaEMseUJBQXlCO2dCQUN6QixNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLFNBQVMsbUJBQ1osR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQ2pCLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUNaLENBQUMsRUFBRSxRQUFRLEVBQ1gsR0FBRyxFQUFFLEdBQUcsRUFDUixLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQzlCLFFBQVEsQ0FDWixDQUFDO2dCQUVGLGNBQWM7Z0JBQ2QsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0JBRXRDLDRCQUE0QjtnQkFDNUIsTUFBTSxHQUFHLEdBQUcsSUFBSSxrQkFBVSxDQUFDO29CQUN6QixNQUFNLEVBQUUsS0FBSztvQkFDYixHQUFHO2lCQUNKLENBQUMsQ0FBQztnQkFFSCwrQ0FBK0M7Z0JBQy9DLE9BQU8sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3BCLENBQUM7U0FBQTtRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDRyxJQUFJOztnQkFDUix3QkFBd0I7Z0JBQ3hCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxrQ0FDNUIsSUFBSSxDQUFDLFNBQVMsS0FDakIsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUNwQixDQUFDO1lBQ0wsQ0FBQztTQUFBO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNHLFFBQVE7O2dCQUNaLHdCQUF3QjtnQkFDeEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLGtDQUM1QixJQUFJLENBQUMsU0FBUyxLQUNqQixJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUM1QyxDQUFDO1lBQ0wsQ0FBQztTQUFBO0tBQ0Y7SUFwTkQsc0NBb05DIn0=