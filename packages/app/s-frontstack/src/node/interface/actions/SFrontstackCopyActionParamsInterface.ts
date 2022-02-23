import __SugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SFrontstackCopyActionParamsInterface
 * @namespace           node.actions.interface
 * @type.                      Class
 * @extends             SInterface
 * @status              beta
 * @platform             node
 * @interface
 *
 * This class represent the interface that describe parameters of the "copy" action
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFrontstackCopyActionParamsInterface extends __SInterface {
    static get _definition() {
        return {
            src: {
                description: 'Specify what to copy',
                type: 'String',
                required: true
            },
            dest: {
                description: 'Specify where to paste',
                type: 'String',
                required: true
            },
            chdir: {
                description: 'Specify if need to change the cwd to the pasted folder location',
                type: 'Boolean',
                default: false
            }
        };
    }
}

export default SFrontstackCopyActionParamsInterface;
