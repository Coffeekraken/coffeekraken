// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                SMitosisStartParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed to start a mitosis env and build component using the SMitosis class.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SMitosisStartParamsInterface extends __SInterface {
    static get _definition() {
        return {
            targets: {
                type: 'String[]',
                description: 'Specify the targets you want for your build',
                default: ['webcomponent', 'react'],
                values: ['webcomponent', 'react'],
            },
            port: {
                type: 'String',
                description:
                    'Specify the server port you want for your mitosis environment',
                default: __SSugarConfig.get('mitosis.vite.server.port'),
            },
        };
    }
}
export default SMitosisStartParamsInterface;
