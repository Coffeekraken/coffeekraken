"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const axios_1 = __importDefault(require("axios"));
const strToHtml_1 = __importDefault(require("../html/strToHtml"));
const toString_1 = __importDefault(require("../html/toString"));
const SRequestConfig_1 = __importDefault(require("./SRequestConfig"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
module.exports = class SRequest {
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1JlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7Ozs7QUFFVixrREFBNEI7QUFDNUIsa0VBQTRDO0FBQzVDLGdFQUE4QztBQUM5QyxzRUFBZ0Q7QUFHaEQsb0VBQThDO0FBb0M5QyxpQkFBUyxNQUFNLFFBQVE7SUFrQ3JCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksT0FBTztRQTNDbkI7Ozs7Ozs7O1dBUUc7UUFDSCw0QkFBdUIsR0FBRyxFQUFFLENBQUM7UUFFN0I7Ozs7Ozs7O1dBUUc7UUFDSCw0QkFBdUIsR0FBRyxFQUFFLENBQUM7UUFFN0I7Ozs7Ozs7O1dBUUc7UUFDSCxtQkFBYyxHQUFHLENBQUMsQ0FBQztRQWFqQixxREFBcUQ7UUFDckQsSUFBSSxDQUFDLENBQUMsT0FBTyxZQUFZLHdCQUFnQixDQUFDLEVBQUU7WUFDMUMsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksd0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDOUQ7YUFBTTtZQUNMLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxPQUFPLENBQUM7U0FDeEM7SUFDSCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFVBQVUsQ0FBQyxRQUFRO1FBQ2pCLDBCQUEwQjtRQUMxQixJQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBRWxDLHVDQUF1QztRQUN2QyxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLFlBQVksQ0FBQztRQUVyRSx5Q0FBeUM7UUFDekMsTUFBTSxJQUFJLEdBQ1IsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xELENBQUMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFH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