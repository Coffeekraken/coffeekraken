import __isNode from '@coffeekraken/sugar/shared/is/node';
/**
 * @name                getAvailableInterfaceTypes
 * @namespace           s-interface.shared
 * @type                Function
 * @status              beta
 *
 * This function simply return an object with all the promoted as types interfaces.
 *
 * @return          {Object<SInterface>}            An object of types mapped to SInterfaces classes
 *
 * @example         js
 * import getAvailableInterfaceTypes from '@coffeekraken/sugar/js/interface/getAvailableInterfaceTypes';
 * getAvailableInterfaceTypes();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLG9DQUFvQyxDQUFDO0FBRTFEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsU0FBUywwQkFBMEI7SUFDakMsYUFBYTtJQUNiLElBQUksUUFBUSxFQUFFO1FBQUUsT0FBTyxNQUFNLENBQUMsMEJBQTBCLElBQUksRUFBRSxDQUFDO0lBQy9ELGFBQWE7U0FDUixJQUFJLE1BQU0sS0FBSyxTQUFTO1FBQUUsT0FBTyxNQUFNLENBQUMsMEJBQTBCLElBQUksRUFBRSxDQUFDOztRQUN6RSxPQUFPLEVBQUUsQ0FBQztBQUNqQixDQUFDO0FBQ0QsZUFBZSwwQkFBMEIsQ0FBQyJ9