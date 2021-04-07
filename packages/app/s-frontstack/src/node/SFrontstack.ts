import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __registerFolder from '@coffeekraken/sugar/shared/config/registerFolder';
import __sugarConfig from '@coffeekraken/sugar/shared/config/sugar';
import __path from 'path';
import __SFrontstackStartInterface from './start/interface/SFrontstackStartInterface';
import __SPromise from '@coffeekraken/s-promise';

export interface ISFrontstackSettings {}
export interface ISFrontstackCtorSettings {
  frontstack: Partial<ISFrontstackSettings>;
}

export interface ISFrontstackStartParams {}

export default class SFrontstack extends __SClass {
  /**
   * @name            frontstackSettings
   * @type            ISFrontstackSettings
   * @get
   *
   * Access the frontstack settings
   *
   * @since           2.0.09
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get frontstackSettings(): ISFrontstackSettings {
    return (<any>this)._settings.frontstack;
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
  constructor(settings?: ISFrontstackCtorSettings) {
    super(
      __deepMerge(
        {
          frontstack: {}
        },
        settings ?? {}
      )
    );

    console.log(__sugarConfig('frontstack.frontstack'));
  }

  /**
   * @name        start
   * @type        Function
   * @async
   *
   * This method allows you to start a frontstack process
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  start(
    params: Partial<ISFrontstackStartParams>,
    settings?: Partial<ISFrontstackSettings>
  ) {
    return new __SPromise(({ resolve, reject }) => {
      const set = <ISFrontstackSettings>(
        __deepMerge(this.frontstackSettings, settings ?? {})
      );
      params = __SFrontstackStartInterface.apply(params);

      console.log(set, params);
    });
  }
}
