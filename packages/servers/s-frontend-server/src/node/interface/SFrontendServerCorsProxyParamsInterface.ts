// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                SFrontendServerCorsProxyParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a frontend cors proxy server process.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SFrontendServerCorsProxyParamsInterface extends __SInterface {
    static get _definition() {
        return {
            port: {
                description: 'Specify the port on which to run the proxy',
                type: 'Number',
                default: __SSugarConfig.get('frontendServer.corsProxy.port'),
            },
            targetUrlHeaderName: {
                description: 'Specifyheader name to use as the target url',
                type: 'String',
                default: __SSugarConfig.get(
                    'frontendServer.corsProxy.targetUrlHeaderName',
                ),
            },
            limit: {
                description: 'Specify the limit request size to process',
                type: 'String',
                default: __SSugarConfig.get('frontendServer.corsProxy.limit'),
            },
        };
    }
}
