// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SCliAddSugarJsonParamsInterface
 * @namespace           node.add.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface specify the parameters needed to the `sugar add.sugarJson` command.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SCliAddSugarJsonParamsInterface extends __SInterface {
    static get _definition() {
        return {
            recipe: {
                description: 'Specify the recipe to use',
                type: 'String',
                required: true
            },
        };
    }
}
