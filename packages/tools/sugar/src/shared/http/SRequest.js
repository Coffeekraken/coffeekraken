// @ts-nocheck
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1JlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxrREFBNEI7SUFDNUIsa0VBQTRDO0lBQzVDLGdFQUE4QztJQUM5QyxzRUFBZ0Q7SUFHaEQsb0VBQThDO0lBRTlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQ0c7SUFDSCxNQUFxQixRQUFRO1FBa0MzQjs7Ozs7Ozs7O1dBU0c7UUFDSCxZQUFZLE9BQU87WUEzQ25COzs7Ozs7OztlQVFHO1lBQ0gsNEJBQXVCLEdBQUcsRUFBRSxDQUFDO1lBRTdCOzs7Ozs7OztlQVFHO1lBQ0gsNEJBQXVCLEdBQUcsRUFBRSxDQUFDO1lBRTdCOzs7Ozs7OztlQVFHO1lBQ0gsbUJBQWMsR0FBRyxDQUFDLENBQUM7WUFhakIscURBQXFEO1lBQ3JELElBQUksQ0FBQyxDQUFDLE9BQU8sWUFBWSx3QkFBZ0IsQ0FBQyxFQUFFO2dCQUMxQyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSx3QkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUM5RDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsdUJBQXVCLEdBQUcsT0FBTyxDQUFDO2FBQ3hDO1FBQ0gsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxVQUFVLENBQUMsUUFBUTtZQUNqQiwwQkFBMEI7WUFDMUIsSUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztZQUVsQyx1Q0FBdUM7WUFDdkMsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxZQUFZLENBQUM7WUFFckUseUNBQXlDO1lBQ3pDLE1BQU0sSUFBSSxHQUNSLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEQsQ0FBQyxDQUFDLElBQUks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