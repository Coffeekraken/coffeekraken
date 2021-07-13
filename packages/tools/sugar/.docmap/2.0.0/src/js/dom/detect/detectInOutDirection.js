/**
*
* @name      detectInOutDirection
* @namespace            js.dom.detection
* @type      Function
* @async
* @platform          js
* @platform          ts
* @status              wip
*
* Detect the mouse direction when entered on the passed element. The direction can be up, down, left or right and will be passed to the two callbacks available.
* The first one is the `onIn` callback, and the second one is the `onOut`.
*
* @param    {HTMLElement}    $elm    The element to listen for mouseover and mouseout on
* @param    {Function}    onIn    The onIn callback. The direction and the $elm will be passed to it
* @param    {Function}    onOut    The onOut callback. The direction and the $elm will be passed to it
* @return    {HTMLElement}    The $elm to maintain chainability
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example     js
* import detectInOutDirection from '@coffeekraken/sugar/js/dom/detectInOutDirection'
* const detect = detectInOutDirection(myElm).in(direction => {
*    // do something...
* }).out(direction => {
*    // do something...
* }).then(value => {
*    // do something
*    console.log(value); // => { action: 'in', direction: 'up' };
* });
*
* // cancel the detection process
* detect.cancel();
*
* @since       1.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/