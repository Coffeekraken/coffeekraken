// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                STestinatorTestParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface specify the parameters needed to the `sugar testinator.test` command.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class STestinatorTestParamsInterface extends __SInterface {
    static get _definition() {
        return {
            path: {
                description:
                    'Specify the path to the file you want to run tests from',
                type: 'String',
                alias: 'p',
                required: true,
            },
        };
    }
}
