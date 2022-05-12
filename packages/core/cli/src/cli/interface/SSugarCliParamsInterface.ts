import __SInterface from '@coffeekraken/s-interface';
import __SLog from '@coffeekraken/s-log';

/**
 * @name                SSugarCliParamsInterface
 * @namespace           cli.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe parameters of the SSugarCli class
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SSugarCliParamsInterface extends __SInterface {
    static get _definition() {
        return {
            bench: {
                type: {
                    type: 'Array<String>|Boolean',
                    splitChars: [','],
                },
                default: false,
                explicit: true,
            },
            logPreset: {
                type: 'String',
                values: __SLog.PRESETS,
                default: 'default',
                explicit: true,
            },
        };
    }
}
