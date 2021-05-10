import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __SFrontstackStartInterface from './start/interface/SFrontstackStartInterface';
import __SPromise from '@coffeekraken/s-promise';
import __sugarBanner from '@coffeekraken/sugar/shared/ascii/sugarBanner';
import __SProcess, {
  SProcessManager as __SProcessManager,
  ISProcessSettings,
  ISProcessManagerProcessSettings
} from '@coffeekraken/s-process';
import { createServer as __viteServer } from 'vite';

import __SFrontspec from '@coffeekraken/s-frontspec';

export interface ISFrontstackSettings {}
export interface ISFrontstackCtorSettings {
  frontstack: Partial<ISFrontstackSettings>;
}

export interface ISFrontstackReceipeSettings {
  process: Partial<ISProcessSettings>;
  processManager: Partial<ISProcessManagerProcessSettings>;
}

export interface ISFrontstackReceipeAction {
  id: string;
  title: string;
  description: string;
  params: any;
  command: string;
  process: string;
  settings: Partial<ISFrontstackReceipeSettings>;
}

export interface ISFrontstackReceipe {
  id: string;
  title: string;
  description: string;
  actions: Record<string, ISFrontstackReceipeAction>;
}

export interface ISFrontstackStartParams {
  receipe: string;
  exclude: string[];
}

export default class SFrontstack extends __SClass {
  static interfaces = {
    startParams: __SFrontstackStartInterface
  };

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

  vite(params: any) {
    return new __SPromise(async ({ resolve, reject, emit }) => {
      const fs = new __SFrontspec();
      const server = await __viteServer({
        configFile: false,
        ...__sugarConfig('vite')
      });
      await server.listen();
    });
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
      ({ resolve, reject, emit }) => {
        const frontstackConfig = __sugarConfig('frontstack');
        const receipesObj = frontstackConfig['receipes'];

        const finalParams: ISFrontstackStartParams = this.applyInterface(
          'startParams',
          params
        );

        const availableReceipes = Object.keys(receipesObj);

        if (availableReceipes.indexOf(finalParams.receipe) === -1) {
          throw new Error(
            `<red>[${
              this.constructor.name
            }.start]</red> Sorry but the requested receipe "<yellow>${
              finalParams.receipe
            }</yellow>" does not exists. Here's the list of available receipe(s):\n${availableReceipes
              .map((r) => `- <yellow>${r}</yellow>`)
              .join('\n')}`
          );
        }

        emit('log', {
          clear: true,
          nude: true,
          marginTop: 2,
          marginBottom: 2,
          value: __sugarBanner()
        });

        emit('log', {
          value: `Starting frontstack process using "<yellow>${finalParams.receipe}</yellow>" receipe`
        });

        // get the receipe object and treat it
        const receipeObj: Partial<ISFrontstackReceipe> =
          // @ts-ignore
          receipesObj[finalParams.receipe];

        if (!receipeObj) {
          throw new Error(
            `<red>${
              this.constructor.name
            }.start</red> Sorry the the requested "<yellow>${
              finalParams.receipe
            }</yellow>" does not exists. Here's the available receipe(s): ${Object.keys(
              receipesObj
            )
              .map((l) => `<green>${l}</green>`)
              .join(',')}`
          );
        }

        // make sure this receipe has some actions
        if (!receipeObj.actions || !Object.keys(receipeObj.actions).length) {
          throw new Error(
            `<red>${this.constructor.name}.start] Sorry but the requested "<yellow>${finalParams.receipe}</yellow>" configuration object missed the requested "<yellow>actions</yellow>" property that list the actions to execute`
          );
        }

        // instanciate the process manager
        const processManager = new __SProcessManager();
        // loop on each actions for this receipe
        if (receipeObj.actions) {
          Object.keys(receipeObj.actions).forEach((actionName) => {
            if (
              finalParams.exclude &&
              finalParams.exclude.indexOf(actionName) !== -1
            ) {
              emit('log', {
                value: `Excluding the action "<yellow>${actionName}</yellow>"`
              });
              return;
            }

            // @ts-ignore
            const actionObj = receipeObj.actions[actionName];
            const actionId = actionObj.id ?? actionName;
            // create a process from the receipe object
            const pro = __SProcess.from(actionObj.command ?? actionObj.process);
            // add the process to the process manager
            processManager.attachProcess(
              actionId,
              pro,
              actionObj.settings?.processManager ?? {}
            );
            processManager.run(
              actionId,
              actionObj.params ?? {},
              actionObj.settings?.process ?? {}
            );
          });
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
