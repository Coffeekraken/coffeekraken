import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                SViteStartParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe parameters of the SKitchenViteProcess
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SViteStartParamsInterface extends __SInterface {
    static get _definition() {
        return {
            host: {
                type: 'String',
                description:
                    'Specify the host on which to launch the vite server',
                required: true,
                default: __SSugarConfig.get('vite.server.host'),
                alias: 'h',
            },
            port: {
                type: 'Number',
                description:
                    'Specify the port on which to launch the vite server',
                required: true,
                default: __SSugarConfig.get('vite.server.port'),
                alias: 'p',
            },
        };
    }
}

export default SViteStartParamsInterface;
