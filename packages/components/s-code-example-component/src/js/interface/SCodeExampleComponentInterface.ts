import __SInterface from '@coffeekraken/s-interface';

export default class SCodeExampleInterface extends __SInterface {
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
            lines: {
                description: 'Specify how many lines to display at max',
                type: 'Number',
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
                type: 'String',
                default: 'toggle',
            },
            more: {
                description:
                    'Specify if you want to use the "more button" feature',
                type: 'Boolean',
                default: false,
            },
        };
    }
}
