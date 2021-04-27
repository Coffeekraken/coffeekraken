// @ts-nocheck
import __axios from 'axios';
import __strToHtml from '@coffeekraken/sugar/shared/html/strToHtml';
import __htmlToString from '@coffeekraken/sugar/shared/html/toString';
import __SRequestConfig from './SRequestConfig';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SClass from '@coffeekraken/s-class';
export default class SRequest extends __SClass {
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
        super(__deepMerge({
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
        if (!(request instanceof __SRequestConfig)) {
            this._defaultRequestSettings = new __SRequestConfig(request);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1JlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9odHRwL3MtcmVxdWVzdC9zcmMvc2hhcmVkL1NSZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLE9BQU8sTUFBTSxPQUFPLENBQUM7QUFDNUIsT0FBTyxXQUFXLE1BQU0sMkNBQTJDLENBQUM7QUFDcEUsT0FBTyxjQUFjLE1BQU0sMENBQTBDLENBQUM7QUFDdEUsT0FBTyxnQkFBZ0IsTUFBTSxrQkFBa0IsQ0FBQztBQUdoRCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQTJDN0MsTUFBTSxDQUFDLE9BQU8sT0FBTyxRQUFTLFNBQVEsUUFBUTtJQWdENUM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxPQUFPLEVBQUUsUUFBeUM7UUFDNUQsS0FBSyxDQUNILFdBQVcsQ0FDVDtZQUNFLE9BQU8sRUFBRSxFQUFFO1NBQ1osRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1FBakVKOzs7Ozs7OztXQVFHO1FBQ0gsNEJBQXVCLEdBQUcsRUFBRSxDQUFDO1FBRTdCOzs7Ozs7OztXQVFHO1FBQ0gsNEJBQXVCLEdBQUcsRUFBRSxDQUFDO1FBRTdCOzs7Ozs7OztXQVFHO1FBQ0gsbUJBQWMsR0FBRyxDQUFDLENBQUM7UUFvQ2pCLHFEQUFxRDtRQUNyRCxJQUFJLENBQUMsQ0FBQyxPQUFPLFlBQVksZ0JBQWdCLENBQUMsRUFBRTtZQUMxQyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM5RDthQUFNO1lBQ0wsSUFBSSxDQUFDLHVCQUF1QixHQUFHLE9BQU8sQ0FBQztTQUN4QztJQUNILENBQUM7SUF4Q0Q7Ozs7Ozs7OztPQVNH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