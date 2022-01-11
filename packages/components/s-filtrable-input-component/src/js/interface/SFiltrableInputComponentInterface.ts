import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SFiltrableInputComponentInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SFiltrableInputComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export default class SFiltrableInputComponentInterface extends __SInterface {
    static get _definition() {
        return {
            items: {
                description:
                    'Specify an array of items to use in your filtrable list. Can be a JSON string, a function that take an object with the "value" property and must return an array of items to use',
                type: 'String|Function',
            },
            value: {
                description:
                    'Specify the attribute in your items to use as a value. Can be also a function that will be called with an object containing the selected item and must return the string you want to use as value',
                type: 'String',
                default: 'value',
            },
            label: {
                description:
                    'Specify the attribute in your items to use as a label. Can be also a function that will be called with an object containing the selected item and must return the string you want to use as label',
                type: 'String|Function',
                default: 'value',
            },
            emptyText: {
                description:
                    'Specify the text to use for the default "empty" (no result) state',
                type: 'String',
                default: 'No item to display',
            },
            searchValuePreprocess: {
                description: 'Specify a function used to preprocess the value just before actually searching through the items',
                type: 'Function',
            },
            loadingText: {
                description:
                    'Specify the text to use for the default "loading" state',
                type: 'String',
                default: 'Loading please wait...',
            },
            filterItems: {
                description: 'Specify a function to use to filter the items. Must return the filtered list of items',
                type: 'Function'
            },
            filtrable: {
                description:
                    'Specify all the properties of your "item" to use as source for the filtrable process',
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
                description:
                    'Specify the duration before closing the list when having selected an item',
                type: 'Number',
                default: 100,
            },
            interactive: {
                description:
                    'Specify if your items in the list are interactive or not to let the user click and interact with them',
                type: 'Boolean',
                default: false,
            },
            notSelectable: {
                description:
                    'Specify if you want the items to be not selectable',
                type: 'Boolean',
                default: false,
            },
            maxItems: {
                description:
                    'Specify the maximum number of items to display at first in the list',
                type: 'Number',
                default: 25,
            },
        };
    }
}
