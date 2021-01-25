"use strict";
// @shared
/**
 * @name                getAvailableInterfaceTypes
 * @namespace           sugar.js.interface
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function getAvailableInterfaceTypes() {
    // @ts-ignore
    if (global !== undefined)
        return global._registeredInterfacesTypes || {};
    // @ts-ignore
    else if (window !== undefined)
        return window._registeredInterfacesTypes || {};
    else
        return {};
}
module.exports = getAvailableInterfaceTypes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QXZhaWxhYmxlSW50ZXJmYWNlVHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRBdmFpbGFibGVJbnRlcmZhY2VUeXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsVUFBVTtBQUVWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsU0FBUywwQkFBMEI7SUFDakMsYUFBYTtJQUNiLElBQUksTUFBTSxLQUFLLFNBQVM7UUFBRSxPQUFPLE1BQU0sQ0FBQywwQkFBMEIsSUFBSSxFQUFFLENBQUM7SUFDekUsYUFBYTtTQUNSLElBQUksTUFBTSxLQUFLLFNBQVM7UUFBRSxPQUFPLE1BQU0sQ0FBQywwQkFBMEIsSUFBSSxFQUFFLENBQUM7O1FBQ3pFLE9BQU8sRUFBRSxDQUFDO0FBQ2pCLENBQUM7QUFDRCxpQkFBUywwQkFBMEIsQ0FBQyJ9