import { __isNode } from '@coffeekraken/sugar/is';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVsRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsU0FBUywwQkFBMEI7SUFDL0IsYUFBYTtJQUNiLElBQUksUUFBUSxFQUFFO1FBQUUsT0FBTyxNQUFNLENBQUMsMEJBQTBCLElBQUksRUFBRSxDQUFDO0lBQy9ELGFBQWE7U0FDUixJQUFJLE1BQU0sS0FBSyxTQUFTO1FBQ3pCLE9BQU8sTUFBTSxDQUFDLDBCQUEwQixJQUFJLEVBQUUsQ0FBQzs7UUFDOUMsT0FBTyxFQUFFLENBQUM7QUFDbkIsQ0FBQztBQUNELGVBQWUsMEJBQTBCLENBQUMifQ==