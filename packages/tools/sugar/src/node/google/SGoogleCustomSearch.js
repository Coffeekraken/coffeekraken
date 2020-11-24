"use strict";
// @ts-nocheck
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
const SRequest_1 = __importDefault(require("../http/SRequest"));
module.exports = class SGoogleCustomSearch {
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
};
