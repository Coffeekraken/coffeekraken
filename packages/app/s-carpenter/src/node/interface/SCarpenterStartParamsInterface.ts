// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 *
 * @name                SCarpenterStartParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed to start a SCarpenter environment
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SCarpenterStartParamsInterface extends __SInterface {
    static get _definition() {
        return {
            port: {
                type: 'String',
                description:
                    'Specify the server port you want for your carpenter environment',
                default: __SSugarConfig.get('carpenter.server.port'),
            },
        };
    }
}
export default SCarpenterStartParamsInterface;
