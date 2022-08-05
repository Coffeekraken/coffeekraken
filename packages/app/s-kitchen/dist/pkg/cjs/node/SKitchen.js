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
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_sugar_json_1 = __importDefault(require("@coffeekraken/s-sugar-json"));
const commandExists_1 = __importDefault(require("@coffeekraken/sugar/node/command/commandExists"));
const import_1 = __importDefault(require("@coffeekraken/sugar/node/esm/import"));
const sharedContext_1 = __importDefault(require("@coffeekraken/sugar/node/process/sharedContext"));
const detectType_1 = __importDefault(require("@coffeekraken/sugar/node/project/detectType"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const filter_1 = __importDefault(require("@coffeekraken/sugar/shared/object/filter"));
const stripAnsi_1 = __importDefault(require("@coffeekraken/sugar/shared/string/stripAnsi"));
const SKitchenActionInterface_1 = __importDefault(require("./interface/SKitchenActionInterface"));
const SKitchenAddParamsInterface_1 = __importDefault(require("./interface/SKitchenAddParamsInterface"));
const SKitchenListParamsInterface_1 = __importDefault(require("./interface/SKitchenListParamsInterface"));
const SKitchenNewParamsInterface_1 = __importDefault(require("./interface/SKitchenNewParamsInterface"));
const SKitchenRecipeParamsInterface_1 = __importDefault(require("./interface/SKitchenRecipeParamsInterface"));
const defaultPackageJsonIngredient_1 = __importDefault(require("./ingredients/defaultPackageJson/defaultPackageJsonIngredient"));
const defaultPagesIngredient_1 = __importDefault(require("./ingredients/defaultPages/defaultPagesIngredient"));
const defaultScriptsIngredient_1 = __importDefault(require("./ingredients/defaultScripts/defaultScriptsIngredient"));
const faviconIngredient_1 = __importDefault(require("./ingredients/favicon/faviconIngredient"));
const frontspecIngredient_1 = __importDefault(require("./ingredients/frontspec/frontspecIngredient"));
const manifestIngredient_1 = __importDefault(require("./ingredients/manifest/manifestIngredient"));
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
        super((0, deepMerge_1.default)({}, settings !== null && settings !== void 0 ? settings : {}));
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
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            const kitchenConfig = s_sugar_config_1.default.get('kitchen');
            const recipesObj = (0, filter_1.default)(kitchenConfig.recipes, (key, recipeObj) => {
                var _a;
                return ((_a = recipeObj.stacks) === null || _a === void 0 ? void 0 : _a.new) !== undefined;
            });
            const finalParams = SKitchenNewParamsInterface_1.default.apply(params);
            const availableRecipes = Object.keys(recipesObj);
            const recipe = yield emit('ask', {
                type: 'autocomplete',
                message: 'Please select one of the available recipes',
                choices: availableRecipes,
            });
            if (!recipe)
                process.exit();
            // set the shared context
            (0, sharedContext_1.default)({
                recipe,
            });
            const recipeObj = recipesObj[recipe];
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
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
     * This method allows you to action a kitchen process
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    action(params) {
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            const kitchenConfig = s_sugar_config_1.default.get('kitchen');
            const actionsObj = kitchenConfig.actions;
            const finalParams = SKitchenActionInterface_1.default.apply(params);
            const availableActions = Object.keys(actionsObj);
            if (availableActions.indexOf(finalParams.action) === -1) {
                throw new Error(`<red>[${this.constructor.name}.action]</red> Sorry but the requested action "<yellow>${finalParams.action}</yellow>" does not exists. Here's the list of available action(s):\n${availableActions
                    .map((r) => `- <yellow>${r}</yellow>`)
                    .join('\n')}`);
            }
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `Starting kitchen process using "<yellow>${finalParams.action}</yellow>" action`,
            });
            // get the recipe object and treat it
            const actionObj = 
            // @ts-ignore
            actionsObj[finalParams.action];
            // instanciate the process manager
            const processManager = new s_process_1.SProcessManager({
            //     runInParallel: false
            });
            pipe(processManager);
            // loop on each actions for this recipe
            const finalCommand = (0, cli_1.replaceCommandTokens)(
            // @ts-ignore
            (_a = actionObj.command) !== null && _a !== void 0 ? _a : actionObj.process);
            const actionId = (_b = actionObj.id) !== null && _b !== void 0 ? _b : finalParams.action;
            // create a process from the recipe object
            const pro = yield s_process_1.default.from(finalCommand);
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
        const duration = new s_duration_1.default();
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const kitchenConfig = s_sugar_config_1.default.get('kitchen');
            const recipesObj = kitchenConfig.recipes;
            const actionsObj = kitchenConfig.actions;
            const sugarJson = new s_sugar_json_1.default().current();
            // initalise final params.
            // it will be merged with the "stackObj.sharedParams" later...
            let finalParams = SKitchenRecipeParamsInterface_1.default.apply(params);
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
            finalParams = (0, deepMerge_1.default)((_a = stackObj.sharedParams) !== null && _a !== void 0 ? _a : {}, finalParams);
            // defined actions in the sugar.jcon file
            if ((_b = sugarJson.kitchen) === null || _b === void 0 ? void 0 : _b[finalParams.stack]) {
                for (let [key, value] of Object.entries((_c = sugarJson.kitchen) === null || _c === void 0 ? void 0 : _c[finalParams.stack])) {
                    if (!kitchenConfig.actions[value.action]) {
                        throw new Error(`The requested action "<yellow>${value.action}</yellow>" does not exists in the config.kitchen.actions stack... Here's the available ones: <green>${Object.keys(kitchenConfig.actions).join(',')}</green>`);
                    }
                    // @ts-ignore
                    recipeObj.stacks[finalParams.stack].actions[`sugarJson-${value.action}`] = (0, deepMerge_1.default)(Object.assign({}, kitchenConfig.actions[value.action], value));
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
                            type: s_log_1.default.TYPE_VERBOSE,
                            value: `<yellow>[requirements]</yellow> Checking for the "<magenta>${recipeObj.requirements.commands[i]}</magenta>" command to exists...`,
                        });
                        const version = yield (0, commandExists_1.default)(recipeObj.requirements.commands[i]);
                        if (!version) {
                            throw new Error(`<red>[requirements]</red> Sorry but the command "<yellow>${recipeObj.requirements.commands[i]}</yellow>" is required but it does not exists.`);
                        }
                        else {
                            emit('log', {
                                type: s_log_1.default.TYPE_VERBOSE,
                                value: `<green>[requirements]</green> Command "<magenta>${recipeObj.requirements.commands[i]}</magenta>" available in version <cyan>${(0, stripAnsi_1.default)(String(version).replace('\n', ''))}</cyan>.`,
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
                type: s_log_1.default.TYPE_INFO,
                value: `Starting kitchen process`,
            });
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>○</yellow> Recipe : <yellow>${finalParams.recipe}</yellow>`,
            });
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>○</yellow> Stack  : <cyan>${finalParams.stack}</cyan>`,
            });
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
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
            const processManager = new s_process_1.SProcessManager({
                // @ts-ignore
                runInParallel: finalParams.runInParallel,
            });
            pipe(processManager, {
                overrideEmitter: true,
            });
            // loop on each actions for this recipe
            if (stackObj.actions) {
                for (let i = 0; i < Object.keys(stackObj.actions).length; i++) {
                    const actionName = Object.keys(stackObj.actions)[i];
                    let actionObj = stackObj.actions[actionName];
                    let actionParams = (0, deepMerge_1.default)((_e = actionObj.params) !== null && _e !== void 0 ? _e : {}, Object.assign({}, sharedParams));
                    // do not execute the action if it has benn excluded
                    if (finalParams.exclude &&
                        finalParams.exclude.indexOf(actionName) !== -1) {
                        emit('log', {
                            type: s_log_1.default.TYPE_VERBOSE,
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
                            type: s_log_1.default.TYPE_VERBOSE,
                            value: `<yellow>○</yellow> <magenta>extends</magenta> : Your action "<yellow>${actionName}</yellow>" extends the "<cyan>${actionObj.extends}</cyan>" one`,
                        });
                        actionObj = ((0, deepMerge_1.default)(Object.assign({}, actionsObj[actionObj.extends]), actionObj));
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
                        InterfaceClass = yield (0, import_1.default)(actionObj.interface);
                        // filter shared params using each action "interface"
                        actionParams = (0, filter_1.default)(actionParams, (key, value) => {
                            if (key === 'env')
                                return true;
                            return (InterfaceClass.definition[key] !==
                                undefined);
                        });
                    }
                    const actionId = (_f = actionObj.id) !== null && _f !== void 0 ? _f : actionName;
                    // create a process from the recipe object
                    let finalCommand = (0, cli_1.replaceCommandTokens)(((_g = actionObj.command) !== null && _g !== void 0 ? _g : actionObj.process).trim(), actionParams);
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `<yellow>○</yellow> <yellow>${actionName}</yellow> : <cyan>${finalCommand}</cyan>`,
                    });
                    const pro = yield s_process_1.default.from(finalCommand, {
                        before: actionObj.before,
                        after: actionObj.after,
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
                type: s_log_1.default.TYPE_INFO,
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
        return new s_promise_1.default(({ resolve, reject, emit }) => {
            const recipes = this.listRecipes();
            const finalParams = SKitchenListParamsInterface_1.default.apply(params);
            let recipe, stack;
            if (finalParams.recipe) {
                recipe = finalParams.recipe.split('.')[0];
                stack = finalParams.recipe.split('.')[1];
            }
            // list the ingredients
            if (finalParams.ingredients) {
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `Available ingredient(s) list:`,
                });
                for (let [id, ingredientObj] of Object.entries(SKitchen._registeredIngredients)) {
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `- <magenta>${id}</magenta>${' '.repeat(30 - id.length)}: ${ingredientObj.description}`,
                    });
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `   - Project type(s)${' '.repeat(12)}: <cyan>${ingredientObj.projectTypes.join(',')}</cyan>`,
                    });
                    emit('log', {
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
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `Available recipe(s) list:`,
                });
                let largerName = '';
                for (const name in recipes) {
                    if (name.length > largerName.length)
                        largerName = name;
                }
                for (const [name, obj] of Object.entries(recipes)) {
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
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
                    type: s_log_1.default.TYPE_INFO,
                    value: `Stacks list for the recipe "<yellow>${recipe}</yellow>":`,
                });
                let largerName = '';
                for (const name in recipes[recipe].stacks) {
                    if (name.length > largerName.length)
                        largerName = name;
                }
                for (const [name, obj] of Object.entries(recipes[recipe].stacks)) {
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
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
                    type: s_log_1.default.TYPE_INFO,
                    value: `Actions list for the recipe "<yellow>${recipe}</yellow> and the stack "<cyan>${stack}</cyan>":`,
                });
                let largerName = '';
                for (const name in recipes[recipe].stacks[stack].actions) {
                    if (name.length > largerName.length)
                        largerName = name;
                }
                for (const [name, obj] of Object.entries(recipes[recipe].stacks[stack].actions)) {
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
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
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const finalParams = SKitchenAddParamsInterface_1.default.apply(params);
            for (let i = 0; i < finalParams.ingredients.length; i++) {
                const id = finalParams.ingredients[i];
                if (!SKitchen._registeredIngredients[id]) {
                    emit('log', {
                        type: s_log_1.default.TYPE_WARNING,
                        value: `<magenta>[add]</magenta> No ingredient with the id "<yellow>${id}</yellow>" does exists...`,
                    });
                    continue;
                }
                const ingredientObj = SKitchen._registeredIngredients[id];
                let context = Object.assign(Object.assign({}, (0, sharedContext_1.default)()), { projectType: (0, detectType_1.default)() });
                // check project type compatibility
                if (!ingredientObj.projectTypes.includes('*') &&
                    !ingredientObj.projectTypes.includes(context.projectType.type)) {
                    emit('log', {
                        type: s_log_1.default.TYPE_WARNING,
                        value: `<magenta>[${ingredientObj.id}]</magenta> The "<yellow>${ingredientObj.id}</yellow>" is not compatible with your project type "<cyan>${context.projectType.type}</cyan>"`,
                    });
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
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
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
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>[${ingredientObj.id}]</yellow> Ingredient addedd <green>successfully</green>!`,
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
exports.default = SKitchen;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBbUY7QUFDbkYsb0VBQTZDO0FBQzdDLDBFQUFtRDtBQUVuRCxnRUFBeUM7QUFDekMscUVBSWlDO0FBQ2pDLHdFQUFpRDtBQUNqRCxrRkFBMEQ7QUFDMUQsOEVBQXNEO0FBQ3RELG1HQUE2RTtBQUM3RSxpRkFBMkQ7QUFDM0QsbUdBQTZFO0FBRTdFLDZGQUE4RTtBQUM5RSw0RkFBc0U7QUFDdEUsc0ZBQWdFO0FBQ2hFLDRGQUFzRTtBQUN0RSxrR0FBNEU7QUFDNUUsd0dBQWtGO0FBQ2xGLDBHQUFvRjtBQUNwRix3R0FBb0Y7QUFDcEYsOEdBQXdGO0FBRXhGLGlJQUEyRztBQUMzRywrR0FBeUY7QUFDekYscUhBQStGO0FBQy9GLGdHQUEwRTtBQUMxRSxzR0FBZ0Y7QUFDaEYsbUdBQTZFO0FBQzdFLGdHQUEwRTtBQUMxRSw2RkFBdUU7QUFDdkUsMEZBQW9FO0FBQ3BFLHNHQUFnRjtBQWtHaEYsTUFBTSxRQUFTLFNBQVEsaUJBQVE7SUEwQzNCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBcUM7UUFDN0MsS0FBSyxDQUFDLElBQUEsbUJBQVcsRUFBQyxFQUFFLEVBQUUsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBaEREOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxhQUFrQztRQUN4RCxtQkFBbUI7UUFDbkIsSUFDSSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ2pCLENBQUMsYUFBYSxDQUFDLEdBQUc7WUFDbEIsT0FBTyxhQUFhLENBQUMsR0FBRyxLQUFLLFVBQVUsRUFDekM7WUFDRSxNQUFNLElBQUksS0FBSyxDQUNYLHVKQUF1SixDQUMxSixDQUFDO1NB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