// @ts-nocheck

import __blessed from 'blessed';

/**
 * @name                innerWidth
 * @namespace            node.blessed.utils
 * @type                Function
 *
 * This function simply returns you the actual inner width (width - left/right paddings)
 * of the passed component.
 * Returns -1 if the component or it's parent is not displayed...
 *
 * @param       {blessed.box}          component        The blessed component to get the inner width of
 * @return      {Integer}                           The actual inner with of the element
 *
 * @example         js
 * import innerWidth from '@coffeekraken/sugar/node/blessed/utils/innerWidth';
 * innerWidth(myBlessedComponent); // => 10
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function innerWidth(component: __blessed.box): Integer {
  if (!(component instanceof __blessed.box)) return -1;
  if (!component && !component.parent) return -1;
  return (
    component.width -
    (component.padding?.left || 0) -
    (component.padding?.right || 0)
  );
}
