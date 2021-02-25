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
import __SRequest from '../http/SRequest';
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
export default class SGoogleCustomSearch {
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
            const ajx = new __SRequest({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0dvb2dsZUN1c3RvbVNlYXJjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNHb29nbGVDdXN0b21TZWFyY2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7QUFFVixPQUFPLFVBQVUsTUFBTSxrQkFBa0IsQ0FBQztBQUUxQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQ0c7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLG1CQUFtQjtJQTJGdEM7Ozs7Ozs7Ozs7T0FVRztJQUNILFlBQVksTUFBTSxFQUFFLEVBQUU7UUFyR3RCOzs7Ozs7OztXQVFHO1FBQ0gsWUFBTyxHQUFHLElBQUksQ0FBQztRQUVmOzs7Ozs7OztXQVFHO1FBQ0gsUUFBRyxHQUFHLElBQUksQ0FBQztRQUVYOzs7Ozs7Ozs7V0FTRztRQUNILGNBQVMsR0FBRztZQUNWOzs7Ozs7Ozs7ZUFTRztZQUNILEdBQUcsRUFBRSxFQUFFO1lBRVA7Ozs7Ozs7O2VBUUc7WUFDSCxJQUFJLEVBQUUsQ0FBQztTQUNSLENBQUM7UUFFRjs7Ozs7Ozs7V0FRRztRQUNILGVBQVUsR0FBRyw0Q0FBNEMsQ0FBQztRQUUxRDs7Ozs7Ozs7V0FRRztRQUNILFVBQUssR0FBRyxDQUFDLENBQUM7UUFFVjs7Ozs7Ozs7V0FRRztRQUNILGNBQVMsR0FBRyxJQUFJLENBQUM7UUFjZixpQkFBaUI7UUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsa0JBQWtCO1FBQ2hCLGdCQUFnQjtRQUNoQixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDckIsS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2hDLFdBQVcsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7U0FDakQ7UUFDRCxXQUFXLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxXQUFXLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUVoQyxrQkFBa0I7UUFDbEIsT0FBTyxJQUFJLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsUUFBUSxHQUFHLEVBQUU7O1lBQ2xDLHNDQUFzQztZQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztZQUUxQix1QkFBdUI7WUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztZQUVoQyx5QkFBeUI7WUFDekIsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLFNBQVMsbUJBQ1osR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQ2pCLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUNaLENBQUMsRUFBRSxRQUFRLEVBQ1gsR0FBRyxFQUFFLEdBQUcsRUFDUixLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQzlCLFFBQVEsQ0FDWixDQUFDO1lBRUYsY0FBYztZQUNkLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBRXRDLDRCQUE0QjtZQUM1QixNQUFNLEdBQUcsR0FBRyxJQUFJLFVBQVUsQ0FBQztnQkFDekIsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsR0FBRzthQUNKLENBQUMsQ0FBQztZQUVILCtDQUErQztZQUMvQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNwQixDQUFDO0tBQUE7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0csSUFBSTs7WUFDUix3QkFBd0I7WUFDeEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLGtDQUM1QixJQUFJLENBQUMsU0FBUyxLQUNqQixJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQ3BCLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0csUUFBUTs7WUFDWix3QkFBd0I7WUFDeEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLGtDQUM1QixJQUFJLENBQUMsU0FBUyxLQUNqQixJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUM1QyxDQUFDO1FBQ0wsQ0FBQztLQUFBO0NBQ0YifQ==