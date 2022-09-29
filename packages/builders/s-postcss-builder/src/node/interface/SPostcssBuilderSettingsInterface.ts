import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                SPostcssBuilderSettingsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe settings of the SPostcssBuilder class
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SPostcssBuilderSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            postcss: {
                description: 'Specify some postcss configurations',
                type: 'Object',
                default: __SSugarConfig.get('postcssBuilder.postcss'),
            },
            purgecss: {
                description: 'Specify some purgecss configurations',
                type: 'Object',
                default: __SSugarConfig.get('postcssBuilder.purgecss'),
            },
        };
    }
}
