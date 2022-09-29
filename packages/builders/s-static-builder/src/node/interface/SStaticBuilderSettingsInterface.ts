import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                SStaticBuilderSettingsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe settings of the SStaticBuilder class
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SStaticBuilderSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            input: {
                description: 'Specify the path to the input sitemap.xml file',
                type: 'String',
                required: true,
                alias: 'i',
                default: __SSugarConfig.get('staticBuilder.input'),
            },
        };
    }
}
