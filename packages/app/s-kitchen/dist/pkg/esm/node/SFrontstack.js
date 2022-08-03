var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { replaceCommandTokens as __replaceCommandTokens } from '@coffeekraken/cli';
import __SClass from '@coffeekraken/s-class';
import __SDuration from '@coffeekraken/s-duration';
import __SLog from '@coffeekraken/s-log';
import __SProcess, { SProcessManager as __SProcessManager, } from '@coffeekraken/s-process';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SSugarJson from '@coffeekraken/s-sugar-json';
import __commandExists from '@coffeekraken/sugar/node/command/commandExists';
import __argsToString from '@coffeekraken/sugar/shared/cli/argsToString';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __filter from '@coffeekraken/sugar/shared/object/filter';
import __stripAnsi from '@coffeekraken/sugar/shared/string/stripAnsi';
import __SFrontstackActionInterface from './interface/SFrontstackActionInterface';
import __SFrontstackListParamsInterface from './interface/SFrontstackListParamsInterface';
import __SFronstackNewParamsInterface from './interface/SFrontstackNewParamsInterface';
import __SFrontstackRecipeParamsInterface from './interface/SFrontstackRecipeParamsInterface';
export default class SFrontstack extends __SClass {
    /**
     * @name            constructor
     * @type              Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings) {
        super(__deepMerge({}, settings !== null && settings !== void 0 ? settings : {}));
    }
    /**
     * @name        new
     * @type        Function
     * @async
     *
     * This method allows you to create a new project using one of the available recipe(s)
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    new(params) {
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            const frontstackConfig = __SSugarConfig.get('frontstack');
            const recipesObj = __filter(frontstackConfig.recipes, (key, recipeObj) => {
                var _a;
                return ((_a = recipeObj.stacks) === null || _a === void 0 ? void 0 : _a.new) !== undefined;
            });
            const finalParams = __SFronstackNewParamsInterface.apply(params);
            const availableRecipes = Object.keys(recipesObj);
            const recipe = yield emit('ask', {
                type: 'autocomplete',
                message: 'Please select one of the available recipes',
                choices: availableRecipes,
            });
            if (!recipe)
                process.exit();
            const recipeObj = recipesObj[recipe];
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `Starting project creation using the "<yellow>${recipe}</yellow>" recipe...`,
            });
            resolve(pipe(this.recipe({
                recipe,
                stack: 'new',
            })));
        })).bind(this);
    }
    /**
     * @name        action
     * @type        Function
     * @async
     *
     * This method allows you to action a frontstack process
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                type: __SLog.TYPE_INFO,
                value: `Starting frontstack process using "<yellow>${finalParams.action}</yellow>" action`,
            });
            // get the recipe object and treat it
            const actionObj = 
            // @ts-ignore
            actionsObj[finalParams.action];
            // instanciate the process manager
            const processManager = new __SProcessManager({
            // processManager: {
            //     runInParallel: false
            // }
            });
            pipe(processManager);
            // loop on each actions for this recipe
            const finalCommand = __replaceCommandTokens(
            // @ts-ignore
            (_a = actionObj.command) !== null && _a !== void 0 ? _a : actionObj.process);
            const actionId = (_b = actionObj.id) !== null && _b !== void 0 ? _b : finalParams.action;
            // create a process from the recipe object
            const pro = yield __SProcess.from(finalCommand);
            // add the process to the process manager
            // @TODO    integrate log filter feature
            processManager.attachProcess(actionId, pro, {
            // log: {
            //   filter: undefined
            // }
            });
            processManager.run(actionId, (_d = (_c = finalParams.params) !== null && _c !== void 0 ? _c : actionObj.params) !== null && _d !== void 0 ? _d : {}, (_f = (_e = actionObj.settings) === null || _e === void 0 ? void 0 : _e.process) !== null && _f !== void 0 ? _f : {});
        }), {}).bind(this);
    }
    /**
     * @name        recipe
     * @type        Function
     * @async
     *
     * This method allows you to exec a frontstack process
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    recipe(params) {
        const processesPromises = [];
        const duration = new __SDuration();
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const frontstackConfig = __SSugarConfig.get('frontstack');
            const recipesObj = frontstackConfig.recipes;
            const actionsObj = frontstackConfig.actions;
            const finalParams = __SFrontstackRecipeParamsInterface.apply(params);
            const sugarJson = new __SSugarJson().current();
            if (!finalParams.recipe) {
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
                finalParams.stack = recipesObj[finalParams.recipe].defaultStack;
            }
            // get the recipe object and treat it
            const recipeObj = 
            // @ts-ignore
            recipesObj[finalParams.recipe];
            // defined actions in the sugar.jcon file
            if ((_a = sugarJson.frontstack) === null || _a === void 0 ? void 0 : _a[finalParams.stack]) {
                for (let [key, value] of Object.entries((_b = sugarJson.frontstack) === null || _b === void 0 ? void 0 : _b[finalParams.stack])) {
                    if (!frontstackConfig.actions[value.action]) {
                        throw new Error(`The requested action "<yellow>${value.action}</yellow>" does not exists in the config.frontstack.actions stack... Here's the available ones: <green>${Object.keys(frontstackConfig.actions).join(',')}</green>`);
                    }
                    // @ts-ignore
                    recipeObj.stacks[finalParams.stack].actions[`sugarJson-${value.action}`] = __deepMerge(Object.assign({}, frontstackConfig.actions[value.action], value));
                    delete recipeObj.stacks[finalParams.stack].actions[`sugarJson-${value.action}`].action;
                }
            }
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
            // requirements
            if (recipeObj.requirements) {
                if (recipeObj.requirements.commands) {
                    for (let i = 0; i < recipeObj.requirements.commands.length; i++) {
                        emit('log', {
                            type: __SLog.TYPE_VERBOSE,
                            value: `<yellow>[requirements]</yellow> Checking for the "<magenta>${recipeObj.requirements.commands[i]}</magenta>" command to exists...`,
                        });
                        const version = yield __commandExists(recipeObj.requirements.commands[i]);
                        if (!version) {
                            throw new Error(`<red>[requirements]</red> Sorry but the command "<yellow>${recipeObj.requirements.commands[i]}</yellow>" is required but it does not exists.`);
                        }
                        else {
                            emit('log', {
                                type: __SLog.TYPE_VERBOSE,
                                value: `<green>[requirements]</green> Command "<magenta>${recipeObj.requirements.commands[i]}</magenta>" available in version <cyan>${__stripAnsi(String(version).replace('\n', ''))}</cyan>.`,
                            });
                        }
                    }
                }
            }
            const stackObj = recipeObj.stacks[finalParams.stack];
            if (!finalParams.runInParallel) {
                finalParams.runInParallel = (_c = stackObj.runInParallel) !== null && _c !== void 0 ? _c : false;
            }
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `Starting frontstack process`,
            });
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>○</yellow> Recipe : <yellow>${finalParams.recipe}</yellow>`,
            });
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>○</yellow> Stack  : <cyan>${finalParams.stack}</cyan>`,
            });
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>○</yellow> Run in parallel : ${finalParams.runInParallel
                    ? '<green>true</green>'
                    : '<red>false</red>'}`,
            });
            // build shared params to pass to every sub-processes
            let sharedParams = Object.assign({}, finalParams);
            delete sharedParams.recipe;
            delete sharedParams.stack;
            delete sharedParams.help;
            // extend with "sharedParams" if exists on the recipe stack
            if (stackObj.sharedParams) {
                sharedParams = Object.assign(Object.assign({}, stackObj.sharedParams), sharedParams);
            }
            // instanciate the process manager
            const processManager = new __SProcessManager({
                processManager: {
                    // @ts-ignore
                    runInParallel: finalParams.runInParallel,
                },
            });
            pipe(processManager, {
                overrideEmitter: true,
            });
            // loop on each actions for this recipe
            if (stackObj.actions) {
                for (let i = 0; i < Object.keys(stackObj.actions).length; i++) {
                    const actionName = Object.keys(stackObj.actions)[i];
                    // Object.keys(
                    //     stackObj.actions,
                    // ).forEach(async (actionName) => {
                    if (finalParams.exclude &&
                        finalParams.exclude.indexOf(actionName) !== -1) {
                        emit('log', {
                            type: __SLog.TYPE_VERBOSE,
                            value: `Excluding the action "<yellow>${actionName}</yellow>"`,
                        });
                        return;
                    }
                    // @ts-ignore
                    let actionObj = 
                    // @ts-ignore
                    stackObj.actions[actionName];
                    // check `extends` property
                    if (actionObj.extends) {
                        if (!actionsObj[actionObj.extends]) {
                            throw new Error(`<red>[action]</red> Your action "<yellow>${actionName}</yellow>" tries to extends the "<cyan>${actionObj.extends}</cyan>" action that does not exists... Here's the available actions at this time: <green>${Object.keys(actionsObj).join(',')}</green>`);
                        }
                        emit('log', {
                            type: __SLog.TYPE_VERBOSE,
                            value: `<yellow>○</yellow> <magenta>extends</magenta> : Your action "<yellow>${actionName}</yellow>" extends the "<cyan>${actionObj.extends}</cyan>" one`,
                        });
                        actionObj = (__deepMerge(Object.assign({}, actionsObj[actionObj.extends]), actionObj));
                    }
                    let actionSpecificParams = {}, actionParams = {};
                    if (actionObj.action &&
                        !actionObj.process &&
                        !actionObj.command) {
                        actionSpecificParams = (_d = actionObj.params) !== null && _d !== void 0 ? _d : {};
                        actionObj = actionObj.action;
                    }
                    actionParams = (_e = actionObj.params) !== null && _e !== void 0 ? _e : {};
                    const finalActionParams = __deepMerge(actionParams, actionSpecificParams);
                    const sharedParamsStr = __argsToString(sharedParams).trim();
                    // build shared params cli string
                    const actionId = (_f = actionObj.id) !== null && _f !== void 0 ? _f : actionName;
                    // create a process from the recipe object
                    let finalCommand = ((_g = actionObj.command) !== null && _g !== void 0 ? _g : actionObj.process).trim() +
                        ' ' +
                        sharedParamsStr;
                    finalCommand = __replaceCommandTokens(finalCommand, finalActionParams);
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>○</yellow> <yellow>${actionName}</yellow> : <cyan>${finalCommand}</cyan>`,
                    });
                    const pro = yield __SProcess.from(finalCommand, {
                        process: {
                            before: actionObj.before,
                            after: actionObj.after,
                        },
                    });
                    const finalProcessManagerParams = Object.assign(Object.assign({}, sharedParams), ((_h = actionObj.params) !== null && _h !== void 0 ? _h : {}));
                    // add the process to the process manager
                    // @TODO    integrate log filter feature
                    processManager.attachProcess(actionId, pro, {});
                    const processPro = processManager.run(actionId, finalProcessManagerParams, (_k = (_j = actionObj.settings) === null || _j === void 0 ? void 0 : _j.process) !== null && _k !== void 0 ? _k : {});
                    if (!processesPromises.includes(processPro)) {
                        processesPromises.push(processPro);
                    }
                    if (!finalParams.runInParallel) {
                        yield processPro;
                    }
                }
            }
            yield Promise.all(processesPromises);
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<green>[success]</green> All actions have been executed <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`,
            });
            resolve(processesPromises);
        }), {}).bind(this);
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    list(params) {
        return new __SPromise(({ resolve, reject, emit }) => {
            const recipes = this.listRecipes();
            const finalParams = __SFrontstackListParamsInterface.apply(params);
            let recipe, stack;
            if (finalParams.recipe) {
                recipe = finalParams.recipe.split('.')[0];
                stack = finalParams.recipe.split('.')[1];
            }
            if (!recipe) {
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `Available recipe(s) list:`,
                });
                let largerName = '';
                for (const name in recipes) {
                    if (name.length > largerName.length)
                        largerName = name;
                }
                for (const [name, obj] of Object.entries(recipes)) {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
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
                    type: __SLog.TYPE_INFO,
                    value: `Stacks list for the recipe "<yellow>${recipe}</yellow>":`,
                });
                let largerName = '';
                for (const name in recipes[recipe].stacks) {
                    if (name.length > largerName.length)
                        largerName = name;
                }
                for (const [name, obj] of Object.entries(recipes[recipe].stacks)) {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
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
                    type: __SLog.TYPE_INFO,
                    value: `Actions list for the recipe "<yellow>${recipe}</yellow> and the stack "<cyan>${stack}</cyan>":`,
                });
                let largerName = '';
                for (const name in recipes[recipe].stacks[stack].actions) {
                    if (name.length > largerName.length)
                        largerName = name;
                }
                for (const [name, obj] of Object.entries(recipes[recipe].stacks[stack].actions)) {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxvQkFBb0IsSUFBSSxzQkFBc0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25GLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxFQUFFLEVBR2YsZUFBZSxJQUFJLGlCQUFpQixHQUN2QyxNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sWUFBWSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RELE9BQU8sZUFBZSxNQUFNLGdEQUFnRCxDQUFDO0FBQzdFLE9BQU8sY0FBYyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3pFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sUUFBUSxNQUFNLDBDQUEwQyxDQUFDO0FBQ2hFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sNEJBQTRCLE1BQU0sd0NBQXdDLENBQUM7QUFDbEYsT0FBTyxnQ0FBZ0MsTUFBTSw0Q0FBNEMsQ0FBQztBQUMxRixPQUFPLDhCQUE4QixNQUFNLDJDQUEyQyxDQUFDO0FBQ3ZGLE9BQU8sa0NBQWtDLE1BQU0sOENBQThDLENBQUM7QUFpRTlGLE1BQU0sQ0FBQyxPQUFPLE9BQU8sV0FBWSxTQUFRLFFBQVE7SUFDN0M7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUF3QztRQUNoRCxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENB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