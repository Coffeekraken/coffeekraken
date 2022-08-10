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
import __import from '@coffeekraken/sugar/node/esm/import';
import __sharedContext from '@coffeekraken/sugar/node/process/sharedContext';
import __detectProjectType from '@coffeekraken/sugar/node/project/detectType';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __filter from '@coffeekraken/sugar/shared/object/filter';
import __stripAnsi from '@coffeekraken/sugar/shared/string/stripAnsi';
import __SKitchenActionInterface from './interface/SKitchenActionInterface';
import __SKitchenAddParamsInterface from './interface/SKitchenAddParamsInterface';
import __SKitchenListParamsInterface from './interface/SKitchenListParamsInterface';
import __SFronstackNewParamsInterface from './interface/SKitchenNewParamsInterface';
import __SKitchenRecipeParamsInterface from './interface/SKitchenRecipeParamsInterface';
import __lowerFirst from '@coffeekraken/sugar/shared/string/lowerFirst';
import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';
import __defaultPackageJsonIngredient from './ingredients/defaultPackageJson/defaultPackageJsonIngredient';
import __defaultPagesIngredient from './ingredients/defaultPages/defaultPagesIngredient';
import __defaultScriptsIngredient from './ingredients/defaultScripts/defaultScriptsIngredient';
import __faviconIngredient from './ingredients/favicon/faviconIngredient';
import __frontspecIngredient from './ingredients/frontspec/frontspecIngredient';
import __manifestIngredient from './ingredients/manifest/manifestIngredient';
import __nvmrcIngredient from './ingredients/nvmrc/nvmrcIngredient';
import __postcssIngredient from './ingredients/postcss/postcssIngredient';
import __readmeIngredient from './ingredients/readme/readmeIngredient';
import __sugarIngredient from './ingredients/sugar/sugarIngredient';
import __sugarJsonIngredient from './ingredients/sugarJson/sugarJsonIngredient';
class SKitchen extends __SClass {
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
     * @name        registerIngredient
     * @type        Function
     * @static
     *
     * This static method allows you to register a new "ingredient" that you will be able to add to your project
     * easily using the `sugar kitchen.add myCoolIngredient` command.
     *
     * @param           {ISKitchenIngredient}           ingredientObj           The ingredient object you want to add
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static registerIngredient(ingredientObj) {
        // check ingredient
        if (!ingredientObj.id ||
            !ingredientObj.add ||
            typeof ingredientObj.add !== 'function') {
            throw new Error(`The ingredient you try to register is not valid... Please check your code to be sure your ingredient contains at least an "id" and an "add" method...`);
        }
        // prevent overrides
        if (SKitchen._registeredIngredients[ingredientObj.id]) {
            throw new Error(`An ingredient called "${ingredientObj.id}" already exists...`);
        }
        // register the ingredient
        SKitchen._registeredIngredients[ingredientObj.id] = ingredientObj;
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
            const kitchenConfig = __SSugarConfig.get('kitchen');
            const recipesObj = __filter(kitchenConfig.recipes, (key, recipeObj) => {
                var _a;
                return ((_a = recipeObj.stacks) === null || _a === void 0 ? void 0 : _a.new) !== undefined;
            });
            const finalParams = __SFronstackNewParamsInterface.apply(params);
            const availableRecipes = Object.keys(recipesObj).map((recipeId) => {
                return `- ${__upperFirst(recipeId)}${' '.repeat(10 - recipeId.length)}: ${recipesObj[recipeId].description}`;
            });
            let recipe = yield emit('ask', {
                type: 'autocomplete',
                message: 'Please select one of the available recipes',
                choices: availableRecipes,
            });
            if (!recipe)
                process.exit();
            // process recipe to get only the id
            recipe = __lowerFirst(recipe.split(':')[0].replace(/^-\s+/, '').trim());
            // set the shared context
            __sharedContext({
                recipe,
            });
            const recipeObj = recipesObj[recipe];
            emit('log', {
                margin: {
                    bottom: 1,
                },
                type: __SLog.TYPE_INFO,
                value: `Starting project creation using the "<yellow>${recipe}</yellow>" recipe...`,
            });
            resolve(pipe(this.recipe({
                recipe,
                stack: 'new',
            })));
        }), {
            metas: {
                id: this.constructor.name,
            },
        });
    }
    /**
     * @name        action
     * @type        Function
     * @async
     *
     * This method allows you to action a kitchen process
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    action(params) {
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            const kitchenConfig = __SSugarConfig.get('kitchen');
            const actionsObj = kitchenConfig.actions;
            const finalParams = __SKitchenActionInterface.apply(params);
            const availableActions = Object.keys(actionsObj);
            if (availableActions.indexOf(finalParams.action) === -1) {
                throw new Error(`<red>[${this.constructor.name}.action]</red> Sorry but the requested action "<yellow>${finalParams.action}</yellow>" does not exists. Here's the list of available action(s):\n${availableActions
                    .map((r) => `- <yellow>${r}</yellow>`)
                    .join('\n')}`);
            }
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `Starting kitchen process using "<yellow>${finalParams.action}</yellow>" action`,
            });
            // get the recipe object and treat it
            const actionObj = 
            // @ts-ignore
            actionsObj[finalParams.action];
            // instanciate the process manager
            const processManager = new __SProcessManager({
            //     runInParallel: false
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
     * This method allows you to exec a kitchen process
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    recipe(params) {
        const processesPromises = [];
        const duration = new __SDuration();
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            const kitchenConfig = __SSugarConfig.get('kitchen');
            const recipesObj = kitchenConfig.recipes;
            const actionsObj = kitchenConfig.actions;
            const sugarJson = new __SSugarJson().current();
            // initalise final params.
            // it will be merged with the "stackObj.sharedParams" later...
            let finalParams = __SKitchenRecipeParamsInterface.apply(params);
            if (!finalParams.recipe) {
                if (sugarJson.recipe)
                    finalParams.recipe = sugarJson.recipe;
            }
            if (!finalParams.recipe) {
                finalParams.recipe = kitchenConfig.defaultRecipe;
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
            const stackObj = recipeObj.stacks[finalParams.stack];
            // merge the finalParams with the stackObj.sharedParams object if exists...
            finalParams = __deepMerge((_a = stackObj.sharedParams) !== null && _a !== void 0 ? _a : {}, finalParams);
            // defined actions in the sugar.jcon file
            if ((_b = sugarJson.kitchen) === null || _b === void 0 ? void 0 : _b[finalParams.stack]) {
                for (let [key, value] of Object.entries((_c = sugarJson.kitchen) === null || _c === void 0 ? void 0 : _c[finalParams.stack])) {
                    if (!kitchenConfig.actions[value.action]) {
                        throw new Error(`The requested action "<yellow>${value.action}</yellow>" does not exists in the config.kitchen.actions stack... Here's the available ones: <green>${Object.keys(kitchenConfig.actions).join(',')}</green>`);
                    }
                    // @ts-ignore
                    recipeObj.stacks[finalParams.stack].actions[`sugarJson-${value.action}`] = __deepMerge(Object.assign({}, kitchenConfig.actions[value.action], value));
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
            // set runInParallel if not specified
            if (finalParams.runInParallel === undefined) {
                finalParams.runInParallel = (_d = stackObj.runInParallel) !== null && _d !== void 0 ? _d : false;
            }
            // some info logs
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `Starting kitchen process`,
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
            // instanciate the process manager
            const processManager = new __SProcessManager({
                // @ts-ignore
                runInParallel: finalParams.runInParallel,
            });
            // loop on each actions for this recipe
            if (stackObj.actions) {
                for (let i = 0; i < Object.keys(stackObj.actions).length; i++) {
                    const actionName = Object.keys(stackObj.actions)[i];
                    let actionObj = stackObj.actions[actionName];
                    let actionParams = __deepMerge((_e = actionObj.params) !== null && _e !== void 0 ? _e : {}, Object.assign({}, sharedParams));
                    // do not execute the action if it has benn excluded
                    if (finalParams.exclude &&
                        finalParams.exclude.indexOf(actionName) !== -1) {
                        emit('log', {
                            type: __SLog.TYPE_VERBOSE,
                            value: `Excluding the action "<yellow>${actionName}</yellow>"`,
                        });
                        return;
                    }
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
                    // specific passed params like "--frontendServer.buildInitial"
                    for (let [key, value] of Object.entries(sharedParams)) {
                        if (key.startsWith(`${actionName}.`)) {
                            actionParams[key.replace(`${actionName}.`, '')] = value;
                        }
                    }
                    // filter action params depending on each action interface if specified
                    let InterfaceClass;
                    if (actionObj.interface) {
                        InterfaceClass = yield __import(actionObj.interface);
                        // filter shared params using each action "interface"
                        actionParams = __filter(actionParams, (key, value) => {
                            if (key === 'env')
                                return true;
                            return (InterfaceClass.definition[key] !==
                                undefined);
                        });
                    }
                    const actionId = (_f = actionObj.id) !== null && _f !== void 0 ? _f : actionName;
                    // create a process from the recipe object
                    let finalCommand = __replaceCommandTokens(((_g = actionObj.command) !== null && _g !== void 0 ? _g : actionObj.process).trim(), actionParams);
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>○</yellow> <yellow>${actionName}</yellow> : <cyan>${finalCommand}</cyan>`,
                    });
                    const pro = yield __SProcess.from(finalCommand, {
                        before: actionObj.before,
                        after: actionObj.after,
                    });
                    const finalProcessManagerParams = Object.assign(Object.assign({}, sharedParams), ((_h = actionObj.params) !== null && _h !== void 0 ? _h : {}));
                    // add the process to the process manager
                    // @TODO    integrate log filter feature
                    processManager.attachProcess(actionId, pro, {});
                    try {
                        const processPro = processManager.run(actionId, finalProcessManagerParams, Object.assign({}, ((_k = (_j = actionObj.settings) === null || _j === void 0 ? void 0 : _j.process) !== null && _k !== void 0 ? _k : {})));
                        if (!((_l = actionObj.settings) === null || _l === void 0 ? void 0 : _l.silent)) {
                            pipe(processPro);
                        }
                        if (!processesPromises.includes(processPro)) {
                            processesPromises.push(processPro);
                        }
                        if (!finalParams.runInParallel) {
                            yield processPro;
                        }
                    }
                    catch (e) {
                        // console.log(e);
                    }
                }
            }
            yield Promise.all(processesPromises);
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<green>[success]</green> All actions have been executed <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`,
            });
            resolve(processesPromises);
        }), {
            eventEmitter: {
                bind: this,
            },
        }).bind(this);
    }
    /**
     * @name        listRecipes
     * @type        Function
     *
     * This method returns the recipes objects
     *
     * @return     {Record<string, ISKitchenRecipe>}        The recipes objects
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    listRecipes() {
        const recipes = __SSugarConfig.get('kitchen.recipes');
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
            const finalParams = __SKitchenListParamsInterface.apply(params);
            let recipe, stack;
            if (finalParams.recipe) {
                recipe = finalParams.recipe.split('.')[0];
                stack = finalParams.recipe.split('.')[1];
            }
            // list the ingredients
            if (finalParams.ingredients) {
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `Available ingredient(s) list:`,
                });
                for (let [id, ingredientObj] of Object.entries(SKitchen._registeredIngredients)) {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `- <magenta>${id}</magenta>${' '.repeat(30 - id.length)}: ${ingredientObj.description}`,
                    });
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `   - Project type(s)${' '.repeat(12)}: <cyan>${ingredientObj.projectTypes.join(',')}</cyan>`,
                    });
                    emit('log', {
                        margin: {
                            bottom: 1,
                        },
                        type: __SLog.TYPE_INFO,
                        value: `   - Command ${' '.repeat(19)}: <yellow>sugar kitchen.add <magenta>${id}</magenta></yellow>`,
                    });
                }
                return resolve();
            }
            // available recipes
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
                    throw new Error(`<red>[SKitchen.list]</red> Sorry but the recipe "<yellow>${recipe}</yellow> does not exists...`);
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
                    throw new Error(`<red>[SKitchen.list]</red> Sorry but the stack "<yellow>${stack}</yellow> does not exists in the recipe "<cyan>${recipe}</cyan>"...`);
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
                id: 'SKitchen.list',
            },
        });
    }
    /**
     * @name        add
     * @type        Function
     * @async
     *
     * This method allows you to add some "ingredients" to your project
     *
     * @return      {}
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    add(params) {
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const finalParams = __SKitchenAddParamsInterface.apply(params);
            for (let i = 0; i < finalParams.ingredients.length; i++) {
                const id = finalParams.ingredients[i];
                if (!SKitchen._registeredIngredients[id]) {
                    emit('log', {
                        type: __SLog.TYPE_WARNING,
                        value: `<magenta>[add]</magenta> No ingredient with the id "<yellow>${id}</yellow>" does exists...`,
                    });
                    continue;
                }
                const ingredientObj = SKitchen._registeredIngredients[id];
                let context = Object.assign(Object.assign({}, __sharedContext()), { projectType: __detectProjectType() });
                // check project type compatibility
                if (!ingredientObj.projectTypes.includes('*') &&
                    !ingredientObj.projectTypes.includes(context.projectType.type)) {
                    emit('log', {
                        type: __SLog.TYPE_WARNING,
                        value: `<magenta>[${ingredientObj.id}]</magenta> The "<yellow>${ingredientObj.id}</yellow>" is not compatible with your project type "<cyan>${context.projectType.type}</cyan>"`,
                    });
                    continue;
                }
                // check if the process is a "new" installation one or
                // the add process has been called after the installation
                context.new = context.recipe !== undefined;
                // make sure we have a recipe
                if (!context.recipe) {
                    const sugarJson = new __SSugarJson().current();
                    if (sugarJson.recipe) {
                        context.recipe = sugarJson.recipe;
                    }
                }
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[${ingredientObj.id}]</yellow> Adding the "<yellow>${ingredientObj.id}</yellow>" ingredient to your "<cyan>${context.projectType.type}</cyan>" project...`,
                });
                yield ingredientObj.add({
                    ask(askObj) {
                        return emit('ask', askObj);
                    },
                    log(message) {
                        return emit('log', {
                            value: `<yellow>[add.${id}]</yellow> ${message}`,
                        });
                    },
                    pipe(...args) {
                        return pipe(...args);
                    },
                    emit,
                    context,
                });
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[${ingredientObj.id}]</yellow> Ingredient added <green>successfully</green>!`,
                });
            }
            resolve();
        }), {
            metas: {
                id: 'SKitchen.add',
            },
        });
    }
}
/**
 * Store the registered ingredients object by id's
 */
SKitchen._registeredIngredients = {};
// register base ingredients
SKitchen.registerIngredient(__frontspecIngredient);
SKitchen.registerIngredient(__manifestIngredient);
SKitchen.registerIngredient(__sugarJsonIngredient);
SKitchen.registerIngredient(__faviconIngredient);
SKitchen.registerIngredient(__postcssIngredient);
SKitchen.registerIngredient(__sugarIngredient);
SKitchen.registerIngredient(__readmeIngredient);
SKitchen.registerIngredient(__defaultPagesIngredient);
SKitchen.registerIngredient(__defaultPackageJsonIngredient);
SKitchen.registerIngredient(__defaultScriptsIngredient);
SKitchen.registerIngredient(__nvmrcIngredient);
export default SKitchen;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxvQkFBb0IsSUFBSSxzQkFBc0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25GLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBRW5ELE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxFQUFFLEVBR2YsZUFBZSxJQUFJLGlCQUFpQixHQUN2QyxNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sWUFBWSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RELE9BQU8sZUFBZSxNQUFNLGdEQUFnRCxDQUFDO0FBQzdFLE9BQU8sUUFBUSxNQUFNLHFDQUFxQyxDQUFDO0FBQzNELE9BQU8sZUFBZSxNQUFNLGdEQUFnRCxDQUFDO0FBRTdFLE9BQU8sbUJBQW1CLE1BQU0sNkNBQTZDLENBQUM7QUFDOUUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxRQUFRLE1BQU0sMENBQTBDLENBQUM7QUFDaEUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyx5QkFBeUIsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RSxPQUFPLDRCQUE0QixNQUFNLHdDQUF3QyxDQUFDO0FBQ2xGLE9BQU8sNkJBQTZCLE1BQU0seUNBQXlDLENBQUM7QUFDcEYsT0FBTyw4QkFBOEIsTUFBTSx3Q0FBd0MsQ0FBQztBQUNwRixPQUFPLCtCQUErQixNQUFNLDJDQUEyQyxDQUFDO0FBRXhGLE9BQU8sWUFBWSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3hFLE9BQU8sWUFBWSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3hFLE9BQU8sOEJBQThCLE1BQU0sK0RBQStELENBQUM7QUFDM0csT0FBTyx3QkFBd0IsTUFBTSxtREFBbUQsQ0FBQztBQUN6RixPQUFPLDBCQUEwQixNQUFNLHVEQUF1RCxDQUFDO0FBQy9GLE9BQU8sbUJBQW1CLE1BQU0seUNBQXlDLENBQUM7QUFDMUUsT0FBTyxxQkFBcUIsTUFBTSw2Q0FBNkMsQ0FBQztBQUNoRixPQUFPLG9CQUFvQixNQUFNLDJDQUEyQyxDQUFDO0FBQzdFLE9BQU8saUJBQWlCLE1BQU0scUNBQXFDLENBQUM7QUFDcEUsT0FBTyxtQkFBbUIsTUFBTSx5Q0FBeUMsQ0FBQztBQUMxRSxPQUFPLGtCQUFrQixNQUFNLHVDQUF1QyxDQUFDO0FBQ3ZFLE9BQU8saUJBQWlCLE1BQU0scUNBQXFDLENBQUM7QUFDcEUsT0FBTyxxQkFBcUIsTUFBTSw2Q0FBNkMsQ0FBQztBQWtHaEYsTUFBTSxRQUFTLFNBQVEsUUFBUTtJQTBDM0I7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFxQztRQUM3QyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFoREQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLGtCQUFrQixDQUFDLGFBQWtDO1FBQ3hELG1CQUFtQjtRQUNuQixJQUNJLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDakIsQ0FBQyxhQUFhLENBQUMsR0FBRztZQUNsQixPQUFPLGFBQWEsQ0FBQyxHQUFHLEtBQUssVUFBVSxFQUN6QztZQUNFLE1BQU0sSUFBSSxLQUFLLENBQ1gsdUpBQXVKLENBQzFKLENBQUM7U0FDTDtRQUVELG9CQUFvQjtRQUNwQixJQUFJLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDbkQsTUFBTSxJQUFJLEtBQUssQ0FDWCx5QkFBeUIsYUFBYSxDQUFDLEVBQUUscUJBQXFCLENBQ2pFLENBQUM7U0FDTDtRQUVELDBCQUEwQjtRQUMxQixRQUFRLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQztJQUN0RSxDQUFDO0lBZ0JEOzs7Ozs7Ozs7T0FTRztJQUNILEdBQUcsQ0FBQyxNQUFtQztRQUNuQyxPQUFPLElBQUksVUFBVSxDQUNqQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUN0QyxNQUFNLGFBQWEsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3BELE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FDdkIsYUFBYSxDQUFDLE9BQU8sRUFDckIsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLEVBQUU7O2dCQUNmLE9BQU8sQ0FBQSxNQUFBLFNBQVMsQ0FBQyxNQUFNLDBDQUFFLEdBQUcsTUFBSyxTQUFTLENBQUM7WUFDL0MsQ0FBQyxDQUNKLENBQUM7WUFFRixNQUFNLFdBQVcsR0FDYiw4QkFBOEIsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFakQsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FDaEQsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDVCxPQUFPLEtBQUssWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQzNDLEVBQUUsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUN2QixLQUFLLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUM3QyxDQUFDLENBQ0osQ0FBQztZQUVGLElBQUksTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDM0IsSUFBSSxFQUFFLGNBQWM7Z0JBQ3BCLE9BQU8sRUFBRSw0Q0FBNEM7Z0JBQ3JELE9BQU8sRUFBRSxnQkFBZ0I7YUFDNUIsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLE1BQU07Z0JBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBRTVCLG9DQUFvQztZQUNwQyxNQUFNLEdBQUcsWUFBWSxDQUNqQixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQ25ELENBQUM7WUFFRix5QkFBeUI7WUFDekIsZUFBZSxDQUFDO2dCQUNaLE1BQU07YUFDVCxDQUFDLENBQUM7WUFFSCxNQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFckMsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixNQUFNLEVBQUU7b0JBQ0osTUFBTSxFQUFFLENBQUM7aUJBQ1o7Z0JBQ0QsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTO2dCQUN0QixLQUFLLEVBQUUsZ0RBQWdELE1BQU0sc0JBQXNCO2FBQ3RGLENBQUMsQ0FBQztZQUVILE9BQU8sQ0FDSCxJQUFJLENBQ0EsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDUixNQUFNO2dCQUNOLEtBQUssRUFBRSxLQUFLO2FBQ2YsQ0FBQyxDQUNMLENBQ0osQ0FBQztRQUNOLENBQUMsQ0FBQSxFQUNEO1lBQ0ksS0FBSyxFQUFFO2dCQUNILEVBQUUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUk7YUFDNUI7U0FDSixDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsTUFBTSxDQUFDLE1BQXNDO1FBQ3pDLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7O1lBQzVELE1BQU0sYUFBYSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDcEQsTUFBTSxVQUFVLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQztZQUV6QyxNQUFNLFdBQVcsR0FDYix5QkFBeUIsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFNUMsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRWpELElBQUksZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDckQsTUFBTSxJQUFJLEtBQUssQ0FDWCxTQUNJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFDckIsMERBQ0ksV0FBVyxDQUFDLE1BQ2hCLHdFQUF3RSxnQkFBZ0I7cUJBQ25GLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztxQkFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQ3BCLENBQUM7YUFDTDtZQUVELElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTO2dCQUN0QixLQUFLLEVBQUUsMkNBQTJDLFdBQVcsQ0FBQyxNQUFNLG1CQUFtQjthQUMxRixDQUFDLENBQUM7WUFFSCxxQ0FBcUM7WUFDckMsTUFBTSxTQUFTO1lBQ1gsYUFBYTtZQUNiLFVBQVUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFbkMsa0NBQWtDO1lBQ2xDLE1BQU0sY0FBYyxHQUFHLElBQUksaUJBQWlCLENBQUM7WUFDekMsMkJBQTJCO2FBQzlCLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNyQix1Q0FBdUM7WUFFdkMsTUFBTSxZQUFZLEdBQUcsc0JBQXNCO1lBQ3ZDLGFBQWE7WUFDYixNQUFBLFNBQVMsQ0FBQyxPQUFPLG1DQUFJLFNBQVMsQ0FBQyxPQUFPLENBRXpDLENBQUM7WUFFRixNQUFNLFFBQVEsR0FBRyxNQUFBLFNBQVMsQ0FBQyxFQUFFLG1DQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUM7WUFDcEQsMENBQTBDO1lBQzFDLE1BQU0sR0FBRyxHQUFHLE1BQU0sVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNoRCx5Q0FBeUM7WUFDekMsd0NBQXdDO1lBQ3hDLGNBQWMsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtZQUN4QyxTQUFTO1lBQ1Qsc0JBQXNCO1lBQ3RCLElBQUk7YUFDUCxDQUFDLENBQUM7WUFFSCxjQUFjLENBQUMsR0FBRyxDQUNkLFFBQVEsRUFDUixNQUFBLE1BQUEsV0FBVyxDQUFDLE1BQU0sbUNBQUksU0FBUyxDQUFDLE1BQU0sbUNBQUksRUFBRSxFQUM1QyxNQUFBLE1BQUEsU0FBUyxDQUFDLFFBQVEsMENBQUUsT0FBTyxtQ0FBSSxFQUFFLENBQ3BDLENBQUM7UUFDTixDQUFDLENBQUEsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILE1BQU0sQ0FBQyxNQUErQztRQUNsRCxNQUFNLGlCQUFpQixHQUFVLEVBQUUsQ0FBQztRQUVwQyxNQUFNLFFBQVEsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBRW5DLE9BQU8sSUFBSSxVQUFVLENBQ2pCLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFOztZQUN0QyxNQUFNLGFBQWEsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3BELE1BQU0sVUFBVSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUM7WUFDekMsTUFBTSxVQUFVLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQztZQUV6QyxNQUFNLFNBQVMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRS9DLDBCQUEwQjtZQUMxQiw4REFBOEQ7WUFDOUQsSUFBSSxXQUFXLEdBQUcsK0JBQStCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRWhFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFO2dCQUNyQixJQUFJLFNBQVMsQ0FBQyxNQUFNO29CQUFFLFdBQVcsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQzthQUMvRDtZQUNELElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFO2dCQUNyQixXQUFXLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxhQUFhLENBQUM7YUFDcEQ7WUFFRCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRTtnQkFDckIsTUFBTSxJQUFJLEtBQUssQ0FDWCxvUUFBb1EsQ0FDdlEsQ0FBQzthQUNMO1lBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQ1gsd0RBQ0ksV0FBVyxDQUFDLE1BQ2hCLHdFQUF3RSxNQUFNLENBQUMsSUFBSSxDQUMvRSxVQUFVLENBQ2IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FDekIsQ0FBQzthQUNMO1lBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksRUFBRTtvQkFDOUMsTUFBTSxJQUFJLEtBQUssQ0FDWCw0R0FBNEcsV0FBVyxDQUFDLE1BQU0saUJBQWlCLENBQ2xKLENBQUM7aUJBQ0w7Z0JBQ0QsV0FBVyxDQUFDLEtBQUs7b0JBQ2IsVUFBVSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUM7YUFDbkQ7WUFFRCxxQ0FBcUM7WUFDckMsTUFBTSxTQUFTO1lBQ1gsYUFBYTtZQUNiLFVBQVUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFbkMsTUFBTSxRQUFRLEdBQ1YsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFeEMsMkVBQTJFO1lBQzNFLFdBQVcsR0FBRyxXQUFXLENBQ3JCLE1BQUEsUUFBUSxDQUFDLFlBQVksbUNBQUksRUFBRSxFQUMzQixXQUFXLENBQ2QsQ0FBQztZQUVGLHlDQUF5QztZQUN6QyxJQUFJLE1BQUEsU0FBUyxDQUFDLE9BQU8sMENBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUN4QyxLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FDbkMsTUFBQSxTQUFTLENBQUMsT0FBTywwQ0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQ3pDLEVBQUU7b0JBQ0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO3dCQUN0QyxNQUFNLElBQUksS0FBSyxDQUNYLGlDQUNJLEtBQUssQ0FBQyxNQUNWLHVHQUF1RyxNQUFNLENBQUMsSUFBSSxDQUM5RyxhQUFhLENBQUMsT0FBTyxDQUN4QixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUN4QixDQUFDO3FCQUNMO29CQUNELGFBQWE7b0JBQ2IsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUN2QyxhQUFhLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FDOUIsR0FBRyxXQUFXLENBQ1gsTUFBTSxDQUFDLE1BQU0sQ0FDVCxFQUFFLEVBQ0YsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQ25DLEtBQUssQ0FDUixDQUNKLENBQUM7b0JBQ0YsT0FBTyxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQzlDLGFBQWEsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUM5QixDQUFDLE1BQU0sQ0FBQztpQkFDWjthQUNKO1lBRUQsMEJBQTBCO1lBQzFCLElBQ0ksQ0FBQyxTQUFTLENBQUMsTUFBTTtnQkFDakIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQ3ZDO2dCQUNFLE1BQU0sSUFBSSxLQUFLLENBQ1gsd0RBQXdELFdBQVcsQ0FBQyxNQUFNLHlIQUF5SCxDQUN0TSxDQUFDO2FBQ0w7WUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3RDLE1BQU0sSUFBSSxLQUFLLENBQ1gsd0RBQXdELFdBQVcsQ0FBQyxNQUFNLHdFQUF3RSxXQUFXLENBQUMsS0FBSyxrQkFBa0IsQ0FDeEwsQ0FBQzthQUNMO1lBRUQseUNBQXlDO1lBQ3pDLElBQ0ksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPO2dCQUM1QyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDO3FCQUNwRCxNQUFNLEVBQ2I7Z0JBQ0UsTUFBTSxJQUFJLEtBQUssQ0FDWCx3REFBd0QsV0FBVyxDQUFDLE1BQU0sV0FBVyxXQUFXLENBQUMsS0FBSyxtSUFBbUksQ0FDNU8sQ0FBQzthQUNMO1lBRUQsZUFBZTtZQUNmLElBQUksU0FBUyxDQUFDLFlBQVksRUFBRTtnQkFDeEIsSUFBSSxTQUFTLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRTtvQkFDakMsS0FDSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQ1QsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFDMUMsQ0FBQyxFQUFFLEVBQ0w7d0JBQ0UsSUFBSSxDQUFDLEtBQUssRUFBRTs0QkFDUixJQUFJLEVBQUUsTUFBTSxDQUFDLFlBQVk7NEJBQ3pCLEtBQUssRUFBRSw4REFBOEQsU0FBUyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGtDQUFrQzt5QkFDNUksQ0FBQyxDQUFDO3dCQUNILE1BQU0sT0FBTyxHQUFHLE1BQU0sZUFBZSxDQUNqQyxTQUFTLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FDckMsQ0FBQzt3QkFDRixJQUFJLENBQUMsT0FBTyxFQUFFOzRCQUNWLE1BQU0sSUFBSSxLQUFLLENBQ1gsNERBQTRELFNBQVMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxnREFBZ0QsQ0FDakosQ0FBQzt5QkFDTDs2QkFBTTs0QkFDSCxJQUFJLENBQUMsS0FBSyxFQUFFO2dDQUNSLElBQUksRUFBRSxNQUFNLENBQUMsWUFBWTtnQ0FDekIsS0FBSyxFQUFFLG1EQUNILFNBQVMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FDckMsMENBQTBDLFdBQVcsQ0FDakQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQ3BDLFVBQVU7NkJBQ2QsQ0FBQyxDQUFDO3lCQUNOO3FCQUNKO2lCQUNKO2FBQ0o7WUFFRCxxQ0FBcUM7WUFDckMsSUFBSSxXQUFXLENBQUMsYUFBYSxLQUFLLFNBQVMsRUFBRTtnQkFDekMsV0FBVyxDQUFDLGFBQWEsR0FBRyxNQUFBLFFBQVEsQ0FBQyxhQUFhLG1DQUFJLEtBQUssQ0FBQzthQUMvRDtZQUVELGlCQUFpQjtZQUNqQixJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUztnQkFDdEIsS0FBSyxFQUFFLDBCQUEwQjthQUNwQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUztnQkFDdEIsS0FBSyxFQUFFLHVDQUF1QyxXQUFXLENBQUMsTUFBTSxXQUFXO2FBQzlFLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTO2dCQUN0QixLQUFLLEVBQUUscUNBQXFDLFdBQVcsQ0FBQyxLQUFLLFNBQVM7YUFDekUsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixJQUFJLEVBQUUsTUFBTSxDQUFDLFNBQVM7Z0JBQ3RCLEtBQUssRUFBRSx3Q0FDSCxXQUFXLENBQUMsYUFBYTtvQkFDckIsQ0FBQyxDQUFDLHFCQUFxQjtvQkFDdkIsQ0FBQyxDQUFDLGtCQUNWLEVBQUU7YUFDTCxDQUFDLENBQUM7WUFFSCxxREFBcUQ7WUFDckQsSUFBSSxZQUFZLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDbEQsT0FBTyxZQUFZLENBQUMsTUFBTSxDQUFDO1lBQzNCLE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQztZQUMxQixPQUFPLFlBQVksQ0FBQyxJQUFJLENBQUM7WUFFekIsa0NBQWtDO1lBQ2xDLE1BQU0sY0FBYyxHQUFHLElBQUksaUJBQWlCLENBQUM7Z0JBQ3pDLGFBQWE7Z0JBQ2IsYUFBYSxFQUFFLFdBQVcsQ0FBQyxhQUFhO2FBQzNDLENBQUMsQ0FBQztZQUVILHVDQUF1QztZQUN2QyxJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2xCLEtBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUNULENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQ3hDLENBQUMsRUFBRSxFQUNMO29CQUNFLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwRCxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUM3QyxJQUFJLFlBQVksR0FBRyxXQUFXLENBQzFCLE1BQUEsU0FBUyxDQUFDLE1BQU0sbUNBQUksRUFBRSxFQUN0QixNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FDbEMsQ0FBQztvQkFFRixvREFBb0Q7b0JBQ3BELElBQ0ksV0FBVyxDQUFDLE9BQU87d0JBQ25CLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUNoRDt3QkFDRSxJQUFJLENBQUMsS0FBSyxFQUFFOzRCQUNSLElBQUksRUFBRSxNQUFNLENBQUMsWUFBWTs0QkFDekIsS0FBSyxFQUFFLGlDQUFpQyxVQUFVLFlBQVk7eUJBQ2pFLENBQUMsQ0FBQzt3QkFDSCxPQUFPO3FCQUNWO29CQUVELDJCQUEyQjtvQkFDM0IsSUFBSSxTQUFTLENBQUMsT0FBTyxFQUFFO3dCQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRTs0QkFDaEMsTUFBTSxJQUFJLEtBQUssQ0FDWCw0Q0FBNEMsVUFBVSwwQ0FDbEQsU0FBUyxDQUFDLE9BQ2QsNkZBQTZGLE1BQU0sQ0FBQyxJQUFJLENBQ3BHLFVBQVUsQ0FDYixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUN4QixDQUFDO3lCQUNMO3dCQUNELElBQUksQ0FBQyxLQUFLLEVBQUU7NEJBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxZQUFZOzRCQUN6QixLQUFLLEVBQUUsd0VBQXdFLFVBQVUsaUNBQWlDLFNBQVMsQ0FBQyxPQUFPLGNBQWM7eUJBQzVKLENBQUMsQ0FBQzt3QkFDSCxTQUFTLEdBQW9CLENBQ3pCLFdBQVcsQ0FDUCxNQUFNLENBQUMsTUFBTSxDQUNULEVBQUUsRUFDRixVQUFVLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUNoQyxFQUNELFNBQVMsQ0FDWixDQUNKLENBQUM7cUJBQ0w7b0JBRUQsOERBQThEO29CQUM5RCxLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRTt3QkFDbkQsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsVUFBVSxHQUFHLENBQUMsRUFBRTs0QkFDbEMsWUFBWSxDQUNSLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxVQUFVLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FDcEMsR0FBRyxLQUFLLENBQUM7eUJBQ2I7cUJBQ0o7b0JBRUQsdUVBQXVFO29CQUN2RSxJQUFJLGNBQWMsQ0FBQztvQkFDbkIsSUFBSSxTQUFTLENBQUMsU0FBUyxFQUFFO3dCQUNyQixjQUFjLEdBQUcsTUFBTSxRQUFRLENBQzNCLFNBQVMsQ0FBQyxTQUFTLENBQ3RCLENBQUM7d0JBQ0YscURBQXFEO3dCQUNyRCxZQUFZLEdBQUcsUUFBUSxDQUNuQixZQUFZLEVBQ1osQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUU7NEJBQ1gsSUFBSSxHQUFHLEtBQUssS0FBSztnQ0FBRSxPQUFPLElBQUksQ0FBQzs0QkFDL0IsT0FBTyxDQUNILGNBQWMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDO2dDQUM5QixTQUFTLENBQ1osQ0FBQzt3QkFDTixDQUFDLENBQ0osQ0FBQztxQkFDTDtvQkFFRCxNQUFNLFFBQVEsR0FBRyxNQUFBLFNBQVMsQ0FBQyxFQUFFLG1DQUFJLFVBQVUsQ0FBQztvQkFDNUMsMENBQTBDO29CQUMxQyxJQUFJLFlBQVksR0FBRyxzQkFBc0IsQ0FDckMsQ0FBQyxNQUFBLFNBQVMsQ0FBQyxPQUFPLG1DQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFDL0MsWUFBWSxDQUNmLENBQUM7b0JBRUYsSUFBSSxDQUFDLEtBQUssRUFBRTt3QkFDUixJQUFJLEVBQUUsTUFBTSxDQUFDLFNBQVM7d0JBQ3RCLEtBQUssRUFBRSw4QkFBOEIsVUFBVSxxQkFBcUIsWUFBWSxTQUFTO3FCQUM1RixDQUFDLENBQUM7b0JBRUgsTUFBTSxHQUFHLEdBQUcsTUFBTSxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTt3QkFDNUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxNQUFNO3dCQUN4QixLQUFLLEVBQUUsU0FBUyxDQUFDLEtBQUs7cUJBQ3pCLENBQUMsQ0FBQztvQkFFSCxNQUFNLHlCQUF5QixtQ0FDeEIsWUFBWSxHQUNaLENBQUMsTUFBQSxTQUFTLENBQUMsTUFBTSxtQ0FBSSxFQUFFLENBQUMsQ0FDOUIsQ0FBQztvQkFFRix5Q0FBeUM7b0JBQ3pDLHdDQUF3QztvQkFDeEMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUVoRCxJQUFJO3dCQUNBLE1BQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQ2pDLFFBQVEsRUFDUix5QkFBeUIsb0JBRWxCLENBQUMsTUFBQSxNQUFBLFNBQVMsQ0FBQyxRQUFRLDBDQUFFLE9BQU8sbUNBQUksRUFBRSxDQUFDLEVBRTdDLENBQUM7d0JBRUYsSUFBSSxDQUFDLENBQUEsTUFBQSxTQUFTLENBQUMsUUFBUSwwQ0FBRSxNQUFNLENBQUEsRUFBRTs0QkFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3lCQUNwQjt3QkFFRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFOzRCQUN6QyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7eUJBQ3RDO3dCQUVELElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFOzRCQUM1QixNQUFNLFVBQVUsQ0FBQzt5QkFDcEI7cUJBQ0o7b0JBQUMsT0FBTyxDQUFDLEVBQUU7d0JBQ1Isa0JBQWtCO3FCQUNyQjtpQkFDSjthQUNKO1lBRUQsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFFckMsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixJQUFJLEVBQUUsTUFBTSxDQUFDLFNBQVM7Z0JBQ3RCLEtBQUssRUFBRSxrR0FDSCxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQ25CLFdBQVc7YUFDZCxDQUFDLENBQUM7WUFFSCxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUEsRUFDRDtZQUNJLFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsSUFBSTthQUNiO1NBQ0osQ0FDSixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFdBQVc7UUFDUCxNQUFNLE9BQU8sR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDdEQsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsSUFBSSxDQUFDLE1BQW9DO1FBQ3JDLE9BQU8sSUFBSSxVQUFVLENBQ2pCLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDMUIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBRW5DLE1BQU0sV0FBVyxHQUNiLDZCQUE2QixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVoRCxJQUFJLE1BQU0sRUFBRSxLQUFLLENBQUM7WUFDbEIsSUFBSSxXQUFXLENBQUMsTUFBTSxFQUFFO2dCQUNwQixNQUFNLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFDLEtBQUssR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM1QztZQUVELHVCQUF1QjtZQUN2QixJQUFJLFdBQVcsQ0FBQyxXQUFXLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTO29CQUN0QixLQUFLLEVBQUUsK0JBQStCO2lCQUN6QyxDQUFDLENBQUM7Z0JBRUgsS0FBSyxJQUFJLENBQUMsRUFBRSxFQUFFLGFBQWEsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQzFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FDbEMsRUFBRTtvQkFDQyxJQUFJLENBQUMsS0FBSyxFQUFFO3dCQUNSLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUzt3QkFDdEIsS0FBSyxFQUFFLGNBQWMsRUFBRSxhQUFhLEdBQUcsQ0FBQyxNQUFNLENBQzFDLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUNqQixLQUFLLGFBQWEsQ0FBQyxXQUFXLEVBQUU7cUJBQ3BDLENBQUMsQ0FBQztvQkFDSCxJQUFJLENBQUMsS0FBSyxFQUFFO3dCQUNSLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUzt3QkFDdEIsS0FBSyxFQUFFLHVCQUF1QixHQUFHLENBQUMsTUFBTSxDQUNwQyxFQUFFLENBQ0wsV0FBVyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FDdkMsR0FBRyxDQUNOLFNBQVM7cUJBQ2IsQ0FBQyxDQUFDO29CQUNILElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ1IsTUFBTSxFQUFFOzRCQUNKLE1BQU0sRUFBRSxDQUFDO3lCQUNaO3dCQUNELElBQUksRUFBRSxNQUFNLENBQUMsU0FBUzt3QkFDdEIsS0FBSyxFQUFFLGdCQUFnQixHQUFHLENBQUMsTUFBTSxDQUM3QixFQUFFLENBQ0wsd0NBQXdDLEVBQUUscUJBQXFCO3FCQUNuRSxDQUFDLENBQUM7aUJBQ047Z0JBRUQsT0FBTyxPQUFPLEVBQUUsQ0FBQzthQUNwQjtZQUVELG9CQUFvQjtZQUNwQixJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNULElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTO29CQUN0QixLQUFLLEVBQUUsMkJBQTJCO2lCQUNyQyxDQUFDLENBQUM7Z0JBRUgsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO2dCQUNwQixLQUFLLE1BQU0sSUFBSSxJQUFJLE9BQU8sRUFBRTtvQkFDeEIsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNO3dCQUFFLFVBQVUsR0FBRyxJQUFJLENBQUM7aUJBQzFEO2dCQUNELEtBQUssTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUMvQyxJQUFJLENBQUMsS0FBSyxFQUFFO3dCQUNSLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUzt3QkFDdEIsS0FBSyxFQUFFLFdBQVcsSUFBSSxVQUFVLEdBQUcsQ0FBQyxNQUFNLENBQ3RDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FDbEMsTUFBTSxHQUFHLENBQUMsV0FBVyxFQUFFO3FCQUMzQixDQUFDLENBQUM7aUJBQ047Z0JBRUQsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDM0I7WUFFRCxJQUFJLE1BQU0sRUFBRTtnQkFDUixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUNsQixNQUFNLElBQUksS0FBSyxDQUNYLDREQUE0RCxNQUFNLDhCQUE4QixDQUNuRyxDQUFDO2lCQUNMO2FBQ0o7WUFFRCxJQUFJLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDbEIsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixJQUFJLEVBQUUsTUFBTSxDQUFDLFNBQVM7b0JBQ3RCLEtBQUssRUFBRSx1Q0FBdUMsTUFBTSxhQUFhO2lCQUNwRSxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO2dCQUNwQixLQUFLLE1BQU0sSUFBSSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUU7b0JBQ3ZDLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTTt3QkFBRSxVQUFVLEdBQUcsSUFBSSxDQUFDO2lCQUMxRDtnQkFDRCxLQUFLLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FDcEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FDekIsRUFBRTtvQkFDQyxJQUFJLENBQUMsS0FBSyxFQUFFO3dCQUNSLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUzt3QkFDdEIsS0FBSyxFQUFFLFdBQVcsSUFBSSxVQUFVLEdBQUcsQ0FBQyxNQUFNLENBQ3RDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FDbEMsTUFBTSxHQUFHLENBQUMsV0FBVyxFQUFFO3FCQUMzQixDQUFDLENBQUM7aUJBQ047Z0JBRUQsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7YUFDbkM7WUFFRCxJQUFJLEtBQUssRUFBRTtnQkFDUCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDaEMsTUFBTSxJQUFJLEtBQUssQ0FDWCwyREFBMkQsS0FBSyxrREFBa0QsTUFBTSxhQUFhLENBQ3hJLENBQUM7aUJBQ0w7YUFDSjtZQUVELElBQUksTUFBTSxJQUFJLEtBQUssRUFBRTtnQkFDakIsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixJQUFJLEVBQUUsTUFBTSxDQUFDLFNBQVM7b0JBQ3RCLEtBQUssRUFBRSx3Q0FBd0MsTUFBTSxrQ0FBa0MsS0FBSyxXQUFXO2lCQUMxRyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO2dCQUNwQixLQUFLLE1BQU0sSUFBSSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFO29CQUN0RCxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU07d0JBQUUsVUFBVSxHQUFHLElBQUksQ0FBQztpQkFDMUQ7Z0JBQ0QsS0FBSyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQ3BDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUN4QyxFQUFFO29CQUNDLElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTO3dCQUN0QixLQUFLLEVBQUUsV0FBVyxJQUFJLFVBQVUsR0FBRyxDQUFDLE1BQU0sQ0FDdEMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUNsQyxNQUFNLEdBQUcsQ0FBQyxXQUFXLEVBQUU7cUJBQzNCLENBQUMsQ0FBQztpQkFDTjtnQkFFRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDakQ7UUFDTCxDQUFDLEVBQ0Q7WUFDSSxLQUFLLEVBQUU7Z0JBQ0gsRUFBRSxFQUFFLGVBQWU7YUFDdEI7U0FDSixDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxHQUFHLENBQUMsTUFBb0M7UUFDcEMsT0FBTyxJQUFJLFVBQVUsQ0FDakIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDdEMsYUFBYTtZQUNiLE1BQU0sV0FBVyxHQUNiLDRCQUE0QixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUUvQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JELE1BQU0sRUFBRSxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXRDLElBQUksQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQ3RDLElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxZQUFZO3dCQUN6QixLQUFLLEVBQUUsK0RBQStELEVBQUUsMkJBQTJCO3FCQUN0RyxDQUFDLENBQUM7b0JBQ0gsU0FBUztpQkFDWjtnQkFFRCxNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsc0JBQXNCLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBRTFELElBQUksT0FBTyxtQ0FDSixlQUFlLEVBQUUsS0FDcEIsV0FBVyxFQUFFLG1CQUFtQixFQUFFLEdBQ3JDLENBQUM7Z0JBRUYsbUNBQW1DO2dCQUNuQyxJQUNJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO29CQUN6QyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUNoQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FDM0IsRUFDSDtvQkFDRSxJQUFJLENBQUMsS0FBSyxFQUFFO3dCQUNSLElBQUksRUFBRSxNQUFNLENBQUMsWUFBWTt3QkFDekIsS0FBSyxFQUFFLGFBQWEsYUFBYSxDQUFDLEVBQUUsNEJBQTRCLGFBQWEsQ0FBQyxFQUFFLDhEQUE4RCxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksVUFBVTtxQkFDbkwsQ0FBQyxDQUFDO29CQUNILFNBQVM7aUJBQ1o7Z0JBRUQsc0RBQXNEO2dCQUN0RCx5REFBeUQ7Z0JBQ3pELE9BQU8sQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUM7Z0JBRTNDLDZCQUE2QjtnQkFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7b0JBQ2pCLE1BQU0sU0FBUyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQy9DLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRTt3QkFDbEIsT0FBTyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO3FCQUNyQztpQkFDSjtnQkFFRCxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUztvQkFDdEIsS0FBSyxFQUFFLFlBQVksYUFBYSxDQUFDLEVBQUUsa0NBQWtDLGFBQWEsQ0FBQyxFQUFFLHdDQUF3QyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUkscUJBQXFCO2lCQUM3SyxDQUFDLENBQUM7Z0JBRUgsTUFBTSxhQUFhLENBQUMsR0FBRyxDQUFDO29CQUNwQixHQUFHLENBQUMsTUFBZ0I7d0JBQ2hCLE9BQU8sSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFDL0IsQ0FBQztvQkFDRCxHQUFHLENBQUMsT0FBZTt3QkFDZixPQUFPLElBQUksQ0FBQyxLQUFLLEVBQUU7NEJBQ2YsS0FBSyxFQUFFLGdCQUFnQixFQUFFLGNBQWMsT0FBTyxFQUFFO3lCQUNuRCxDQUFDLENBQUM7b0JBQ1AsQ0FBQztvQkFDRCxJQUFJLENBQUMsR0FBRyxJQUFJO3dCQUNSLE9BQU8sSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7b0JBQ3pCLENBQUM7b0JBQ0QsSUFBSTtvQkFDSixPQUFPO2lCQUNWLENBQUMsQ0FBQztnQkFFSCxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUztvQkFDdEIsS0FBSyxFQUFFLFlBQVksYUFBYSxDQUFDLEVBQUUsMERBQTBEO2lCQUNoRyxDQUFDLENBQUM7YUFDTjtZQUVELE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQyxDQUFBLEVBQ0Q7WUFDSSxLQUFLLEVBQUU7Z0JBQ0gsRUFBRSxFQUFFLGNBQWM7YUFDckI7U0FDSixDQUNKLENBQUM7SUFDTixDQUFDOztBQTl6QkQ7O0dBRUc7QUFDSSwrQkFBc0IsR0FBd0MsRUFBRSxDQUFDO0FBOHpCNUUsNEJBQTRCO0FBQzVCLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQ25ELFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQ2xELFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQ25ELFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ2pELFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ2pELFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQy9DLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ2hELFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQ3RELFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBQzVELFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBQ3hELFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBRS9DLGVBQWUsUUFBUSxDQUFDIn0=