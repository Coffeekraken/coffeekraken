"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = require("@coffeekraken/cli");
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_process_1 = __importStar(require("@coffeekraken/s-process"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_sugar_json_1 = __importDefault(require("@coffeekraken/s-sugar-json"));
const datetime_1 = require("@coffeekraken/sugar/datetime");
const is_1 = require("@coffeekraken/sugar/is");
const module_1 = require("@coffeekraken/sugar/module");
const object_1 = require("@coffeekraken/sugar/object");
const process_1 = require("@coffeekraken/sugar/process");
const project_1 = require("@coffeekraken/sugar/project");
const string_1 = require("@coffeekraken/sugar/string");
const SKitchenAddParamsInterface_js_1 = __importDefault(require("./interface/SKitchenAddParamsInterface.js"));
const SKitchenListParamsInterface_js_1 = __importDefault(require("./interface/SKitchenListParamsInterface.js"));
const SKitchenNewParamsInterface_js_1 = __importDefault(require("./interface/SKitchenNewParamsInterface.js"));
const SKitchenRunParamsInterface_js_1 = __importDefault(require("./interface/SKitchenRunParamsInterface.js"));
const string_2 = require("@coffeekraken/sugar/string");
const defaultPackageJsonIngredient_js_1 = __importDefault(require("./ingredients/defaultPackageJson/defaultPackageJsonIngredient.js"));
const defaultPagesIngredient_js_1 = __importDefault(require("./ingredients/defaultPages/defaultPagesIngredient.js"));
const defaultScriptsIngredient_js_1 = __importDefault(require("./ingredients/defaultScripts/defaultScriptsIngredient.js"));
const faviconIngredient_js_1 = __importDefault(require("./ingredients/favicon/faviconIngredient.js"));
const frontspecIngredient_js_1 = __importDefault(require("./ingredients/frontspec/frontspecIngredient.js"));
const manifestIngredient_js_1 = __importDefault(require("./ingredients/manifest/manifestIngredient.js"));
const nvmrcIngredient_js_1 = __importDefault(require("./ingredients/nvmrc/nvmrcIngredient.js"));
const postcssIngredient_js_1 = __importDefault(require("./ingredients/postcss/postcssIngredient.js"));
const readmeIngredient_js_1 = __importDefault(require("./ingredients/readme/readmeIngredient.js"));
const sugarIngredient_js_1 = __importDefault(require("./ingredients/sugar/sugarIngredient.js"));
const sugarJsonIngredient_js_1 = __importDefault(require("./ingredients/sugarJson/sugarJsonIngredient.js"));
class SKitchen extends s_class_1.default {
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
        super((0, object_1.__deepMerge)({}, settings !== null && settings !== void 0 ? settings : {}));
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
            const kitchenConfig = s_sugar_config_1.default.get('kitchen');
            const recipesObj = (0, object_1.__filterObject)(kitchenConfig.recipes, (key, recipeObj) => {
                var _a;
                return ((_a = recipeObj.stacks) === null || _a === void 0 ? void 0 : _a.new) !== undefined;
            });
            const finalParams = SKitchenNewParamsInterface_js_1.default.apply(params);
            const availableRecipes = Object.keys(recipesObj).map((recipeId) => {
                return `- ${(0, string_2.__upperFirst)(recipeId)}${' '.repeat(10 - recipeId.length)}: ${recipesObj[recipeId].description}`;
            });
            yield (0, datetime_1.__wait)(1000);
            let recipe = yield ((_a = console.ask) === null || _a === void 0 ? void 0 : _a.call(console, {
                type: 'autocomplete',
                message: 'Please select one of the available recipes',
                choices: availableRecipes,
            }));
            if (!recipe)
                process.exit();
            // process recipe to get only the id
            recipe = (0, string_2.__lowerFirst)(recipe.split(':')[0].replace(/^-\s+/, '').trim());
            // set the shared context
            (0, process_1.__sharedContext)({
                recipe,
            });
            const recipeObj = recipesObj[recipe];
            console.log({
                margin: {
                    bottom: 1,
                },
                type: s_log_1.default.TYPE_INFO,
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
        const duration = new s_duration_1.default();
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
            const kitchenConfig = s_sugar_config_1.default.get('kitchen'), recipesObj = kitchenConfig.recipes, actionsObj = kitchenConfig.actions, sugarJson = new s_sugar_json_1.default().current();
            let hasProcessEnded = false;
            (0, process_1.__onProcessExit)(() => {
                hasProcessEnded = true;
            });
            // initalise final params.
            // it will be merged with the "stackObj.sharedParams" later...
            let finalParams = SKitchenRunParamsInterface_js_1.default.apply(params);
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
            finalParams = (0, object_1.__deepMerge)((_b = stackObj.sharedParams) !== null && _b !== void 0 ? _b : {}, finalParams);
            // defined actions in the sugar.jcon file
            if ((_c = sugarJson.kitchen) === null || _c === void 0 ? void 0 : _c[finalParams.stack]) {
                for (let [key, value] of Object.entries((_d = sugarJson.kitchen) === null || _d === void 0 ? void 0 : _d[finalParams.stack])) {
                    if (!kitchenConfig.actions[value.action]) {
                        throw new Error(`The requested action "<yellow>${value.action}</yellow>" does not exists in the config.kitchen.actions stack... Here's the available ones: <green>${Object.keys(kitchenConfig.actions).join(',')}</green>`);
                    }
                    // @ts-ignore
                    recipeObj.stacks[finalParams.stack].actions[`sugarJson-${value.action}`] = (0, object_1.__deepMerge)(Object.assign({}, kitchenConfig.actions[value.action], value));
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
                        const version = yield (0, is_1.__isCommandExists)(recipeObj.requirements.commands[i]);
                        if (!version) {
                            throw new Error(`<red>[requirements]</red> Sorry but the command "<yellow>${recipeObj.requirements.commands[i]}</yellow>" is required but it does not exists.`);
                        }
                        else {
                            (_f = console.verbose) === null || _f === void 0 ? void 0 : _f.call(console, `<green>[requirements]</green> Command "<magenta>${recipeObj.requirements.commands[i]}</magenta>" available in version <cyan>${(0, string_1.__stripAnsi)(String(version).replace('\n', ''))}</cyan>.`);
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
            const processManager = new s_process_1.SProcessManager({
                // @ts-ignore
                runInParallel: finalParams.runInParallel,
            });
            // loop on each actions for this recipe
            if (stackObj.actions) {
                for (let i = 0; i < Object.keys(stackObj.actions).length; i++) {
                    const actionName = Object.keys(stackObj.actions)[i];
                    // stop if process has ended
                    if (hasProcessEnded) {
                        break;
                    }
                    // if an action is setted in the finalParams, make sure we run only this one
                    if (finalParams.action &&
                        actionName !== finalParams.action) {
                        console.error(`<red>[action]</red> The requested action "<magenta>${finalParams.action}</magenta>" does not exists in the "<yellow>${finalParams.recipe}</yellow>.<cyan>${finalParams.stack}</cyan>" stack`);
                        continue;
                    }
                    let actionObj = stackObj.actions[actionName];
                    let actionParams = (0, object_1.__deepMerge)((_k = actionObj.params) !== null && _k !== void 0 ? _k : {}, Object.assign({}, sharedParams));
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
                        actionObj = ((0, object_1.__deepMerge)(Object.assign({}, actionsObj[actionObj.extends]), actionObj));
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
                        InterfaceClass = yield (0, module_1.__import)(actionObj.interface);
                        // filter shared params using each action "interface"
                        actionParams = (0, object_1.__filterObject)(actionParams, (key, value) => {
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
                            return (InterfaceClass.definition[key] !== undefined);
                        });
                    }
                    const actionId = (_m = actionObj.id) !== null && _m !== void 0 ? _m : actionName;
                    // create a process from the recipe object
                    let finalCommand = (0, cli_1.replaceCommandTokens)(((_o = actionObj.command) !== null && _o !== void 0 ? _o : actionObj.process).trim(), actionParams);
                    console.log(' ');
                    console.log({
                        group: 'SKitchen',
                        value: `Starting <yellow>${actionName}</yellow> action with command:`,
                    });
                    console.log({
                        group: 'SKitchen',
                        value: `<grey>$</grey> <cyan>${finalCommand}</cyan>`,
                    });
                    const pro = yield s_process_1.default.from(finalCommand, {
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
        const recipes = s_sugar_config_1.default.get('kitchen.recipes');
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
            const finalParams = SKitchenListParamsInterface_js_1.default.apply(params);
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
                        type: s_log_1.default.TYPE_INFO,
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
            const finalParams = SKitchenAddParamsInterface_js_1.default.apply(params);
            for (let i = 0; i < finalParams.ingredients.length; i++) {
                const id = finalParams.ingredients[i];
                if (!SKitchen._registeredIngredients[id]) {
                    console.log(`<magenta>[add]</magenta> No ingredient with the id "<yellow>${id}</yellow>" does exists...`);
                    continue;
                }
                const ingredientObj = SKitchen._registeredIngredients[id];
                let context = Object.assign(Object.assign({}, (0, process_1.__sharedContext)()), { projectType: (0, project_1.__detectProjectType)() });
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
                    const sugarJson = new s_sugar_json_1.default().current();
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
SKitchen.registerIngredient(frontspecIngredient_js_1.default);
SKitchen.registerIngredient(manifestIngredient_js_1.default);
SKitchen.registerIngredient(sugarJsonIngredient_js_1.default);
SKitchen.registerIngredient(faviconIngredient_js_1.default);
SKitchen.registerIngredient(postcssIngredient_js_1.default);
SKitchen.registerIngredient(sugarIngredient_js_1.default);
SKitchen.registerIngredient(readmeIngredient_js_1.default);
SKitchen.registerIngredient(defaultPagesIngredient_js_1.default);
SKitchen.registerIngredient(defaultPackageJsonIngredient_js_1.default);
SKitchen.registerIngredient(defaultScriptsIngredient_js_1.default);
SKitchen.registerIngredient(nvmrcIngredient_js_1.default);
exports.default = SKitchen;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBbUY7QUFDbkYsb0VBQTZDO0FBQzdDLDBFQUFtRDtBQUVuRCxnRUFBeUM7QUFDekMscUVBSWlDO0FBQ2pDLGtGQUEwRDtBQUMxRCw4RUFBc0Q7QUFDdEQsMkRBQXNEO0FBQ3RELCtDQUEyRDtBQUMzRCx1REFBc0Q7QUFDdEQsdURBQXlFO0FBQ3pFLHlEQUErRTtBQUUvRSx5REFBa0U7QUFDbEUsdURBQXlEO0FBQ3pELDhHQUFxRjtBQUNyRixnSEFBdUY7QUFDdkYsOEdBQXVGO0FBQ3ZGLDhHQUFxRjtBQUVyRix1REFBd0U7QUFDeEUsdUlBQThHO0FBQzlHLHFIQUE0RjtBQUM1RiwySEFBa0c7QUFDbEcsc0dBQTZFO0FBQzdFLDRHQUFtRjtBQUNuRix5R0FBZ0Y7QUFDaEYsZ0dBQXVFO0FBQ3ZFLHNHQUE2RTtBQUM3RSxtR0FBMEU7QUFDMUUsZ0dBQXVFO0FBQ3ZFLDRHQUFtRjtBQXNHbkYsTUFBTSxRQUFTLFNBQVEsaUJBQVE7SUFNM0I7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLGtCQUFrQixDQUFDLGFBQWtDO1FBQ3hELG1CQUFtQjtRQUNuQixJQUNJLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDakIsQ0FBQyxhQUFhLENBQUMsR0FBRztZQUNsQixPQUFPLGFBQWEsQ0FBQyxHQUFHLEtBQUssVUFBVSxFQUN6QztZQUNFLE1BQU0sSUFBSSxLQUFLLENBQ1gsdUpBQXVKLENBQzFKLENBQUM7U0FDTDtRQUVELG9CQUFvQjtRQUNwQixJQUFJLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDbkQsTUFBTSxJQUFJLEtBQUssQ0FDWCx5QkFBeUIsYUFBYSxDQUFDLEVBQUUscUJBQXFCLENBQ2pFLENBQUM7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