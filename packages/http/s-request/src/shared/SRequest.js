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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @name          requestSettings
     * @type          ISRequestSettings
     * @get
     *
     * Access the request settings
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1JlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBQzVCLE9BQU8sV0FBVyxNQUFNLHVDQUF1QyxDQUFDO0FBQ2hFLE9BQU8sY0FBYyxNQUFNLHNDQUFzQyxDQUFDO0FBSWxFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8seUJBQXlCLE1BQU0scUNBQXFDLENBQUM7QUF1RTVFLE1BQU0sQ0FBQyxPQUFPLE9BQU8sUUFBUyxTQUFRLFFBQVE7SUFnRDFDOzs7Ozs7O09BT0c7SUFDSCxZQUFZLE1BQWdDLEVBQUUsUUFBeUM7UUFDbkYsS0FBSyxDQUNELFdBQVcsQ0FDUDtZQUNJLE9BQU8sRUFBRSxFQUFFO1NBQ2QsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQS9ETjs7Ozs7Ozs7V0FRRztRQUNILDBCQUFxQixHQUFHLEVBQUUsQ0FBQztRQUUzQjs7Ozs7Ozs7V0FRRztRQUNILDRCQUF1QixHQUFHLEVBQUUsQ0FBQztRQUU3Qjs7Ozs7Ozs7V0FRRztRQUNILG1CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBa0NmLHFEQUFxRDtRQUNyRCxJQUFJLENBQUMscUJBQXFCLEdBQUcseUJBQXlCLENBQUMsS0FBSyxDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFsQ0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxlQUFlO1FBQ2YsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztJQUN6QyxDQUFDO0lBd0JEOzs7Ozs7Ozs7O09BVUc7SUFDSCxVQUFVLENBQUMsUUFBUTtRQUNmLDBCQUEwQjtRQUMxQixJQUFJ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