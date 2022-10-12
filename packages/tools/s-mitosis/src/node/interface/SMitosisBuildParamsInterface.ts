// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SMitosisBuildParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed to build a mitosis component using the SMitosis class.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SMitosisBuildParamsInterface extends __SInterface {
    static get _definition() {
        return {
            targets: {
                type: 'String[]',
                description: 'Specify the targets you want for your build',
                default: ['webcomponent', 'react'],
                values: ['webcomponent', 'react'],
            },
            watch: {
                type: 'Boolean',
                description:
                    'Specify if you want to watch for files updates and rebuild your component(s) automatically',
                default: false,
                alias: 'w',
            },
        };
    }
}
export default SMitosisBuildParamsInterface;
