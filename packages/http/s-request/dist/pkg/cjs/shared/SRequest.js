"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const dom_1 = require("@coffeekraken/sugar/dom");
const toString_1 = __importDefault(require("@coffeekraken/sugar/js/html/toString"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const axios_1 = __importDefault(require("axios"));
const SRequestParamsInterface_1 = __importDefault(require("./interface/SRequestParamsInterface"));
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
        super((0, deepMerge_1.default)({}, settings !== null && settings !== void 0 ? settings : {}));
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
        this._defaultRequestParams = SRequestParamsInterface_1.default.apply(params !== null && params !== void 0 ? params : {});
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
        // try to get an hash in the settings url
        const hash = this._currentRequestSettings.url.indexOf('#') !== -1
            ? this._currentRequestSettings.url.split('#')[1]
            : false;
        // if a hash exist, check that we are in the browser to have access to the document and querySelector method
        if (contentType === 'text/html' &&
            hash !== false &&
            document !== undefined &&
            document.querySelector !== undefined) {
            const $html = (0, dom_1.__stringToNode)(response.data);
            if ($html.id === hash) {
                finalResponse = (0, toString_1.default)($html);
            }
            else {
                const $part = $html.querySelector(`#${hash}`);
                if ($part) {
                    finalResponse = (0, toString_1.default)($part);
                }
            }
        }
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
            requestSettings = (0, deepMerge_1.default)(this._defaultRequestParams, requestSettings, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9FQUE2QztBQUM3QyxpREFBeUQ7QUFDekQsb0ZBQWtFO0FBQ2xFLDRGQUFzRTtBQUN0RSxrREFBNEI7QUFDNUIsa0dBQTRFO0FBb0U1RSxNQUFxQixRQUFTLFNBQVEsaUJBQVE7SUFrQzFDOzs7Ozs7O09BT0c7SUFDSCxZQUNJLE1BQWdDLEVBQ2hDLFFBQXFDO1FBRXJDLEtBQUssQ0FBQyxJQUFBLG1CQUFXLEVBQUMsRUFBRSxFQUFFLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUE3QzNDOzs7Ozs7OztXQVFHO1FBQ0gsMEJBQXFCLEdBQUcsRUFBRSxDQUFDO1FBRTNCOzs7Ozs7OztXQVFHO1FBQ0gsNEJBQXVCLEdBQUcsRUFBRSxDQUFDO1FBRTdCOzs7Ozs7OztXQVFHO1FBQ0gsbUJBQWMsR0FBRyxDQUFDLENBQUM7UUFnQmYscURBQXFEO1FBQ3JELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxpQ0FBeUIsQ0FBQyxLQUFLLENBQ3hELE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FDZixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxzQkFBc0IsQ0FBQyxRQUFRO1FBQzNCLDBCQUEwQjtRQUMxQixJQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBRWxDLHVDQUF1QztRQUN2QyxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLFlBQVksQ0FBQztRQUVyRSx5Q0FBeUM7UUFDekMsTUFBTSxJQUFJLEdBQ04sSUFBSSxDQUFDLHVCQUF1QixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hELENBQUMsQ0FBQyxJ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