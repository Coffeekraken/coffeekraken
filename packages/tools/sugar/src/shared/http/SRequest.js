// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "axios", "../html/strToHtml", "../html/toString", "./SRequestConfig", "../object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1JlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7Ozs7O0lBRVYsa0RBQTRCO0lBQzVCLGtFQUE0QztJQUM1QyxnRUFBOEM7SUFDOUMsc0VBQWdEO0lBR2hELG9FQUE4QztJQUU5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUNHO0lBQ0gsTUFBcUIsUUFBUTtRQWtDM0I7Ozs7Ozs7OztXQVNHO1FBQ0gsWUFBWSxPQUFPO1lBM0NuQjs7Ozs7Ozs7ZUFRRztZQUNILDRCQUF1QixHQUFHLEVBQUUsQ0FBQztZQUU3Qjs7Ozs7Ozs7ZUFRRztZQUNILDRCQUF1QixHQUFHLEVBQUUsQ0FBQztZQUU3Qjs7Ozs7Ozs7ZUFRRztZQUNILG1CQUFjLEdBQUcsQ0FBQyxDQUFDO1lBYWpCLHFEQUFxRDtZQUNyRCxJQUFJLENBQUMsQ0FBQyxPQUFPLFlBQVksd0JBQWdCLENBQUMsRUFBRTtnQkFDMUMsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksd0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDOUQ7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLHVCQUF1QixHQUFHLE9BQU8sQ0FBQzthQUN4QztRQUNILENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsVUFBVSxDQUFDLFFBQVE7WUFDakIsMEJBQTBCO1lBQzFCLElBQUksYUFBYSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFFbEMsdUNBQXVDO1lBQ3ZDLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksWUFBWSxDQUFDO1lBRXJFLHlDQUF5QztZQUN6QyxNQUFNLElBQUksR0FDUixJQUFJLENBQUMsdUJBQXVCLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2xELENBQUMs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