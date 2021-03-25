(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.default = getAvailableInterfaceTypes;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QXZhaWxhYmxlSW50ZXJmYWNlVHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRBdmFpbGFibGVJbnRlcmZhY2VUeXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BbUJHO0lBQ0gsU0FBUywwQkFBMEI7UUFDakMsYUFBYTtRQUNiLElBQUksTUFBTSxLQUFLLFNBQVM7WUFBRSxPQUFPLE1BQU0sQ0FBQywwQkFBMEIsSUFBSSxFQUFFLENBQUM7UUFDekUsYUFBYTthQUNSLElBQUksTUFBTSxLQUFLLFNBQVM7WUFBRSxPQUFPLE1BQU0sQ0FBQywwQkFBMEIsSUFBSSxFQUFFLENBQUM7O1lBQ3pFLE9BQU8sRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFDRCxrQkFBZSwwQkFBMEIsQ0FBQyJ9