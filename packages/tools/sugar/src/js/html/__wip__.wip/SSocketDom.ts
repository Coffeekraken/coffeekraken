// @ts-nocheck

import __appendScriptTag from '../dom/appendScriptTag';
import __innerHtml from '../dom/innerHtml';

/**
 * @name            syncDom
 * @namespace           sugar.js.socket
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
   * Server URL
   * @type      String
   */
  _serverUrl = 'http://localhost:80';

  /**
   * Settings
   * @type    Object
   */
  _settings = {
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

  /**
   * @constructor
   * @param       {String}        serverUrl           The url to connect to the socket.io server
   * @param       {Object}        [settings={}]       The settings to configure your SSocketDom instance
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  constructor(serverUrl, settings = {}) {
    // save some params:
    this._serverUrl = serverUrl;
    this._settings = {
      ...this._settings,
      ...settings
    };
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
    if (typeof $node === 'string') $node = document.querySelector($node);
    // switch on the action to execute
    switch (settings.action) {
      case 'append':
        __innerHtml($node, data, {
          ...(settings.innerHtml || {}),
          action: 'append'
        });
        break;
      case 'replace':
        __innerHtml($node, data, settings.innerHtml);
        break;
      case 'prepend':
        __innerHtml($node, data, {
          ...(settings.innerHtml || {}),
          action: 'prepend'
        });
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
    let $content =
      document.getElementById('content') || document.querySelector('[content]');
    if (!$content) return;
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
      handlerFn(d, {
        ...this._settings,
        ...this._settings.events[event],
        ...(data || {})
      });
    });
    // maintain chainability
    return this;
  }
}

export default SSocketDom;
