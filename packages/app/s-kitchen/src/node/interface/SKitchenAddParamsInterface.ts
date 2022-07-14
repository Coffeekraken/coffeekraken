import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SKitchenAddParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe parameters of the SKitchen.add method
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SKitchenAddParamsInterface extends __SInterface {
    static get _definition() {
        return {
            ingredients: {
                description:
                    'Specify one or more ingredient(s) you want to add to your project',
                type: {
                    type: 'Array<String>',
                    splitChars: [','],
                },
                values: [
                    'frontspec',
                    'manifest',
                    'favicon',
                    'postcss',
                    'sugarJson',
                    'sugar',
                    'readme',
                ],
                required: true,
                alias: 'i',
            },
        };
    }
}

export default SKitchenAddParamsInterface;
