import __typeMap from './typeMap';
import __get from '../object/get';
import __flatten from '../object/flatten';

/**
 * @name            instanciate
 * @namespace       sugar.js.action
 * @type            Function
 * @static
 *
 * This static method simply take an action descriptor object, instanciate
 * an action object from the corresponding class and return this instance.
 *
 * @param       {Object}      actionObj         The action object that MUST have at least an ```type``` property, an ```descriptor``` one and optionaly a ```settings``` one.
 * @return      {SAction}                       The instanciated SAction object
 *
 * @example       js
 * import SAction from '@coffeekraken/sugar/js/action/SAction';
 * const myInstance = instanciate({
 *    type: 'url',
 *    descriptor: {
 *      url: 'https://google.com',
 *      target: '_popup'
 *    },
 *    settings: {}
 * });
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function instanciate(actionObj) {
  if (!actionObj.type) {
    throw new Error(
      `instanciate: The actionObj parameter MUST have a <cyan>type</cyan> property...`
    );
  }
  if (!actionObj.descriptorObj) {
    throw new Error(
      `instanciate: The actionObj parameter MUST have a <cyan>descriptorObj</cyan> property of type Object...`
    );
  }

  const cls = __get(__typeMap, actionObj.type);

  if (!cls) {
    throw new Error(
      `instanciate: Your passed "type" is not valid and must be one of those: ${Object.keys(
        __flatten(__typeMap)
      ).join(', ')}...`
    );
  }

  // instanciate the object
  const instance = new cls(actionObj.descriptorObj, actionObj.settings || {});
  return instance;
}
