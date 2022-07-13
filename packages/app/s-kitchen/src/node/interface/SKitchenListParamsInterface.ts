import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SKitchenListParamsInterface
 * @namespace           node.interface
 * @type.                      Class
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
                type: 'String',
            },
        };
    }
}

export default SKitchenListParamsInterface;
