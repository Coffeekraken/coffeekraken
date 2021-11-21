// @ts-nocheck

import __SugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';
import __SEnv from '@coffeekraken/s-env';

/**
 * @name                SFrontspecParamsInterface
 * @namespace           node.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed to build the docMap.json file
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFrontspecParamsInterface extends __SInterface {
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
export default SFrontspecParamsInterface;
