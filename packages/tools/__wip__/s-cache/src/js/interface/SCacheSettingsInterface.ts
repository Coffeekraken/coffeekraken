// @shared

import __SInterface from '@coffeekraken/s-interface';
import __isNode from '@coffeekraken/sugar/src/shared/is/node';

/**
 * @name            SCacheSettingsInterface
 * @namespace       js.interface
 * @type.                      Class
 * @extends         SInterface
 * @interface
 * @status              beta
 *
 * Represent the SCache settings interface
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SCacheSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            name: {
                type: 'String',
                required: true,
                default: 'SCache',
            },
            ttl: {
                type: 'Number',
                required: true,
                default: -1,
            },
            deleteOnExpire: {
                type: 'Boolean',
                required: true,
                default: true,
            },
            adapter: {
                type: 'String',
                required: true,
                default: __isNode() ? 'fs' : 'ls',
            },
            parse: {
                type: 'Function',
                required: true,
                default: JSON.parse,
            },
            stringify: {
                type: 'Function',
                required: true,
                default: JSON.stringify,
            },
        };
    }
}
export default SCacheSettingsInterface;
