// @ts-nocheck
import __appendScriptTag from '../dom/appendScriptTag';
import __innerHtml from '../dom/innerHtml';
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
                __innerHtml($node, data, Object.assign(Object.assign({}, (settings.innerHtml || {})), { action: 'append' }));
                break;
            case 'replace':
                __innerHtml($node, data, settings.innerHtml);
                break;
            case 'prepend':
                __innerHtml($node, data, Object.assign(Object.assign({}, (settings.innerHtml || {})), { action: 'prepend' }));
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
    _eventBody(data, settings) {
        __innerHtml(document.body, data, settings.innerHtml || {});
    }
    /**
     * Handle the 'content' event
     *
     * @param         {String}          data        The data passed with the event
     * @param         {Object}          settings    Tge settubgs passed with the event
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    _eventContent(data, settings) {
        let $content = document.getElementById('content') || document.querySelector('[content]');
        if (!$content)
            return;
        __innerHtml($content, data, settings.innerHtml || {});
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
    emit(event, data = {}) {
        this._socket.emit(`SSocketDom.${event}`, data);
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
export default SSocketDom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1NvY2tldERvbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTb2NrZXREb20udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8saUJBQWlCLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxXQUFXLE1BQU0sa0JBQWtCLENBQUM7QUFFM0M7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sVUFBVTtJQXFEZDs7Ozs7O09BTUc7SUFDSCxZQUFZLFNBQVMsRUFBRSxRQUFRLEdBQUcsRUFBRTtRQTNEcEM7OztXQUdHO1FBQ0gsZUFBVSxHQUFHLHFCQUFxQixDQUFDO1FBRW5DOzs7V0FHRztRQUNILGNBQVMsR0FBRztZQUNWOzs7Ozs7Ozs7ZUFTRztZQUNILElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTtZQUVuQjs7Ozs7Ozs7Ozs7OztlQWFHO1lBQ0gsTUFBTSxFQUFFLFNBQVM7WUFFakI7Ozs7Ozs7OztlQVNHO1lBQ0gsTUFBTSxFQUFFLEVBQUU7U0FDWCxDQUFDO1FBVUEsb0JBQW9CO1FBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxTQUFTLG1DQUNULElBQUksQ0FBQyxTQUFTLEdBQ2QsUUFBUSxDQUNaLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsSUFBSTtRQUNGLGdDQUFnQztRQUNoQyxPQUFPLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ3BDLDhCQUE4QjtZQUM5QixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDdEQsNEJBQTRCO1lBQzVCLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM1QywrQkFBK0I7WUFDL0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEs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