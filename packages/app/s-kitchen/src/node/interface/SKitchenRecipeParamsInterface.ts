import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SKitchenRecipeParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
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
class SKitchenRecipeParamsInterface extends __SInterface {
    static get _definition() {
        return {
            stack: {
                description:
                    'Specify the stack you want to execute like "dev", "build", etc...',
                type: 'String',
                alias: 's',
            },
            recipe: {
                description:
                    'Specify the recipe you want to execute the stack from',
                type: 'String',
                alias: 'r',
            },
            runInParallel: {
                description:
                    'Specify if you want the recipe actions to run in parallel of not',
                type: 'Boolean',
                alias: 'p',
            },
            env: {
                description:
                    'Specify the environment in which to execute your recipe',
                type: 'String',
            },
        };
    }
}

export default SKitchenRecipeParamsInterface;
