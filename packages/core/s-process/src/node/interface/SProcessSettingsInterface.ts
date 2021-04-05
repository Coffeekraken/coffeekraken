import __sugarConfig from '@coffeekraken/sugar/shared/config/sugar';
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
  static definition = {
    asyncStart: {
      type: 'Boolean',
      alias: 'a',
      default: __sugarConfig('process.asyncStart')
    },
    killOnError: {
      type: 'Boolean',
      default: __sugarConfig('process.killOnError')
    },
    emitErrorAsEvent: {
      type: 'Boolean',
      default: __sugarConfig('process.emitErrorAsEvent')
    },
    restart: {
      type: 'Boolean|Number',
      default: 3
    },
    restartOn: {
      type: 'String|Array<String>',
      default: 'error'
    },
    stdio: {
      type: 'String|SStdio|Boolean',
      alias: 's',
      default: __sugarConfig('process.stdio')
    },
    decorators: {
      type: 'Boolean',
      alias: 'd',
      default: __sugarConfig('process.decorators')
    },
    throw: {
      type: 'Boolean',
      alias: 't',
      default: __sugarConfig('process.throw')
    },
    exitAtEnd: {
      type: 'Boolean',
      alias: 'e',
      default: __sugarConfig('process.exitAtEnd')
    },
    runAsChild: {
      type: 'Boolean',
      alias: 'c',
      default: __sugarConfig('process.runAsChild')
    },
    definition: {
      type: 'Object',
      default: __sugarConfig('process.definition')
    },
    processPath: {
      type: 'String',
      default: __sugarConfig('process.processPath')
    },
    notification: {
      type: 'Object',
      default: __sugarConfig('process.notification')
    }
  };
}
export default SProcessSettingsInterface;
