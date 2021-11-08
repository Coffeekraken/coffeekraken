import __SInterface from '@coffeekraken/s-interface';

export default class SCodeExampleInterface extends __SInterface {
    static get _definition() {
        return {
            theme: {
                description:
                    'Specify the theme you want to use for your code example',
                type: 'String',
                default:
                    'https://gitcdn.link/repo/PrismJS/prism-themes/master/themes/prism-nord.css',
            },
            active: {
                type: 'String',
            },
            toolbar: {
                type: 'Array<String>',
                values: ['copy'],
                default: ['copy'],
            },
            toolbarPosition: {
                type: 'String',
                values: ['content', 'nav'],
                default: 'nav',
            },
            languages: {
                type: 'Object',
                default: {},
            },
            lines: {
                type: 'Number',
            },
            moreLabel: {
                type: 'String',
                default: 'Show more',
            },
            lessLabel: {
                type: 'String',
                default: 'Show less',
            },
            moreAction: {
                type: 'String',
                default: 'toggle',
            },
            more: {
                type: 'Boolean',
                default: false,
            },
        };
    }
}
