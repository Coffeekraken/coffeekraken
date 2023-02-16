import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SPageTransitionFeatureInterface
 * @namespace           js.interface
 * @type                      Class
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SPageTransitionFeatureInterface extends __SInterface {
    static get _definition() {
        return {
            patchBody: {
                description:
                    'Specify if you want to patch the body tag with the new page body tag',
                type: 'Boolean',
                default: true,
            },
            scroll: {
                description:
                    'Specify if you want this feature to handle scroll to top after loading, etc...',
                type: 'Boolean',
                default: false,
            },
            before: {
                description: 'Specify a function to run before the transition',
                type: 'Function',
            },
            after: {
                description: 'Specify a function to run after the transition',
                type: 'Function',
            },
            autoStyle: {
                description:
                    'Specify if you want to automatically add classes like "s-tc:error" on the broken links (only the "a" tags)',
                type: 'Boolean',
                default: true,
            },
            injectBrokenLinkIcon: {
                description:
                    'Specify if you want to inject the "error" icon on the broken links',
                type: 'Boolean',
                default: true,
            },
            brokenLinkIcon: {
                description:
                    'Specify the icon you want to inject on the broken links',
                type: 'String',
                default:
                    '<i class="s-icon:link-broken-solid" alt="Broken link"></i>',
            },
            ga: {
                description:
                    'Specify if you want to track pages change using google analytics of not. If true, will use the config.google.ga configuration as target, otherwise you can specify the gtag universal id here...',
                type: 'Boolean|String',
                default: true,
            },
        };
    }
}
