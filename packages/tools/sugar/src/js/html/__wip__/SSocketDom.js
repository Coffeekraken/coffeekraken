// @ts-nocheck
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../dom/appendScriptTag", "../dom/innerHtml"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var appendScriptTag_1 = __importDefault(require("../dom/appendScriptTag"));
    var innerHtml_1 = __importDefault(require("../dom/innerHtml"));
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
    var SSocketDom = /** @class */ (function () {
        /**
         * @constructor
         * @param       {String}        serverUrl           The url to connect to the socket.io server
         * @param       {Object}        [settings={}]       The settings to configure your SSocketDom instance
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        function SSocketDom(serverUrl, settings) {
            if (settings === void 0) { settings = {}; }
            /**
             * Server URL
             * @type      String
             */
            this._serverUrl = 'http://localhost:80';
            /**
             * Settings
             * @type    Object
             */
            this._settings = {
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
            };
            // save some params:
            this._serverUrl = serverUrl;
            this._settings = __assign(__assign({}, this._settings), settings);
        }
        /**
         * Init the Socket connection
         *
         * @return      {Promise}               A promise that will be resolved when the connection is inited
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SSocketDom.prototype.init = function () {
            var _this_1 = this;
            // init the socket.io connection
            return this._initSocketIo().then(function () {
                // register the default events
                _this_1.registerEvent('innerHtml', _this_1._eventInnerHtml);
                // register the 'body' event
                _this_1.registerEvent('body', _this_1._eventBody);
                // register the 'content' event
                _this_1.registerEvent('content', _this_1._eventContent);
            });
        };
        /**
         * Init socket.io
         */
        SSocketDom.prototype._initSocketIo = function () {
            var _this_1 = this;
            var _this = this;
            // append the socket IO script:
            return appendScriptTag_1.default('/socket.io/socket.io.js').then(function () {
                // init the socket.io connection
                _this._socket = window.io.connect(_this_1._serverUrl);
            });
        };
        /**
         * Handle the html event
         *
         * @param         {String}        data        The data passed with the event
         * @param         {Object}        settings    The settings passed with the event
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SSocketDom.prototype._eventInnerHtml = function (data, settings) {
            // try to get the node inside the document
            var $node = settings.node;
            if (typeof $node === 'string')
                $node = document.querySelector($node);
            // switch on the action to execute
            switch (settings.action) {
                case 'append':
                    innerHtml_1.default($node, data, __assign(__assign({}, (settings.innerHtml || {})), { action: 'append' }));
                    break;
                case 'replace':
                    innerHtml_1.default($node, data, settings.innerHtml);
                    break;
                case 'prepend':
                    innerHtml_1.default($node, data, __assign(__assign({}, (settings.innerHtml || {})), { action: 'prepend' }));
                    break;
            }
        };
        /**
         * Handle the 'body' event
         *
         * @param         {String}          data        The data passed with the event
         * @param         {Object}          settings    Tge settubgs passed with the event
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SSocketDom.prototype._eventBody = function (data, settings) {
            innerHtml_1.default(document.body, data, settings.innerHtml || {});
        };
        /**
         * Handle the 'content' event
         *
         * @param         {String}          data        The data passed with the event
         * @param         {Object}          settings    Tge settubgs passed with the event
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SSocketDom.prototype._eventContent = function (data, settings) {
            var $content = document.getElementById('content') || document.querySelector('[content]');
            if (!$content)
                return;
            innerHtml_1.default($content, data, settings.innerHtml || {});
        };
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
        SSocketDom.prototype.emit = function (event, data) {
            if (data === void 0) { data = {}; }
            this._socket.emit("SSocketDom." + event, data);
            return this;
        };
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
        SSocketDom.prototype.registerEvent = function (event, handlerFn, settings) {
            var _this_1 = this;
            if (settings === void 0) { settings = {}; }
            // save the event scoped settings in the global settings:
            this._settings.events[event] = settings;
            // listen for the event from the server:
            this._socket.on("SSocketDom." + event, function (data) {
                if (data === void 0) { data = {}; }
                // grab the data from the event
                var d = data.data;
                // delete the data from the event
                delete data.data;
                // call the handler function with the data from the server and the settings
                handlerFn(d, __assign(__assign(__assign({}, _this_1._settings), _this_1._settings.events[event]), (data || {})));
            });
            // maintain chainability
            return this;
        };
        return SSocketDom;
    }());
    exports.default = SSocketDom;
});
//# sourceMappingURL=SSocketDom.js.map