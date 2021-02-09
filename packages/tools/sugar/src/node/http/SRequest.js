"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const strToHtml_1 = __importDefault(require("../html/strToHtml"));
const toString_1 = __importDefault(require("../html/toString"));
const SRequestConfig_1 = __importDefault(require("./SRequestConfig"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
/**
 * @name 		                    SRequest
 * @namespace           sugar.js.http
 * @type                        Class
 * @status              wip
 *
 * Class that allows to simply handle ajax requests with ease.
 * This class give some useful features like :
 * - Promise support
 * - Recursive requests
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
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
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SRequest {
    /**
     * @name                              constructor
     * @type                              Function
     *
     * Constructor
     *
     * @param           	{SRequestConfig|Object} 		            request 	            	The request object used to make ajax call
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(request) {
        /**
         * @name                      _defaultRequestSettings
         * @type                      {SRequestConfig}
         * @private
         *
         * Store the request settings to use
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._defaultRequestSettings = {};
        /**
         * @name                      _currentRequestSettings
         * @type                      {SRequestConfig}
         * @private
         *
         * Store the request settings to use
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._currentRequestSettings = {};
        /**
         * @name                      _requestsCount
         * @type                      Integer
         * @private
         *
         * Store how many requests have been sent
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._requestsCount = 0;
        // if the request is not an SRequestConfig, create it
        if (!(request instanceof SRequestConfig_1.default)) {
            this._defaultRequestSettings = new SRequestConfig_1.default(request);
        }
        else {
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _onSuccess(response) {
        // init the final response
        let finalResponse = response.data;
        // get the response content-type header
        const contentType = response.headers['content-type'] || 'text/plain';
        // try to get an hash in the settings url
        const hash = this._currentRequestSettings.url.indexOf('#') !== -1
            ? this._currentRequestSettings.url.split('#')[1]
            : false;
        // if a hash exist, check that we are in the browser to have access to the document and querySelector method
        if (contentType === 'text/html' &&
            hash !== false &&
            document !== undefined &&
            document.querySelector !== undefined) {
            const $html = strToHtml_1.default(response.data);
            if ($html.id === hash) {
                finalResponse = toString_1.default($html);
            }
            else {
                const $part = $html.querySelector(`#${hash}`);
                if ($part) {
                    finalResponse = toString_1.default($part);
                }
            }
        }
        else if (contentType === 'application/json') {
            finalResponse = JSON.parse(response.data);
        }
        // save the processed data in the response object
        response.data = finalResponse;
        // remove some useless response properties
        delete response.config;
        delete response.request;
        // append the new response inside the responsesArray
        this._responsesArray.push(response);
        // check if an "everyResponse" setting has been set
        if (this._currentRequestSettings.everyResponse) {
            // call the callback function
            this._currentRequestSettings.everyResponse(Object.assign({}, response), this._requestsCount);
        }
        // check if it was the last request or not
        if (this._requestsCount >= this._currentRequestSettings.sendCount) {
            // resolve the request session
            this._resolve(this._responsesArray.length <= 1
                ? this._responsesArray[0]
                : this._responsesArray);
        }
        else {
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _send(requestSettings = {}) {
        // update request count
        this._requestsCount++;
        // process request settings
        requestSettings = deepMerge_1.default(this._defaultRequestSettings, requestSettings);
        if (requestSettings.beforeSend) {
            requestSettings = requestSettings.beforeSend(requestSettings, this._requestsCount);
        }
        // save the current request settings
        this._currentRequestSettings = Object.assign(requestSettings);
        // create the new axios ajax instance
        axios_1.default(requestSettings)
            .then(this._onSuccess.bind(this))
            .catch(this._onError.bind(this));
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    send(requestSettings = {}) {
        // return a promise
        return new Promise(({ resolve, reject }) => {
            // // check if a cache exist and if we have the content
            // if (this._settings.cache) {
            //   const response = this._settings.cache.get(this._defaultRequestSettings.url);
            //   if (response) {
            //     resolve(response);
            //     return;
            //   }
            // }
            // reset the variables
            this._requestsCount = 0;
            // init the data array holder
            this._responsesArray = [];
            // set the resolve and reject callback in the instance
            this._resolve = resolve;
            this._reject = reject;
            // start requests
            this._send(requestSettings);
        });
    }
}
exports.default = SRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1JlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7Ozs7O0FBRVYsa0RBQTRCO0FBQzVCLGtFQUE0QztBQUM1QyxnRUFBOEM7QUFDOUMsc0VBQWdEO0FBR2hELG9FQUE4QztBQUU5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUNHO0FBQ0gsTUFBcUIsUUFBUTtJQWtDM0I7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxPQUFPO1FBM0NuQjs7Ozs7Ozs7V0FRRztRQUNILDRCQUF1QixHQUFHLEVBQUUsQ0FBQztRQUU3Qjs7Ozs7Ozs7V0FRRztRQUNILDRCQUF1QixHQUFHLEVBQUUsQ0FBQztRQUU3Qjs7Ozs7Ozs7V0FRRztRQUNILG1CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBYWpCLHFEQUFxRDtRQUNyRCxJQUFJLENBQUMsQ0FBQyxPQUFPLFlBQVksd0JBQWdCLENBQUMsRUFBRTtZQUMxQyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSx3QkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM5RDthQUFNO1lBQ0wsSUFBSSxDQUFDLHVCQUF1QixHQUFHLE9BQU8sQ0FBQztTQUN4QztJQUNILENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsVUFBVSxDQUFDLFFBQVE7UUFDakIsMEJBQTBCO1FBQzFCLElBQUksYUFBYSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFFbEMsdUNBQXVDO1FBQ3ZDLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksWUFBWSxDQUFDO1FBRXJFLHlDQUF5QztRQUN6QyxNQUFNLElBQUksR0FDUixJQUFJLENBQUMsdUJBQXVCLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEQsQ0FBQyxDQUFDLElBQUksQ0FB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