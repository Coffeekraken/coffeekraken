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
    var axios_1 = __importDefault(require("axios"));
    var strToHtml_1 = __importDefault(require("../html/strToHtml"));
    var toString_1 = __importDefault(require("../html/toString"));
    var SRequestConfig_1 = __importDefault(require("./SRequestConfig"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    return /** @class */ (function () {
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1JlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7Ozs7SUFFVixnREFBNEI7SUFDNUIsZ0VBQTRDO0lBQzVDLDhEQUE4QztJQUM5QyxvRUFBZ0Q7SUFHaEQsa0VBQThDO0lBb0M5QztRQWtDRTs7Ozs7Ozs7O1dBU0c7UUFDSCxrQkFBWSxPQUFPO1lBM0NuQjs7Ozs7Ozs7ZUFRRztZQUNILDRCQUF1QixHQUFHLEVBQUUsQ0FBQztZQUU3Qjs7Ozs7Ozs7ZUFRRztZQUNILDRCQUF1QixHQUFHLEVBQUUsQ0FBQztZQUU3Qjs7Ozs7Ozs7ZUFRRztZQUNILG1CQUFjLEdBQUcsQ0FBQyxDQUFDO1lBYWpCLHFEQUFxRDtZQUNyRCxJQUFJLENBQUMsQ0FBQyxPQUFPLFlBQVksd0JBQWdCLENBQUMsRUFBRTtnQkFDMUMsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksd0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDOUQ7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLHVCQUF1QixHQUFHLE9BQU8sQ0FBQzthQUN4QztRQUNILENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsNkJBQVUsR0FBVixVQUFXLFFBQVE7WUFDakIsMEJBQTBCO1lBQzFCLElBQUksYUFBYSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFFbEMsdUNBQXVDO1lBQ3ZDLElBQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksWUFBWSxDQUFDO1lBRXJFLHlDQUF5QztZQUN6QyxJQUFNLElBQUksR0FDUixJQUFJLENBQUMsdUJBQXVCLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2xELENBQUMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxH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