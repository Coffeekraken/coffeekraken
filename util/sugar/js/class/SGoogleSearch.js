"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SAjax = _interopRequireDefault(require("../http/SAjax"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SGoogleSearch {
  /**
   * Store the api key used to reach the google services
   * @private
   * @name 		_apiKey
   * @type 		{String}
   */

  /**
   * Store the context key used to reach the good google search instance
   * @private
   * @name 		_cx
   * @type 		{String}
   */

  /**
   * Store the actual query object to be able to call
   * next page etc...
   * @private
   * @name 		_settings
   * @type 		{Object}
   */

  /**
   * Store the google search url
   * @private
   * @name 		_searchUrl
   * @type 		{String}
   */

  /**
   * Store the current page
   * @private
   * @name 		_page
   * @type 		{Integer}
   */

  /**
   * The keywords searched
   * @private
   * @name 		_keywords
   * @type 		{String}
   */

  /**
   * @constructor
   * @param 	{String} 	apiKey 		The google api key to reach the services
   * @param 	{String} 	cx 			The google custom search context
   */
  constructor(apiKey, cx) {
    _defineProperty(this, "_apiKey", null);

    _defineProperty(this, "_cx", null);

    _defineProperty(this, "_settings", {
      /**
       * How many results by page wanted
       * Can be between 1 and 10
       * @setting
       * @name 		num
       * @type 		{Integer}
       * @default 	10
       */
      num: 10,

      /**
       * The page to request
       * @setting
       * @name 		page
       * @type 		{Integer}
       * @default 	1
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
   * Generate and return the correct search url depending on
   * parameters like the current page, etc...
   * @private
   * @name 				_generateSearchUrl
   * @return 	{String} 	The generated url
   */


  _generateSearchUrl() {
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
   * Launch a search
   * @name 	search
   * @param 	{String} 	keywords 	The keywords to search
   * @param 	{Object} 	settings 	The settings object
   * @return 	{Promise} 				A promise of results
   */


  search(keywords, settings = {}) {
    return new Promise((resolve, reject) => {
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


      const ajx = new _SAjax.default({
        method: "GET",
        url: url,
        dataType: "JSON"
      });
      ajx.send().then(response => {
        // resolve the promise
        resolve(response);
      }, error => {
        // reject the promise
        reject(error);
      });
    });
  }
  /**
   * Load the next page
   * @name 		next
   * @return 		{Promise} 		The promise of next page results
   */


  next() {
    // update the page count
    return this.search(this._keywords, { ...this.query,
      page: this._page + 1
    });
  }

}

exports.default = SGoogleSearch;
module.exports = exports.default;