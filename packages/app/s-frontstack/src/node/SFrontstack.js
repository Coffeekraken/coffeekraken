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
import __SPromise from '@coffeekraken/s-promise';
import __SSugarJson from '@coffeekraken/s-sugar-json';
import __argsToString from '@coffeekraken/sugar/shared/cli/argsToString';
import __sugarBanner from '@coffeekraken/sugar/shared/ascii/sugarBanner';
import __SProcess, { SProcessManager as __SProcessManager } from '@coffeekraken/s-process';
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
            frontstack: {}
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
        return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            const frontstackConfig = __SSugarConfig.get('frontstack');
            const actionsObj = frontstackConfig.actions;
            const finalParams = __SFrontstackActionInterface.apply(params).value;
            const availableActions = Object.keys(actionsObj);
            if (availableActions.indexOf(finalParams.action) === -1) {
                throw new Error(`<red>[${this.constructor.name}.action]</red> Sorry but the requested action "<yellow>${finalParams.action}</yellow>" does not exists. Here's the list of available action(s):\n${availableActions
                    .map((r) => `- <yellow>${r}</yellow>`)
                    .join('\n')}`);
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
            const actionObj = 
            // @ts-ignore
            actionsObj[finalParams.action];
            // instanciate the process manager
            const processManager = new __SProcessManager();
            // loop on each actions for this recipe
            const actionId = (_a = actionObj.id) !== null && _a !== void 0 ? _a : finalParams.action;
            // create a process from the recipe object
            const pro = __SProcess.from(
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
                bind: this
            }
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
        return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            const frontstackConfig = __SSugarConfig.get('frontstack');
            const recipesObj = frontstackConfig['recipes'];
            const finalParams = __SFrontstackRecipeParamsInterface.apply(params).value;
            if (!finalParams.recipe) {
                const sugarJson = new __SSugarJson().current();
                finalParams.recipe = sugarJson.recipe;
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
                value: `<yellow>○</yellow> Recipe : <yellow>${finalParams.recipe}</yellow>`
            });
            emit('log', {
                value: `<yellow>○</yellow> Stack  : <cyan>${finalParams.stack}</cyan>`
            });
            // get the recipe object and treat it
            const recipeObj = 
            // @ts-ignore
            recipesObj[finalParams.recipe];
            // check the recipe stacks
            if (!recipeObj.stacks || !Object.keys(recipeObj.stacks).length) {
                throw new Error(`<red>[recipe]</red> Sorry but the requested "<yellow>${finalParams.recipe}</yellow>" configuration object missed the requested "<yellow>stacks</yellow>" property that list the stacks to execute`);
            }
            if (!recipeObj.stacks[finalParams.stack]) {
                throw new Error(`<red>[recipe]</red> Sorry but the requested "<yellow>${finalParams.recipe}.stacks</yellow>" configuration object missed the requested "<yellow>${finalParams.stack}</yellow>" stack`);
            }
            // make sure this recipe has some actions
            if (!recipeObj.stacks[finalParams.stack].actions ||
                !Object.keys(recipeObj.stacks[finalParams.stack].actions).length) {
                throw new Error(`<red>[recipe]</red> Sorry but the requested "<yellow>${finalParams.recipe}.stacks.${finalParams.stack}.actions</yellow>" configuration object missed the requested "<yellow>actions</yellow>" property that list the actions to execute`);
            }
            // build shared params to pass to every sub-processes
            const sharedParams = Object.assign({}, finalParams);
            delete sharedParams.recipe;
            delete sharedParams.stack;
            delete sharedParams.help;
            // build shared params cli string
            const sharedParamsStr = __argsToString(sharedParams).trim();
            // instanciate the process manager
            const processManager = new __SProcessManager();
            // loop on each actions for this recipe
            if (recipeObj.stacks[finalParams.stack].actions) {
                Object.keys(recipeObj.stacks[finalParams.stack].actions).forEach((actionName) => {
                    var _a, _b, _c, _d, _e;
                    if (finalParams.exclude &&
                        finalParams.exclude.indexOf(actionName) !== -1) {
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
                    const actionId = (_a = actionObj.id) !== null && _a !== void 0 ? _a : actionName;
                    // create a process from the recipe object
                    const finalCommand = ((_b = actionObj.command) !== null && _b !== void 0 ? _b : actionObj.process).trim() + ' ' + sharedParamsStr;
                    emit('log', {
                        value: `<yellow>○</yellow> <yellow>${actionName}</yellow> : <cyan>${finalCommand}</cyan>`
                    });
                    const pro = __SProcess.from(finalCommand);
                    // add the process to the process manager
                    // @TODO    integrate log filter feature
                    processManager.attachProcess(actionId, pro, {
                    // log: {
                    //   filter: undefined
                    // }
                    });
                    processManager.run(actionId, Object.assign(Object.assign({}, sharedParams), ((_c = actionObj.params) !== null && _c !== void 0 ? _c : {})), (_e = (_d = actionObj.settings) === null || _d === void 0 ? void 0 : _d.process) !== null && _e !== void 0 ? _e : {});
                });
            }
        }), {
            eventEmitter: {
                bind: this
            }
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
            let recipe, stack;
            if (params.recipeStack) {
                recipe = params.recipeStack.split('.')[0];
                stack = params.recipeStack.split('.')[1];
            }
            if (!recipe) {
                emit('log', {
                    value: `Available recipe(s) list:`
                });
                let largerName = '';
                for (const name in recipes) {
                    if (name.length > largerName.length)
                        largerName = name;
                }
                for (const [name, obj] of Object.entries(recipes)) {
                    emit('log', {
                        value: `- <cyan>${name}</cyan>${' '.repeat(largerName.length - name.length)} : ${obj.description}`
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
                    value: `Stacks list for the recipe "<yellow>${recipe}</yellow>":`
                });
                let largerName = '';
                for (const name in recipes[recipe].stacks) {
                    if (name.length > largerName.length)
                        largerName = name;
                }
                for (const [name, obj] of Object.entries(recipes[recipe].stacks)) {
                    emit('log', {
                        value: `- <cyan>${name}</cyan>${' '.repeat(largerName.length - name.length)} : ${obj.description}`
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
                    value: `Actions list for the recipe "<yellow>${recipe}</yellow> and the stack "<cyan>${stack}</cyan>":`
                });
                let largerName = '';
                for (const name in recipes[recipe].stacks[stack].actions) {
                    if (name.length > largerName.length)
                        largerName = name;
                }
                for (const [name, obj] of Object.entries(recipes[recipe].stacks[stack].actions)) {
                    emit('log', {
                        value: `- <cyan>${name}</cyan>${' '.repeat(largerName.length - name.length)} : ${obj.description}`
                    });
                }
                return resolve(recipes[recipe].stacks[stack]);
            }
        }, {
            metas: {
                id: 'SFrontstack.list'
            }
        });
    }
}
SFrontstack.interfaces = {
    startParams: __SFrontstackActionInterface
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250c3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRnJvbnRzdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLDRCQUE0QixNQUFNLCtDQUErQyxDQUFDO0FBQ3pGLE9BQU8sa0NBQWtDLE1BQU0scURBQXFELENBQUM7QUFDckcsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxZQUFZLE1BQU0sNEJBQTRCLENBQUM7QUFDdEQsT0FBTyxjQUFjLE1BQU0sNkNBQTZDLENBQUM7QUFDekUsT0FBTyxhQUFhLE1BQU0sOENBQThDLENBQUM7QUFDekUsT0FBTyxVQUFVLEVBQUUsRUFDakIsZUFBZSxJQUFJLGlCQUFpQixFQUdyQyxNQUFNLHlCQUF5QixDQUFDO0FBc0RqQyxNQUFNLENBQUMsT0FBTyxPQUFPLFdBQVksU0FBUSxRQUFRO0lBbUIvQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQW1DO1FBQzdDLEtBQUssQ0FDSCxXQUFXLENBQ1Q7WUFDRSxVQUFVLEVBQUUsRUFBRTtTQUNmLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFqQ0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxrQkFBa0I7UUFDcEIsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztJQUMxQyxDQUFDO0lBd0JEOzs7Ozs7Ozs7T0FTRztJQUNILE1BQU0sQ0FBQyxNQUFnQztRQUNyQyxPQUFPLElBQUksVUFBVSxDQUNuQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFOztZQUNsQyxNQUFNLGdCQUFnQixH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