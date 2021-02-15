import __sugarConfig from '../../config/sugar';
import __SInterface from '../../interface/SInterface';

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
