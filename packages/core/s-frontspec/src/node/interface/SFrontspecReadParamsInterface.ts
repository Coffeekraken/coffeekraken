// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SFrontspecReadParamsInterface
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
class SFrontspecReadParamsInterface extends __SInterface {
    static get _definition() {
        return {
            env: {
                description:
                    'Specify the environment for which to read the frontspec for',
                type: 'String',
                default: undefined,
            },
        };
    }
}
export default SFrontspecReadParamsInterface;
