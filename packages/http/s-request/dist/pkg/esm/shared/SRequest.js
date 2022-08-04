// @ts-nocheck
import __SClass from '@coffeekraken/s-class';
import __strToHtml from '@coffeekraken/sugar/js/html/strToHtml';
import __htmlToString from '@coffeekraken/sugar/js/html/toString';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
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
            const $html = __strToHtml(response.data);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFdBQVcsTUFBTSx1Q0FBdUMsQ0FBQztBQUNoRSxPQUFPLGNBQWMsTUFBTSxzQ0FBc0MsQ0FBQztBQUNsRSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLE9BQU8sTUFBTSxPQUFPLENBQUM7QUFDNUIsT0FBTyx5QkFBeUIsTUFBTSxxQ0FBcUMsQ0FBQztBQW9FNUUsTUFBTSxDQUFDLE9BQU8sT0FBTyxRQUFTLFNBQVEsUUFBUTtJQWtDMUM7Ozs7Ozs7T0FPRztJQUNILFlBQ0ksTUFBZ0MsRUFDaEMsUUFBcUM7UUFFckMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQTdDM0M7Ozs7Ozs7O1dBUUc7UUFDSCwwQkFBcUIsR0FBRyxFQUFFLENBQUM7UUFFM0I7Ozs7Ozs7O1dBUUc7UUFDSCw0QkFBdUIsR0FBRyxFQUFFLENBQUM7UUFFN0I7Ozs7Ozs7O1dBUUc7UUFDSCxtQkFBYyxHQUFHLENBQUMsQ0FBQztRQWdCZixxREFBcUQ7UUFDckQsSUFBSSxDQUFDLHFCQUFxQixHQUFHLHlCQUF5QixDQUFDLEtBQUssQ0FDeEQsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUNmLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILHNCQUFzQixDQUFDLFFBQVE7UUFDM0IsMEJBQTBCO1FBQzFCLElBQUksYUFBYSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFFbEMsdUNBQXVDO1FBQ3ZDLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksWUFBWSxD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