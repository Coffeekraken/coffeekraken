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
    var axios_1 = __importDefault(require("axios"));
    var strToHtml_1 = __importDefault(require("../html/strToHtml"));
    var toString_1 = __importDefault(require("../html/toString"));
    var SRequestConfig_1 = __importDefault(require("./SRequestConfig"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
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
    var SRequest = /** @class */ (function () {
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
        function SRequest(request) {
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
        SRequest.prototype._onSuccess = function (response) {
            // init the final response
            var finalResponse = response.data;
            // get the response content-type header
            var contentType = response.headers['content-type'] || 'text/plain';
            // try to get an hash in the settings url
            var hash = this._currentRequestSettings.url.indexOf('#') !== -1
                ? this._currentRequestSettings.url.split('#')[1]
                : false;
            // if a hash exist, check that we are in the browser to have access to the document and querySelector method
            if (contentType === 'text/html' &&
                hash !== false &&
                document !== undefined &&
                document.querySelector !== undefined) {
                var $html = strToHtml_1.default(response.data);
                if ($html.id === hash) {
                    finalResponse = toString_1.default($html);
                }
                else {
                    var $part = $html.querySelector("#" + hash);
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
        };
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
        SRequest.prototype._onError = function (error) {
            // something has gone wrong with the request(s) so reject the session
            this._reject(error);
        };
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
        SRequest.prototype._send = function (requestSettings) {
            if (requestSettings === void 0) { requestSettings = {}; }
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
        };
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
        SRequest.prototype.retry = function () {
            return this.send();
        };
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
        SRequest.prototype.send = function (requestSettings) {
            var _this = this;
            if (requestSettings === void 0) { requestSettings = {}; }
            // return a promise
            return new Promise(function (_a) {
                // // check if a cache exist and if we have the content
                // if (this._settings.cache) {
                //   const response = this._settings.cache.get(this._defaultRequestSettings.url);
                //   if (response) {
                //     resolve(response);
                //     return;
                //   }
                // }
                var resolve = _a.resolve, reject = _a.reject;
                // reset the variables
                _this._requestsCount = 0;
                // init the data array holder
                _this._responsesArray = [];
                // set the resolve and reject callback in the instance
                _this._resolve = resolve;
                _this._reject = reject;
                // start requests
                _this._send(requestSettings);
            });
        };
        return SRequest;
    }());
    exports.default = SRequest;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1JlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7Ozs7O0lBRVYsZ0RBQTRCO0lBQzVCLGdFQUE0QztJQUM1Qyw4REFBOEM7SUFDOUMsb0VBQWdEO0lBR2hELGtFQUE4QztJQUU5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUNHO0lBQ0g7UUFrQ0U7Ozs7Ozs7OztXQVNHO1FBQ0gsa0JBQVksT0FBTztZQTNDbkI7Ozs7Ozs7O2VBUUc7WUFDSCw0QkFBdUIsR0FBRyxFQUFFLENBQUM7WUFFN0I7Ozs7Ozs7O2VBUUc7WUFDSCw0QkFBdUIsR0FBRyxFQUFFLENBQUM7WUFFN0I7Ozs7Ozs7O2VBUUc7WUFDSCxtQkFBYyxHQUFHLENBQUMsQ0FBQztZQWFqQixxREFBcUQ7WUFDckQsSUFBSSxDQUFDLENBQUMsT0FBTyxZQUFZLHdCQUFnQixDQUFDLEVBQUU7Z0JBQzFDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLHdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzlEO2lCQUFNO2dCQUNMLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxPQUFPLENBQUM7YUFDeEM7UUFDSCxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILDZCQUFVLEdBQVYsVUFBVyxRQUFRO1lBQ2pCLDBCQUEwQjtZQUMxQixJQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBRWxDLHVDQUF1QztZQUN2QyxJQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLFlBQVksQ0FBQztZQUVyRSx5Q0FBeUM7WUFDekMsSUFBTSxJQUFJLEdBQ1IsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNsRCxDQUFDLENBQUMs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