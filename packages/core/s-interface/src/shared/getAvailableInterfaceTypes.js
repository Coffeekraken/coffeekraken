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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QXZhaWxhYmxlSW50ZXJmYWNlVHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3MtaW50ZXJmYWNlL3NyYy9zaGFyZWQvZ2V0QXZhaWxhYmxlSW50ZXJmYWNlVHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW1CRztJQUNILFNBQVMsMEJBQTBCO1FBQ2pDLGFBQWE7UUFDYixJQUFJLE1BQU0sS0FBSyxTQUFTO1lBQUUsT0FBTyxNQUFNLENBQUMsMEJBQTBCLElBQUksRUFBRSxDQUFDO1FBQ3pFLGFBQWE7YUFDUixJQUFJLE1BQU0sS0FBSyxTQUFTO1lBQUUsT0FBTyxNQUFNLENBQUMsMEJBQTBCLElBQUksRUFBRSxDQUFDOztZQUN6RSxPQUFPLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBQ0Qsa0JBQWUsMEJBQTBCLENBQUMifQ==