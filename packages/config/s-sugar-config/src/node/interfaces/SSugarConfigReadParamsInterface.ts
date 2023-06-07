// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SSugarConfigReadParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed to build the docMap.json file
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarConfigReadParamsInterface extends __SInterface {
    static get _definition() {
        return {
            path: {
                description: 'Specify a dotpath to read',
                type: 'String',
                default: '.',
                alias: 'p',
            },
        };
    }
}
export default SSugarConfigReadParamsInterface;
