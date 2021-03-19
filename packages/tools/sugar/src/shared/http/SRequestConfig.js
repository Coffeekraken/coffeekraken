// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../time/convert"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const convert_1 = __importDefault(require("../time/convert"));
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
    class SRequestConfig {
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
                params.timeout = convert_1.default(params.timeout, 'ms');
            if (params.sendInterval && typeof params.sendInterval === 'string')
                params.sendInterval = convert_1.default(params.sendInterval, 'ms');
            // set the parameters
            Object.assign(this, params);
        }
    }
    exports.default = SRequestConfig;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1JlcXVlc3RDb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUmVxdWVzdENvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCw4REFBd0M7SUFFeEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F5Qkc7SUFDSCxNQUFxQixjQUFjO1FBcUpqQzs7Ozs7OztXQU9HO1FBQ0gsWUFBWSxNQUFNO1lBNUpsQjs7Ozs7Ozs7ZUFRRztZQUNILFFBQUcsR0FBRyxJQUFJLENBQUM7WUFFWDs7Ozs7Ozs7O2VBU0c7WUFDSCxZQUFPLEdBQUcsSUFBSSxDQUFDO1lBRWY7Ozs7Ozs7OztlQVNHO1lBQ0gsV0FBTSxHQUFHLEtBQUssQ0FBQztZQUVmOzs7Ozs7Ozs7Ozs7O2VBYUc7WUFDSCxZQUFPLEdBQUcsRUFBRSxDQUFDO1lBRWI7Ozs7Ozs7Ozs7Ozs7O2VBY0c7WUFDSCxXQUFNLEdBQUcsRUFBRSxDQUFDO1lBRVo7Ozs7Ozs7Ozs7Ozs7O2VBY0c7WUFDSCxTQUFJLEdBQUcsRUFBRSxDQUFDO1lBRVY7Ozs7Ozs7OztlQVNHO1lBQ0gsWUFBTyxHQUFHLENBQUMsQ0FBQztZQUVaOzs7Ozs7Ozs7OztlQVdHO1lBQ0gsaUJBQVksR0FBRyxJQUFJLENBQUM7WUFFcEI7Ozs7Ozs7OztlQVNHO1lBQ0gsY0FBUyxHQUFHLENBQUMsQ0FBQztZQUVkOzs7Ozs7Ozs7O2VBVUc7WUFDSCxrQkFBYSxHQUFHLElBQUksQ0FBQztZQUVyQjs7Ozs7Ozs7O2VBU0c7WUFDSCxpQkFBWSxHQUFHLE1BQU0sQ0FBQztZQVdwQixxQ0FBcUM7WUFDckMsSUFBSSxNQUFNLENBQUMsT0FBTyxJQUFJLE9BQU8sTUFBTSxDQUFDLE9BQU8sS0FBSyxRQUFRO2dCQUN0RCxNQUFNLENBQUMsT0FBTyxHQUFHLGlCQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNuRCxJQUFJLE1BQU0sQ0FBQyxZQUFZLElBQUksT0FBTyxNQUFNLENBQUMsWUFBWSxLQUFLLFFBQVE7Z0JBQ2hFLE1BQU0sQ0FBQyxZQUFZLEdBQUcsaUJBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRTdELHFCQUFxQjtZQUNyQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM5QixDQUFDO0tBQ0Y7SUF2S0QsaUNBdUtDIn0=