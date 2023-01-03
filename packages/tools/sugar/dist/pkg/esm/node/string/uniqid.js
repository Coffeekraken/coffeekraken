// @ts-nocheck
import __crypto from 'crypto';
/**
 * @name          uniqid
 * @namespace            node.string
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Generate a uniqid string of 8 bytes. Work using the [uniqid](https://www.npmjs.com/package/uniqid) npm package under the hood.
 *
 * @return          {String}                A 8 bytes uniqid string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import { __uniqid } from '@coffeekraken/sugar/string';
 * console.log(__uniqid()); // => 1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed
 *
 * @see       https://geshan.com.np/blog/2022/01/nodejs-uuid/
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __uniqid() {
    return `s-${__crypto.randomUUID()}`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLFFBQVEsTUFBTSxRQUFRLENBQUM7QUFFOUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxRQUFRO0lBQzVCLE9BQU8sS0FBSyxRQUFRLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQztBQUN4QyxDQUFDIn0=