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
import __SDuration from '@coffeekraken/s-duration';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SFrontstackActionInterface from './interface/SFrontstackActionInterface';
import __SFrontstackRecipeParamsInterface from './interface/SFrontstackRecipeParamsInterface';
import __SFrontstackListParamsInterface from './interface/SFrontstackListParamsInterface';
import __SFronstackNewParamsInterface from './interface/SFrontstackNewParamsInterface';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarJson from '@coffeekraken/s-sugar-json';
import __argsToString from '@coffeekraken/sugar/shared/cli/argsToString';
import __SProcess, { SProcessManager as __SProcessManager, } from '@coffeekraken/s-process';
import __stripAnsi from '@coffeekraken/sugar/shared/string/stripAnsi';
import __SLog from '@coffeekraken/s-log';
import __SSugarCli from '@coffeekraken/cli';
import __filter from '@coffeekraken/sugar/shared/object/filter';
import __commandExists from '@coffeekraken/sugar/node/command/commandExists';
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
     * @name        new
     * @type        Function
     * @async
     *
     * This method allows you to create a new project using one of the available recipe(s)
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                stack: 'new'
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
            const finalCommand = __SSugarCli.replaceTokens(
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                finalParams.stack =
                    recipesObj[finalParams.recipe].defaultStack;
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
            // requirements
            if (recipeObj.requirements) {
                if (recipeObj.requirements.commands) {
                    for (let i = 0; i < recipeObj.requirements.commands.length; i++) {
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `<yellow>[requirements]</yellow> Checking for the "<magenta>${recipeObj.requirements.commands[i]}</magenta>" command to exists...`
                        });
                        const version = yield __commandExists(recipeObj.requirements.commands[i]);
                        if (!version) {
                            throw new Error(`<red>[requirements]</red> Sorry but the command "<yellow>${recipeObj.requirements.commands[i]}</yellow>" is required but it does not exists.`);
                        }
                        else {
                            emit('log', {
                                type: __SLog.TYPE_INFO,
                                value: `<green>[requirements]</green> Command "<magenta>${recipeObj.requirements.commands[i]}</magenta>" available in version <cyan>${__stripAnsi(String(version).replace('\n', ''))}</cyan>.`
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
                value: `<yellow>○</yellow> Run in parallel : ${finalParams.runInParallel ? '<green>true</green>' : '<red>false</red>'}`,
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
                    runInParallel: finalParams.runInParallel
                }
            });
            pipe(processManager, {
                overrideEmitter: true,
            });
            // loop on each actions for this recipe
            if (stackObj.actions) {
                for (let i = 0; i <
                    Object.keys(stackObj.actions)
                        .length; i++) {
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
                            type: __SLog.TYPE_INFO,
                            value: `<yellow>○</yellow> <magenta>extends</magenta> : Your action "<yellow>${actionName}</yellow>" extends the "<cyan>${actionObj.extends}</cyan>" one`,
                        });
                        actionObj = __deepMerge(Object.assign({}, actionsObj[actionObj.extends]), actionObj);
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
                    finalCommand = __SSugarCli.replaceTokens(finalCommand, finalActionParams);
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>○</yellow> <yellow>${actionName}</yellow> : <cyan>${finalCommand}</cyan>`,
                    });
                    const pro = yield __SProcess.from(finalCommand, {
                        process: {
                            before: actionObj.before,
                            after: actionObj.after,
                        }
                    });
                    const finalProcessManagerParams = Object.assign(Object.assign({}, sharedParams), ((_h = actionObj.params) !== null && _h !== void 0 ? _h : {}));
                    // add the process to the process manager
                    // @TODO    integrate log filter feature
                    processManager.attachProcess(actionId, pro, {});
                    const processPro = processManager.run(actionId, finalProcessManagerParams, (_k = (_j = actionObj.settings) === null || _j === void 0 ? void 0 : _j.process) !== null && _k !== void 0 ? _k : {});
                    if (!processesPromises.includes(processPro)) {
                        processesPromises.push(processPro);
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
SFrontstack.interfaces = {
    startParams: __SFrontstackActionInterface,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250c3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRnJvbnRzdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLDRCQUE0QixNQUFNLHdDQUF3QyxDQUFDO0FBQ2xGLE9BQU8sa0NBQWtDLE1BQU0sOENBQThDLENBQUM7QUFDOUYsT0FBTyxnQ0FBZ0MsTUFBTSw0Q0FBNEMsQ0FBQztBQUMxRixPQUFPLDhCQUE4QixNQUFNLDJDQUEyQyxDQUFDO0FBQ3ZGLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sWUFBWSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RELE9BQU8sY0FBYyxNQUFNLDZDQUE2QyxDQUFDO0FBRXpFLE9BQU8sVUFBVSxFQUFFLEVBQ2YsZUFBZSxJQUFJLGlCQUFpQixHQUd2QyxNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sV0FBVyxNQUFNLG1CQUFtQixDQUFDO0FBQzVDLE9BQU8sUUFBUSxNQUFNLDBDQUEwQyxDQUFDO0FBQ2hFLE9BQU8sZUFBZSxNQUFNLGdEQUFnRCxDQUFDO0FBd0U3RSxNQUFNLENBQUMsT0FBTyxPQUFPLFdBQVksU0FBUSxRQUFRO0lBbUI3Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQW1DO1FBQzNDLEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSxVQUFVLEVBQUUsRUFBRTtTQUNqQixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFD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