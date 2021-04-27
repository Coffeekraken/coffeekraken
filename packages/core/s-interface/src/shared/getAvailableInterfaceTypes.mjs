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
export default getAvailableInterfaceTypes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QXZhaWxhYmxlSW50ZXJmYWNlVHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3MtaW50ZXJmYWNlL3NyYy9zaGFyZWQvZ2V0QXZhaWxhYmxlSW50ZXJmYWNlVHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSCxTQUFTLDBCQUEwQjtJQUNqQyxhQUFhO0lBQ2IsSUFBSSxNQUFNLEtBQUssU0FBUztRQUFFLE9BQU8sTUFBTSxDQUFDLDBCQUEwQixJQUFJLEVBQUUsQ0FBQztJQUN6RSxhQUFhO1NBQ1IsSUFBSSxNQUFNLEtBQUssU0FBUztRQUFFLE9BQU8sTUFBTSxDQUFDLDBCQUEwQixJQUFJLEVBQUUsQ0FBQzs7UUFDekUsT0FBTyxFQUFFLENBQUM7QUFDakIsQ0FBQztBQUNELGVBQWUsMEJBQTBCLENBQUMifQ==