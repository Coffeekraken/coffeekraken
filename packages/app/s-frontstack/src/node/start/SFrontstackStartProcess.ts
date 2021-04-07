import SProcess, { ISProcessSettings } from '@coffeekraken/s-process';
import __SFrontstack, {
  ISFrontstackSettings,
  ISFrontstackStartParams,
  ISFrontstackCtorSettings
} from '../SFrontstack';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';

import __SFrontstackStartInterface from './interface/SFrontstackStartInterface';

/**
 * @name            SFrontstackStartProcess
 * @namespace         s-frontstack
 * @type            Class
 * @extends         SProcess
 * @status              wip
 *
 * This class represent the start process for the frontstack app
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISFrontstackStartProcessCtorSettings {
  frontstack: Partial<ISFrontstackSettings>;
  process: Partial<ISProcessSettings>;
}

// @ts-ignore
class SFrontstackStartProcess extends SProcess {
  static interfaces = {
    params: __SFrontstackStartInterface
  };

  /**
   * @name      frontstackSettings
   * @type      ISFrontstackSettings
   * @get
   *
   * Access the ```scssCompileProcess``` settings
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get frontstackSettings(): ISFrontstackSettings {
    return (<any>this)._settings.frontstack;
  }

  /**
   * @name      _frontstackInstance
   * @type      __SFrontstack
   * @private
   *
   * Store the compiler instance
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  private _frontstackInstance: __SFrontstack;

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(
    initialParams: any,
    settings?: Partial<ISFrontstackStartProcessCtorSettings>
  ) {
    super(
      initialParams,
      __deepMerge(
        {
          frontstack: {
            something: 'cool'
          }
        },
        settings ?? {}
      )
    );

    this._frontstackInstance = new __SFrontstack({
      frontstack: this.frontstackSettings
    });
  }

  /**
   * @name              process
   * @type              Function
   *
   * Method that actually execute the process
   *
   * @param       {Object}        params           The arguments object that will be passed to the underlined actions stream instance
   * @param       {Object}        [settings={}]     An object of settings passed to the ```start``` method of the ```SBuildScssActionsStream``` instance
   * @return      {Süromise}                        An SPomise instance representing the build process
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  process(
    params: ISFrontstackStartParams,
    settings?: Partial<ISFrontstackSettings>
  ) {
    return this._frontstackInstance.start(params, this.frontstackSettings);
  }
}

export default SFrontstackStartProcess;
