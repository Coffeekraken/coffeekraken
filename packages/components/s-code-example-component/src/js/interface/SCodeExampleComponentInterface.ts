import __SInterface from '@coffeekraken/s-interface';

export default class SCodeExampleInterface extends __SInterface {
    static definition = {
        theme: {
            type: 'String',
            default: 'https://gitcdn.link/repo/PrismJS/prism-themes/master/themes/prism-nord.css',
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
    };
}
