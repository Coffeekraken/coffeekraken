import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SKitchenActionInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @status              beta
 * @platform             node
 * @interface
 *
 * This class represent the interface that describe parameters of the SKitchen.action method
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SKitchenActionInterface extends __SInterface {
    static get _definition() {
        return {
            action: {
                description: 'Specify the action you want to launch',
                type: 'String',
                requried: true,
            },
            params: {
                description:
                    'Specify the action parameters using the cli "--param value" syntax',
                type: 'String',
                alias: 'p',
            },
        };
    }
}

export default SKitchenActionInterface;
