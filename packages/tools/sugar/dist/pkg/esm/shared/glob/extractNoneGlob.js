// @ts-nocheck
import __globParent from 'glob-parent';
/**
 * @name                extractNoneGlob
 * @namespace            shared.glob
 * @type                Function
 * @platform          js
 * @platform          node
 * @status            beta
 *
 * This function simply return you the none glob part of a passed string
 *
 * @param       {String}            string          The string from which to extract the none glob part
 * @return      {String}                            The none glob part of the passed string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __extractNoneGlob($1)
 *
 * @example         js
 * import { __extractNoneGlob } from '@coffeekraken/sugar/glob';
 * __extractNoneGlob('/coco/hello/*.js'); // => '*.js'
 *
 * @see             https://www.npmjs.com/package/glob-parent
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __extractNoneGlob(string) {
    const parent = __globParent(string);
    return parent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSxhQUFhLENBQUM7QUFFdkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxpQkFBaUIsQ0FBQyxNQUFNO0lBQzVDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDIn0=