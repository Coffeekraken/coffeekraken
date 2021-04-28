"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1JlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9odHRwL3MtcmVxdWVzdC9zcmMvc2hhcmVkL1NSZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtEQUE0QjtBQUM1QiwwRkFBb0U7QUFDcEUsd0ZBQXNFO0FBQ3RFLHNFQUFnRDtBQUdoRCw0RkFBc0U7QUFDdEUsb0VBQTZDO0FBMkM3QyxNQUFxQixRQUFTLFNBQVEsaUJBQVE7SUFnRDVDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksT0FBTyxFQUFFLFFBQXlDO1FBQzVELEtBQUssQ0FDSCxtQkFBVyxDQUNUO1lBQ0UsT0FBTyxFQUFFLEVBQUU7U0FDWixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7UUFqRUo7Ozs7Ozs7O1dBUUc7UUFDSCw0QkFBdUIsR0FBRyxFQUFFLENBQUM7UUFFN0I7Ozs7Ozs7O1dBUUc7UUFDSCw0QkFBdUIsR0FBRyxFQUFFLENBQUM7UUFFN0I7Ozs7Ozs7O1dBUUc7UUFDSCxtQkFBYyxHQUFHLENBQUMsQ0FBQztRQW9DakIscURBQXFEO1FBQ3JELElBQUksQ0FBQyxDQUFDLE9BQU8sWUFBWSx3QkFBZ0IsQ0FBQyxFQUFFO1lBQzFDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLHdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzlEO2FBQU07WUFDTCxJQUFJLENBQUMsdUJBQXVCLEdBQUcsT0FBTyxDQUFDO1NBQ3hDO0lBQ0gsQ0FBQztJQXhDRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLGVBQWU7UUFDakIsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztJQUN2QyxDQUFDO0lBOEJEOzs7Ozs7Ozs7O09BVUc7SUFDSCxVQUFVLENBQUMsUUFBUTtRQUNqQiwwQkFBMEI7UUFDMUIs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