import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SCodeExampleComponentInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SCodeExampleComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SCodeExampleComponentInterface extends __SInterface {
    static get _definition() {
        return {
            active: {
                description:
                    'Specify which "tab" is active in case of multiple languages examples',
                type: 'String',
            },
            toolbar: {
                description:
                    'Specify what you want in the toolbar. Currently available item is "copy"',
                type: 'Array<String>',
                values: ['copy'],
                default: ['copy'],
            },
            toolbarPosition: {
                description:
                    'Specify the toolbar position. Can be "content" or "nav"',
                type: 'String',
                values: ['content', 'nav'],
                default: 'nav',
            },
            languages: {
                description:
                    'Specify some languages that you want to support. Must be "[key]: language" object syntax. See [highlight.js doc](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md) for supported languages',
                type: 'Object',
                default: {},
            },
            items: {
                description: 'Specify the items to put in your code example',
                type: 'Object[]',
                default: [],
            },
            lines: {
                description: 'Specify how many lines to display at max',
                type: 'Number',
                default: 999,
                physical: true,
            },
            moreLabel: {
                description: 'Specify the "show more" button label',
                type: 'String',
                default: 'Show more',
            },
            lessLabel: {
                description: 'Specigy the "show less" button label',
                type: 'String',
                default: 'Show less',
            },
            moreAction: {
                description:
                    'Specify the action to execute when click on the "more" button. Currently available action is "toggle"',
                values: ['toggle'],
                type: 'String',
                default: 'toggle',
            },
            more: {
                description:
                    'Specify if you want to expand the more feature at start or not',
                type: 'Boolean',
                default: false,
            },
            scrollOnMore: {
                description:
                    'Specify if you want to scroll to the code when clicking on the "show more/less" button',
                type: 'Boolean',
                default: true,
            },
            scrollToSettings: {
                description: 'Specify some scrollTo settings',
                type: 'Object',
                default: {},
            },
        };
    }
}
