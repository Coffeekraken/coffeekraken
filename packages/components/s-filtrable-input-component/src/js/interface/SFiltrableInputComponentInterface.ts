import __SInterface from '@coffeekraken/s-interface';

export default class SHighlightJsComponentInterface extends __SInterface {
    static definition = {
        items: {
            type: 'String|Function',
        },
        value: {
            type: 'String',
            default: 'value',
        },
        label: {
            type: 'String|Function',
            default: 'value',
        },
        emptyText: {
            type: 'String',
            default: 'No item to display',
        },
        loadingText: {
            type: 'String',
            default: 'Loading please wait...',
        },
        filtrable: {
            type: {
                type: 'Array<String>',
                splitChars: [','],
            },
            default: [],
        },
        templates: {
            description:
                'Specify either an object with properties like "item", "empty" and "loading", or a function returning the good template depending on tne "type" argument property',
            type: 'Object|Function',
        },
        closeTimeout: {
            type: 'Number',
            default: 100,
        },
        interactive: {
            type: 'Boolean',
            default: false,
        },
        notSelectable: {
            type: 'Boolean',
            default: false,
        },
        maxItems: {
            type: 'Number',
            default: 25,
        },
    };
}
