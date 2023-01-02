// @ts-nocheck
// import { v4 as __uuidv4 } from 'uuid';
import __hyperid from 'hyperid';
/**
 * @name          uniqid
 * @namespace            shared.string
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
 * @see       https://www.npmjs.com/package/uuid
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
let _hyperidInstance;
export default function __uniqid() {
    if (!_hyperidInstance) {
        _hyperidInstance = __hyperid({
            urlSafe: true,
        });
    }
    return `s-${_hyperidInstance()}`;
    // return __uuidv4();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCx5Q0FBeUM7QUFFekMsT0FBTyxTQUFTLE1BQU0sU0FBUyxDQUFDO0FBRWhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUVILElBQUksZ0JBQWdCLENBQUM7QUFDckIsTUFBTSxDQUFDLE9BQU8sVUFBVSxRQUFRO0lBQzVCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtRQUNuQixnQkFBZ0IsR0FBRyxTQUFTLENBQUM7WUFDekIsT0FBTyxFQUFFLElBQUk7U0FDaEIsQ0FBQyxDQUFDO0tBQ047SUFDRCxPQUFPLEtBQUssZ0JBQWdCLEVBQUUsRUFBRSxDQUFDO0lBRWpDLHFCQUFxQjtBQUN6QixDQUFDIn0=