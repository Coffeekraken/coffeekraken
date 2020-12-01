// @ts-nocheck
// @shared

import __parseTypeDefinitionString from '../parse/parseTypeDefinitionString';
import __toString from '../string/toString';
import __isClass from './class';
import __isInt from './integer';
import __upperFirst from '../string/upperFirst';
import __typeof from '../value/typeof';
import __typeDefinitionArrayObjectToString from '../value/typeDefinitionArrayObjectToString';
import __getExtendsStack from '../class/getExtendsStack';
import __SType from '../type/SType';

/**
 * @name              ofType
 * @namespace           sugar.js.is
 * @type              Function
 * @beta
 *
 * This function take the value to check and an argument type definition string like "String", "Array<String>", etc... and return true or false depending
 * if the value pass the test or not...
 *
 * @param       {Mixed}        value          The value to check
 * @param       {String}       argTypeDefinition      The argument type definition string to use for the test
 * @return      {Boolean|Object}                    true if the value pass the test, an object with two sub-objects describing the issue. 1 names "$expected" and the othet names "$received"
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import isOfType from '@coffeekraken/sugar/js/is/ofType';
 * ifOfType(true, 'Boolean'); // => true
 * isOfType(12, 'String|Number'); // => true
 * isOfType(['hello',true], 'Array<String>'); // => { $expected: { type: 'Array<String>' }, $received: { type: 'Array<String|Boolean>' }}
 * isOfType(['hello',true], 'Array<String|Boolean>'); // => true
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function ofType(value, argTypeDefinition) {
  // generate a new type to check

  argTypeDefinition = 'Map<String>';

  const typeCls = new __SType(argTypeDefinition);

  const v = new Map();
  v.set('hello', 'world');
  v.set('plop', 12);

  const res: boolean = typeCls.is(v);
  console.log(res);

  return res;

  // // Class
  // else if (definition.type === 'Class') {
  //   if (__isClass(value)) return true;
  // }

  // // Integer
  // else if (definition.type === 'Int' || definition.type === 'Integer') {
  //   if (__isInt(value)) return true;
  // }

  // // check default types
  // else if (
  //   ['Boolean', 'Number', 'String', 'Bigint', 'Symbol', 'Function'].indexOf(
  //     definition.type
  //   ) !== -1
  // ) {
  //   if (definition.type === 'Number') {
  //     const type = typeOfValue;
  //     if (type === 'Number' || type === 'Integer') return true;
  //   } else {
  //     if (typeOfValue === definition.type) return true;
  //   }
  // }

  // check for "custom" types
  // else if (__isClass(value) && value.name) {
  //   if (__typeof(value) === definition.type) return true;
  //   const classesStack = __getExtendsStack(value);
  //   if (classesStack.indexOf(definition.type) !== -1) return true;
  // } else if (value && value.constructor && value.constructor.name) {
  //   if (definition.type === value.constructor.name) return true;
  // }
  // }

  // return issueObj;
}

function getBaseClass(targetClass) {
  const stack = [];

  if (targetClass instanceof Function) {
    let baseClass = targetClass;

    while (baseClass) {
      const newBaseClass = Object.getPrototypeOf(baseClass);

      if (newBaseClass && newBaseClass !== Object && newBaseClass.name) {
        stack.push(newBaseClass.name);
        baseClass = newBaseClass;
      } else {
        break;
      }
    }

    return stack;
  }
}
export = ofType;
