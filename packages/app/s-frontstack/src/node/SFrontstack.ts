import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SFrontstackActionInterface from './action/interface/SFrontstackActionInterface';
import __SPromise from '@coffeekraken/s-promise';
import __sugarBanner from '@coffeekraken/sugar/shared/ascii/sugarBanner';
import __SProcess, {
  SProcessManager as __SProcessManager,
  ISProcessSettings,
  ISProcessManagerProcessSettings
} from '@coffeekraken/s-process';

import __SFrontspec from '@coffeekraken/s-frontspec';

export interface ISFrontstackSettings {}
export interface ISFrontstackCtorSettings {
  frontstack: Partial<ISFrontstackSettings>;
}

export interface ISFrontstackReceipeSettings {
  process: Partial<ISProcessSettings>;
  processManager: Partial<ISProcessManagerProcessSettings>;
}

export interface ISFrontstackAction {
  id: string;
  title: string;
  description: string;
  params: any;
  command: string;
  process: string;
  settings: Partial<ISFrontstackReceipeSettings>;
}

export interface ISFrontstackReceipeStack {
  description: string;
  actions: Record<string, ISFrontstackAction>;
}

export interface ISFrontstackReceipe {
  id: string;
  title: string;
  description: string;
  stacks: Record<string, ISFrontstackReceipeStack>;
}

export interface ISFrontstackActionParams {
  action: string;
}

export default class SFrontstack extends __SClass {
  static interfaces = {
    startParams: __SFrontstackActionInterface
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


  /**
   * @name        action
   * @type        Function
   * @async
   *
   * This method allows you to action a frontstack process
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  action(params: ISFrontstackActionParams) {
    return new __SPromise(
      async ({ resolve, reject, emit }) => {
        const frontstackConfig = __SSugarConfig.get('frontstack');
        const actionsObj = frontstackConfig.actions;

        let finalParams: ISFrontstackActionParams = __SFrontstackActionInterface.apply(params).value;

        const availableActions = Object.keys(actionsObj);

        if (availableActions.indexOf(finalParams.action) === -1) {
          throw new Error(
            `<red>[${
              this.constructor.name
            }.action]</red> Sorry but the requested action "<yellow>${
              finalParams.action
            }</yellow>" does not exists. Here's the list of available action(s):\n${availableActions
              .map((r) => `- <yellow>${r}</yellow>`)
              .join('\n')}`
          );
        }

        emit('log', {
          clear: true,
          nude: true,
          paddingTop: 0,
          paddingBottom: 1,
          value: __sugarBanner({
            paddingBottom: 1
          })
        });

        emit('log', {
          value: `Starting frontstack process using "<yellow>${finalParams.action}</yellow>" action`
        });

        // get the receipe object and treat it
        const actionObj: Partial<ISFrontstackAction> =
          // @ts-ignore
          actionsObj[finalParams.action];

        // instanciate the process manager
        const processManager = new __SProcessManager();
        // loop on each actions for this receipe
        
        const actionId = actionObj.id ?? finalParams.action;
        // create a process from the receipe object
        const pro = __SProcess.from(
          // @ts-ignore
          actionObj.command ?? actionObj.process
        );
        // add the process to the process manager
        // @TODO    integrate log filter feature
        processManager.attachProcess(actionId, pro, {
          // log: {
          //   filter: undefined
          // }
        });
        processManager.run(
          actionId,
          actionObj.params ?? {},
          actionObj.settings?.process ?? {}
        );
      },
      {
        eventEmitter: {
          bind: this
        }
      }
    );
  }

  // /**
  //  * @name        exec
  //  * @type        Function
  //  * @async
  //  *
  //  * This method allows you to exec a frontstack process
  //  *
  //  * @since       2.0.0
  //  * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  //  */
  // exec(params: ISFrontstackActionParams) {
  //   return new __SPromise(
  //     async ({ resolve, reject, emit }) => {
  //       const frontstackConfig = __SSugarConfig.get('frontstack');
  //       const receipesObj = frontstackConfig['receipes'];

  //       const finalParams: ISFrontstackActionParams = this.applyInterface(
  //         'startParams',
  //         params
  //       );

  //       const availableReceipes = Object.keys(receipesObj);

  //       if (availableReceipes.indexOf(finalParams.receipe) === -1) {
  //         throw new Error(
  //           `<red>[${
  //             this.constructor.name
  //           }.start]</red> Sorry but the requested receipe "<yellow>${
  //             finalParams.receipe
  //           }</yellow>" does not exists. Here's the list of available receipe(s):\n${availableReceipes
  //             .map((r) => `- <yellow>${r}</yellow>`)
  //             .join('\n')}`
  //         );
  //       }

  //       emit('log', {
  //         clear: true,
  //         nude: true,
  //         paddingTop: 0,
  //         paddingBottom: 1,
  //         value: __sugarBanner({
  //           paddingBottom: 1
  //         })
  //       });

  //       emit('log', {
  //         value: `Starting frontstack process using "<yellow>${finalParams.receipe}</yellow>" receipe`
  //       });

  //       // get the receipe object and treat it
  //       const receipeObj: Partial<ISFrontstackReceipe> =
  //         // @ts-ignore
  //         receipesObj[finalParams.receipe];

  //       if (!receipeObj) {
  //         throw new Error(
  //           `<red>${
  //             this.constructor.name
  //           }.start</red> Sorry the the requested "<yellow>${
  //             finalParams.receipe
  //           }</yellow>" does not exists. Here's the available receipe(s): ${Object.keys(
  //             receipesObj
  //           )
  //             .map((l) => `<green>${l}</green>`)
  //             .join(',')}`
  //         );
  //       }

  //       // check the receipe stacks
  //       if (!receipeObj.stacks || !Object.keys(receipeObj.stacks).length) {
  //         throw new Error(
  //           `<red>${this.constructor.name}.start] Sorry but the requested "<yellow>${finalParams.receipe}</yellow>" configuration object missed the requested "<yellow>stacks</yellow>" property that list the stacks to execute`
  //         );
  //       }
  //       if (!receipeObj.stacks[params.stack]) {
  //         throw new Error(
  //           `<red>${this.constructor.name}.start] Sorry but the requested "<yellow>${finalParams.receipe}.stacks.${params.stack}</yellow>" configuration object missed the requested "<yellow>${params.stack}</yellow>" stack`
  //         );
  //       }

  //       // make sure this receipe has some actions
  //       if (
  //         !receipeObj.stacks[params.stack].actions ||
  //         !Object.keys(receipeObj.stacks[params.stack].actions).length
  //       ) {
  //         throw new Error(
  //           `<red>${this.constructor.name}.start] Sorry but the requested "<yellow>${finalParams.receipe}.stacks.${params.stack}.actions</yellow>" configuration object missed the requested "<yellow>actions</yellow>" property that list the actions to execute`
  //         );
  //       }

  //       // instanciate the process manager
  //       const processManager = new __SProcessManager();
  //       // loop on each actions for this receipe
  //       if (receipeObj.stacks[params.stack].actions) {
  //         Object.keys(receipeObj.stacks[params.stack].actions).forEach(
  //           (actionName) => {
  //             if (
  //               finalParams.exclude &&
  //               finalParams.exclude.indexOf(actionName) !== -1
  //             ) {
  //               emit('log', {
  //                 type: 'verbose',
  //                 value: `Excluding the action "<yellow>${actionName}</yellow>"`
  //               });
  //               return;
  //             }

  //             // @ts-ignore
  //             const actionObj =
  //               // @ts-ignore
  //               receipeObj.stacks[params.stack].actions[actionName];
  //             const actionId = actionObj.id ?? actionName;
  //             // create a process from the receipe object
  //             const pro = __SProcess.from(
  //               actionObj.command ?? actionObj.process
  //             );
  //             // add the process to the process manager
  //             // @TODO    integrate log filter feature
  //             processManager.attachProcess(actionId, pro, {
  //               // log: {
  //               //   filter: undefined
  //               // }
  //             });
  //             processManager.run(
  //               actionId,
  //               actionObj.params ?? {},
  //               actionObj.settings?.process ?? {}
  //             );
  //           }
  //         );
  //       }
  //     },
  //     {
  //       eventEmitter: {
  //         bind: this
  //       }
  //     }
  //   );
  // }
}
