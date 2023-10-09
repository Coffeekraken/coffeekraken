// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                SFrontspecBuildParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed to build the add the frontspec.build file
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SFrontspecBuildParamsInterface extends __SInterface {
    static get _definition() {
        return {
            sources: {
                type: 'Object',
                description:
                    'Specify each properties you want in your frontspec with an object that describe the type of the source and some settings depending on the source itself',
                default: __SSugarConfig.get('frontspec.build.sources'),
            },
            silent: {
                type: 'Boolean',
                description: 'Specify if you want to mute the output',
                default: false,
            },
            write: {
                type: 'Boolean',
                description:
                    'Specify if you want to write the frontspec.json file',
                default: true,
            },
        };
    }
}
export default SFrontspecBuildParamsInterface;
