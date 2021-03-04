import __SProcess from '../process/SProcess';
import __SFindImportmapInterface from './interface/SFindImportmapInterface';
import __findImportmap from './findImportmap';
import __SPromise from '../promise/SPromise';
import __toString from '../string/toString';

/**
 * @name            SFindImportmapProcess
 * @namespace       sugar.node.importmap
 * @type            Class
 * @extends         SProcess
 *
 * Simple process to find the importmap files depending on the sugar config
 * or on the config you pass as parameters.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

// @ts-ignore
class SFindImportmapProcess extends __SProcess {
  static interfaces = {
    params: {
      apply: false,
      class: __SFindImportmapInterface
    }
  };

  constructor(initialParams = {}, settings: any = {}) {
    super(initialParams, settings || {});
  }

  process(params, settings) {
    return new __SPromise(async ({ resolve, reject, emit }) => {
      emit('log', {
        value: [
          `Searching for <yellow>importmap</yellow> files using these parameters:`,
          `- SFile: <magenta>${__toString(params.SFile)}</magenta>`,
          `- Directories: \n${params.dirs
            .map((d) => `   <cyan>${d}</cyan>`)
            .join('\n')}`,
          `- Names: \n${params.names
            .map((d) => `   <magenta>${d}</magenta>\n`)
            .join('')}`
        ].join('\n')
      });

      const resPromise = __findImportmap(params);
      const res = <[]>await resPromise;

      emit('log', {
        value: [
          `Finded importmap files:`,
          res.map((d) => `    <green>${d}</green>`)
        ].join('\n')
      });

      resolve(res);
    });
  }
}

export default SFindImportmapProcess;
