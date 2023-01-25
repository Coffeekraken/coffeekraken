import __SInterface from '@coffeekraken/s-interface';
import __SLog from '@coffeekraken/s-log';

/**
 * @name                SSugarCliParamsInterface
 * @namespace           cli.interface
 * @type                      Class
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
            verbose: {
                type: 'Boolean',
                default: false,
                explicit: true,
            },
            target: {
                description:
                    'Specify the target of the build processes. Exposes as a global environment variable to simplify usage of multiple builds that support the "target" param',
                type: 'String',
                values: ['development', 'production'],
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
