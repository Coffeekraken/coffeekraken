// @ts-nocheck
import { __animatedInnerHtml } from '@coffeekrakem/sugar/dom';
import __appendScriptTag from '../dom/appendScriptTag';
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
        return __appendScriptTag('/socket.io/socket.io.js').then(() => {
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
                __animatedInnerHtml($node, data, Object.assign(Object.assign({}, (settings.innerHtml || {})), { action: 'append' }));
                break;
            case 'replace':
                __animatedInnerHtml($node, data, settings.innerHtml);
                break;
            case 'prepend':
                __animatedInnerHtml($node, data, Object.assign(Object.assign({}, (settings.innerHtml || {})), { action: 'prepend' }));
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
        __animatedInnerHtml(document.body, data, settings.innerHtml || {});
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
        __animatedInnerHtml($content, data, settings.innerHtml || {});
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
export default SSocketDom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLGlCQUFpQixNQUFNLHdCQUF3QixDQUFDO0FBRXZEOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsTUFBTSxVQUFVO0lBcURaOzs7Ozs7T0FNRztJQUNILFlBQVksU0FBUyxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBM0RwQzs7O1dBR0c7UUFDSCxlQUFVLEdBQUcscUJBQXFCLENBQUM7UUFFbkM7OztXQUdHO1FBQ0gsYUFBUSxHQUFHO1lBQ1A7Ozs7Ozs7OztlQVNHO1lBQ0gsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO1lBRW5COzs7Ozs7Ozs7Ozs7O2VBYUc7WUFDSCxNQUFNLEVBQUUsU0FBUztZQUVqQjs7Ozs7Ozs7O2VBU0c7WUFDSCxNQUFNLEVBQUUsRUFBRTtTQUNiLENBQUM7UUFVRSxvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsbUNBQ04sSUFBSSxDQUFDLFFBQVEsR0FDYixRQUFRLENBQ2QsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxJQUFJO1FBQ0EsZ0NBQWdDO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDbEMsOEJBQThCO1lBQzlCLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN0RCw0QkFBNEI7WUFDNUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzVDLCtCQUErQjtZQUMvQixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMs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