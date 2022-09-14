// @ts-nocheck
import __SClass from '@coffeekraken/s-class';
import { __stringToNode } from '@coffeekraken/sugar/dom';
import __htmlToString from '@coffeekraken/sugar/js/html/toString';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __axios from 'axios';
import __SRequestParamsInterface from './interface/SRequestParamsInterface';
export default class SRequest extends __SClass {
    /**
     * @name                              constructor
     * @type                              Function
     *
     * Constructor
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(params, settings) {
        super(__deepMerge({}, settings !== null && settings !== void 0 ? settings : {}));
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
        this._defaultRequestParams = __SRequestParamsInterface.apply(params !== null && params !== void 0 ? params : {});
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
            const $html = __stringToNode(response.data);
            if ($html.id === hash) {
                finalResponse = __htmlToString($html);
            }
            else {
                const $part = $html.querySelector(`#${hash}`);
                if ($part) {
                    finalResponse = __htmlToString($part);
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
            requestSettings = __deepMerge(this._defaultRequestParams, requestSettings, {
                sendCount: 0,
            });
            if (requestSettings.beforeSend) {
                requestSettings = requestSettings.beforeSend(requestSettings, this._requestsCount);
            }
            // save the current request settings
            this._currentRequestSettings = Object.assign(requestSettings);
            // create the new axios ajax instance
            __axios(Object.assign({ validateStatus: function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxjQUFjLE1BQU0sc0NBQXNDLENBQUM7QUFDbEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUM1QixPQUFPLHlCQUF5QixNQUFNLHFDQUFxQyxDQUFDO0FBb0U1RSxNQUFNLENBQUMsT0FBTyxPQUFPLFFBQVMsU0FBUSxRQUFRO0lBa0MxQzs7Ozs7OztPQU9HO0lBQ0gsWUFDSSxNQUFnQyxFQUNoQyxRQUFxQztRQUVyQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBN0MzQzs7Ozs7Ozs7V0FRRztRQUNILDBCQUFxQixHQUFHLEVBQUUsQ0FBQztRQUUzQjs7Ozs7Ozs7V0FRRztRQUNILDRCQUF1QixHQUFHLEVBQUUsQ0FBQztRQUU3Qjs7Ozs7Ozs7V0FRRztRQUNILG1CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBZ0JmLHFEQUFxRDtRQUNyRCxJQUFJLENBQUMscUJBQXFCLEdBQUcseUJBQXlCLENBQUMsS0FBSyxDQUN4RCxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQ2YsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsc0JBQXNCLENBQUMsUUFBUTtRQUMzQiwwQkFBMEI7UUFDMUIsSUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUVsQyx1Q0FBdUM7UUFDdkMsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxj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