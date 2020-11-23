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
   * @name              _apiKey
   * @type              String
   * @private
   *
   * Store the api key used to reach the google services
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _apiKey = null;

  /**
   * @name              _cx
   * @type              String
   * @private
   *
   * Store the context key used to reach the good google search instance
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _cx = null;

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
  _settings = {
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
  _searchUrl = 'https://www.googleapis.com/customsearch/v1';

  /**
   * @name              _page
   * @type              Number
   * @private
   *
   * Store the current page
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _page = 1;

  /**
   * @name        _keywords
   * @type        String
   * @private
   *
   * The keywords searched
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _keywords = null;

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
  async search(keywords, settings = {}) {
    // save the keywords into the instance
    this._keywords = keywords;

    // reset the page count
    this._page = settings.page || 1;

    // construct query object
    const num = settings.num || 10;
    this._settings = {
      key: this._apiKey,
      cx: this._cx,
      q: keywords,
      num: num,
      start: (this._page - 1) * num + 1,
      ...settings
    };

    // get the url
    const url = this._generateSearchUrl();

    // process to the ajax query
    const ajx = new __SRequest({
      method: 'GET',
      url
    });

    // launch the request end send back the promise
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
  async next() {
    // update the page count
    return this.search(this._keywords, {
      ...this._settings,
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
  async previous() {
    // update the page count
    return this.search(this._keywords, {
      ...this._settings,
      page: this._page - (this._page <= 1 ? 0 : 1)
    });
  }
}
