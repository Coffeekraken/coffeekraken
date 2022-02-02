import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SRunCommandParamsInterface
 * @namespace           cli.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe parameters of the `sugar command.run` command
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export default class SRunCommandParamsInterface extends __SInterface {
    static get _definition() {
        return {
            command: {
                type: 'String',
                description: 'Specify the command you want to execute',
                alias: 'c',
            },
            directory: {
                type: 'String',
                description:
                    'Specify where you want to execute this command. Can be a glob to execute command into multiple directories at once',
                alias: 'd',
            },
            verbose: {
                type: 'Boolean',
                description: 'Specify if you want each process to log or not',
                default: false,
                alias: 'v',
            },
        };
    }
}