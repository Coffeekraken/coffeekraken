import __getExtendsStack from '../class/getExtendsStack';
import __argsToObject from '../cli/argsToObject';
import __SError from '../error/SError';
import __isClass from '../is/class';
import __deepize from '../object/deepize';
import __deepMerge from '../object/deepMerge';
import __trimLines from '../string/trimLines';
import __validateObject from '../validation/object/validateObject';
import __validateObjectOutputString from '../validation/object/validateObjectOutputString';
import __typeof from '../value/typeof';
import __toString from '../string/toString';
import __set from '../object/set';

import SDescriptor from '../SDescriptor';
import ISObjectDescriptor, {
  ISObjectDescriptorCtor
} from './interface/ISObjectDescriptor';

/**
 * @name              SObjectDescriptor
 * @namespace           sugar.js.descriptor.object
 * @type              Class
 *
 * This class allows you to describe an object by setting some "rules" like the type you want for a property,
 * the default value you want, etc...
 *
 * @example         js
 * import SObjectDescriptor from '@coffeekraken/sugar/js/descriptor/object/SObjectDescriptor';
 * class MyCoolDescriptor extends SObjectDescriptor {
 *    static description = {
 *      title: {
 *        type: 'String',
 *        required: true
 *      },
 *      doSomething: {
 *        type: 'Function',
 *        required: true
 *      }
 *    }
 * }
 *
 * class MyClass {
 *    constructor() {
 *      MyCoolDescriptor.apply(this);
 *    }
 * }
 *
 * const myObject = new MyClass();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com>
 */
const Cls: ISObjectDescriptorCtor = class SObjectDescriptor
  extends SDescriptor
  implements ISObjectDescriptor {};

export default Cls;
