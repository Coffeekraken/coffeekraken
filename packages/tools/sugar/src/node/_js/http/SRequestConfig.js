"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _convert = _interopRequireDefault(require("../time/convert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name 	              	SRequestConfig
 * @namespace           sugar.js.http
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
var SRequestConfig =
/**
 * @name                    url
 * @type                    String
 * @default                 null
 *
 * The url to call
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

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

/**
 * @name                        constructor
 * @type                        Function
 *
 * Constructor
 *
 * @param 	      {Object} 	          params 		              The request params in object format
 */
function SRequestConfig(params) {
  _classCallCheck(this, SRequestConfig);

  _defineProperty(this, "url", null);

  _defineProperty(this, "baseURL", null);

  _defineProperty(this, "method", 'GET');

  _defineProperty(this, "headers", {});

  _defineProperty(this, "params", {});

  _defineProperty(this, "data", {});

  _defineProperty(this, "timeout", 0);

  _defineProperty(this, "sendInterval", 1000);

  _defineProperty(this, "sendCount", 1);

  _defineProperty(this, "everyResponse", null);

  _defineProperty(this, "responseType", 'json');

  // process params that need something
  if (params.timeout && typeof params.timeout === 'string') params.timeout = (0, _convert.default)(params.timeout, 'ms');
  if (params.sendInterval && typeof params.sendInterval === 'string') params.sendInterval = (0, _convert.default)(params.sendInterval, 'ms'); // set the parameters

  Object.assign(this, params);
};

exports.default = SRequestConfig;
module.exports = exports.default;