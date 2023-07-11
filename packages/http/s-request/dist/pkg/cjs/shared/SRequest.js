"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const object_1 = require("@coffeekraken/sugar/object");
const axios_1 = __importDefault(require("axios"));
const SRequestParamsInterface_js_1 = __importDefault(require("./interface/SRequestParamsInterface.js"));
class SRequest extends s_class_1.default {
    /**
     * @name                              constructor
     * @type                              Function
     *
     * Constructor
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(params, settings) {
        super((0, object_1.__deepMerge)({}, settings !== null && settings !== void 0 ? settings : {}));
        /**
         * @name                      _defaultRequestParams
         * @type                      {SRequestConfig}
         * @private
         *
         * Store the request settings to use
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._defaultRequestParams = {};
        /**
         * @name                      _currentRequestSettings
         * @type                      {SRequestConfig}
         * @private
         *
         * Store the request settings to use
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._currentRequestSettings = {};
        /**
         * @name                      _requestsCount
         * @type                      Integer
         * @private
         *
         * Store how many requests have been sent
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._requestsCount = 0;
        // if the request is not an SRequestConfig, create it
        this._defaultRequestParams = SRequestParamsInterface_js_1.default.apply(params !== null && params !== void 0 ? params : {});
    }
    /**
     * @name                      _formatSuccessResponse
     * @type                      Function
     * @private
     *
     * Callback when the request has been a success
     *
     * @param           {Object}              response                  The axios response object
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _formatSuccessResponse(response) {
        // init the final response
        let finalResponse = response.data;
        // get the response content-type header
        const contentType = response.headers['content-type'] || 'text/plain';
        // try to parse json
        try {
            finalResponse = JSON.parse(response.data);
        }
        catch (e) { }
        // save the processed data in the response object
        response.data = finalResponse;
        // append the new response inside the responsesArray
        this._responsesArray.push(response);
        const lastResponse = this._responsesArray.slice(-1)[0];
        // check if it was the last request or not
        if (this._requestsCount >= this._currentRequestSettings.sendCount) {
            // resolve the request session
            return {
                status: lastResponse.status,
                statusText: lastResponse.statusText,
                data: lastResponse.data,
                count: this._responsesArray.length,
                axiosResponse: lastResponse,
                axiosResponses: this._responsesArray,
            };
        }
        else {
            // send a new request
            return this.send();
        }
    }
    /**
     * @name                      _formatErrorResponse
     * @type                      Function
     * @private
     *
     * Callback when the request return an error
     *
     * @param           {Object}              error                  The axios error object
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _formatErrorResponse(error) {
        const lastResponse = this._responsesArray.slice(-1)[0];
        const data = {
            // status: lastResponse.code ?? 404,
            // statusText: lastResponse.name,
            // data: lastResponse.data,
            count: this._responsesArray.length,
            axiosResponse: lastResponse,
            axiosResponses: this._responsesArray,
        };
        if (error.response) {
            data.status = error.response.status;
            data.statusText = error.response.statusText;
            data.data = error.response.data;
        }
        else if (error.request) {
            data.status = 404;
            data.statusText = 'Not Found';
            data.data = null;
        }
        else {
            data.status = 404;
            data.statusText = 'Not Found';
            data.data = error.message;
        }
        // something has gone wrong with the request(s) so reject the session
        return data;
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _send(requestSettings = {}) {
        return new Promise((resolve, reject) => {
            // update request count
            this._requestsCount++;
            // process request settings
            requestSettings = (0, object_1.__deepMerge)(this._defaultRequestParams, requestSettings, {
                sendCount: 0,
            });
            if (requestSettings.beforeSend) {
                requestSettings = requestSettings.beforeSend(requestSettings, this._requestsCount);
            }
            // save the current request settings
            this._currentRequestSettings = Object.assign(requestSettings);
            // create the new axios ajax instance
            (0, axios_1.default)(Object.assign({ validateStatus: function () {
                    return true;
                } }, requestSettings))
                .then((response) => {
                resolve(this._formatSuccessResponse(response));
            })
                .catch((error) => {
                resolve(this._formatErrorResponse(error));
            });
        });
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    send(requestSettings = {}) {
        // return a promise
        return new Promise((resolve, reject) => {
            // // check if a cache exist and if we have the content
            // if (this.settings.cache) {
            //   const response = this.settings.cache.get(this._defaultRequestParams.url);
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
            // this._resolve = resolve;
            // this._reject = reject;
            // start requests
            resolve(this._send(requestSettings));
        });
    }
}
exports.default = SRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9FQUE2QztBQUM3Qyx1REFBeUQ7QUFDekQsa0RBQTRCO0FBQzVCLHdHQUErRTtBQXNFL0UsTUFBcUIsUUFBUyxTQUFRLGlCQUFRO0lBa0MxQzs7Ozs7OztPQU9HO0lBQ0gsWUFDSSxNQUFnQyxFQUNoQyxRQUFxQztRQUVyQyxLQUFLLENBQUMsSUFBQSxvQkFBVyxFQUFDLEVBQUUsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBN0MzQzs7Ozs7Ozs7V0FRRztRQUNILDBCQUFxQixHQUFHLEVBQUUsQ0FBQztRQUUzQjs7Ozs7Ozs7V0FRRztRQUNILDRCQUF1QixHQUFHLEVBQUUsQ0FBQztRQUU3Qjs7Ozs7Ozs7V0FRRztRQUNILG1CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBZ0JmLHFEQUFxRDtRQUNyRCxJQUFJLENBQUMscUJBQXFCLEdBQUcsb0NBQXlCLENBQUMsS0FBSyxDQUN4RCxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQ2YsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsc0JBQXNCLENBQUMsUUFBUTtRQUMzQiwwQkFBMEI7UUFDMUIsSUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUVsQyx1Q0FBdUM7UUFDdkMsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxZQUFZLENBQUM7UUFFckUsb0JBQW9CO1FBQ3BCLElBQUk7WUFDQSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDN0M7UUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO1FBRWQsaURBQWlEO1FBQ2pELFFBQVEsQ0FBQyxJ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