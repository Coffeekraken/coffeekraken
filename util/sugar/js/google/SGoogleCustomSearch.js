"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SRequest = _interopRequireDefault(require("../http/SRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name 		                SGoogleCustomSearch
 * @namespace               sugar.js.google
 * @type                    Class
 *
 * This class let you make with ease search requests to the google custom search service
 * with useful features like:
 * - Simple pagination system
 * - Promise support
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
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
let SGoogleCustomSearch = /*#__PURE__*/function () {
  /**
   * @name              _apiKey
   * @type              String
   * @private
   * 
   * Store the api key used to reach the google services
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

  /**
   * @name              _cx
   * @type              String
   * @private
   * 
   * Store the context key used to reach the good google search instance
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

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

  /**
   * @name            _searchUrl
   * @type            String
   * @private
   * 
   * Store the google search url
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

  /**
   * @name              _page
   * @type              Number
   * @private
   * 
   * Store the current page
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

  /**
   * @name        _keywords
   * @type        String
   * @private
   * 
   * The keywords searched
   * 
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */

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
  function SGoogleCustomSearch(apiKey, cx) {
    _classCallCheck(this, SGoogleCustomSearch);

    _defineProperty(this, "_apiKey", null);

    _defineProperty(this, "_cx", null);

    _defineProperty(this, "_settings", {
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
    });

    _defineProperty(this, "_searchUrl", "https://www.googleapis.com/customsearch/v1");

    _defineProperty(this, "_page", 1);

    _defineProperty(this, "_keywords", null);

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


  _createClass(SGoogleCustomSearch, [{
    key: "_generateSearchUrl",
    value: function _generateSearchUrl() {
      // construct url
      let queryString = "";

      for (let key in this._settings) {
        queryString += `&${key}=${this._settings[key]}`;
      }

      queryString = queryString.substr(1);
      queryString = `?${queryString}`; // process the url

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

  }, {
    key: "search",
    value: async function search(keywords, settings = {}) {
      // save the keywords into the instance
      this._keywords = keywords; // reset the page count

      this._page = settings.page || 1; // construct query object

      const num = settings.num || 10;
      this._settings = {
        key: this._apiKey,
        cx: this._cx,
        q: keywords,
        num: num,
        start: (this._page - 1) * num + 1,
        ...settings
      }; // get the url

      const url = this._generateSearchUrl(); // process to the ajax query


      const ajx = new _SRequest.default({
        method: "GET",
        url
      }); // launch the request end send back the promise

      return ajx.send();
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

  }, {
    key: "next",
    value: async function next() {
      // update the page count
      return this.search(this._keywords, { ...this._settings,
        page: this._page + 1
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

  }, {
    key: "previous",
    value: async function previous() {
      // update the page count
      return this.search(this._keywords, { ...this._settings,
        page: this._page - (this._page <= 1 ? 0 : 1)
      });
    }
  }]);

  return SGoogleCustomSearch;
}();

exports.default = SGoogleCustomSearch;
module.exports = exports.default;