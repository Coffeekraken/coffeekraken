import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SHighlightFeatureInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the attributes of the SHighlight feature
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SHighlightFeatureInterface extends __SInterface {
    static get _definition() {
        return {
            type: {
                type: 'String',
                description: 'Specify the type of highlight you want',
                default: 'light',
                physical: true,
            },
            size: {
                type: 'Number',
                description: 'Specify the size of the highlight in px',
            },
            intensity: {
                type: 'Number',
                description:
                    'Specify the intensity of the highlight beetween 0 and 1',
            },
        };
    }
}
