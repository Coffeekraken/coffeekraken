import __SInterface from '@coffeekraken/s-interface';
import { SComponentUtilsDefaultInterface } from '@coffeekraken/s-component-utils';

export default class SCodeExampleInterface extends __SInterface {
    static definition = {
        ...SComponentUtilsDefaultInterface.definition,
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
