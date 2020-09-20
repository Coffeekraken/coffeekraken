"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _appendScriptTag = _interopRequireDefault(require("../dom/appendScriptTag"));

var _innerHtml = _interopRequireDefault(require("../dom/innerHtml"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name            syncDom
 * @namespace           sugar.js.socket
 * @type            Function
 *
 * Simply connect to a backend socket.io server and listen for specifics messages from it to refresh automatically the DOM.
 * The messages that are listened are:
 * - 'SSocketDom.html': Used to send some html to "inject/replace" in the current page HTML
 * - 'SSocketDom.script': Used to add a script tag to the page
 * - 'SSocketDom.style': Used to add a style tag to the page
 */
var SSocketDom = /*#__PURE__*/function () {
  /**
   * Server URL
   * @type      String
   */

  /**
   * Settings
   * @type    Object
   */

  /**
   * @constructor
   * @param       {String}        serverUrl           The url to connect to the socket.io server
   * @param       {Object}        [settings={}]       The settings to configure your SSocketDom instance
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  function SSocketDom(serverUrl, settings) {
    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SSocketDom);

    _defineProperty(this, "_serverUrl", 'http://localhost:80');

    _defineProperty(this, "_settings", {
      /**
       * @name      settings.node
       * @namespace           sugar.js.class
       * @type        HTMLElement
       *
       * The root node where the html contents will be injected if no node is passed with the event
       *
       * @setting
       * @default       document.body
       */
      node: document.body,

      /**
       * @name        settings.action
       * @namespace           js class
       * @type        String
       *
       * Specify which action will be executed if no one is passed with the event.
       * It can be one of these:
       * - 'append': Will append the HTML content to the existing one
       * - 'replace': Will replace the HTML content with the new one
       * - 'prepend': Will inject the HTML content before the existing one
       *
       * @setting
       * @default     'replace'
       */
      action: 'replace',

      /**
       * @name          settings.events
       * @namespace           sugar.js.class
       * @type          Object
       *
       * Save the events scoped settings objects
       *
       * @setting
       * @default     {}
       */
      events: {}
    });

    // save some params:
    this._serverUrl = serverUrl;
    this._settings = _objectSpread(_objectSpread({}, this._settings), settings);
  }
  /**
   * Init the Socket connection
   *
   * @return      {Promise}               A promise that will be resolved when the connection is inited
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  _createClass(SSocketDom, [{
    key: "init",
    value: function init() {
      // init the socket.io connection
      return this._initSocketIo().then(() => {
        // register the default events
        this.registerEvent('innerHtml', this._eventInnerHtml); // register the 'body' event

        this.registerEvent('body', this._eventBody); // register the 'content' event

        this.registerEvent('content', this._eventContent);
      });
    }
    /**
     * Init socket.io
     */

  }, {
    key: "_initSocketIo",
    value: function _initSocketIo() {
      var _this = this; // append the socket IO script:


      return (0, _appendScriptTag.default)('/socket.io/socket.io.js').then(() => {
        // init the socket.io connection
        _this._socket = window.io.connect(this._serverUrl);
      });
    }
    /**
     * Handle the html event
     *
     * @param         {String}        data        The data passed with the event
     * @param         {Object}        settings    The settings passed with the event
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "_eventInnerHtml",
    value: function _eventInnerHtml(data, settings) {
      // try to get the node inside the document
      var $node = settings.node;
      if (typeof $node === 'string') $node = document.querySelector($node); // switch on the action to execute

      switch (settings.action) {
        case 'append':
          (0, _innerHtml.default)($node, data, _objectSpread(_objectSpread({}, settings.innerHtml || {}), {}, {
            action: 'append'
          }));
          break;

        case 'replace':
          (0, _innerHtml.default)($node, data, settings.innerHtml);
          break;

        case 'prepend':
          (0, _innerHtml.default)($node, data, _objectSpread(_objectSpread({}, settings.innerHtml || {}), {}, {
            action: 'prepend'
          }));
          break;
      }
    }
    /**
     * Handle the 'body' event
     *
     * @param         {String}          data        The data passed with the event
     * @param         {Object}          settings    Tge settubgs passed with the event
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "_eventBody",
    value: function _eventBody(data, settings) {
      (0, _innerHtml.default)(document.body, data, settings.innerHtml || {});
    }
    /**
     * Handle the 'content' event
     *
     * @param         {String}          data        The data passed with the event
     * @param         {Object}          settings    Tge settubgs passed with the event
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "_eventContent",
    value: function _eventContent(data, settings) {
      var $content = document.getElementById('content') || document.querySelector('[content]');
      if (!$content) return;
      (0, _innerHtml.default)($content, data, settings.innerHtml || {});
    }
    /**
     * @name          emit
     * @namespace           sugar.js.class
     * @type          Function
     *
     * Emit an event with an object containing some values to pass to the server
     *
     * @param         {String}        event         The event name that you want to emit to the server. It will be prefixed by 'SSocketDom.'
     * @param         {Object}        [data={}]      The data that you want to pass to the server with the event
     * @return        {SSocketDom}                  The SSocketDom instance to maintain chainability
     *
     * @example       js
     * myCoolSocketDomInstance.emit('coco', { hello: 'world' });
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "emit",
    value: function emit(event, data) {
      if (data === void 0) {
        data = {};
      }

      this._socket.emit("SSocketDom.".concat(event), data);

      return this;
    }
    /**
     * @name          registerEvent
     * @namespace           sugar.js.class
     * @type          Function
     *
     * Register a new event with an handler function that will handle the event content
     *
     * @param         {String}        event         The event name that you want to listen from the server
     * @param          {Function}     handlerFn      The function that will handle the event content.
     * @return         {SSocketDom}                  The SSocketDom instance to maintain chainability
     *
     * @example     js
     * myCoolSocketDomInstance.registerEvent('hello', (data, settings) => {
     *    // do something with the event content and the settings
     * });
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "registerEvent",
    value: function registerEvent(event, handlerFn, settings) {
      var _this2 = this;

      if (settings === void 0) {
        settings = {};
      }

      // save the event scoped settings in the global settings:
      this._settings.events[event] = settings; // listen for the event from the server:

      this._socket.on("SSocketDom.".concat(event), function (data) {
        if (data === void 0) {
          data = {};
        }

        // grab the data from the event
        var d = data.data; // delete the data from the event

        delete data.data; // call the handler function with the data from the server and the settings

        handlerFn(d, _objectSpread(_objectSpread(_objectSpread({}, _this2._settings), _this2._settings.events[event]), data || {}));
      }); // maintain chainability


      return this;
    }
  }]);

  return SSocketDom;
}();

var _default = SSocketDom;
exports.default = _default;
module.exports = exports.default;