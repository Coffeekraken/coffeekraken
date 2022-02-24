import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SSugarCliProcessKillParamsInterface
 * @namespace           cli.process.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe parameters of the `sugar process.kill` command
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SSugarCliProcessKillParamsInterface extends __SInterface {
    static get _definition() {
        return {
            id: {
                description: 'Specify the process id you want to kill',
                type: 'Number',
                alias: 'i',
            },
            port: {
                description:
                    'Specify the port on which the process you want to kill is binded',
                type: 'Number',
                alias: 'p',
            },
        };
    }
}
