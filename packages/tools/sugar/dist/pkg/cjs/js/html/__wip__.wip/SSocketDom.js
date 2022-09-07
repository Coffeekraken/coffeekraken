"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekrakem/sugar/dom");
const appendScriptTag_1 = __importDefault(require("../dom/appendScriptTag"));
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
        this.settings = {
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
            events: {},
        };
        // save some params:
        this._serverUrl = serverUrl;
        this.settings = Object.assign(Object.assign({}, this.settings), settings);
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
        return (0, appendScriptTag_1.default)('/socket.io/socket.io.js').then(() => {
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
                (0, dom_1.__animatedInnerHtml)($node, data, Object.assign(Object.assign({}, (settings.innerHtml || {})), { action: 'append' }));
                break;
            case 'replace':
                (0, dom_1.__animatedInnerHtml)($node, data, settings.innerHtml);
                break;
            case 'prepend':
                (0, dom_1.__animatedInnerHtml)($node, data, Object.assign(Object.assign({}, (settings.innerHtml || {})), { action: 'prepend' }));
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
        (0, dom_1.__animatedInnerHtml)(document.body, data, settings.innerHtml || {});
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
        let $content = document.getElementById('content') ||
            document.querySelector('[content]');
        if (!$content)
            return;
        (0, dom_1.__animatedInnerHtml)($content, data, settings.innerHtml || {});
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
        this.settings.events[event] = settings;
        // listen for the event from the server:
        this._socket.on(`SSocketDom.${event}`, (data = {}) => {
            // grab the data from the event
            const d = data.data;
            // delete the data from the event
            delete data.data;
            // call the handler function with the data from the server and the settings
            handlerFn(d, Object.assign(Object.assign(Object.assign({}, this.settings), this.settings.events[event]), (data || {})));
        });
        // maintain chainability
        return this;
    }
}
exports.default = SSocketDom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGlEQUE4RDtBQUM5RCw2RUFBdUQ7QUFFdkQ7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFNLFVBQVU7SUFxRFo7Ozs7OztPQU1HO0lBQ0gsWUFBWSxTQUFTLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUEzRHBDOzs7V0FHRztRQUNILGVBQVUsR0FBRyxxQkFBcUIsQ0FBQztRQUVuQzs7O1dBR0c7UUFDSCxhQUFRLEdBQUc7WUFDUDs7Ozs7Ozs7O2VBU0c7WUFDSCxJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUk7WUFFbkI7Ozs7Ozs7Ozs7Ozs7ZUFhRztZQUNILE1BQU0sRUFBRSxTQUFTO1lBRWpCOzs7Ozs7Ozs7ZUFTRztZQUNILE1BQU0sRUFBRSxFQUFFO1NBQ2IsQ0FBQztRQVVFLG9CQUFvQjtRQUNwQixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxtQ0FDTixJQUFJLENBQUMsUUFBUSxHQUNiLFFBQVEsQ0FDZCxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILElBQUk7UUFDQSxnQ0FBZ0M7UUFDaEMsT0FBTyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNsQyw4QkFBOEI7WUFDOUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3RELDRCQUE0QjtZQUM1QixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDNUMsK0JBQStCO1lBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN0RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFF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