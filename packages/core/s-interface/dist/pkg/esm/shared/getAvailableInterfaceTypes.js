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
export default getAvailableInterfaceTypes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxTQUFTLFFBQVE7SUFDYixPQUFPLENBQ0gsT0FBTyxPQUFPLEtBQUssV0FBVztRQUM5QixPQUFPLENBQUMsT0FBTztRQUNmLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FDbEMsQ0FBQztBQUNOLENBQUM7QUFDRCxTQUFTLDBCQUEwQjtJQUMvQixhQUFhO0lBQ2IsSUFBSSxRQUFRLEVBQUU7UUFBRSxPQUFPLE1BQU0sQ0FBQywwQkFBMEIsSUFBSSxFQUFFLENBQUM7SUFDL0QsYUFBYTtTQUNSLElBQUksTUFBTSxLQUFLLFNBQVM7UUFDekIsT0FBTyxNQUFNLENBQUMsMEJBQTBCLElBQUksRUFBRSxDQUFDOztRQUM5QyxPQUFPLEVBQUUsQ0FBQztBQUNuQixDQUFDO0FBQ0QsZUFBZSwwQkFBMEIsQ0FBQyJ9