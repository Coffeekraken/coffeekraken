// @ts-nocheck

import __SClass from '@coffeekraken/s-class';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __axios from 'axios';
import __SRequestParamsInterface from './interface/SRequestParamsInterface.js';

/**
 * @name 		                    SRequest
 * @namespace           shared
 * @type                        Class
 * @platform            node
 * @platform            js
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
 * import SRequest from '@coffeekraken/s-request';
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISRequestSettings {}

export interface ISRequestParams {
    url: string;
    baseUrl?: string;
    method: 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH';
    headers: any;
    params: any;
    data: any;
    timeout: number;
}

export interface ISRequestAxiosResonse {
    data: any;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request: any;
}

export interface ISRequestResponse {
    status: number;
    statusText: string;
    data: any;
    count: number;
    axiosResponse: ISRequestAxiosResonse;
    axiosResponses: ISRequestAxiosResonse[];
}

export default class SRequest extends __SClass {
    /**
     * @name                      _defaultRequestParams
     * @type                      {SRequestConfig}
     * @private
     *
     * Store the request settings to use
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _defaultRequestParams = {};

    /**
     * @name                      _currentRequestSettings
     * @type                      {SRequestConfig}
     * @private
     *
     * Store the request settings to use
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _currentRequestSettings = {};

    /**
     * @name                      _requestsCount
     * @type                      Integer
     * @private
     *
     * Store how many requests have been sent
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _requestsCount = 0;

    /**
     * @name                              constructor
     * @type                              Function
     *
     * Constructor
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(
        params: Partial<ISRequestParams>,
        settings?: Partial<ISRequestSettings>,
    ) {
        super(__deepMerge({}, settings ?? {}));

        // if the request is not an SRequestConfig, create it
        this._defaultRequestParams = __SRequestParamsInterface.apply(
            params ?? {},
        );
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
        } catch (e) {}

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
        } else {
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
        } else if (error.request) {
            data.status = 404;
            data.statusText = 'Not Found';
            data.data = null;
        } else {
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
            requestSettings = __deepMerge(
                this._defaultRequestParams,
                requestSettings,
                {
                    sendCount: 0,
                },
            );
            if (requestSettings.beforeSend) {
                requestSettings = requestSettings.beforeSend(
                    requestSettings,
                    this._requestsCount,
                );
            }

            // save the current request settings
            this._currentRequestSettings = Object.assign(requestSettings);

            // create the new axios ajax instance
            __axios({
                validateStatus: function () {
                    return true;
                },
                ...requestSettings,
            })
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
    send(requestSettings = {}): Promise<ISRequestResponse> {
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
