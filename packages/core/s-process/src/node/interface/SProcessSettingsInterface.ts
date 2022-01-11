import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SProcessSettingsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a process instance usable across the toolkit like in an SCli instance, etc...
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SProcessSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            killOnError: {
                description:
                    'Specify if you want to kill the process when an error occurs',
                type: 'Boolean',
                default: __SSugarConfig.get('process.killOnError'),
            },
            stdio: {
                description: 'Specify the stdio to use for your process',
                type: 'String|SStdio|Boolean',
                alias: 's',
                default: __SSugarConfig.get('process.stdio'),
            },
            throw: {
                description:
                    'Specify if you want to throw error when an error occurs',
                type: 'Boolean',
                alias: 't',
                default: __SSugarConfig.get('process.throw'),
            },
            exitAtEnd: {
                description:
                    'Specify if you want to kill the process at his end',
                type: 'Boolean',
                alias: 'e',
                default: __SSugarConfig.get('process.exitAtEnd'),
            },
            runAsChild: {
                description:
                    'Specify if you want to run your process as a child one',
                type: 'Boolean',
                alias: 'c',
                default: __SSugarConfig.get('process.runAsChild'),
            },
            processPath: {
                description:
                    'Specify a path to a process file that exports a process supported type like an SProcess based class, a function, etc...',
                type: 'String',
                default: __SSugarConfig.get('process.processPath'),
            },
        };
    }
}
export default SProcessSettingsInterface;
