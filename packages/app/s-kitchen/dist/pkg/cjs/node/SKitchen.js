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
const is_1 = require("@coffeekraken/sugar/is");
const module_1 = require("@coffeekraken/sugar/module");
const object_1 = require("@coffeekraken/sugar/object");
const process_1 = require("@coffeekraken/sugar/process");
const project_1 = require("@coffeekraken/sugar/project");
const stripAnsi_1 = __importDefault(require("@coffeekraken/sugar/shared/string/stripAnsi"));
const SKitchenAddParamsInterface_1 = __importDefault(require("./interface/SKitchenAddParamsInterface"));
const SKitchenListParamsInterface_1 = __importDefault(require("./interface/SKitchenListParamsInterface"));
const SKitchenNewParamsInterface_1 = __importDefault(require("./interface/SKitchenNewParamsInterface"));
const SKitchenRunParamsInterface_1 = __importDefault(require("./interface/SKitchenRunParamsInterface"));
const lowerFirst_1 = __importDefault(require("@coffeekraken/sugar/shared/string/lowerFirst"));
const upperFirst_1 = __importDefault(require("@coffeekraken/sugar/shared/string/upperFirst"));
const defaultPackageJsonIngredient_1 = __importDefault(require("./ingredients/defaultPackageJson/defaultPackageJsonIngredient"));
const defaultPagesIngredient_1 = __importDefault(require("./ingredients/defaultPages/defaultPagesIngredient"));
const defaultScriptsIngredient_1 = __importDefault(require("./ingredients/defaultScripts/defaultScriptsIngredient"));
const faviconIngredient_1 = __importDefault(require("./ingredients/favicon/faviconIngredient"));
const frontspecIngredient_1 = __importDefault(require("./ingredients/frontspec/frontspecIngredient"));
const manifestIngredient_1 = __importDefault(require("./ingredients/manifest/manifestIngredient"));
const nvmrcIngredient_1 = __importDefault(require("./ingredients/nvmrc/nvmrcIngredient"));
const postcssIngredient_1 = __importDefault(require("./ingredients/postcss/postcssIngredient"));
const readmeIngredient_1 = __importDefault(require("./ingredients/readme/readmeIngredient"));
const sugarIngredient_1 = __importDefault(require("./ingredients/sugar/sugarIngredient"));
const sugarJsonIngredient_1 = __importDefault(require("./ingredients/sugarJson/sugarJsonIngredient"));
class SKitchen extends s_class_1.default {
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
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const kitchenConfig = s_sugar_config_1.default.get('kitchen');
            const recipesObj = (0, object_1.__filter)(kitchenConfig.recipes, (key, recipeObj) => {
                var _a;
                return ((_a = recipeObj.stacks) === null || _a === void 0 ? void 0 : _a.new) !== undefined;
            });
            const finalParams = SKitchenNewParamsInterface_1.default.apply(params);
            const availableRecipes = Object.keys(recipesObj).map((recipeId) => {
                return `- ${(0, upperFirst_1.default)(recipeId)}${' '.repeat(10 - recipeId.length)}: ${recipesObj[recipeId].description}`;
            });
            let recipe = yield ((_a = console.ask) === null || _a === void 0 ? void 0 : _a.call(console, {
                type: 'autocomplete',
                message: 'Please select one of the available recipes',
                choices: availableRecipes,
            }));
            if (!recipe)
                process.exit();
            // process recipe to get only the id
            recipe = (0, lowerFirst_1.default)(recipe.split(':')[0].replace(/^-\s+/, '').trim());
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
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
            const kitchenConfig = s_sugar_config_1.default.get('kitchen'), recipesObj = kitchenConfig.recipes, actionsObj = kitchenConfig.actions, sugarJson = new s_sugar_json_1.default().current();
            // initalise final params.
            // it will be merged with the "stackObj.sharedParams" later...
            let finalParams = SKitchenRunParamsInterface_1.default.apply(params);
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
                            (_f = console.verbose) === null || _f === void 0 ? void 0 : _f.call(console, `<green>[requirements]</green> Command "<magenta>${recipeObj.requirements.commands[i]}</magenta>" available in version <cyan>${(0, stripAnsi_1.default)(String(version).replace('\n', ''))}</cyan>.`);
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
                    // if an action is setted in the finalParams, make sure we run only this one
                    if (finalParams.action &&
                        actionName !== finalParams.action) {
                        console.log(`<red>[action]</red> The requested action "<magenta>${finalParams.action}</magenta>" does not exists in the "<yellow>${finalParams.recipe}</yellow>.<cyan>${finalParams.stack}</cyan>" stack`);
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
                        console.log(`<yellow>○</yellow> <magenta>extends</magenta> : Your action "<yellow>${actionName}</yellow>" extends the "<cyan>${actionObj.extends}</cyan>" one`);
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
                        actionParams = (0, object_1.__filter)(actionParams, (key, value) => {
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
                    const actionId = (_l = actionObj.id) !== null && _l !== void 0 ? _l : actionName;
                    // create a process from the recipe object
                    let finalCommand = (0, cli_1.replaceCommandTokens)(((_m = actionObj.command) !== null && _m !== void 0 ? _m : actionObj.process).trim(), actionParams);
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
                    const finalProcessManagerParams = Object.assign(Object.assign({}, sharedParams), ((_o = actionObj.params) !== null && _o !== void 0 ? _o : {}));
                    // add the process to the process manager
                    // @TODO    integrate log filter feature
                    processManager.attachProcess(actionId, pro, {});
                    try {
                        const processPro = processManager.run(actionId, finalProcessManagerParams, Object.assign({}, ((_q = (_p = actionObj.settings) === null || _p === void 0 ? void 0 : _p.process) !== null && _q !== void 0 ? _q : {})));
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
            const finalParams = SKitchenListParamsInterface_1.default.apply(params);
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
            const finalParams = SKitchenAddParamsInterface_1.default.apply(params);
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
SKitchen.registerIngredient(frontspecIngredient_1.default);
SKitchen.registerIngredient(manifestIngredient_1.default);
SKitchen.registerIngredient(sugarJsonIngredient_1.default);
SKitchen.registerIngredient(faviconIngredient_1.default);
SKitchen.registerIngredient(postcssIngredient_1.default);
SKitchen.registerIngredient(sugarIngredient_1.default);
SKitchen.registerIngredient(readmeIngredient_1.default);
SKitchen.registerIngredient(defaultPagesIngredient_1.default);
SKitchen.registerIngredient(defaultPackageJsonIngredient_1.default);
SKitchen.registerIngredient(defaultScriptsIngredient_1.default);
SKitchen.registerIngredient(nvmrcIngredient_1.default);
exports.default = SKitchen;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBbUY7QUFDbkYsb0VBQTZDO0FBQzdDLDBFQUFtRDtBQUVuRCxnRUFBeUM7QUFDekMscUVBSWlDO0FBQ2pDLGtGQUEwRDtBQUMxRCw4RUFBc0Q7QUFDdEQsK0NBQTJEO0FBQzNELHVEQUFzRDtBQUN0RCx1REFBbUU7QUFDbkUseURBQThEO0FBRTlELHlEQUFrRTtBQUNsRSw0RkFBc0U7QUFDdEUsd0dBQWtGO0FBQ2xGLDBHQUFvRjtBQUNwRix3R0FBb0Y7QUFDcEYsd0dBQWtGO0FBRWxGLDhGQUF3RTtBQUN4RSw4RkFBd0U7QUFDeEUsaUlBQTJHO0FBQzNHLCtHQUF5RjtBQUN6RixxSEFBK0Y7QUFDL0YsZ0dBQTBFO0FBQzFFLHNHQUFnRjtBQUNoRixtR0FBNkU7QUFDN0UsMEZBQW9FO0FBQ3BFLGdHQUEwRTtBQUMxRSw2RkFBdUU7QUFDdkUsMEZBQW9FO0FBQ3BFLHNHQUFnRjtBQXNHaEYsTUFBTSxRQUFTLFNBQVEsaUJBQVE7SUEwQzNCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBcUM7UUFDN0MsS0FBSyxDQUFDLElBQUEsb0JBQVcsRUFBQyxFQUFFLEVBQUUsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBaEREOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxhQUFrQztRQUN4RCxtQkFBbUI7UUFDbkIsSUFDSSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ2pCLENBQUMsYUFBYSxDQUFDLEdBQUc7WUFDbEIsT0FBTyxhQUFhLENBQUMsR0FBRyxLQUFLLFVBQVUsRUFDekM7WUFDRSxNQUFNLElBQUksS0FBSyxDQUNYLHVKQUF1SixDQUMxSixDQUFDO1NB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