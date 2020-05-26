"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _deepMerge = _interopRequireDefault(require("../../object/deepMerge"));

var _node = _interopRequireDefault(require("../../is/node"));

var _smtp = _interopRequireDefault(require("./vendors/smtp.js"));

var _mail = _interopRequireDefault(require("../htmlPresets/mail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TODO finish the dev and make tests...

/**
 * @name                    SLogMailAdapter
 * @namespace               sugar.js.log
 * @type                    Class
 * 
 * This class allows you to log your messages, errors, etc... easily through some adapters that cover some targets like "console" of course,
 * "mail", "slack", etc...
 * 
 * @example               js
 * import SLog from '@coffeekraken/sugar/js/log/SLog';
 * import SLogMailAdapter from '@coffeekraken/sugar/js/log/adapters/SLogMailAdapter';
 * const logger = new SLog({
 *    adapters: {
 *      mail: new SLogMailAdapter()
 *    }
 * });
 * logger.log('Something cool happend...');
 * 
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
let SLogMailAdapter = /*#__PURE__*/function () {
  /**
   * @name          _settings
   * @type          Object
   * @private
   * 
   * Store this instance settings
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name          constructor
   * @type          Function
   * 
   * Constructor
   * 
   * @param         {Object}        [settings={}]           The settings object to configure your SLogMailAdapter instance. Here's the settings available:
   * - host (null) {String}: Your smtp server hostname
   * - username (null) {String}: Your smtp username if needed
   * - password (null) {String}: Your smtp password if needed
   * - secureToken (null) {String}: An SmtpJS secure token to avoid delivering your password online
   * - to (null) {String}: The email address where you want to send the logs
   * - from (null) {String}: The email address from which you want to send the logs
   * - subject ('[level] sugar.js.log') {String}: The mail title. You can use the [level] placeholder to be replaced with the actual log level
   * - body ('[content]') {String}: The mail body. You can use the [content] placeholder to be replaced with the actual log
   * - metas ({}) {Object}: An object that will be transformed into a list and place inside the mail [content]
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SLogMailAdapter(settings = {}) {
    _classCallCheck(this, SLogMailAdapter);

    _defineProperty(this, "_settings", {});

    // extend settings
    this._settings = (0, _deepMerge.default)({
      subject: "[level] sugar.js.log",
      body: "[content]",
      metas: {}
    }, settings);
  }
  /**
   * @name            log
   * @type            Function
   * @async
   * 
   * This is the main method of the logger. It actually log the message passed as parameter to the console
   * 
   * @param         {Mixed}          message            The message to log
   * @param         {String}         level              The log level. Can be "log", "info", "error", "debug" or "warn"
   * @return        {Promise}                           A promise that will be resolved once the message has been logged correctly
   * 
   * @example         js
   * await consoleAdapter.log('hello world');
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SLogMailAdapter, [{
    key: "log",
    value: async function log(message, level) {
      return new Promise(async (resolve, reject) => {
        let imageData = null;

        if (!_node.default) {
          const canvas = await html2canvas(document.body);
          imageData = canvas.toDataURL('image/jpeg');
        }

        let list = [];
        Object.keys(this._settings.metas).forEach(metaName => {
          list.push(`<li><strong>${metaName}</strong>: ${this._settings.metas[metaName]}</li>`);
        });
        const body = (0, _mail.default)(this._settings.body.replace('[content]', `
        ${message}
        <br /><br />
        ${list.join('<br />')}
      `));

        const subject = this._settings.subject.replace('[level]', level);

        let keys = Object.keys(this._settings);
        let newobj = {};
        keys.forEach(key => {
          if (['host', 'username', 'password', 'to', 'from', 'securetoken'].indexOf(key.toLowerCase()) === -1) return;
          newobj[key.charAt(0).toUpperCase() + key.slice(1)] = this._settings[key];
        });

        try {
          const _set = {
            Body: body,
            Subject: subject,
            ...newobj
          };

          if (imageData) {
            _set['Attachments'] = [{
              name: `screenshot.jpg`,
              data: imageData
            }];
          }

          delete _set.metas;

          _smtp.default.send(_set).then(message => {
            console.log('ME', message);
            resolve(message);
          }).catch(error => {
            console.log('ERROR', error);
            reject(error);
          });
        } catch (e) {
          console.error(e);
        }
      });
    }
  }]);

  return SLogMailAdapter;
}();

exports.default = SLogMailAdapter;
module.exports = exports.default;