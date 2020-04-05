"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _Observable = require("rxjs/Observable");

var _strToHtml = _interopRequireDefault(require("../string/strToHtml"));

var _htmlToStr = _interopRequireDefault(require("../string/htmlToStr"));

var _SAjaxRequest = _interopRequireDefault(require("./SAjaxRequest"));

var _autoCast = _interopRequireDefault(require("../string/autoCast"));

var _convert = _interopRequireDefault(require("../time/convert"));

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name 		                    SAjax
 * @namespace                   sugar.js.http
 * @type                        Class
 *
 * Class that allows to simply handle ajax requests with ease.
 * This class give some useful features like :
 * - Promise support
 * - Observable support
 * - Recursive requests
 *
 * @example 	js
 * const ajx = new SAjax({
 * 		url : 'api/...',
 * 		method : 'GET',
 * 		data : {
 * 			myVar : 'myVal'
 * 		}
 * }, {
 * 		sendCount : 10,
 * 		sendInterval : 2000,
 * 		beforeSend : (request, sendCount) => {
 * 			request.data.page = sendCount+1;
 * 			return request;
 * 		}
 * });
 *
 * // optionally listen for data through observable
 * ajx.observable.subscribe((response) => {
 * 		// do something with the response here...
 * }, (error) => {
 * 		// something went wrong
 * }, () => {
 * 		// all the requests have been sent
 * });
 *
 * // send and listen for data
 * ajx.send().then((response) => {
 * 		// do something with response here...
 * }, (error) => {
 * 		// something went wrong...
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SAjax {
  /**
   * @name                observable
   * @type                {Observable}
   * 
   * Store the observable instance on which you can subscribe for responses
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name                      _requestSettings
   * @type                      {SAjaxRequest}
   * @private
   * 
   * Store the request settings to use
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name                _observer
   * @type                {Object}
   * @private
   * 
   * Store the Observable observer to be able to call his methods outside
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
  // /**
  //  * @name                  _settings
  //  * @type                  {Object}
  //  * @private
  //  * 
  //  * Store the settings around the request.
  //  * All the axios settings are supported with some additional ones described bellow...
  //  * 
  //  * @see     https://github.com/axios/axios
  //  * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  //  */
  // _settings = {
  //   /**
  //    * @name                      sendInterval
  //    * @type                      Number
  //    * @setting
  //    * @default                   1000
  //    * 
  //    * Set the interval time between each requests if the sendCount setting is specified.
  //    * If setted in number format, this is taken as millisenconds. You can also set the interval
  //    * in string format like '34s', '1h', '10ms', '2d', etc...
  //    * 
  //    * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  //    */
  //   sendInterval: 1000,
  //   /**
  //    * @name                        sendCount
  //    * @type                        Number
  //    * @setting
  //    * @default                     1
  //    * 
  //    * Set how many times the request has to be sent
  //    * 
  //    * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  //    */
  //   sendCount: 1,
  //   /**
  //    * @name                    beforeSend
  //    * @type                    Function
  //    * @default                 null
  //    * 
  //    * A function that will be called before each requests to have a change to update some request params
  //    * Must return the new request params
  //    * Will recieve the actual request params and the request count as parameter
  //    * 
  //    * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  //    */
  //   beforeSend: null,
  //   // /**
  //   //  * A cache instance that will be used
  //   //  * @setting
  //   //  * @type 		{SCache}
  //   //  * @default 	null
  //   //  */
  //   // cache: null
  // };

  /**
   * @name                              constructor
   * @type                              Function
   * 
   * Constructor
   * 
   * @param           	{SAjaxRequest} 		            request 	            	The request object used to make ajax call
   * @param 	          {Object} 			                [settings={}] 	        Some settings around the request. Here's the list:
   * - sentInterval (1000) {Number}: Specify how many times to wait between multiple requests specified with "settings.sendCount"
   * - sendCount (1) {Number}: Specify how many times the request has to be sended
   * - beforeSend (null) {Function}: Specify a function that will be called before sending the request with the request settings as parameters that you can update and return...
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(request, settings = {}) {
    _defineProperty(this, "observable", null);

    _defineProperty(this, "_requestSettings", {});

    _defineProperty(this, "_observer", null);

    _defineProperty(this, "_requestsCount", 0);

    // if the request is not an SAjaxRequest, create it
    if (!(request instanceof _SAjaxRequest.default)) {
      this._requestSettings = new _SAjaxRequest.default(request);
    } else {
      this._requestSettings = request;
    } // // extend settings
    // this._settings = __deepMerge(this._settings, settings);
    // if (typeof this._settings.sendInterval === 'string') this._settings.sendInterval = __convert(this._settings.sendInterval, 'ms');
    // create the observable property


    this.observable = new _Observable.Observable(observer => {
      // store the observer into the instance
      this._observer = observer;
    });
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

    const hash = requestSettings.url.indexOf('#') !== -1 ? requestSettings.url.split('#')[1] : false; // if a hash exist, check that we are in the browser to have access to the document and querySelector method

    if (contentType === 'text/html' && hash !== false && document !== undefined && document.querySelector !== undefined) {
      const $html = (0, _strToHtml.default)(response.data);

      if ($html.id === hash) {
        finalResponse = (0, _htmlToStr.default)($html);
      } else {
        const $part = $html.querySelector(`#${hash}`);

        if ($part) {
          finalResponse = (0, _htmlToStr.default)($part);
        }
      }
    } else if (contentType === 'application/json') {
      finalResponse = JSON.parse(response.data);
    } // save the processed data in the response object


    response.data = finalResponse; // append the new response inside the responsesArray

    this._responsesArray.push(response); // check if it was the last request or not


    if (this._requestsCount >= this._requestSettings.sendCount) {
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
   * @name                      _createRequest
   * @type                      Function
   * @private
   * 
   * Create the request
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createRequest() {// listen request states
    // simpleAjax.on("success", e => {
    //   // check if need to store response in cache
    //   if (this._settings.cache) {
    //     console.log("set", simpleAjax._requestSettings.url, response);
    //     this._settings.cache.set(simpleAjax._requestSettings.url, response);
    //   }
    //   // push the result into the observer
    //   if (this._observer) this._observer.next(response);
    //   // notify Promise
    //   if (this._resolve) this._resolve(response);
    // });
    // simpleAjax.on("error", e => {
    //   // error
    //   if (this._observer) this._observer.error(e.target.response);
    //   // notify promise
    //   if (this._reject) this._reject(e.target.response);
    // });
    // simpleAjax.on("complete", e => {
    //   // check the settings to see if we need to do it again
    //   // after a certain timeout
    //   if (this._settings.sendInterval) {
    //     // handle sendCount
    //     if (
    //       this._settings.sendCount &&
    //       this._requestsCount >= this._settings.sendCount
    //     ) {
    //       // notify subscriber
    //       if (this._observer) {
    //         this._observer.complete();
    //       }
    //       // stop here
    //       return;
    //     } else if (this._settings.sendCount) {
    //       // wait the requested timeout and send a new request
    //       setTimeout(() => {
    //         this.send();
    //       }, this._settings.sendInterval);
    //     }
    //   }
    // });
    // // save into instance
    // this._simpleAjax = simpleAjax;
  }

  _send() {
    // update request count
    this._requestsCount++; // process request settings

    let requestSettings = Object.assign({}, this._requestSettings);

    if (this._settings.beforeSend) {
      requestSettings = this._settings.beforeSend(requestSettings, this._requestsCount);
    } // create the new axios ajax instance


    (0, _axios.default)(requestSettings).then(this._onSuccess).catch(this._onError);
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


  send() {
    // return a promise
    return new Promise((resolve, reject) => {
      // // check if a cache exist and if we have the content
      // if (this._settings.cache) {
      //   const response = this._settings.cache.get(this._requestSettings.url);
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

      this._send();
    });
  }

}

exports.default = SAjax;
module.exports = exports.default;