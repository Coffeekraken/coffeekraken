var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SFrontstackActionInterface from './action/interface/SFrontstackActionInterface';
import __SFrontstackRecipeParamsInterface from './recipe/interface/SFrontstackRecipeParamsInterface';
import __SFrontstackListParamsInterface from './list/interface/SFrontstackListParamsInterface';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarJson from '@coffeekraken/s-sugar-json';
import __argsToString from '@coffeekraken/sugar/shared/cli/argsToString';
import __SProcess, { SProcessManager as __SProcessManager, } from '@coffeekraken/s-process';
export default class SFrontstack extends __SClass {
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
    constructor(settings) {
        super(__deepMerge({
            frontstack: {},
        }, settings !== null && settings !== void 0 ? settings : {}));
    }
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
    get frontstackSettings() {
        return this._settings.frontstack;
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
    action(params) {
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            const frontstackConfig = __SSugarConfig.get('frontstack');
            const actionsObj = frontstackConfig.actions;
            const finalParams = __SFrontstackActionInterface.apply(params);
            const availableActions = Object.keys(actionsObj);
            if (availableActions.indexOf(finalParams.action) === -1) {
                throw new Error(`<red>[${this.constructor.name}.action]</red> Sorry but the requested action "<yellow>${finalParams.action}</yellow>" does not exists. Here's the list of available action(s):\n${availableActions
                    .map((r) => `- <yellow>${r}</yellow>`)
                    .join('\n')}`);
            }
            emit('log', {
                value: `Starting frontstack process using "<yellow>${finalParams.action}</yellow>" action`,
            });
            // get the recipe object and treat it
            const actionObj = 
            // @ts-ignore
            actionsObj[finalParams.action];
            // instanciate the process manager
            const processManager = new __SProcessManager();
            pipe(processManager);
            // loop on each actions for this recipe
            const actionId = (_a = actionObj.id) !== null && _a !== void 0 ? _a : finalParams.action;
            // create a process from the recipe object
            const pro = yield __SProcess.from(
            // @ts-ignore
            (_b = actionObj.command) !== null && _b !== void 0 ? _b : actionObj.process);
            // add the process to the process manager
            // @TODO    integrate log filter feature
            processManager.attachProcess(actionId, pro, {
            // log: {
            //   filter: undefined
            // }
            });
            processManager.run(actionId, (_d = (_c = finalParams.params) !== null && _c !== void 0 ? _c : actionObj.params) !== null && _d !== void 0 ? _d : {}, (_f = (_e = actionObj.settings) === null || _e === void 0 ? void 0 : _e.process) !== null && _f !== void 0 ? _f : {});
        }), {
            eventEmitter: {
                bind: this,
            },
        });
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
    recipe(params) {
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            const frontstackConfig = __SSugarConfig.get('frontstack');
            const recipesObj = frontstackConfig.recipes;
            const finalParams = __SFrontstackRecipeParamsInterface.apply(params);
            if (!finalParams.recipe) {
                const sugarJson = new __SSugarJson().current();
                if (sugarJson.recipe)
                    finalParams.recipe = sugarJson.recipe;
            }
            if (!finalParams.recipe) {
                finalParams.recipe = frontstackConfig.defaultRecipe;
            }
            if (!finalParams.recipe) {
                throw new Error(`<red>[recipe]</red> Sorry but it seems that you missed to pass a recipe to use or that you don't have any "<cyan>sugar.json</cyan>" file at the root of your project with a "<yellow>recipe</yellow>" property that define which recipe to use for this project...`);
            }
            if (!recipesObj[finalParams.recipe]) {
                throw new Error(`<red>[recipe]</red> Sorry but the specified "<yellow>${finalParams.recipe}</yellow>" recipe does not exists. Here's the available ones: <green>${Object.keys(recipesObj).join(', ')}</green>`);
            }
            if (!finalParams.stack) {
                if (!recipesObj[finalParams.recipe].defaultStack) {
                    throw new Error(`<red>[recipe]</red> Sorry but you MUST specify a "<yellow>stack</yellow>" to use in the requested "<cyan>${finalParams.recipe}</cyan>" recipe`);
                }
                finalParams.stack =
                    recipesObj[finalParams.recipe].defaultStack;
            }
            emit('log', {
                value: `Starting frontstack process`,
            });
            emit('log', {
                value: `<yellow>○</yellow> Recipe : <yellow>${finalParams.recipe}</yellow>`,
            });
            emit('log', {
                value: `<yellow>○</yellow> Stack  : <cyan>${finalParams.stack}</cyan>`,
            });
            // get the recipe object and treat it
            const recipeObj = 
            // @ts-ignore
            recipesObj[finalParams.recipe];
            // check the recipe stacks
            if (!recipeObj.stacks ||
                !Object.keys(recipeObj.stacks).length) {
                throw new Error(`<red>[recipe]</red> Sorry but the requested "<yellow>${finalParams.recipe}</yellow>" configuration object missed the requested "<yellow>stacks</yellow>" property that list the stacks to execute`);
            }
            if (!recipeObj.stacks[finalParams.stack]) {
                throw new Error(`<red>[recipe]</red> Sorry but the requested "<yellow>${finalParams.recipe}.stacks</yellow>" configuration object missed the requested "<yellow>${finalParams.stack}</yellow>" stack`);
            }
            // make sure this recipe has some actions
            if (!recipeObj.stacks[finalParams.stack].actions ||
                !Object.keys(recipeObj.stacks[finalParams.stack].actions)
                    .length) {
                throw new Error(`<red>[recipe]</red> Sorry but the requested "<yellow>${finalParams.recipe}.stacks.${finalParams.stack}.actions</yellow>" configuration object missed the requested "<yellow>actions</yellow>" property that list the actions to execute`);
            }
            // build shared params to pass to every sub-processes
            let sharedParams = Object.assign({}, finalParams);
            delete sharedParams.recipe;
            delete sharedParams.stack;
            delete sharedParams.help;
            // extend with "sharedParams" if exists on the recipe stack
            if (recipeObj.stacks[finalParams.stack].sharedParams) {
                sharedParams = Object.assign(Object.assign({}, recipeObj.stacks[finalParams.stack].sharedParams), sharedParams);
            }
            // instanciate the process manager
            const processManager = new __SProcessManager();
            pipe(processManager);
            // loop on each actions for this recipe
            if (recipeObj.stacks[finalParams.stack].actions) {
                Object.keys(recipeObj.stacks[finalParams.stack].actions).forEach((actionName) => __awaiter(this, void 0, void 0, function* () {
                    var _a, _b, _c, _d, _e, _f, _g;
                    if (finalParams.exclude &&
                        finalParams.exclude.indexOf(actionName) !== -1) {
                        emit('log', {
                            type: 'verbose',
                            value: `Excluding the action "<yellow>${actionName}</yellow>"`,
                        });
                        return;
                    }
                    // @ts-ignore
                    let actionObj = 
                    // @ts-ignore
                    recipeObj.stacks[finalParams.stack].actions[actionName];
                    let actionSpecificParams = {}, actionParams = {};
                    if (actionObj.action &&
                        !actionObj.process &&
                        !actionObj.command) {
                        actionSpecificParams = (_a = actionObj.params) !== null && _a !== void 0 ? _a : {};
                        actionObj = actionObj.action;
                    }
                    actionParams = (_b = actionObj.params) !== null && _b !== void 0 ? _b : {};
                    const finalActionParams = __deepMerge(actionParams, actionSpecificParams);
                    const sharedParamsStr = __argsToString(sharedParams).trim();
                    // build shared params cli string
                    const paramsStr = __argsToString(finalActionParams).trim();
                    const actionId = (_c = actionObj.id) !== null && _c !== void 0 ? _c : actionName;
                    // create a process from the recipe object
                    const finalCommand = ((_d = actionObj.command) !== null && _d !== void 0 ? _d : actionObj.process).trim() +
                        ' ' +
                        sharedParamsStr +
                        ' ' +
                        paramsStr;
                    emit('log', {
                        value: `<yellow>○</yellow> <yellow>${actionName}</yellow> : <cyan>${finalCommand}</cyan>`,
                    });
                    const pro = yield __SProcess.from(finalCommand);
                    const finalProcessManagerParams = Object.assign(Object.assign({}, sharedParams), ((_e = actionObj.params) !== null && _e !== void 0 ? _e : {}));
                    // add the process to the process manager
                    // @TODO    integrate log filter feature
                    processManager.attachProcess(actionId, pro, {});
                    processManager.run(actionId, finalProcessManagerParams, (_g = (_f = actionObj.settings) === null || _f === void 0 ? void 0 : _f.process) !== null && _g !== void 0 ? _g : {});
                }));
            }
        }), {
            eventEmitter: {
                bind: this,
            },
        });
    }
    /**
     * @name        listRecipes
     * @type        Function
     *
     * This method returns the recipes objects
     *
     * @return     {Record<string, ISFrontstackRecipe>}        The recipes objects
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    listRecipes() {
        const recipes = __SSugarConfig.get('frontstack.recipes');
        return recipes;
    }
    /**
     * @name        list
     * @type        Function
     * @async
     *
     * This method allows you to list all the current available recipes
     *
     * @return      {}
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    list(params) {
        return new __SPromise(({ resolve, reject, emit }) => {
            const recipes = this.listRecipes();
            const finalParams = __SFrontstackListParamsInterface.apply(params);
            let recipe, stack;
            if (finalParams.recipeStack) {
                recipe = finalParams.recipeStack.split('.')[0];
                stack = finalParams.recipeStack.split('.')[1];
            }
            if (!recipe) {
                emit('log', {
                    value: `Available recipe(s) list:`,
                });
                let largerName = '';
                for (const name in recipes) {
                    if (name.length > largerName.length)
                        largerName = name;
                }
                for (const [name, obj] of Object.entries(recipes)) {
                    emit('log', {
                        value: `- <cyan>${name}</cyan>${' '.repeat(largerName.length - name.length)} : ${obj.description}`,
                    });
                }
                return resolve(recipes);
            }
            if (recipe) {
                if (!recipes[recipe]) {
                    throw new Error(`<red>[SFrontstack.list]</red> Sorry but the recipe "<yellow>${recipe}</yellow> does not exists...`);
                }
            }
            if (recipe && !stack) {
                emit('log', {
                    value: `Stacks list for the recipe "<yellow>${recipe}</yellow>":`,
                });
                let largerName = '';
                for (const name in recipes[recipe].stacks) {
                    if (name.length > largerName.length)
                        largerName = name;
                }
                for (const [name, obj] of Object.entries(recipes[recipe].stacks)) {
                    emit('log', {
                        value: `- <cyan>${name}</cyan>${' '.repeat(largerName.length - name.length)} : ${obj.description}`,
                    });
                }
                return resolve(recipes[recipe]);
            }
            if (stack) {
                if (!recipes[recipe].stacks[stack]) {
                    throw new Error(`<red>[SFrontstack.list]</red> Sorry but the stack "<yellow>${stack}</yellow> does not exists in the recipe "<cyan>${recipe}</cyan>"...`);
                }
            }
            if (recipe && stack) {
                emit('log', {
                    value: `Actions list for the recipe "<yellow>${recipe}</yellow> and the stack "<cyan>${stack}</cyan>":`,
                });
                let largerName = '';
                for (const name in recipes[recipe].stacks[stack].actions) {
                    if (name.length > largerName.length)
                        largerName = name;
                }
                for (const [name, obj] of Object.entries(recipes[recipe].stacks[stack].actions)) {
                    emit('log', {
                        value: `- <cyan>${name}</cyan>${' '.repeat(largerName.length - name.length)} : ${obj.description}`,
                    });
                }
                return resolve(recipes[recipe].stacks[stack]);
            }
        }, {
            metas: {
                id: 'SFrontstack.list',
            },
        });
    }
}
SFrontstack.interfaces = {
    startParams: __SFrontstackActionInterface,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250c3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRnJvbnRzdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLDRCQUE0QixNQUFNLCtDQUErQyxDQUFDO0FBQ3pGLE9BQU8sa0NBQWtDLE1BQU0scURBQXFELENBQUM7QUFDckcsT0FBTyxnQ0FBZ0MsTUFBTSxpREFBaUQsQ0FBQztBQUMvRixPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFlBQVksTUFBTSw0QkFBNEIsQ0FBQztBQUN0RCxPQUFPLGNBQWMsTUFBTSw2Q0FBNkMsQ0FBQztBQUV6RSxPQUFPLFVBQVUsRUFBRSxFQUNmLGVBQWUsSUFBSSxpQkFBaUIsR0FHdkMsTUFBTSx5QkFBeUIsQ0FBQztBQWdFakMsTUFBTSxDQUFDLE9BQU8sT0FBTyxXQUFZLFNBQVEsUUFBUTtJQW1CN0M7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFtQztRQUMzQyxLQUFLLENBQ0QsV0FBVyxDQUNQO1lBQ0ksVUFBVSxFQUFFLEVBQUU7U0FDakIsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztJQUNOLENBQUM7SUFqQ0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxrQkFBa0I7UUFDbEIsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztJQUM1QyxDQUFDO0lBdUJEOzs7Ozs7Ozs7T0FTRztJQUNILE1BQU0sQ0FBQyxNQUF5QztRQUM1QyxPQUFPLElBQUksVUFBVSxDQUNqQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTs7WUFDdEMsTUFBTSxnQkFBZ0IsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzFELE1BQU0sVUFBVSxHQUFHLGdCQUFnQixDQUFDLE9BQU8sQ0FBQztZQUU1QyxNQUFNLFdBQVcsR0FDYiw0QkFBNEIsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFL0MsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRWpELElBQUksZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDckQsTUFBTSxJQUFJLEtBQUssQ0FDWCxTQUNJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFDckIsMERBQ0ksV0FBVyxDQUFDLE1BQ2hCLHdFQUF3RSxnQkFBZ0I7cUJBQ25GLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztxQkFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQ3BCLENBQUM7YUFDTDtZQUVELElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLDhDQUE4QyxXQUFXLENBQUMsTUFBTSxtQkFBbUI7YUFDN0YsQ0FBQyxDQUFDO1lBRUgscUNBQXFDO1lBQ3JDLE1BQU0sU0FBUztZQUNYLGFBQWE7WUFDYixVQUFVLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRW5DLGtDQUFrQztZQUNsQyxNQUFNLGNBQWMsR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUM7WUFDL0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3JCLHVDQUF1QztZQUV2QyxNQUFNLFFBQVEsR0FBRyxNQUFBLFNBQVMsQ0FBQyxFQUFFLG1DQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUM7WUFDcEQsMENBQTBDO1lBQzFDLE1BQU0sR0FBRyxHQUFHLE1BQU0sVUFBVSxDQUFDLElBQUk7WUFDN0IsYUFBYTtZQUNiLE1BQUEsU0FBUyxDQUFDLE9BQU8sbUNBQUksU0FBUyxDQUFDLE9BQU8sQ0FDekMsQ0FBQztZQUNGLHlDQUF5QztZQUN6Qyx3Q0FBd0M7WUFDeEMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO1lBQ3hDLFNBQVM7WUFDVCxzQkFBc0I7WUFDdEIsSUFBSTthQUNQLENBQUMsQ0FBQztZQUVILGNBQWMsQ0FBQyxHQUFHLENBQ2QsUUFBUSxFQUNSLE1BQUEsTUFBQSxXQUFXLENBQUMsTUFBTSxtQ0FBSSxTQUFTLENBQUMsTUFBTSxtQ0FBSSxFQUFFLEVBQzVDLE1BQUEsTUFBQSxTQUFTLENBQUMsUUFBUSwwQ0FBRSxPQUFPLG1DQUFJLEVBQUUsQ0FDcEMsQ0FBQztRQUNOLENBQUMsQ0FBQSxFQUNEO1lBQ0ksWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxJQUFJO2FBQ2I7U0FDSixDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsTUFBTSxDQUFDLE1BQXlDO1FBQzVDLE9BQU8sSUFBSSxVQUFVLENBQ2pCLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ3RDLE1BQU0sZ0JBQWdCLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMxRCxNQUFNLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7WUFFNUMsTUFBTSxXQUFXLEdBQ2Isa0NBQWtDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXJELElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFO2dCQUNyQixNQUFNLFNBQVMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUMvQyxJQUFJLFNBQVMsQ0FBQyxNQUFNO29CQUFFLFdBQVcsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQzthQUMvRDtZQUNELElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFO2dCQUNyQixXQUFXLENBQUMsTUFBTSxHQUFHLGdCQUFnQixDQUFDLGFBQWEsQ0FBQzthQUN2RDtZQUVELElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFO2dCQUNyQixNQUFNLElBQUksS0FBSyxDQUNYLG9RQUFvUSxDQUN2USxDQUFDO2FBQ0w7WUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDakMsTUFBTSxJQUFJLEtBQUssQ0FDWCx3REFDSSxXQUFXLENBQUMsTUFDaEIsd0VBQXdFLE1BQU0sQ0FBQyxJQUFJLENBQy9FLFVBQVUsQ0FDYixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUN6QixDQUFDO2FBQ0w7WUFFRCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxFQUFFO29CQUM5QyxNQUFNLElBQUksS0FBSyxDQUNYLDRHQUE0RyxXQUFXLENBQUMsTUFBTSxpQkFBaUIsQ0FDbEosQ0FBQztpQkFDTDtnQkFDRCxXQUFXLENBQUMsS0FBSztvQkFDYixVQUFVLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQzthQUNuRDtZQUVELElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLDZCQUE2QjthQUN2QyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLEtBQUssRUFBRSx1Q0FBdUMsV0FBVyxDQUFDLE1BQU0sV0FBVzthQUM5RSxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLEtBQUssRUFBRSxxQ0FBcUMsV0FBVyxDQUFDLEtBQUssU0FBUzthQUN6RSxDQUFDLENBQUM7WUFFSCxxQ0FBcUM7WUFDckMsTUFBTSxTQUFTO1lBQ1gsYUFBYTtZQUNiLFVBQVUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFbkMsMEJBQTBCO1lBQzFCLElBQ0ksQ0FBQyxTQUFTLENBQUMsTUFBTTtnQkFDakIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQ3ZDO2dCQUNFLE1BQU0sSUFBSSxLQUFLLENBQ1gsd0RBQXdELFdBQVcsQ0FBQyxNQUFNLHlIQUF5SCxDQUN0TSxDQUFDO2FBQ0w7WUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3RDLE1BQU0sSUFBSSxLQUFLLENBQ1gsd0RBQXdELFdBQVcsQ0FBQyxNQUFNLHdFQUF3RSxXQUFXLENBQUMsS0FBSyxrQkFBa0IsQ0FDeEwsQ0FBQzthQUNMO1lBRUQseUNBQXlDO1lBQ3pDLElBQ0ksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPO2dCQUM1QyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDO3FCQUNwRCxNQUFNLEVBQ2I7Z0JBQ0UsTUFBTSxJQUFJLEtBQUssQ0FDWCx3REFBd0QsV0FBVyxDQUFDLE1BQU0sV0FBVyxXQUFXLENBQUMsS0FBSyxtSUFBbUksQ0FDNU8sQ0FBQzthQUNMO1lBRUQscURBQXFEO1lBQ3JELElBQUksWUFBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQ2xELE9BQU8sWUFBWSxDQUFDLE1BQU0sQ0FBQztZQUMzQixPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFDMUIsT0FBTyxZQUFZLENBQUMsSUFBSSxDQUFDO1lBRXpCLDJEQUEyRDtZQUMzRCxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksRUFBRTtnQkFDbEQsWUFBWSxtQ0FDTCxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLEdBQ2hELFlBQVksQ0FDbEIsQ0FBQzthQUNMO1lBRUQsa0NBQWtDO1lBQ2xDLE1BQU0sY0FBYyxHQUFHLElBQUksaUJBQWlCLEVBQUUsQ0FBQztZQUMvQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFFckIsdUNBQXVDO1lBQ3ZDLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFO2dCQUM3QyxNQUFNLENBQUMsSUFBSSxDQUNQLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FDOUMsQ0FBQyxPQUFPLENBQUMsQ0FBTyxVQUFVLEVBQUUsRUFBRTs7b0JBQzNCLElBQ0ksV0FBVyxDQUFDLE9BQU87d0JBQ25CLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUNoRDt3QkFDRSxJQUFJLENBQUMsS0FBSyxFQUFFOzRCQUNSLElBQUksRUFBRSxTQUFTOzRCQUNmLEtBQUssRUFBRSxpQ0FBaUMsVUFBVSxZQUFZO3lCQUNqRSxDQUFDLENBQUM7d0JBQ0gsT0FBTztxQkFDVjtvQkFFRCxhQUFhO29CQUNiLElBQUksU0FBUztvQkFDVCxhQUFhO29CQUNiLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FDdkMsVUFBVSxDQUNiLENBQUM7b0JBQ04sSUFBSSxvQkFBb0IsR0FBRyxFQUFFLEVBQ3pCLFlBQVksR0FBRyxFQUFFLENBQUM7b0JBRXRCLElBQ0ksU0FBUyxDQUFDLE1BQU07d0JBQ2hCLENBQUMsU0FBUyxDQUFDLE9BQU87d0JBQ2xCLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFDcEI7d0JBQ0Usb0JBQW9CLEdBQUcsTUFBQSxTQUFTLENBQUMsTUFBTSxtQ0FBSSxFQUFFLENBQUM7d0JBQzlDLFNBQVMsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO3FCQUNoQztvQkFDRCxZQUFZLEdBQUcsTUFBQSxTQUFTLENBQUMsTUFBTSxtQ0FBSSxFQUFFLENBQUM7b0JBRXRDLE1BQU0saUJBQWlCLEdBQUcsV0FBVyxDQUNqQyxZQUFZLEVBQ1osb0JBQW9CLENBQ3ZCLENBQUM7b0JBRUYsTUFBTSxlQUFlLEdBQ2pCLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFFeEMsaUNBQWlDO29CQUNqQyxNQUFNLFNBQVMsR0FDWCxjQUFjLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFFN0MsTUFBTSxRQUFRLEdBQUcsTUFBQSxTQUFTLENBQUMsRUFBRSxtQ0FBSSxVQUFVLENBQUM7b0JBQzVDLDBDQUEwQztvQkFDMUMsTUFBTSxZQUFZLEdBQ2QsQ0FBQyxNQUFBLFNBQVMsQ0FBQyxPQUFPLG1DQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUU7d0JBQy9DLEdBQUc7d0JBQ0gsZUFBZTt3QkFDZixHQUFHO3dCQUNILFNBQVMsQ0FBQztvQkFFZCxJQUFJLENBQUMsS0FBSyxFQUFFO3dCQUNSLEtBQUssRUFBRSw4QkFBOEIsVUFBVSxxQkFBcUIsWUFBWSxTQUFTO3FCQUM1RixDQUFDLENBQUM7b0JBRUgsTUFBTSxHQUFHLEdBQUcsTUFBTSxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUVoRCxNQUFNLHlCQUF5QixtQ0FDeEIsWUFBWSxHQUNaLENBQUMsTUFBQSxTQUFTLENBQUMsTUFBTSxtQ0FBSSxFQUFFLENBQUMsQ0FDOUIsQ0FBQztvQkFFRix5Q0FBeUM7b0JBQ3pDLHdDQUF3QztvQkFDeEMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUNoRCxjQUFjLENBQUMsR0FBRyxDQUNkLFFBQVEsRUFDUix5QkFBeUIsRUFDekIsTUFBQSxNQUFBLFNBQVMsQ0FBQyxRQUFRLDBDQUFFLE9BQU8sbUNBQUksRUFBRSxDQUNwQyxDQUFDO2dCQUNOLENBQUMsQ0FBQSxDQUFDLENBQUM7YUFDTjtRQUNMLENBQUMsQ0FBQSxFQUNEO1lBQ0ksWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxJQUFJO2FBQ2I7U0FDSixDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFdBQVc7UUFDUCxNQUFNLE9BQU8sR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDekQsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsSUFBSSxDQUNBLE1BQXVDO1FBTXZDLE9BQU8sSUFBSSxVQUFVLENBQ2pCLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDMUIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBRW5DLE1BQU0sV0FBVyxHQUNiLGdDQUFnQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVuRCxJQUFJLE1BQU0sRUFBRSxLQUFLLENBQUM7WUFDbEIsSUFBSSxXQUFXLENBQUMsV0FBVyxFQUFFO2dCQUN6QixNQUFNLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLEtBQUssR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNqRDtZQUVELElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixLQUFLLEVBQUUsMkJBQTJCO2lCQUNyQyxDQUFDLENBQUM7Z0JBRUgsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO2dCQUNwQixLQUFLLE1BQU0sSUFBSSxJQUFJLE9BQU8sRUFBRTtvQkFDeEIsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNO3dCQUFFLFVBQVUsR0FBRyxJQUFJLENBQUM7aUJBQzFEO2dCQUNELEtBQUssTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUMvQyxJQUFJLENBQUMsS0FBSyxFQUFFO3dCQUNSLEtBQUssRUFBRSxXQUFXLElBQUksVUFBVSxHQUFHLENBQUMsTUFBTSxDQUN0QyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQ2xDLE1BQU0sR0FBRyxDQUFDLFdBQVcsRUFBRTtxQkFDM0IsQ0FBQyxDQUFDO2lCQUNOO2dCQUVELE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzNCO1lBRUQsSUFBSSxNQUFNLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtvQkFDbEIsTUFBTSxJQUFJLEtBQUssQ0FDWCwrREFBK0QsTUFBTSw4QkFBOEIsQ0FDdEcsQ0FBQztpQkFDTDthQUNKO1lBRUQsSUFBSSxNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsS0FBSyxFQUFFLHVDQUF1QyxNQUFNLGFBQWE7aUJBQ3BFLENBQUMsQ0FBQztnQkFDSCxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7Z0JBQ3BCLEtBQUssTUFBTSxJQUFJLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRTtvQkFDdkMsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNO3dCQUFFLFVBQVUsR0FBRyxJQUFJLENBQUM7aUJBQzFEO2dCQUNELEtBQUssTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUNwQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUN6QixFQUFFO29CQUNDLElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ1IsS0FBSyxFQUFFLFdBQVcsSUFBSSxVQUFVLEdBQUcsQ0FBQyxNQUFNLENBQ3RDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FDbEMsTUFBTSxHQUFHLENBQUMsV0FBVyxFQUFFO3FCQUMzQixDQUFDLENBQUM7aUJBQ047Z0JBRUQsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7YUFDbkM7WUFFRCxJQUFJLEtBQUssRUFBRTtnQkFDUCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDaEMsTUFBTSxJQUFJLEtBQUssQ0FDWCw4REFBOEQsS0FBSyxrREFBa0QsTUFBTSxhQUFhLENBQzNJLENBQUM7aUJBQ0w7YUFDSjtZQUVELElBQUksTUFBTSxJQUFJLEtBQUssRUFBRTtnQkFDakIsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixLQUFLLEVBQUUsd0NBQXdDLE1BQU0sa0NBQWtDLEtBQUssV0FBVztpQkFDMUcsQ0FBQyxDQUFDO2dCQUNILElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztnQkFDcEIsS0FBSyxNQUFNLElBQUksSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFBRTtvQkFDdEQsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNO3dCQUFFLFVBQVUsR0FBRyxJQUFJLENBQUM7aUJBQzFEO2dCQUNELEtBQUssTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUNwQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FDeEMsRUFBRTtvQkFDQyxJQUFJLENBQUMsS0FBSyxFQUFFO3dCQUNSLEtBQUssRUFBRSxXQUFXLElBQUksVUFBVSxHQUFHLENBQUMsTUFBTSxDQUN0QyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQ2xDLE1BQU0sR0FBRyxDQUFDLFdBQVcsRUFBRTtxQkFDM0IsQ0FBQyxDQUFDO2lCQUNOO2dCQUVELE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUNqRDtRQUNMLENBQUMsRUFDRDtZQUNJLEtBQUssRUFBRTtnQkFDSCxFQUFFLEVBQUUsa0JBQWtCO2FBQ3pCO1NBQ0osQ0FDSixDQUFDO0lBQ04sQ0FBQzs7QUE3Yk0sc0JBQVUsR0FBRztJQUNoQixXQUFXLEVBQUUsNEJBQTRCO0NBQzVDLENBQUMifQ==