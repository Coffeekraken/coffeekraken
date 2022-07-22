import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SSugarFeatureInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the attributes of the SSugarFeature
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SSugarFeatureInterface extends __SInterface {
    static get _definition() {
        return {
            pleasantCss: {
                description:
                    'Specify if you want the "pleasant css" syntax in your pages',
                type: 'Boolean',
                default: true,
            },
            containerQuery: {
                description:
                    'Specify if you want support for container queries in your css or not',
                type: 'Boolean',
                default: true,
            },
            scrolled: {
                description:
                    'Specify if you want the `scrolled` class to be applied on the `body` element when the page has been scrolled',
                type: 'Boolean',
                default: true,
            },
            scrolledDelta: {
                description:
                    'Specify after how many scroll the scrolled class will be applied',
                type: 'Number',
                default: 100,
            },
            vhvar: {
                description:
                    'Specify if you want the `--vh` css variable to be computed and available',
                type: 'Boolean',
                default: true,
            },
            inputAdditionalAttributes: {
                description:
                    'Specify if you want to have the additional attributes on inputs like "has-value", "empty" and "dirty" or not',
                type: 'Boolean',
                default: true,
            },
            resizeTransmations: {
                description:
                    'Specify if you want all the transitions and animations cleared during window resize',
                type: 'Boolean',
                default: true,
            },
            linksStateAttributes: {
                description:
                    'Specify if you want to have the state attributes on links like "actual" and "actual-child" or not',
                type: 'Boolean',
                default: true,
            },
            preventScrollRestoration: {
                description:
                    'Specify if you want to prevent the scroll restoration behavior on chrome that can usually be anoying',
                type: 'Boolean',
                default: true,
            },
        };
    }
}
