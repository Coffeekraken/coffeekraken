// @shared

import __isNode from '../../is/node';
import __SInterface from '../../interface/SInterface';

/**
 * @name            SCacheSettingsInterface
 * @namespace       sugar.js.cache.interface
 * @type            Class
 * @extends         SInterface
 * @status          beta
 *
 * Represent the SCache settings interface
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SCacheSettingsInterface extends __SInterface {
  static definition = {
    name: {
      type: 'String',
      required: true,
      default: 'SCache'
    },
    ttl: {
      type: 'Number',
      required: true,
      default: -1
    },
    deleteOnExpire: {
      type: 'Boolean',
      required: true,
      default: true
    },
    adapter: {
      type: 'String',
      required: true,
      default: __isNode() ? 'fs' : 'ls'
    },
    parse: {
      type: 'Function',
      required: true,
      default: JSON.parse
    },
    stringify: {
      type: 'Function',
      required: true,
      default: JSON.stringify
    }
  };
}
export default SCacheSettingsInterface;
