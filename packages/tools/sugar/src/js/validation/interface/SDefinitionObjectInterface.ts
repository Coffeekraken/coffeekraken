import __validateObject from '../object/validateObject';

/**
 * @name                SDefinitionObjectInterface
 * @namespace           sugar.js.validation.object.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the requirements for
 * an item of the definitionObject
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SDefinitionObjectInterface {
  static definitionObj = {
    type: {
      type: 'String',
      required: true
    },
    required: {
      type: 'Boolean'
    },
    description: {
      type: 'String'
    },
    default: {
      type: null
    },
    static: {
      type: 'Boolean'
    },
    values: {
      type: 'Array'
    },
    regexp: {
      type: 'RegExp'
    },
    validator: {
      type: 'Function'
    },
    alias: {
      type: 'String'
    },
    level: {
      type: 'Integer'
    }
  };

  static apply(instance) {
    return __validateObject(instance, this.definitionObj);
  }
}
