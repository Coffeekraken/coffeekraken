import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                SDocServeParamsInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @status              beta
 * @platform             node
 * @interface
 *
 * This class represent the settings of the SDoc serve class method params
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SDocServeParamsInterface extends __SInterface {
    static get _definition() {
        return {
            port: {
                type: 'Number',
                description: 'Specify the port on which to run the SDoc server',
                default: __SSugarConfig.get('doc.server.port'),
            },
        };
    }
}

export default SDocServeParamsInterface;
