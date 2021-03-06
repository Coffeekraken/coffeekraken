import __SProcess, {
  ISProcessSettings,
  ISProcessCtorSettings
} from '../process/SProcess';
import __SNpmDependenciesParamsInterface from './interface/SNpmDependenciesParamsInterface';
import __SPromise from '../promise/SPromise';
import __depCheck from 'depcheck';
import __packageRoot from '../path/packageRoot';
import __toString from '../string/toString';
import __packageJson from './utils/packageJson';

/**
 * @name            SNpmDependenciesProcess
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

interface ISNpmDependenciesProcessSettings extends ISProcessSettings {}
interface ISNpmDependenciesProcessCtorSettings extends ISProcessCtorSettings {
  npmDependencies?: Partial<ISNpmDependenciesProcessSettings>;
}
interface ISNpmDependenciesProcessParams {
  clean: boolean;
  skipMissing: boolean;
  skipDev: boolean;
}
interface ISNpmDependenciesProcess {}

// @ts-ignore
class SNpmDependenciesProcess
  extends __SProcess
  implements ISNpmDependenciesProcess {
  static interfaces = {
    params: {
      class: __SNpmDependenciesParamsInterface
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
    settings?: ISNpmDependenciesProcessCtorSettings
  ) {
    super(initialParams, settings);
  }

  /**
   * @name        process
   * @type        Function
   *
   * Actual process execution
   *
   * @param       {Partial<ISNpmDependenciesProcessParams>}        [params={}]         Params for the execution
   * @param       {Partial<ISNpmDependenciesProcessSettings>}         [settings={}]           Some settings to override
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  process(
    params?: ISNpmDependenciesProcessParams,
    settings?: Partial<ISNpmDependenciesProcessSettings>
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

export default SNpmDependenciesProcess;
