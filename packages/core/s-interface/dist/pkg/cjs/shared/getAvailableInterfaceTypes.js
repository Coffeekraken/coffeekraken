"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __importDefault(require("@coffeekraken/sugar/shared/is/node"));
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
    if ((0, node_1.default)())
        return global._registeredInterfacesTypes || {};
    // @ts-ignore
    else if (window !== undefined)
        return window._registeredInterfacesTypes || {};
    else
        return {};
}
exports.default = getAvailableInterfaceTypes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOEVBQTBEO0FBRTFEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsU0FBUywwQkFBMEI7SUFDakMsYUFBYTtJQUNiLElBQUksSUFBQSxjQUFRLEdBQUU7UUFBRSxPQUFPLE1BQU0sQ0FBQywwQkFBMEIsSUFBSSxFQUFFLENBQUM7SUFDL0QsYUFBYTtTQUNSLElBQUksTUFBTSxLQUFLLFNBQVM7UUFBRSxPQUFPLE1BQU0sQ0FBQywwQkFBMEIsSUFBSSxFQUFFLENBQUM7O1FBQ3pFLE9BQU8sRUFBRSxDQUFDO0FBQ2pCLENBQUM7QUFDRCxrQkFBZSwwQkFBMEIsQ0FBQyJ9