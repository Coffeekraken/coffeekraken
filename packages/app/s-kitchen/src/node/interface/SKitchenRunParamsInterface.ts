import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SKitchenRunInterface
 * @namespace           node.interface
 * @type                      Class
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
class SKitchenRunInterface extends __SInterface {
    static get _definition() {
        return {
            stack: {
                description: 'Specify the recipe stack you want to launch',
                type: 'String',
                alias: 's',
            },
            action: {
                description: 'Specify the action you want to launch',
                type: 'String',
                alias: 'a',
            },
            recipe: {
                description:
                    'Specify the recipe you want to launch. If not specified, will take the one from the "sugar.json" file, or the default setted in the "kitchen.config.ts" file...',
                type: 'String',
                alias: 'r',
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

export default SKitchenRunInterface;
