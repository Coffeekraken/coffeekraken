// @ts-nocheck
import __axios from 'axios';
import __strToHtml from '@coffeekraken/sugar/js/html/strToHtml';
import __htmlToString from '@coffeekraken/sugar/js/html/toString';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SClass from '@coffeekraken/s-class';
import __SRequestParamsInterface from './interface/SRequestParamsInterface';
export default class SRequest extends __SClass {
    /**
     * @name                              constructor
     * @type                              Function
     *
     * Constructor
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(params, settings) {
        super(__deepMerge({
            request: {},
        }, settings !== null && settings !== void 0 ? settings : {}));
        /**
         * @name                      _defaultRequestParams
         * @type                      {SRequestConfig}
         * @private
         *
         * Store the request settings to use
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._defaultRequestParams = {};
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
        this._defaultRequestParams = __SRequestParamsInterface.apply(params !== null && params !== void 0 ? params : {});
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
        else if (contentType === 'application/json') {
            finalResponse = JSON.parse(response.data);
        }
        // save the processed data in the response object
        response.data = finalResponse;
        // append the new response inside the responsesArray
        this._responsesArray.push(response);
        const lastResponse = this._responsesArray.slice(-1)[0];
        // check if it was the last request or not
        if (this._requestsCount >= this._currentRequestSettings.sendCount) {
            // resolve the request session
            this._resolve({
                status: lastResponse.status,
                statusText: lastResponse.statusText,
                data: lastResponse.data,
                count: this._responsesArray.length,
                axiosResponse: lastResponse,
                axiosResponses: this._responsesArray,
            });
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
        requestSettings = __deepMerge(this._defaultRequestParams, requestSettings, {
            sendCount: 0
        });
        if (requestSettings.beforeSend) {
            requestSettings = requestSettings.beforeSend(requestSettings, this._requestsCount);
        }
        // save the current request settings
        this._currentRequestSettings = Object.assign(requestSettings);
        // create the new axios ajax instance
        __axios(requestSettings)
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
        return new Promise((resolve, reject) => {
            // // check if a cache exist and if we have the content
            // if (this._settings.cache) {
            //   const response = this._settings.cache.get(this._defaultRequestParams.url);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1JlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBQzVCLE9BQU8sV0FBVyxNQUFNLHVDQUF1QyxDQUFDO0FBQ2hFLE9BQU8sY0FBYyxNQUFNLHNDQUFzQyxDQUFDO0FBSWxFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8seUJBQXlCLE1BQU0scUNBQXFDLENBQUM7QUF1RTVFLE1BQU0sQ0FBQyxPQUFPLE9BQU8sUUFBUyxTQUFRLFFBQVE7SUFnRDFDOzs7Ozs7O09BT0c7SUFDSCxZQUFZLE1BQWdDLEVBQUUsUUFBeUM7UUFDbkYsS0FBSyxDQUNELFdBQVcsQ0FDUDtZQUNJLE9BQU8sRUFBRSxFQUFFO1NBQ2QsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQS9ETjs7Ozs7Ozs7V0FRRztRQUNILDBCQUFxQixHQUFHLEVBQUUsQ0FBQztRQUUzQjs7Ozs7Ozs7V0FRRztRQUNILDRCQUF1QixHQUFHLEVBQUUsQ0FBQztRQUU3Qjs7Ozs7Ozs7V0FRRztRQUNILG1CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBa0NmLHFEQUFxRDtRQUNyRCxJQUFJLENBQUMscUJBQXFCLEdBQUcseUJBQXlCLENBQUMsS0FBSyxDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFsQ0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxlQUFlO1FBQ2YsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztJQUN6QyxDQUFDO0lBd0JEOzs7Ozs7Ozs7O09BVUc7SUFDSCxVQUFVLENBQUMsUUFBUTtRQUNmLDBCQUEwQjtRQUMxQixJQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBRWxDLHVDQUF1QztRQUN2QyxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLFlBQVksQ0FBQztRQUVyRSx5Q0FBeUM7UUFDekMsTUFBTSxJQUFJLEdBQ04sSUFBSSxDQUFDLHVCQUF1QixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hELENBQUMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEQsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUVoQiw0R0FBNEc7UUFDNUcsSUFDSSxXQUFXLEtBQUssV0FBVztZQUMzQixJQUFJLEtBQUssS0FBSztZQUNkLFFBQVEsS0FBSyxTQUFTO1lBQ3RCLFFBQVEsQ0FBQyxhQUFhLEtBQUssU0FBUyxFQUN0QztZQUNFLE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekMsSUFBSSxLQUFLLENBQUMsRUFBRSxLQUFLLElBQUksRUFBRTtnQkFDbkIsYUFBYSxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN6QztpQkFBTTtnQkFDSCxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDOUMsSUFBSSxLQUFLLEVBQUU7b0JBQ1AsYUFBYSxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDekM7YUFDSjtTQUNKO2FBQU0sSUFBSSxXQUFXLEtBQUssa0JBQWtCLEVBQUU7WUFDM0MsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzdDO1FBRUQsaURBQWlEO1FBQ2pELFFBQVEsQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDO1FBRTlCLG9EQUFvRDtRQUNwRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVwQyxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXZELDBDQUEwQztRQUMxQyxJQUFJLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsRUFBRTtZQUMvRCw4QkFBOEI7WUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDVixNQUFNLEVBQUUsWUFBWSxDQUFDLE1BQU07Z0JBQzNCLFVBQVUsRUFBRSxZQUFZLENBQUMsVUFBVTtnQkFDbkMsSUFBSSxFQUFFLFlBQVksQ0FBQyxJQUFJO2dCQUN2QixLQUFLLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNO2dCQUNsQyxhQUFhLEVBQUUsWUFBWTtnQkFDM0IsY0FBYyxFQUFFLElBQUksQ0FBQyxlQUFlO2FBQ3ZDLENBQUMsQ0FBQztTQUNOO2FBQU07WUFDSCxxQkFBcUI7WUFDckIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2hCO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxRQUFRLENBQUMsS0FBSztRQUNWLHFFQUFxRTtRQUNyRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsS0FBSyxDQUFDLGVBQWUsR0FBRyxFQUFFO1FBQ3RCLHVCQUF1QjtRQUN2QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFdEIsMkJBQTJCO1FBQzNCLGVBQWUsR0FBRyxXQUFXLENBQ3pCLElBQUksQ0FBQyxxQkFBcUIsRUFDMUIsZUFBZSxFQUNmO1lBQ0ksU0FBUyxFQUFFLENBQUM7U0FDZixDQUNKLENBQUM7UUFDRixJQUFJLGVBQWUsQ0FBQyxVQUFVLEVBQUU7WUFDNUIsZUFBZSxHQUFHLGVBQWUsQ0FBQyxVQUFVLENBQ3hDLGVBQWUsRUFDZixJQUFJLENBQUMsY0FBYyxDQUN0QixDQUFDO1NBQ0w7UUFFRCxvQ0FBb0M7UUFDcEMsSUFBSSxDQUFDLHVCQUF1QixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFOUQscUNBQXFDO1FBQ3JDLE9BQU8sQ0FBQyxlQUFlLENBQUM7YUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2hDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxLQUFLO1FBQ0QsT0FBTyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7OztPQWlCRztJQUNILElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRTtRQUNyQixtQkFBbUI7UUFDbkIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNuQyx1REFBdUQ7WUFDdkQsOEJBQThCO1lBQzlCLCtFQUErRTtZQUMvRSxvQkFBb0I7WUFDcEIseUJBQXlCO1lBQ3pCLGNBQWM7WUFDZCxNQUFNO1lBQ04sSUFBSTtZQUVKLHNCQUFzQjtZQUN0QixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztZQUV4Qiw2QkFBNkI7WUFDN0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7WUFFMUIsc0RBQXNEO1lBQ3RELElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBRXRCLGlCQUFpQjtZQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKIn0=