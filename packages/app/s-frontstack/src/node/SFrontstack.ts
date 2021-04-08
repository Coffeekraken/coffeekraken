import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __sugarConfig from '@coffeekraken/sugar/shared/config/sugar';
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
  start(params: Partial<ISFrontstackStartParams>) {
    return new __SPromise(
      ({ resolve, reject }) => {
        console.log(params);

        const availableReceipes = Object.keys(
          __sugarConfig('frontstack.receipes')
        );

        if (availableReceipes.indexOf(params.receipe) === -1) {
          throw new Error(
            `<red>[SFrontstack.start]</red> Sorry but the requested receipe "<yellow>${
              params.receipe
            }</yellow>" does not exists. Here's the list of available receipe(s):\n${availableReceipes
              .map((r) => `- <yellow>${r}</yellow>`)
              .join('\n')}`
          );
        }
      },
      {
        eventEmitter: {
          bind: this
        }
      }
    );
  }
}
