"use strict";

var _temp;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name                            SAuthAdapter
 * @namespace           node.auth.adapters
 * @type                            Class
 *
 * Base SAuth adapter class that has to be the base of each SAuthAdapters
 *
 * @example         js
 * const SAuthAdapter = require('@coffeekraken/sugar/node/auth/adapters/SAuthAdapter');
 * class MyCoolAdapter extends SAuthAdapter {
 *    construct() {
 *      super();
 *    }
 * }
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (_temp = /*#__PURE__*/function () {
  /**
   * @name                          _supportedAuthTypes
   * @type                          Array
   * @private
   *
   * Store the supported auth types by the current auth adapter
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name                          constructor
   * @type                          Function
   *
   * Construct the SAuthAdapter instance
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SAuthAdapter(authTypes) {
    _classCallCheck(this, SAuthAdapter);

    _defineProperty(this, "_supportedAuthTypes", []);

    // store the supported auth types
    this._supportedAuthTypes = authTypes;
  }
  /**
   * @name                          supportedAuthTypes
   * @type                          Array
   *
   * Access the supported auth types for this adapter
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SAuthAdapter, [{
    key: "ask",

    /**
     * @name                            ask
     * @type                            Function
     * @async
     *
     * Ask form some auth informations depending on the auth type you want and the supported auth types of the selected adapter
     *
     * @param         {Object}              [settings={}]
     * - type (settings.type) {String}: Specify the auth type you want to ask like "basic", "bearer", "oauth2", etc...
     * - title (null) {String}: Specify the title to display on top of the form
     * - error (null) {String}: An error message to display to the user. Can be something like "Your credentials have been declined. Please try again..."
     * - info (null) {String}: An info message to display to the user
     *
     * @example           js
     * const authInfos = await myAuth.ask({
     *    type: 'basic'
     * });
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    value: function () {
      var _ask = _asyncToGenerator(function* (settings) {
        if (settings === void 0) {
          settings = {};
        }

        // make sure the adapter support the auth type requested
        if (!this["_".concat(settings.type)]) {
          throw new Error("You try to ask the user for \"".concat(settings.type, "\" auth informations but this auth type is not supported by the current adapter..."));
        } // get the auth info using the adapter


        var infos = yield this["_".concat(settings.type)](settings);
        return infos;
      });

      function ask(_x) {
        return _ask.apply(this, arguments);
      }

      return ask;
    }()
  }, {
    key: "supportedAuthTypes",
    get: function get() {
      return this._supportedAuthTypes;
    }
  }]);

  return SAuthAdapter;
}(), _temp);