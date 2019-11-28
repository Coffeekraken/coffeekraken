"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name 		SAjaxRequest
 * Class that represent an ajax request that will be passed to an SAjax instance
 * @example 	js
 * const request = new SAjaxRequest({
 *  	url : '/api/...',
 *  	method : 'GET',
 *  	data : {
 *  		myVar : 'myVal'
 *  	}
 * });
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
class SAjaxRequest {
  /**
   * The url to call
   * @type 	{String}
   */

  /**
   * The request method to use like GET, POST, DELETE or PUT
   * @type 		{String}
   */

  /**
   * Use the CORS or not (only for IE)
   * @type 		{Boolean}
   */

  /**
   * Use the cache or not
   * @type 		{Boolean}
   */

  /**
   * The data that will be sent with the request in JSON format
   * @type 		{Object}
   */

  /**
   * The data type expected from the response
   * Accepted dataType are : text | json | html
   * @type 		{String}
   */

  /**
   * Set the content type header to send with the request
   * @type 		{String}
   */

  /**
   * Set the X-Requested-With header
   * @type 		{String}
   */

  /**
   * Set the Authorization header
   * @type 		{String}
   */

  /**
   * Set additional headers to send with the request
   * @type 		{Object}
   */

  /**
   * @constructor
   * @param 	{Object} 	params 		The request params
   */
  constructor(params) {
    _defineProperty(this, "url", null);

    _defineProperty(this, "method", "GET");

    _defineProperty(this, "cors", true);

    _defineProperty(this, "cache", true);

    _defineProperty(this, "data", null);

    _defineProperty(this, "dataType", "text");

    _defineProperty(this, "contentType", null);

    _defineProperty(this, "requestedWith", "XMLHttpRequest");

    _defineProperty(this, "auth", null);

    _defineProperty(this, "headers", null);

    // check parameters
    if (!this._checkParams(params)) return; // set the parameters

    Object.assign(this, params);
  }
  /**
   * Check the parameters passed to the request
   * @param 	(Object) 	params 	 	The request params
   * @return 	{Boolean} 				True if params are ok, false if
   */


  _checkParams(params) {
    // loop on each params
    for (let key in params) {
      if (!this.hasOwnProperty(key)) {
        throw `The SAjaxRequest does not support the passed "${key}" parameter...`;
        return false;
      }
    } // all ok


    return true;
  }

}

exports.default = SAjaxRequest;
module.exports = exports.default;