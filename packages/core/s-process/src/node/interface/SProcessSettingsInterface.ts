import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SProcessSettingsInterface
 * @namespace           sugar.node.process.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a process instance usable across the toolkit like in an SCli instance, etc...
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SProcessSettingsInterface extends __SInterface {
    static get definition() {
        return (
            this.cached() ??
            this.cache({
                asyncStart: {
                    type: 'Boolean',
                    alias: 'a',
                    default: __SSugarConfig.get('process.asyncStart'),
                },
                killOnError: {
                    type: 'Boolean',
                    default: __SSugarConfig.get('process.killOnError'),
                },
                emitErrorAsEvent: {
                    type: 'Boolean',
                    default: __SSugarConfig.get('process.emitErrorAsEvent'),
                },
                stdio: {
                    type: 'String|SStdio|Boolean',
                    alias: 's',
                    default: __SSugarConfig.get('process.stdio'),
                },
                decorators: {
                    type: 'Boolean',
                    alias: 'd',
                    default: __SSugarConfig.get('process.decorators'),
                },
                throw: {
                    type: 'Boolean',
                    alias: 't',
                    default: __SSugarConfig.get('process.throw'),
                },
                exitAtEnd: {
                    type: 'Boolean',
                    alias: 'e',
                    default: __SSugarConfig.get('process.exitAtEnd'),
                },
                runAsChild: {
                    type: 'Boolean',
                    alias: 'c',
                    default: __SSugarConfig.get('process.runAsChild'),
                },
                processPath: {
                    type: 'String',
                    default: __SSugarConfig.get('process.processPath'),
                },
                notification: {
                    type: 'Object',
                    default: __SSugarConfig.get('process.notification'),
                },
            })
        );
    }
}
export default SProcessSettingsInterface;
