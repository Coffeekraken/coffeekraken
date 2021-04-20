import __SProcess, {
  ISProcessSettings,
  ISProcessCtorSettings
} from '@coffeekraken/s-process';
import __SNpmUnusedParamsInterface from './interface/SNpmUnusedParamsInterface';
import __SPromise from '@coffeekraken/s-promise';
import __depCheck from 'depcheck';
import __packageRoot from '../path/packageRoot';
import __toString from '../../shared/string/toString';
import __packageJson from './utils/packageJson';

/**
 * @name            SNpmUnusedProcess
 * @namespace       sugar.node.npm
 * @type            Class
 * @extends         SProcess
 *
 * This process is used to check npm unused dependencies, remove unsused once, etc...
 * It use under the hood the amazing depcheck package made by @rumpl and @lijunle
 *
 * @see             https://www.npmjs.com/package/depcheck
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

interface ISNpmUnusedProcessSettings extends ISProcessSettings {}
interface ISNpmUnusedProcessCtorSettings extends ISProcessCtorSettings {}
interface ISNpmUnusedProcessParams {
  clean: boolean;
  skipMissing: boolean;
  skipDev: boolean;
}
interface ISNpmUnusedProcess {}

// @ts-ignore
class SNpmUnusedProcess extends __SProcess implements ISNpmUnusedProcess {
  static interfaces = {
    params: {
      class: __SNpmUnusedParamsInterface
    }
  };

  /**
   * @name        constructor
   * @type         Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(
    initialParams = {},
    settings?: Partial<ISNpmUnusedProcessCtorSettings>
  ) {
    super(initialParams, settings ?? {});
  }

  /**
   * @name        process
   * @type        Function
   *
   * Actual process execution
   *
   * @param       {Partial<ISNpmUnusedProcessParams>}        [params={}]         Params for the execution
   * @param       {Partial<ISNpmUnusedProcessSettings>}         [settings={}]           Some settings to override
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  process(
    params?: ISNpmUnusedProcessParams,
    settings?: Partial<ISNpmUnusedProcessSettings>
  ) {
    return new __SPromise(async ({ resolve, reject, emit }) => {
      // starting dependencies checking
      const unusedDepJson = await __depCheck(__packageRoot(), {
        // @ts-ignore
        skipMissing: params.skipMissing
      });

      // Listing the unused deps
      const unusedListArray: any[] = [];

      if (unusedDepJson.dependencies) {
        unusedDepJson.dependencies.forEach((dep) => {
          // get package json
          const packageJson = __packageJson(dep);
          unusedListArray.push({
            group: 'dependency',
            name: packageJson.name,
            version: packageJson.version,
            license: packageJson.license
          });
        });
      }

      // @ts-ignore
      if (!params.skipDev && unusedDepJson.devDependencies) {
        unusedDepJson.devDependencies.forEach((dep) => {
          // get package json
          const packageJson = __packageJson(dep);
          unusedListArray.push({
            group: 'devDependency',
            name: packageJson.name,
            version: packageJson.version,
            license: packageJson.license
          });
        });
      }

      // display list
      const listArray: string[] = unusedListArray.map((depObj) => {
        return `<${depObj.group === 'dependency' ? 'green' : 'red'}>[${
          depObj.group
        }]</${depObj.group === 'dependency' ? 'green' : 'red'}> ${
          depObj.license
        } <yellow>${depObj.name}</yellow> <cyan>${depObj.version}</cyan>`;
      });

      await emit('log', {
        value: listArray.join('\n')
      });

      const res = await emit('ask', {
        type: 'boolean',
        message: 'Would you like to clean the dependencies?',
        default: true
      });

      if (res) {
        console.log('process!!!');
      }

      resolve(true);
    });
  }
}

export default SNpmUnusedProcess;
