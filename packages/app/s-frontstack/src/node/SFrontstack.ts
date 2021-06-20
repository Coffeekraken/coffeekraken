import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SFrontstackActionInterface from './action/interface/SFrontstackActionInterface';
import __SFrontstackRecipeParamsInterface from './recipe/interface/SFrontstackRecipeParamsInterface';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarJson from '@coffeekraken/s-sugar-json';
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

export interface ISFrontstackRecipesettings {
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
  settings: Partial<ISFrontstackRecipesettings>;
}

export interface ISFrontstackRecipestack {
  description: string;
  actions: Record<string, ISFrontstackAction>;
}

export interface ISFrontstackRecipe {
  id: string;
  title: string;
  description: string;
  stacks: Record<string, ISFrontstackRecipestack>;
}

export interface ISFrontstackActionParams {
  action: string;
  params: string;
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

        const finalParams: ISFrontstackActionParams = __SFrontstackActionInterface.apply(params).value;

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

        // get the recipe object and treat it
        const actionObj: Partial<ISFrontstackAction> =
          // @ts-ignore
          actionsObj[finalParams.action];

        // instanciate the process manager
        const processManager = new __SProcessManager();
        // loop on each actions for this recipe
        
        const actionId = actionObj.id ?? finalParams.action;
        // create a process from the recipe object
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
          finalParams.params ?? actionObj.params ?? {},
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

  /**
   * @name        recipe
   * @type        Function
   * @async
   *
   * This method allows you to exec a frontstack process
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  recipe(params: ISFrontstackRecipeParams) {
    return new __SPromise(
      async ({ resolve, reject, emit }) => {
        const frontstackConfig = __SSugarConfig.get('frontstack');
        const recipesObj = frontstackConfig['recipes'];

        const finalParams = __SFrontstackRecipeParamsInterface.apply(params).value;

        if (!finalParams.recipe) {
          const sugarJson = new __SSugarJson().current();
          finalParams.recipe = sugarJson.recipe;
        }

        if (!recipesObj[finalParams.recipe]) {
          throw new Error(`<red>[recipe]</red> Sorry but the specified "<yellow>${finalParams.recipe}</yellow>" recipe does not exists. Here's the available ones: <green>${Object.keys(recipesObj).join(', ')}</green>`);
        }

        if (!finalParams.stack) {
          if (!recipesObj[finalParams.recipe].defaultStack) {
            throw new Error(`<red>[recipe]</red> Sorry but you MUST specify a "<yellow>stack</yellow>" to use in the requested "<cyan>${finalParams.recipe}</cyan>" recipe`);
          }
          finalParams.stack = recipesObj[finalParams.recipe].defaultStack;
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
          value: `Starting frontstack process`
        });

        emit('log', {
          value: `- Recipe: <yellow>${finalParams.recipe}</yellow>`
        });
        emit('log', {
          value: `- Stack : <cyan>${finalParams.stack}</cyan>`
        });

        // get the recipe object and treat it
        const recipeObj: Partial<ISFrontstackRecipe> =
          // @ts-ignore
          recipesObj[finalParams.recipe];

        // check the recipe stacks
        if (!recipeObj.stacks || !Object.keys(recipeObj.stacks).length) {
          throw new Error(
            `<red>[recipe]</red> Sorry but the requested "<yellow>${finalParams.recipe}</yellow>" configuration object missed the requested "<yellow>stacks</yellow>" property that list the stacks to execute`
          );
        }
        if (!recipeObj.stacks[finalParams.stack]) {
          throw new Error(
            `<red>[recipe]</red> Sorry but the requested "<yellow>${finalParams.recipe}.stacks</yellow>" configuration object missed the requested "<yellow>${finalParams.stack}</yellow>" stack`
          );
        }

        // make sure this recipe has some actions
        if (
          !recipeObj.stacks[finalParams.stack].actions ||
          !Object.keys(recipeObj.stacks[finalParams.stack].actions).length
        ) {
          throw new Error(
            `<red>[recipe]</red> Sorry but the requested "<yellow>${finalParams.recipe}.stacks.${finalParams.stack}.actions</yellow>" configuration object missed the requested "<yellow>actions</yellow>" property that list the actions to execute`
          );
        }

        // instanciate the process manager
        const processManager = new __SProcessManager();
        // loop on each actions for this recipe
        if (recipeObj.stacks[finalParams.stack].actions) {
          Object.keys(recipeObj.stacks[finalParams.stack].actions).forEach(
            (actionName) => {
              if (
                finalParams.exclude &&
                finalParams.exclude.indexOf(actionName) !== -1
              ) {
                emit('log', {
                  type: 'verbose',
                  value: `Excluding the action "<yellow>${actionName}</yellow>"`
                });
                return;
              }

              // @ts-ignore
              const actionObj =
                // @ts-ignore
                recipeObj.stacks[finalParams.stack].actions[actionName];
              const actionId = actionObj.id ?? actionName;
              // create a process from the recipe object
              const pro = __SProcess.from(
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
            }
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
