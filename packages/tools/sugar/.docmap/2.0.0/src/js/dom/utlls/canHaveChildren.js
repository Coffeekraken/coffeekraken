/**
*
* @name          canHaveChildren
* @namespace            js.dom.utils
* @type          Function
* @platform          js
* @platform          ts
* @status      beta
*
* This function take as input either a tagName String like "img", "div", etc... or an HTMLElement node
* and return true or false depending if this element is supposed to have children or not.
*
* @param       {String|HTMLElement}          element       The element to check. A tagName like "img", or directly a HTMLElement node reference
* @return      {Boolean}                                   true if the element is supposed to have children, false if not
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example       js
* import canHaveChildren from '@coffeekraken/sugar/js/dom/canHaveChildren';
* canHaveChildren('img'); // => false
* canHaveChildren('div'); // => true
*
* @since         2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/