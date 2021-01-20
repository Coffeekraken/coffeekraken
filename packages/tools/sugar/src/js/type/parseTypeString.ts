// @shared

import __SType, { ISType } from './_SType';

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

export interface ITypeStringObject {
  raw: string;
  types: ISType[];
}

export interface IParseTypeStringSingleResultObj {
  type: string;
  of: string[] | undefined;
}

export interface IParseTypeStringResultObj {
  raw: string;
  types: IParseTypeStringSingleResultObj[];
}

export interface IParseTypeString {
  (typeString: string): IParseTypeStringResultObj;
}

function parseSingleTypeString(
  typeString: string
): IParseTypeStringSingleResultObj {
  let ofStr: string = '',
    typeStr: string = typeString;

  const ofPartsString = typeString.match(/<(.+)>$/gm);
  if (ofPartsString && ofPartsString.length) {
    ofStr = ofPartsString[0].replace('<', '').replace('>', '');
  }
  if (ofStr !== '') {
    typeStr = typeStr.replace(`<${ofStr}>`, '');
  }
  // handle the "of" part
  let ofTypes = ofStr !== '' ? [ofStr.toLowerCase()] : undefined;
  if (ofStr !== undefined && ofStr.includes('|')) {
    ofTypes = ofStr.split('|').map((t) => t.trim().toLowerCase());
  }

  return {
    type: typeStr,
    of: ofTypes
  };
}
const fn: IParseTypeString = function parseTypeString(
  typeString: string
): IParseTypeStringResultObj {
  // typeString = 'Array<Path>|String|Array<Object|Map>|Youhou[]';

  typeString = typeString.toLowerCase().trim();

  typeString = typeString
    .split('|')
    .map((part) => {
      part = part.trim().replace(/^([a-zA-Z0-9-_]+)\[\]$/, 'array<$1>');
      return part;
    })
    .join('|');

  typeString = typeString
    .split('|')
    .map((part) => {
      part = part.trim().replace(/^([a-zA-Z0-9-_]+)\{\}$/, 'object<$1>');
      return part;
    })
    .join('|');

  let types: string[] = [],
    inGroup = false,
    currentStr = '';
  for (let i = 0; i < typeString.length; i++) {
    const char = typeString[i];
    if (char === '<') {
      inGroup = true;
      currentStr += char;
    } else if (char === '>') {
      inGroup = false;
      currentStr += char;
    } else if (char === '|') {
      if (inGroup === false) {
        types.push(currentStr);
        currentStr = '';
      } else {
        currentStr += char;
      }
    } else {
      currentStr += char;
    }
  }
  types.push(currentStr);

  const finalTypes: IParseTypeStringSingleResultObj[] = [];
  types.forEach((type) => {
    finalTypes.push(parseSingleTypeString(type));
  });

  const res: IParseTypeStringResultObj = {
    raw: typeString,
    types: finalTypes
  };
  return res;
};
export default fn;
