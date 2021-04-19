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
        define(["require", "exports", "axios", "@coffeekraken/sugar/shared/html/strToHtml", "@coffeekraken/sugar/shared/html/toString", "./SRequestConfig", "@coffeekraken/sugar/shared/object/deepMerge", "@coffeekraken/s-class"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const axios_1 = __importDefault(require("axios"));
    const strToHtml_1 = __importDefault(require("@coffeekraken/sugar/shared/html/strToHtml"));
    const toString_1 = __importDefault(require("@coffeekraken/sugar/shared/html/toString"));
    const SRequestConfig_1 = __importDefault(require("./SRequestConfig"));
    const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
    const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
    class SRequest extends s_class_1.default {
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
        constructor(request, settings) {
            super(deepMerge_1.default({
                request: {}
            }, settings !== null && settings !== void 0 ? settings : {}));
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
         * @name          requestSettings
         * @type          ISRequestSettings
         * @get
         *
         * Access the request settings
         *
         * @since     2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        get requestSettings() {
            return this._settings.request;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1JlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxrREFBNEI7SUFDNUIsMEZBQW9FO0lBQ3BFLHdGQUFzRTtJQUN0RSxzRUFBZ0Q7SUFHaEQsNEZBQXNFO0lBQ3RFLG9FQUE2QztJQTJDN0MsTUFBcUIsUUFBUyxTQUFRLGlCQUFRO1FBZ0Q1Qzs7Ozs7Ozs7O1dBU0c7UUFDSCxZQUFZLE9BQU8sRUFBRSxRQUF5QztZQUM1RCxLQUFLLENBQ0gsbUJBQVcsQ0FDVDtnQkFDRSxPQUFPLEVBQUUsRUFBRTthQUNaLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztZQWpFSjs7Ozs7Ozs7ZUFRRztZQUNILDRCQUF1QixHQUFHLEVBQUUsQ0FBQztZQUU3Qjs7Ozs7Ozs7ZUFRRztZQUNILDRCQUF1QixHQUFHLEVBQUUsQ0FBQztZQUU3Qjs7Ozs7Ozs7ZUFRRztZQUNILG1CQUFjLEdBQUcsQ0FBQyxDQUFDO1lBb0NqQixxREFBcUQ7WUFDckQsSUFBSSxDQUFDLENBQUMsT0FBTyxZQUFZLHdCQUFnQixDQUFDLEVBQUU7Z0JBQzFDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLHdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzlEO2lCQUFNO2dCQUNMLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxPQUFPLENBQUM7YUFDeEM7UUFDSCxDQUFDO1FBeENEOzs7Ozs7Ozs7V0FTRztRQUNILElBQUksZUFBZTtZQUNqQixPQUFhLElBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO1FBQ3ZDLENBQUM7UUE4QkQ7Ozs7Ozs7Ozs7V0FVRztRQUNILFVBQVUsQ0FBQyxRQUFRO1lBQ2pCLDBCQUEwQjtZQUMxQixJQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBRWxDLHVDQUF1QztZQUN2QyxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLFlBQVksQ0FBQztZQUVyRSx5Q0FBeUM7WUFDekMsTUFBTSxJQUFJLEdBQ1IsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNsRCxDQUFDLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCxDQUFDLENBQUMsS0FBSyxDQUFDO1lBRVosNEdBQTRHO1lBQzVHLElBQ0UsV0FBVyxLQUFLLFdBQVc7Z0JBQzNCLElBQUksS0FBSyxLQUFLO2dCQUNkLFFBQVEsS0FBSyxTQUFTO2dCQUN0QixRQUFRLENBQUMsYUFBYSxLQUFLLFNBQVMsRUFDcEM7Z0JBQ0EsTUFBTSxLQUFLLEdBQUcsbUJBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3pDLElBQUksS0FBSyxDQUFDLEVBQUUsS0FBSyxJQUFJLEVBQUU7b0JBQ3JCLGFBQWEsR0FBRyxrQkFBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN2QztxQkFBTTtvQkFDTCxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztvQkFDOUMsSUFBSSxLQUFLLEVBQUU7d0JBQ1QsYUFBYSxHQUFHLGtCQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ3ZDO2lCQUNGO2FBQ0Y7aUJBQU0sSUFBSSxXQUFXLEtBQUssa0JBQWtCLEVBQUU7Z0JBQzdDLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMzQztZQUVELGlEQUFpRDtZQUNqRCxRQUFRLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQztZQUU5QiwwQ0FBMEM7WUFDMUMsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQ3ZCLE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUV4QixvREFBb0Q7WUFDcEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFcEMsbURBQW1EO1lBQ25ELElBQUksSUFBSSxDQUFDLHVCQUF1QixDQUFDLGFBQWEsRUFBRTtnQkFDOUMsNkJBQTZCO2dCQUM3QixJQUFJLENBQUMsdUJBQXVCLENBQUMsYUFBYSxDQUN4QyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsRUFDM0IsSUFBSSxDQUFDLGNBQWMsQ0FDcEIsQ0FBQzthQUNIO1lBRUQsMENBQTBDO1lBQzFDLElBQUksSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsdUJBQXVCLENBQUMsU0FBUyxFQUFFO2dCQUNqRSw4QkFBOEI7Z0JBQzlCLElBQUksQ0FBQyxRQUFRLENBQ1gsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLElBQUksQ0FBQztvQkFDOUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO29CQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FDekIsQ0FBQzthQUNIO2lCQUFNO2dCQUNMLHFCQUFxQjtnQkFDckIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ2Q7UUFDSCxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILFFBQVEsQ0FBQyxLQUFLO1lBQ1oscUVBQXFFO1lBQ3JFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEIsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxLQUFLLENBQUMsZUFBZSxHQUFHLEVBQUU7WUFDeEIsdUJBQXVCO1lBQ3ZCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUV0QiwyQkFBMkI7WUFDM0IsZUFBZSxHQUFHLG1CQUFXLENBQzNCLElBQUksQ0FBQyx1QkFBdUIsRUFDNUIsZUFBZSxDQUNoQixDQUFDO1lBQ0YsSUFBSSxlQUFlLENBQUMsVUFBVSxFQUFFO2dCQUM5QixlQUFlLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FDMUMsZUFBZSxFQUNmLElBQUksQ0FBQyxjQUFjLENBQ3BCLENBQUM7YUFDSDtZQUVELG9DQUFvQztZQUNwQyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUU5RCxxQ0FBcUM7WUFDckMsZUFBTyxDQUFDLGVBQWUsQ0FBQztpQkFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNoQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7OztXQVlHO1FBQ0gsS0FBSztZQUNILE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLENBQUM7UUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7V0FpQkc7UUFDSCxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUU7WUFDdkIsbUJBQW1CO1lBQ25CLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO2dCQUN6Qyx1REFBdUQ7Z0JBQ3ZELDhCQUE4QjtnQkFDOUIsaUZBQWlGO2dCQUNqRixvQkFBb0I7Z0JBQ3BCLHlCQUF5QjtnQkFDekIsY0FBYztnQkFDZCxNQUFNO2dCQUNOLElBQUk7Z0JBRUosc0JBQXNCO2dCQUN0QixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztnQkFFeEIsNkJBQTZCO2dCQUM3QixJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztnQkFFMUIsc0RBQXNEO2dCQUN0RCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztnQkFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7Z0JBRXRCLGlCQUFpQjtnQkFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7S0FDRjtJQTFRRCwyQkEwUUMifQ==