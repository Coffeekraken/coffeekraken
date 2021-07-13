/**
*
* @name            onScrollEnd
* @namespace       js.dom.detect
* @type            Function
* @async
* @platform          js
* @platform          ts
* @status        beta
*
* This function simply listen for scroll on the passed element and call the passed callback
* when reaching the end of it.
*
* @param       {HTMLElement}           $elm        The element to listen on
* @param       {Function}              callback        The function to call when scroll end is detected
* @param       {IOnScrollEndSettings}      [settings={}]       Some settings like offset, etc...
*
* @todo      tests
*
* @example         js
* import onScrollEnd from '@coffeekraken/sugar/js/dom/detect/onScrollEnd';
* onScrollEnd($elm, () => {
*      // do something
* }, {
*    offset: 50
* });
*
* @since       2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/