/**
*
* @name        addEventListenerOnce
* @namespace            js.dom.event
* @type      Function
* @platform          js
* @platform          ts
* @status          beta
*
* Add an event listener that will be trigerred only once
*
* @feature       All the features of the `sugar.js.dom.addEventListener` functions
* @feature       Remove automatically the listener after 1 event
*
* @param    {HTMLElement}    $elm    The element to add the event listener on
* @param    {String}    event    The event to listen for
* @param    {Function}    [callback=null]    The callback function to call on event
* @param    {Boolean}    [useCapture=false]    A Boolean value that specifies whether the event should be executed in the capturing or in the bubbling phase
* @return    {Promise}                   A promise that will be resolved once the event has been called
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example    js
* import addEventListenerOnce from '@coffeekraken/sugar/js/dom/addEventListenerOnce'
* addEventListenerOnce(myElm, 'click', (e) => {
*     // do something on click
* });
* addEventListenerOnce(myElm, 'click').on('click', (e) => {
*
* });
*
* @since     1.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/