/**
*
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
/**
*
* Server URL
* @type      String

*/
/**
*
* Settings
* @type    Object

*/
/**
*
* @name      settings.node
* @namespace            js.class
* @type        HTMLElement
*
* The root node where the html contents will be injected if no node is passed with the event
*
* @setting
* @default       document.body

*/
/**
*
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
/**
*
* @name          settings.events
* @namespace            js.class
* @type          Object
*
* Save the events scoped settings objects
*
* @setting
* @default     {}

*/
/**
*
* @constructor
* @param       {String}        serverUrl           The url to connect to the socket.io server
* @param       {Object}        [settings={}]       The settings to configure your SSocketDom instance
*
* @author 		Olivier Bossel<olivier.bossel@gmail.com>

*/
/**
*
* Init the Socket connection
*
* @return      {Promise}               A promise that will be resolved when the connection is inited
*
* @author 		Olivier Bossel<olivier.bossel@gmail.com>

*/
/**
*
* Init socket.io

*/
/**
*
* Handle the html event
*
* @param         {String}        data        The data passed with the event
* @param         {Object}        settings    The settings passed with the event
*
* @author 		Olivier Bossel<olivier.bossel@gmail.com>

*/
/**
*
* Handle the 'body' event
*
* @param         {String}          data        The data passed with the event
* @param         {Object}          settings    Tge settubgs passed with the event
*
* @author 		Olivier Bossel<olivier.bossel@gmail.com>

*/
/**
*
* Handle the 'content' event
*
* @param         {String}          data        The data passed with the event
* @param         {Object}          settings    Tge settubgs passed with the event
*
* @author 		Olivier Bossel<olivier.bossel@gmail.com>

*/
/**
*
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
/**
*
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