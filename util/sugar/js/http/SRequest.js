"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _strToHtml = _interopRequireDefault(require("../html/strToHtml"));

var _toString = _interopRequireDefault(require("../html/toString"));

var _SRequestConfig = _interopRequireDefault(require("./SRequestConfig"));

var _autoCast = _interopRequireDefault(require("../string/autoCast"));

var _convert = _interopRequireDefault(require("../time/convert"));

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name 		                    SRequest
 * @namespace                   sugar.js.http
 * @type                        Class
 *
 * Class that allows to simply handle ajax requests with ease.
 * This class give some useful features like :
 * - Promise support
 * - Recursive requests
 *
 * @example 	js
 * const request = new SRequest({
 * 		url : 'api/...',
 * 		method : 'GET',
 * 		data : {
 * 			myVar : 'myVal'
 * 		}
 * });
 *
 * // send and listen for data
 * request.send().then((response) => {
 * 		// do something with response here...
 * }).catch((error) => {
 * 		// something went wrong...
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SRequest {
  /**
   * @name                      _defaultRequestSettings
   * @type                      {SRequestConfig}
   * @private
   * 
   * Store the request settings to use
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name                      _currentRequestSettings
   * @type                      {SRequestConfig}
   * @private
   * 
   * Store the request settings to use
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name                      _requestsCount
   * @type                      Integer
   * @private
   * 
   * Store how many requests have been sent
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name                              constructor
   * @type                              Function
   * 
   * Constructor
   * 
   * @param           	{SRequestConfig|Object} 		            request 	            	The request object used to make ajax call
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(request) {
    _defineProperty(this, "_defaultRequestSettings", {});

    _defineProperty(this, "_currentRequestSettings", {});

    _defineProperty(this, "_requestsCount", 0);

    // if the request is not an SRequestConfig, create it
    if (!(request instanceof _SRequestConfig.default)) {
      this._defaultRequestSettings = new _SRequestConfig.default(request);
    } else {
      this._defaultRequestSettings = request;
    }
  }
  /**
   * @name                      _onSuccess
   * @type                      Function
   * @private
   * 
   * Callback when the request has been a success
   * 
   * @param           {Object}              response                  The axios response object
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _onSuccess(response) {
    // init the final response
    let finalResponse = response.data; // get the response content-type header

    const contentType = response.headers['content-type'] || 'text/plain'; // try to get an hash in the settings url

    const hash = this._currentRequestSettings.url.indexOf('#') !== -1 ? this._currentRequestSettings.url.split('#')[1] : false; // if a hash exist, check that we are in the browser to have access to the document and querySelector method

    if (contentType === 'text/html' && hash !== false && document !== undefined && document.querySelector !== undefined) {
      const $html = (0, _strToHtml.default)(response.data);

      if ($html.id === hash) {
        finalResponse = (0, _toString.default)($html);
      } else {
        const $part = $html.querySelector(`#${hash}`);

        if ($part) {
          finalResponse = (0, _toString.default)($part);
        }
      }
    } else if (contentType === 'application/json') {
      finalResponse = JSON.parse(response.data);
    } // save the processed data in the response object


    response.data = finalResponse; // remove some useless response properties

    delete response.config;
    delete response.request; // append the new response inside the responsesArray

    this._responsesArray.push(response); // check if an "everyResponse" setting has been set


    if (this._currentRequestSettings.everyResponse) {
      // call the callback function
      this._currentRequestSettings.everyResponse(Object.assign({}, response), this._requestsCount);
    } // check if it was the last request or not


    if (this._requestsCount >= this._currentRequestSettings.sendCount) {
      // resolve the request session
      this._resolve(this._responsesArray.length <= 1 ? this._responsesArray[0] : this._responsesArray);
    } else {
      // send a new request
      this._send();
    }
  }
  /**
   * @name                      _onError
   * @type                      Function
   * @private
   * 
   * Callback when the request return an error
   * 
   * @param           {Object}              error                  The axios error object
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _onError(error) {
    // something has gone wrong with the request(s) so reject the session
    this._reject(error);
  }
  /**
   * @name                          _send
   * @type                          Function
   * @private
   * 
   * Send the actual request using axios
   * 
   * @param         {Object}                [requestSettings={}]            The request settings for this particular request
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _send(requestSettings = {}) {
    // update request count
    this._requestsCount++; // process request settings

    requestSettings = (0, _deepMerge.default)(this._defaultRequestSettings, requestSettings);

    if (requestSettings.beforeSend) {
      requestSettings = requestSettings.beforeSend(requestSettings, this._requestsCount);
    } // save the current request settings


    this._currentRequestSettings = Object.assign(requestSettings); // create the new axios ajax instance

    (0, _axios.default)(requestSettings).then(this._onSuccess.bind(this)).catch(this._onError.bind(this));
  }
  /**
   * @name                retry
   * @type                Function
   * 
   * Reset the request settings variables and relaunch the request
   * 
   * @example           js
   * myAjax.retry().then(response => {
   *    // do something...
   * });
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  retry() {
    return this.send();
  }
  /**
   * @name              send
   * @type              Function
   * 
   * Send the request and return a promise that will be resolved once all the requests
   * have been made or rejected if one of the requests has returned an error...
   * 
   * @return 	      {Promise} 	          The promise through which you will be notified when data are here
   * 
   * @example         js
   * myAjax.send().then(response => {
   *    // do something...
   * }).catch(error => {
   *    // do something...
   * });
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  send(requestSettings = {}) {
    // return a promise
    return new Promise((resolve, reject) => {
      // // check if a cache exist and if we have the content
      // if (this._settings.cache) {
      //   const response = this._settings.cache.get(this._defaultRequestSettings.url);
      //   if (response) {
      //     resolve(response);
      //     return;
      //   }
      // }
      // reset the variables
      this._requestsCount = 0; // init the data array holder

      this._responsesArray = []; // set the resolve and reject callback in the instance

      this._resolve = resolve;
      this._reject = reject; // start requests

      this._send(requestSettings);
    });
  }

}

exports.default = SRequest;
module.exports = exports.default;