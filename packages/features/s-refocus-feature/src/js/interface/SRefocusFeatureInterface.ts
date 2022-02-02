import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SRefocusFeatureInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the attributes of the SRefocusFeature
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export default class SRefocusFeatureInterface extends __SInterface {
    static get _definition() {
        return {
            trigger: {
                description:
                    'Specify some trigger(s) on which to refocus a particular element like `event:actual`, `anchor`, `history`, etc...',
                type: {
                    type: 'Array<String>',
                    splitChars: [','],
                },
                values: ['event:eventName', 'anchor', 'history'],
                default: [],
            },
            scrollToSettings: {
                description: 'Specify some `scrollTo` settings to override the default ones',
                type: "IScrollToSettings",
                default: {}
            },
            timeout: {
                description: 'Specify a timeout to wait before refocus the element',
                type: 'Number',
                default: 500,
            }
        };
    }
}
