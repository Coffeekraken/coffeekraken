import __convert from '../time/convert';

/**
 * @name 	              	SRequestConfig
 * @namespace              sugar.js.http
 * @type                  Class
 *
 * Class that represent an ajax request that will be passed to an SRequest instance.
 * All the axios settings are supported by this class
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
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default class SRequestConfig {

  /**
   * @name                    url
   * @type                    String
   * @default                 null
   * 
   * The url to call
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  url = null;

  /**
   * @name                      baseURL
   * @type                      String
   * @default                   null
   * 
   * Specify the base url to call like "https://api.github.com/2.0" for example.
   * If the "url" setting is absolute, this setting will don't have any impact on your request...
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  baseURL = null;

  /**
   * @name                      method
   * @type                      String
   * @values                    GET,DELETE,HEAD,OPTIONS,POST,PUT,PATCH
   * @default                   GET
   * 
   * The request method to use like GET, POST, DELETE or PUT
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  method = "GET";

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
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  headers = {};

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
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  params = {};

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
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  data = {};

  /**
   * @name                  timeout
   * @type                  Number
   * @default               0 (no timeout)
   * 
   * Specify time to wait before aborting the actual request. If setted in number format, this will mean milliseconds.
   * You can also specify this settings using string format like so: '2s', '1h', '4m', etc...
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  timeout = 0;

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
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  sendInterval = 1000;

  /**
   * @name                        sendCount
   * @type                        Number
   * @setting
   * @default                     1
   * 
   * Set how many times the request has to be sent
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  sendCount = 1;

  /**
   * @name                   everyResponse
   * @type                    Function
   * @default                 null
   * 
   * Specify a function to call on every response. The parameters passed to the function are:
   * - response {Object}: The actual request response
   * - requestIdx {Number}: The request index
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  everyResponse = null;

  /**
   * @name                  responseType
   * @type                  String
   * @values                arraybuffer, document, json, text, stream, blob (browser only)
   * @default               json
   * 
   * Indicates the type of data that the server will respond with
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  responseType = 'json';

  /**
   * @name                        constructor
   * @type                        Function
   * 
   * Constructor
   * 
   * @param 	      {Object} 	          params 		              The request params in object format
   */
  constructor(params) {
    // process params that need something
    if (params.timeout && typeof params.timeout === 'string') params.timeout = __convert(params.timeout, 'ms');
    if (params.sendInterval && typeof params.sendInterval === 'string') params.sendInterval = __convert(params.sendInterval, 'ms');

    // set the parameters
    Object.assign(this, params);
  }
}
