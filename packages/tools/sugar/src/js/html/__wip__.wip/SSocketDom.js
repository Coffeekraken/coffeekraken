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
        define(["require", "exports", "../dom/appendScriptTag", "../dom/innerHtml"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const appendScriptTag_1 = __importDefault(require("../dom/appendScriptTag"));
    const innerHtml_1 = __importDefault(require("../dom/innerHtml"));
    /**
     * @name            syncDom
     * @namespace            js.socket
     * @type            Function
     * @status        wip
     *
     * Simply connect to a backend socket.io server and listen for specifics messages from it to refresh automatically the DOM.
     * The messages that are listened are:
     * - 'SSocketDom.html': Used to send some html to "inject/replace" in the current page HTML
     * - 'SSocketDom.script': Used to add a script tag to the page
     * - 'SSocketDom.style': Used to add a style tag to the page
     */
    class SSocketDom {
        /**
         * @constructor
         * @param       {String}        serverUrl           The url to connect to the socket.io server
         * @param       {Object}        [settings={}]       The settings to configure your SSocketDom instance
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        constructor(serverUrl, settings = {}) {
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
                 * @namespace            js.class
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
                 * @namespace            js.class
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
            this._settings = Object.assign(Object.assign({}, this._settings), settings);
        }
        /**
         * Init the Socket connection
         *
         * @return      {Promise}               A promise that will be resolved when the connection is inited
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        init() {
            // init the socket.io connection
            return this._initSocketIo().then(() => {
                // register the default events
                this.registerEvent('innerHtml', this._eventInnerHtml);
                // register the 'body' event
                this.registerEvent('body', this._eventBody);
                // register the 'content' event
                this.registerEvent('content', this._eventContent);
            });
        }
        /**
         * Init socket.io
         */
        _initSocketIo() {
            const _this = this;
            // append the socket IO script:
            return appendScriptTag_1.default('/socket.io/socket.io.js').then(() => {
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
        _eventInnerHtml(data, settings) {
            // try to get the node inside the document
            let $node = settings.node;
            if (typeof $node === 'string')
                $node = document.querySelector($node);
            // switch on the action to execute
            switch (settings.action) {
                case 'append':
                    innerHtml_1.default($node, data, Object.assign(Object.assign({}, (settings.innerHtml || {})), { action: 'append' }));
                    break;
                case 'replace':
                    innerHtml_1.default($node, data, settings.innerHtml);
                    break;
                case 'prepend':
                    innerHtml_1.default($node, data, Object.assign(Object.assign({}, (settings.innerHtml || {})), { action: 'prepend' }));
                    break;
            }
        }
        /**
         * Handle the 'body' event
         *
         * @param         {String}          data        The data passed with the event
         * @param         {Object}          settings    Tge settubgs passed with the event
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        _eventBody(data, settings) {
            innerHtml_1.default(document.body, data, settings.innerHtml || {});
        }
        /**
         * Handle the 'content' event
         *
         * @param         {String}          data        The data passed with the event
         * @param         {Object}          settings    Tge settubgs passed with the event
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        _eventContent(data, settings) {
            let $content = document.getElementById('content') || document.querySelector('[content]');
            if (!$content)
                return;
            innerHtml_1.default($content, data, settings.innerHtml || {});
        }
        /**
         * @name          emit
         * @namespace            js.class
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
        emit(event, data = {}) {
            this._socket.emit(`SSocketDom.${event}`, data);
            return this;
        }
        /**
         * @name          registerEvent
         * @namespace            js.class
         * @type          Function
         *
         * Register a new event with an handler function that will handle the event content
         *
         * @param         {String}        event         The event name that you want to listen from the server
         * @param          {Function}     handlerFn      The function that will handle the event content.
         * @return         {SSocketDom}                  The SSocketDom instance to maintain chainability
         *
         * @example     js
         * myCoolSocketDomInstance.registerEvent('hello', (data, settings) => {
         *    // do something with the event content and the settings
         * });
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        registerEvent(event, handlerFn, settings = {}) {
            // save the event scoped settings in the global settings:
            this._settings.events[event] = settings;
            // listen for the event from the server:
            this._socket.on(`SSocketDom.${event}`, (data = {}) => {
                // grab the data from the event
                const d = data.data;
                // delete the data from the event
                delete data.data;
                // call the handler function with the data from the server and the settings
                handlerFn(d, Object.assign(Object.assign(Object.assign({}, this._settings), this._settings.events[event]), (data || {})));
            });
            // maintain chainability
            return this;
        }
    }
    exports.default = SSocketDom;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1NvY2tldERvbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTb2NrZXREb20udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsNkVBQXVEO0lBQ3ZELGlFQUEyQztJQUUzQzs7Ozs7Ozs7Ozs7T0FXRztJQUNILE1BQU0sVUFBVTtRQXFEZDs7Ozs7O1dBTUc7UUFDSCxZQUFZLFNBQVMsRUFBRSxRQUFRLEdBQUcsRUFBRTtZQTNEcEM7OztlQUdHO1lBQ0gsZUFBVSxHQUFHLHFCQUFxQixDQUFDO1lBRW5DOzs7ZUFHRztZQUNILGNBQVMsR0FBRztnQkFDVjs7Ozs7Ozs7O21CQVNHO2dCQUNILElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTtnQkFFbkI7Ozs7Ozs7Ozs7Ozs7bUJBYUc7Z0JBQ0gsTUFBTSxFQUFFLFNBQVM7Z0JBRWpCOzs7Ozs7Ozs7bUJBU0c7Z0JBQ0gsTUFBTSxFQUFFLEVBQUU7YUFDWCxDQUFDO1lBVUEsb0JBQW9CO1lBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1lBQzVCLElBQUksQ0FBQyxTQUFTLG1DQUNULElBQUksQ0FBQyxTQUFTLEdBQ2QsUUFBUSxDQUNaLENBQUM7UUFDSixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0gsSUFBSTtZQUNGLGdDQUFnQztZQUNoQyxPQUFPLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNwQyw4QkFBOEI7Z0JBQzlCLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDdEQsNEJBQTRCO2dCQUM1QixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzVDLCtCQUErQjtnQkFDL0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lB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