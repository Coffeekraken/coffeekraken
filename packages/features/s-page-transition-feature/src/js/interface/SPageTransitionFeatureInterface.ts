import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SPageTransitionFeatureInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the attributes of the SPageTransitionFeature
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export default class SPageTransitionFeatureInterface extends __SInterface {
    static get _definition() {
        return {
            patchBody: {
                description: 'Specify if you want to patch the body tag with the new page body tag',
                type: 'Boolean',
                default: true
            },
            scrollTop: {
                description: 'Specify if you want to scroll to the top of the updated element after a transition',
                type: 'Boolean',
                default: true
            }
        };
    }
}
