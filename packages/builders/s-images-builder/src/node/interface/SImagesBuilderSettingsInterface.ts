import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SImagesBuilderSettingsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe settings of the SImagesBuilder
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SImagesBuilderSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            resolveGlob: {
                description:
                    'Specify some settings to use for the [resolveGlob function](/api/@coffeekraken.sugar.node.glob.resolveGlob)',
                type: 'IResolveGlobSettings',
                default: {},
            },
        };
    }
}
