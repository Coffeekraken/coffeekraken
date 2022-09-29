import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SKitchenListParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe parameters of the SKitchen.list method
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SKitchenListParamsInterface extends __SInterface {
    static get _definition() {
        return {
            recipe: {
                description: 'Specify a recipe you want to list details for',
                type: 'String',
                alias: 'r',
            },
            ingredients: {
                description:
                    'Specify if you want to list the available ingredients in your kitchen',
                type: 'Boolean',
                default: false,
                alias: 'i',
            },
        };
    }
}

export default SKitchenListParamsInterface;
