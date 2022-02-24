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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QXZhaWxhYmxlSW50ZXJmYWNlVHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRBdmFpbGFibGVJbnRlcmZhY2VUeXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFFBQVEsTUFBTSxvQ0FBb0MsQ0FBQztBQUUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUNILFNBQVMsMEJBQTBCO0lBQ2pDLGFBQWE7SUFDYixJQUFJLFFBQVEsRUFBRTtRQUFFLE9BQU8sTUFBTSxDQUFDLDBCQUEwQixJQUFJLEVBQUUsQ0FBQztJQUMvRCxhQUFhO1NBQ1IsSUFBSSxNQUFNLEtBQUssU0FBUztRQUFFLE9BQU8sTUFBTSxDQUFDLDBCQUEwQixJQUFJLEVBQUUsQ0FBQzs7UUFDekUsT0FBTyxFQUFFLENBQUM7QUFDakIsQ0FBQztBQUNELGVBQWUsMEJBQTBCLENBQUMifQ==