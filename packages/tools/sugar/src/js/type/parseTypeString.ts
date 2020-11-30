// @ts-nocheck
// @shared

import ITypeStringObject from './interface/ITypeStringObject';
import ISType from './interface/ISType';
import __SType from './_SType';

/**
 * @name            parseTypeString
 * @namespace       sugar.js.type
 * @type            Function
 *
 * This method simply parse the passed typeString like "string | number", or "string & path", etc... and return
 * an object defining this type string
 *
 * @param     {String}        typeString      The type string to parse
 * @return    {ITypeStringObject}             An object describing the type string passed
 *
 * @example       js
 * import parseTypeString from '@coffeekraken/sugar/js/type/parseTypeString';
 * parseTypeString('string | path');
 * // {
 * //   raw: 'string | path',
 * //   types: [SType('string'), SType('path')],
 * // }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com>
 */
const fn = function parseTypeString(typeString: string): ITypeStringObject {
  // split the passed string
  const parts: string[] = typeString.split('|').map((t) => t.trim());
  // init each SType instances
  const types: ISType[] = [];
  parts.forEach((part) => {
    const typeInstance = new __SType(part);
    types.push(typeInstance);
  });

  const returnObj: ITypeStringObject = {
    raw: typeString,
    types: types
  };
  return returnObj;
};
export = fn;
