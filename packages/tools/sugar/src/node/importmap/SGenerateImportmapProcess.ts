import __SProcess from '../process/SProcess';
import __SGenerateImportmapInterface from './interface/SGenerateImportmapInterface';
import __SPromise from '../promise/SPromise';
import __toString from '../string/toString';

/**
 * @name            SGenerateImportmapProcess
 * @namespace       sugar.node.importmap
 * @type            Class
 * @extends         SProcess
 *
 * Simple process to generate the importmap files depending on the sugar config
 * or on the config you pass as parameters.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

// @ts-ignore
class SGenerateImportmapProcess extends __SProcess {
  static interfaces = {
    params: {
      class: __SGenerateImportmapInterface
    }
  };

  constructor(initialParams = {}, settings: any = {}) {
    super(initialParams, settings || {});
  }

  process(params, settings) {
    return new __SPromise(async ({ resolve, reject, emit }) => {
      emit('log', {
        value: [
          `Generating the <yellow>importmap</yellow> file using these parameters:`,
          `- SFile: <magenta>${__toString(params.SFile)}</magenta>`
        ].join('\n')
      });

      resolve(true);
    });
  }
}

export default SGenerateImportmapProcess;
