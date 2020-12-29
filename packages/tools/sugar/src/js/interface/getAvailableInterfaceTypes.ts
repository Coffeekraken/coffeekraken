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
  if (global !== undefined) return global._registeredInterfacesTypes || {};
  // @ts-ignore
  else if (window !== undefined) return window._registeredInterfacesTypes || {};
  else return {};
}
export = getAvailableInterfaceTypes;
