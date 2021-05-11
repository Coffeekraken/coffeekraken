import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __SViteStartInterface from './start/interface/SViteStartInterface';
import __SPromise from '@coffeekraken/s-promise';
import __SProcess, {
  SProcessManager as __SProcessManager,
  ISProcessSettings,
  ISProcessManagerProcessSettings
} from '@coffeekraken/s-process';
import { createServer as __viteServer } from 'vite';

export interface ISViteSettings {}
export interface ISViteCtorSettings {
  vite: Partial<ISViteSettings>;
}

export interface ISViteStartParams {}

export default class SVite extends __SClass {
  static interfaces = {
    startParams: __SViteStartInterface
  };

  /**
   * @name            viteSettings
   * @type            ISViteSettings
   * @get
   *
   * Access the vite settings
   *
   * @since           2.0.09
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get viteSettings(): ISViteSettings {
    return (<any>this)._settings.vite;
  }

  /**
   * @name            constructor
   * @type              Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings?: ISViteCtorSettings) {
    super(
      __deepMerge(
        {
          vite: {}
        },
        settings ?? {}
      )
    );
  }

  /**
   * @name          start
   * @type          Function
   *
   * Start the vite service with the server and the compilers
   *
   * @param         {ISViteStartParams}         [params={}]             Some parameters to customize your process
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  start(params: any) {
    return new __SPromise(async ({ resolve, reject, emit }) => {
      const server = await __viteServer({
        configFile: false,
        ...__sugarConfig('vite')
      });
      await server.listen();
    });
  }
}
