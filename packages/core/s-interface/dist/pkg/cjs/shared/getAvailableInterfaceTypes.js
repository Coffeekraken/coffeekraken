"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                getAvailableInterfaceTypes
 * @namespace           shared
 * @type                Function
 * @platform            node
 * @status              beta
 * @private
 *
 * This function simply return an object with all the promoted as types interfaces.
 *
 * @return          {Object<SInterface>}            An object of types mapped to SInterfaces classes
 *
 * @example         js
 * import { __getAvailableInterfaceTypes } from '@coffeekraken/s-interface';
 * __getAvailableInterfaceTypes();
 * // {
 * //    MyCoolType: MyInterface
 * // }
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __isNode() {
    return (typeof process !== 'undefined' &&
        process.release &&
        process.release.name === 'node');
}
function getAvailableInterfaceTypes() {
    // @ts-ignore
    if (__isNode())
        return global._registeredInterfacesTypes || {};
    // @ts-ignore
    else if (window !== undefined)
        return window._registeredInterfacesTypes || {};
    else
        return {};
}
exports.default = getAvailableInterfaceTypes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILFNBQVMsUUFBUTtJQUNiLE9BQU8sQ0FDSCxPQUFPLE9BQU8sS0FBSyxXQUFXO1FBQzlCLE9BQU8sQ0FBQyxPQUFPO1FBQ2YsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUNsQyxDQUFDO0FBQ04sQ0FBQztBQUNELFNBQVMsMEJBQTBCO0lBQy9CLGFBQWE7SUFDYixJQUFJLFFBQVEsRUFBRTtRQUFFLE9BQU8sTUFBTSxDQUFDLDBCQUEwQixJQUFJLEVBQUUsQ0FBQztJQUMvRCxhQUFhO1NBQ1IsSUFBSSxNQUFNLEtBQUssU0FBUztRQUN6QixPQUFPLE1BQU0sQ0FBQywwQkFBMEIsSUFBSSxFQUFFLENBQUM7O1FBQzlDLE9BQU8sRUFBRSxDQUFDO0FBQ25CLENBQUM7QUFDRCxrQkFBZSwwQkFBMEIsQ0FBQyJ9