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
import __SProcess, { SProcessManager as __SProcessManager } from '@coffeekraken/s-process';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SSugarJson from '@coffeekraken/s-sugar-json';
import { __wait } from '@coffeekraken/sugar/datetime';
import { __isCommandExists } from '@coffeekraken/sugar/is';
import { __import } from '@coffeekraken/sugar/module';
import { __deepMerge, __filterObject } from '@coffeekraken/sugar/object';
import { __sharedContext } from '@coffeekraken/sugar/process';
import { __detectProjectType } from '@coffeekraken/sugar/project';
import __stripAnsi from '@coffeekraken/sugar/shared/string/stripAnsi';
import __SKitchenAddParamsInterface from './interface/SKitchenAddParamsInterface';
import __SKitchenListParamsInterface from './interface/SKitchenListParamsInterface';
import __SFronstackNewParamsInterface from './interface/SKitchenNewParamsInterface';
import __SKitchenRunParamsInterface from './interface/SKitchenRunParamsInterface';
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
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const kitchenConfig = __SSugarConfig.get('kitchen');
            const recipesObj = __filterObject(kitchenConfig.recipes, (key, recipeObj) => {
                var _a;
                return ((_a = recipeObj.stacks) === null || _a === void 0 ? void 0 : _a.new) !== undefined;
            });
            const finalParams = __SFronstackNewParamsInterface.apply(params);
            const availableRecipes = Object.keys(recipesObj).map((recipeId) => {
                return `- ${__upperFirst(recipeId)}${' '.repeat(10 - recipeId.length)}: ${recipesObj[recipeId].description}`;
            });
            yield __wait(1000);
            let recipe = yield ((_a = console.ask) === null || _a === void 0 ? void 0 : _a.call(console, {
                type: 'autocomplete',
                message: 'Please select one of the available recipes',
                choices: availableRecipes,
            }));
            if (!recipe)
                process.exit();
            // process recipe to get only the id
            recipe = __lowerFirst(recipe.split(':')[0].replace(/^-\s+/, '').trim());
            // set the shared context
            __sharedContext({
                recipe,
            });
            const recipeObj = recipesObj[recipe];
            console.log({
                margin: {
                    bottom: 1,
                },
                type: __SLog.TYPE_INFO,
                value: `Starting project creation using the "<yellow>${recipe}</yellow>" recipe...`,
            });
            resolve(this.run({
                recipe,
                stack: 'new',
            }));
        }));
    }
    /**
     * @name        run
     * @type        Function
     * @async
     *
     * This method allows you to run a kitchen process
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    run(params) {
        const processesPromises = [];
        const duration = new __SDuration();
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
            const kitchenConfig = __SSugarConfig.get('kitchen'), recipesObj = kitchenConfig.recipes, actionsObj = kitchenConfig.actions, sugarJson = new __SSugarJson().current();
            // initalise final params.
            // it will be merged with the "stackObj.sharedParams" later...
            let finalParams = __SKitchenRunParamsInterface.apply(params);
            // handle default recipe
            if (!finalParams.recipe) {
                finalParams.recipe =
                    (_a = sugarJson.recipe) !== null && _a !== void 0 ? _a : kitchenConfig.defaultRecipe;
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
            const stackObj = recipeObj.stacks[finalParams.stack];
            // merge the finalParams with the stackObj.sharedParams object if exists...
            finalParams = __deepMerge((_b = stackObj.sharedParams) !== null && _b !== void 0 ? _b : {}, finalParams);
            // defined actions in the sugar.jcon file
            if ((_c = sugarJson.kitchen) === null || _c === void 0 ? void 0 : _c[finalParams.stack]) {
                for (let [key, value] of Object.entries((_d = sugarJson.kitchen) === null || _d === void 0 ? void 0 : _d[finalParams.stack])) {
                    if (!kitchenConfig.actions[value.action]) {
                        throw new Error(`The requested action "<yellow>${value.action}</yellow>" does not exists in the config.kitchen.actions stack... Here's the available ones: <green>${Object.keys(kitchenConfig.actions).join(',')}</green>`);
                    }
                    // @ts-ignore
                    recipeObj.stacks[finalParams.stack].actions[`sugarJson-${value.action}`] = __deepMerge(Object.assign({}, kitchenConfig.actions[value.action], value));
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
                        (_e = console.verbose) === null || _e === void 0 ? void 0 : _e.call(console, `<yellow>[requirements]</yellow> Checking for the "<magenta>${recipeObj.requirements.commands[i]}</magenta>" command to exists...`);
                        const version = yield __isCommandExists(recipeObj.requirements.commands[i]);
                        if (!version) {
                            throw new Error(`<red>[requirements]</red> Sorry but the command "<yellow>${recipeObj.requirements.commands[i]}</yellow>" is required but it does not exists.`);
                        }
                        else {
                            (_f = console.verbose) === null || _f === void 0 ? void 0 : _f.call(console, `<green>[requirements]</green> Command "<magenta>${recipeObj.requirements.commands[i]}</magenta>" available in version <cyan>${__stripAnsi(String(version).replace('\n', ''))}</cyan>.`);
                        }
                    }
                }
            }
            // set runInParallel if not specified
            if (finalParams.runInParallel === undefined) {
                finalParams.runInParallel = (_g = stackObj.runInParallel) !== null && _g !== void 0 ? _g : false;
            }
            // some info logs
            console.log(`Starting kitchen process`);
            console.log(`<yellow>○</yellow> Recipe : <yellow>${finalParams.recipe}</yellow>`);
            console.log(`<yellow>○</yellow> Stack  : <cyan>${finalParams.stack}</cyan>`);
            console.log(`<yellow>○</yellow> Action : <magenta>${(_h = finalParams.action) !== null && _h !== void 0 ? _h : '*'}</magenta>`);
            console.log(`<yellow>○</yellow> Run in parallel : ${finalParams.runInParallel
                ? '<green>true</green>'
                : '<red>false</red>'}`);
            // loop on each actions for this recipe
            if (stackObj.actions) {
                for (let i = 0; i < Object.keys(stackObj.actions).length; i++) {
                    const actionName = Object.keys(stackObj.actions)[i];
                    let actionObj = stackObj.actions[actionName];
                    console.log(`<yellow>○</yellow> <yellow>${actionName}</yellow> : ${(_j = actionObj.title) !== null && _j !== void 0 ? _j : 'No description'}`);
                }
            }
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
                    // if an action is setted in the finalParams, make sure we run only this one
                    if (finalParams.action &&
                        actionName !== finalParams.action) {
                        console.error(`<red>[action]</red> The requested action "<magenta>${finalParams.action}</magenta>" does not exists in the "<yellow>${finalParams.recipe}</yellow>.<cyan>${finalParams.stack}</cyan>" stack`);
                        continue;
                    }
                    let actionObj = stackObj.actions[actionName];
                    let actionParams = __deepMerge((_k = actionObj.params) !== null && _k !== void 0 ? _k : {}, Object.assign({}, sharedParams));
                    // do not execute the action if it has benn excluded
                    if (finalParams.exclude &&
                        finalParams.exclude.indexOf(actionName) !== -1) {
                        console.log(`Excluding the action "<yellow>${actionName}</yellow>"`);
                        return;
                    }
                    // check `extends` property
                    if (actionObj.extends) {
                        if (!actionsObj[actionObj.extends]) {
                            throw new Error(`<red>[action]</red> Your action "<yellow>${actionName}</yellow>" tries to extends the "<cyan>${actionObj.extends}</cyan>" action that does not exists... Here's the available actions at this time: <green>${Object.keys(actionsObj).join(',')}</green>`);
                        }
                        (_l = console.verbose) === null || _l === void 0 ? void 0 : _l.call(console, `<yellow>○</yellow> <magenta>extends</magenta> : Your action "<yellow>${actionName}</yellow>" extends the "<cyan>${actionObj.extends}</cyan>" one`);
                        actionObj = (__deepMerge(Object.assign({}, actionsObj[actionObj.extends]), actionObj));
                    }
                    // specific passed params like "--frontendServer.buildInitial"
                    for (let [key, value] of Object.entries(sharedParams)) {
                        if (key.startsWith(`${actionName}.`)) {
                            actionParams[key.replace(`${actionName}.`, '')] =
                                value;
                        }
                    }
                    // filter action params depending on each action interface if specified
                    let InterfaceClass;
                    if (actionObj.interface) {
                        InterfaceClass = yield __import(actionObj.interface);
                        // filter shared params using each action "interface"
                        actionParams = __filterObject(actionParams, (key, value) => {
                            if (key === 'env')
                                return true;
                            if (key.toLowerCase() === 'bench') {
                                return true;
                            }
                            if (key.toLowerCase() === 'devscut') {
                                return true;
                            }
                            if (key.toLowerCase() === 'verbose') {
                                return true;
                            }
                            if (key.toLowerCase() === 'target') {
                                return true;
                            }
                            return InterfaceClass.definition[key] !== undefined;
                        });
                    }
                    const actionId = (_m = actionObj.id) !== null && _m !== void 0 ? _m : actionName;
                    // create a process from the recipe object
                    let finalCommand = __replaceCommandTokens(((_o = actionObj.command) !== null && _o !== void 0 ? _o : actionObj.process).trim(), actionParams);
                    console.log(' ');
                    console.log({
                        group: 'SKitchen',
                        value: `Starting <yellow>${actionName}</yellow> action with command:`,
                    });
                    console.log({
                        group: 'SKitchen',
                        value: `<grey>$</grey> <cyan>${finalCommand}</cyan>`,
                    });
                    const pro = yield __SProcess.from(finalCommand, {
                        before: actionObj.before,
                        after: actionObj.after,
                    });
                    const finalProcessManagerParams = Object.assign(Object.assign({}, sharedParams), ((_p = actionObj.params) !== null && _p !== void 0 ? _p : {}));
                    // add the process to the process manager
                    // @TODO    integrate log filter feature
                    processManager.attachProcess(actionId, pro, {});
                    try {
                        const processPro = processManager.run(actionId, finalProcessManagerParams, Object.assign({}, ((_r = (_q = actionObj.settings) === null || _q === void 0 ? void 0 : _q.process) !== null && _r !== void 0 ? _r : {})));
                        if (!processesPromises.includes(processPro)) {
                            processesPromises.push(processPro);
                        }
                        if (!finalParams.runInParallel) {
                            const res = yield processPro;
                        }
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
            }
            yield Promise.all(processesPromises);
            console.log(`<green>[success]</green> All actions have been executed <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`);
            resolve(processesPromises);
        }));
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
        return new Promise((resolve) => {
            const recipes = this.listRecipes();
            const finalParams = __SKitchenListParamsInterface.apply(params);
            let recipe, stack;
            if (finalParams.recipe) {
                recipe = finalParams.recipe.split('.')[0];
                stack = finalParams.recipe.split('.')[1];
            }
            // list the ingredients
            if (finalParams.ingredients) {
                console.log(`Available ingredient(s) list:`);
                for (let [id, ingredientObj] of Object.entries(SKitchen._registeredIngredients)) {
                    console.log(`- <magenta>${id}</magenta>${' '.repeat(30 - id.length)}: ${ingredientObj.description}`);
                    console.log(`   - Project type(s)${' '.repeat(12)}: <cyan>${ingredientObj.projectTypes.join(',')}</cyan>`);
                    console.log({
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
                console.log(`Available recipe(s) list:`);
                let largerName = '';
                for (const name in recipes) {
                    if (name.length > largerName.length)
                        largerName = name;
                }
                for (const [name, obj] of Object.entries(recipes)) {
                    console.log(`- <cyan>${name}</cyan>${' '.repeat(largerName.length - name.length)} : ${obj.description}`);
                }
                return resolve(recipes);
            }
            if (recipe) {
                if (!recipes[recipe]) {
                    throw new Error(`<red>[SKitchen.list]</red> Sorry but the recipe "<yellow>${recipe}</yellow> does not exists...`);
                }
            }
            if (recipe && !stack) {
                console.log(`Stacks list for the recipe "<yellow>${recipe}</yellow>":`);
                let largerName = '';
                for (const name in recipes[recipe].stacks) {
                    if (name.length > largerName.length)
                        largerName = name;
                }
                for (const [name, obj] of Object.entries(recipes[recipe].stacks)) {
                    console.log(`- <cyan>${name}</cyan>${' '.repeat(largerName.length - name.length)} : ${obj.description}`);
                }
                return resolve(recipes[recipe]);
            }
            if (stack) {
                if (!recipes[recipe].stacks[stack]) {
                    throw new Error(`<red>[SKitchen.list]</red> Sorry but the stack "<yellow>${stack}</yellow> does not exists in the recipe "<cyan>${recipe}</cyan>"...`);
                }
            }
            if (recipe && stack) {
                console.log(`Actions list for the recipe "<yellow>${recipe}</yellow> and the stack "<cyan>${stack}</cyan>":`);
                let largerName = '';
                for (const name in recipes[recipe].stacks[stack].actions) {
                    if (name.length > largerName.length)
                        largerName = name;
                }
                for (const [name, obj] of Object.entries(recipes[recipe].stacks[stack].actions)) {
                    console.log(`- <cyan>${name}</cyan>${' '.repeat(largerName.length - name.length)} : ${obj.description}`);
                }
                return resolve(recipes[recipe].stacks[stack]);
            }
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
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const finalParams = __SKitchenAddParamsInterface.apply(params);
            for (let i = 0; i < finalParams.ingredients.length; i++) {
                const id = finalParams.ingredients[i];
                if (!SKitchen._registeredIngredients[id]) {
                    console.log(`<magenta>[add]</magenta> No ingredient with the id "<yellow>${id}</yellow>" does exists...`);
                    continue;
                }
                const ingredientObj = SKitchen._registeredIngredients[id];
                let context = Object.assign(Object.assign({}, __sharedContext()), { projectType: __detectProjectType() });
                // check project type compatibility
                if (!ingredientObj.projectTypes.includes('*') &&
                    !ingredientObj.projectTypes.includes(context.projectType.type)) {
                    console.log(`<magenta>[${ingredientObj.id}]</magenta> The "<yellow>${ingredientObj.id}</yellow>" is not compatible with your project type "<cyan>${context.projectType.type}</cyan>"`);
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
                console.log(`<yellow>[${ingredientObj.id}]</yellow> Adding the "<yellow>${ingredientObj.id}</yellow>" ingredient to your "<cyan>${context.projectType.type}</cyan>" project...`);
                yield ingredientObj.add({
                    ask(askObj) {
                        var _a;
                        return (_a = console.ask) === null || _a === void 0 ? void 0 : _a.call(console, askObj);
                    },
                    log(message) {
                        return console.log(`<yellow>[add.${id}]</yellow> ${message}`);
                    },
                    // pipe(...args) {
                    //     return pipe(...args);
                    // },
                    context,
                });
                console.log(`<yellow>[${ingredientObj.id}]</yellow> Ingredient added <green>successfully</green>!`);
            }
            resolve();
        }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxvQkFBb0IsSUFBSSxzQkFBc0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25GLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBRW5ELE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxFQUFFLEVBR2YsZUFBZSxJQUFJLGlCQUFpQixFQUN2QyxNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sWUFBWSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFOUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDbEUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyw0QkFBNEIsTUFBTSx3Q0FBd0MsQ0FBQztBQUNsRixPQUFPLDZCQUE2QixNQUFNLHlDQUF5QyxDQUFDO0FBQ3BGLE9BQU8sOEJBQThCLE1BQU0sd0NBQXdDLENBQUM7QUFDcEYsT0FBTyw0QkFBNEIsTUFBTSx3Q0FBd0MsQ0FBQztBQUVsRixPQUFPLFlBQVksTUFBTSw4Q0FBOEMsQ0FBQztBQUN4RSxPQUFPLFlBQVksTUFBTSw4Q0FBOEMsQ0FB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QUUsQ0FBQztBQThzQjVFLDRCQUE0QjtBQUM1QixRQUFRLENBQUMsa0JBQWtCLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUNuRCxRQUFRLENBQUMsa0JBQWtCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUNsRCxRQUFRLENBQUMsa0JBQWtCLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUNuRCxRQUFRLENBQUMsa0JBQWtCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUNqRCxRQUFRLENBQUMsa0JBQWtCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUNqRCxRQUFRLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUMvQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUNoRCxRQUFRLENBQUMsa0JBQWtCLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUN0RCxRQUFRLENBQUMsa0JBQWtCLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUM1RCxRQUFRLENBQUMsa0JBQWtCLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUN4RCxRQUFRLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUUvQyxlQUFlLFFBQVEsQ0FBQyJ9