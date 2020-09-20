"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SRequest = _interopRequireDefault(require("../http/SRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name 		                SGoogleCustomSearch
 * @namespace           sugar.js.google
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
var SGoogleCustomSearch = /*#__PURE__*/function () {
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

    _defineProperty(this, "_searchUrl", 'https://www.googleapis.com/customsearch/v1');

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
      var queryString = '';

      for (var key in this._settings) {
        queryString += "&".concat(key, "=").concat(this._settings[key]);
      }

      queryString = queryString.substr(1);
      queryString = "?".concat(queryString); // process the url

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
    value: function () {
      var _search = _asyncToGenerator(function* (keywords, settings) {
        if (settings === void 0) {
          settings = {};
        }

        // save the keywords into the instance
        this._keywords = keywords; // reset the page count

        this._page = settings.page || 1; // construct query object

        var num = settings.num || 10;
        this._settings = _objectSpread({
          key: this._apiKey,
          cx: this._cx,
          q: keywords,
          num: num,
          start: (this._page - 1) * num + 1
        }, settings); // get the url

        var url = this._generateSearchUrl(); // process to the ajax query


        var ajx = new _SRequest.default({
          method: 'GET',
          url
        }); // launch the request end send back the promise

        return ajx.send();
      });

      function search(_x, _x2) {
        return _search.apply(this, arguments);
      }

      return search;
    }()
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
    value: function () {
      var _next2 = _asyncToGenerator(function* () {
        // update the page count
        return this.search(this._keywords, _objectSpread(_objectSpread({}, this._settings), {}, {
          page: this._page + 1
        }));
      });

      function next() {
        return _next2.apply(this, arguments);
      }

      return next;
    }()
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
    value: function () {
      var _previous = _asyncToGenerator(function* () {
        // update the page count
        return this.search(this._keywords, _objectSpread(_objectSpread({}, this._settings), {}, {
          page: this._page - (this._page <= 1 ? 0 : 1)
        }));
      });

      function previous() {
        return _previous.apply(this, arguments);
      }

      return previous;
    }()
  }]);

  return SGoogleCustomSearch;
}();

exports.default = SGoogleCustomSearch;
module.exports = exports.default;