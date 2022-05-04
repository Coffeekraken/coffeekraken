import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                SFaviconBuilderAddParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe parameters of the SFaviconBuilder.add method
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SFaviconBuilderAddParamsInterface extends __SInterface {
    static get _definition() {
        return {
            output: {
                description: 'Specify where to save the favicon source file',
                type: 'String',
                required: true,
                default: __SSugarConfig.get('faviconBuilder.input'),
            },
        };
    }
}
