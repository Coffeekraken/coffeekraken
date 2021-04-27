// @ts-nocheck
import __convert from '@coffeekraken/sugar/shared/time/convert';
/**
 * @name 	              	SRequestConfig
 * @namespace           sugar.js.http
 * @type                  Class
 * @status              wip
 *
 * Class that represent an ajax request that will be passed to an SRequest instance.
 * All the axios settings are supported by this class
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * const request = new SRequestConfig({
 *  	url : '/api/...',
 *  	method : 'GET',
 *  	data : {
 *  		myVar : 'myVal'
 *  	}
 * });
 *
 * @see       https://github.com/axios/axios
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default class SRequestConfig {
    /**
     * @name                        constructor
     * @type                        Function
     *
     * Constructor
     *
     * @param 	      {Object} 	          params 		              The request params in object format
     */
    constructor(params) {
        /**
         * @name                    url
         * @type                    String
         * @default                 null
         *
         * The url to call
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.url = null;
        /**
         * @name                      baseURL
         * @type                      String
         * @default                   null
         *
         * Specify the base url to call like "https://api.github.com/2.0" for example.
         * If the "url" setting is absolute, this setting will don't have any impact on your request...
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.baseURL = null;
        /**
         * @name                      method
         * @type                      String
         * @values                    GET,DELETE,HEAD,OPTIONS,POST,PUT,PATCH
         * @default                   GET
         *
         * The request method to use like GET, POST, DELETE or PUT
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.method = 'GET';
        /**
         * @name                      headers
         * @type                      Object
         * @default                   {}
         *
         * Specify some headers to add to the request
         *
         * @example             js
         * {
         *    'X-Requested-With': 'XMLHttpRequest'
         * }
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.headers = {};
        /**
         * @name                  params
         * @type                  Object
         * @default               {}
         *
         * Specify some params to be sent through the URL.
         * Must be a plain object or a URLSearchParams object
         *
         * @example             js
         * {
         *    myCoolData: 'Hello world'
         * }
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.params = {};
        /**
         * @name                      data
         * @type                      String|Object|ArrayBuffer|ArrayBufferView|URLSearchParams|FormData|File|Blob|Stream|Buffer
         * @default                   {}
         *
         * Specify some data you want to send with the request.
         * This setting is available only for 'PUT', 'POST', and 'PATCH' requests...
         *
         * @example                 js
         * {
         *    firstName: 'Fred'
         * }
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.data = {};
        /**
         * @name                  timeout
         * @type                  Number
         * @default               0 (no timeout)
         *
         * Specify time to wait before aborting the actual request. If setted in number format, this will mean milliseconds.
         * You can also specify this settings using string format like so: '2s', '1h', '4m', etc...
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.timeout = 0;
        /**
         * @name                      sendInterval
         * @type                      Number
         * @setting
         * @default                   1000
         *
         * Set the interval time between each requests if the sendCount setting is specified.
         * If setted in number format, this is taken as millisenconds. You can also set the interval
         * in string format like '34s', '1h', '10ms', '2d', etc...
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.sendInterval = 1000;
        /**
         * @name                        sendCount
         * @type                        Number
         * @setting
         * @default                     1
         *
         * Set how many times the request has to be sent
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.sendCount = 1;
        /**
         * @name                   everyResponse
         * @type                    Function
         * @default                 null
         *
         * Specify a function to call on every response. The parameters passed to the function are:
         * - response {Object}: The actual request response
         * - requestIdx {Number}: The request index
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.everyResponse = null;
        /**
         * @name                  responseType
         * @type                  String
         * @values                arraybuffer, document, json, text, stream, blob (browser only)
         * @default               json
         *
         * Indicates the type of data that the server will respond with
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.responseType = 'json';
        // process params that need something
        if (params.timeout && typeof params.timeout === 'string')
            params.timeout = __convert(params.timeout, 'ms');
        if (params.sendInterval && typeof params.sendInterval === 'string')
            params.sendInterval = __convert(params.sendInterval, 'ms');
        // set the parameters
        Object.assign(this, params);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1JlcXVlc3RDb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9odHRwL3MtcmVxdWVzdC9zcmMvc2hhcmVkL1NSZXF1ZXN0Q29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFNBQVMsTUFBTSx5Q0FBeUMsQ0FBQztBQUVoRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sY0FBYztJQXFKakM7Ozs7Ozs7T0FPRztJQUNILFlBQVksTUFBTTtRQTVKbEI7Ozs7Ozs7O1dBUUc7UUFDSCxRQUFHLEdBQUcsSUFBSSxDQUFDO1FBRVg7Ozs7Ozs7OztXQVNHO1FBQ0gsWUFBTyxHQUFHLElBQUksQ0FBQztRQUVmOzs7Ozs7Ozs7V0FTRztRQUNILFdBQU0sR0FBRyxLQUFLLENBQUM7UUFFZjs7Ozs7Ozs7Ozs7OztXQWFHO1FBQ0gsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUViOzs7Ozs7Ozs7Ozs7OztXQWNHO1FBQ0gsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUVaOzs7Ozs7Ozs7Ozs7OztXQWNHO1FBQ0gsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUVWOzs7Ozs7Ozs7V0FTRztRQUNILFlBQU8sR0FBRyxDQUFDLENBQUM7UUFFWjs7Ozs7Ozs7Ozs7V0FXRztRQUNILGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBRXBCOzs7Ozs7Ozs7V0FTRztRQUNILGNBQVMsR0FBRyxDQUFDLENBQUM7UUFFZDs7Ozs7Ozs7OztXQVVHO1FBQ0gsa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFFckI7Ozs7Ozs7OztXQVNHO1FBQ0gsaUJBQVksR0FBRyxNQUFNLENBQUM7UUFXcEIscUNBQXFDO1FBQ3JDLElBQUksTUFBTSxDQUFDLE9BQU8sSUFBSSxPQUFPLE1BQU0sQ0FBQyxPQUFPLEtBQUssUUFBUTtZQUN0RCxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25ELElBQUksTUFBTSxDQUFDLFlBQVksSUFBSSxPQUFPLE1BQU0sQ0FBQyxZQUFZLEtBQUssUUFBUTtZQUNoRSxNQUFNLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTdELHFCQUFxQjtRQUNyQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBQ0YifQ==