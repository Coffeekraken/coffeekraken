// @ts-nocheck
// @shared
import __axios from 'axios';
import __strToHtml from '../html/strToHtml';
import __htmlToString from '../html/toString';
import __SRequestConfig from './SRequestConfig';
import __deepMerge from '../object/deepMerge';
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
export default class SRequest {
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
    constructor(request) {
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
        if (!(request instanceof __SRequestConfig)) {
            this._defaultRequestSettings = new __SRequestConfig(request);
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
        requestSettings = __deepMerge(this._defaultRequestSettings, requestSettings);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1JlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTtBQUVWLE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUM1QixPQUFPLFdBQVcsTUFBTSxtQkFBbUIsQ0FBQztBQUM1QyxPQUFPLGNBQWMsTUFBTSxrQkFBa0IsQ0FBQztBQUM5QyxPQUFPLGdCQUFnQixNQUFNLGtCQUFrQixDQUFDO0FBR2hELE9BQU8sV0FBVyxNQUFNLHFCQUFxQixDQUFDO0FBRTlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQ0c7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLFFBQVE7SUFrQzNCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksT0FBTztRQTNDbkI7Ozs7Ozs7O1dBUUc7UUFDSCw0QkFBdUIsR0FBRyxFQUFFLENBQUM7UUFFN0I7Ozs7Ozs7O1dBUUc7UUFDSCw0QkFBdUIsR0FBRyxFQUFFLENBQUM7UUFFN0I7Ozs7Ozs7O1dBUUc7UUFDSCxtQkFBYyxHQUFHLENBQUMsQ0FBQztRQWFqQixxREFBcUQ7UUFDckQsSUFBSSxDQUFDLENBQUMsT0FBTyxZQUFZLGdCQUFnQixDQUFDLEVBQUU7WUFDMUMsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDOUQ7YUFBTTtZQUNMLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxPQUFPLENBQUM7U0FDeEM7SUFDSCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFVBQVUsQ0FBQyxRQUFRO1FBQ2pCLDBCQUEwQjtRQUMxQixJQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBRWxDLHVDQUF1QztRQUN2QyxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLFlBQVksQ0FBQztRQUVyRSx5Q0FBeUM7UUFD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