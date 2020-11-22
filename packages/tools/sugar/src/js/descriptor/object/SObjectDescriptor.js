import SDescriptor from '../SDescriptor';
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
const Cls = class SObjectDescriptor extends SDescriptor {
};
export default Cls;
