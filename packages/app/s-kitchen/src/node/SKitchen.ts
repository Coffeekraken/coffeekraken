import { replaceCommandTokens as __replaceCommandTokens } from '@coffeekraken/cli';
import __SClass from '@coffeekraken/s-class';
import __SDuration from '@coffeekraken/s-duration';
import type { ISLogAsk } from '@coffeekraken/s-log';
import __SLog from '@coffeekraken/s-log';
import __SProcess, {
    ISProcessManagerProcessSettings,
    ISProcessSettings,
    SProcessManager as __SProcessManager,
} from '@coffeekraken/s-process';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SSugarJson from '@coffeekraken/s-sugar-json';
import { __wait } from '@coffeekraken/sugar/datetime';
import { __isCommandExists } from '@coffeekraken/sugar/is';
import { __import } from '@coffeekraken/sugar/module';
import { __deepMerge, __filterObject } from '@coffeekraken/sugar/object';
import { __onProcessExit, __sharedContext } from '@coffeekraken/sugar/process';
import type { IDetectProjectTypeResult } from '@coffeekraken/sugar/project';
import { __detectProjectType } from '@coffeekraken/sugar/project';
import { __stripAnsi } from '@coffeekraken/sugar/string';
import __SKitchenAddParamsInterface from './interface/SKitchenAddParamsInterface.js';
import __SKitchenListParamsInterface from './interface/SKitchenListParamsInterface.js';
import __SFronstackNewParamsInterface from './interface/SKitchenNewParamsInterface.js';
import __SKitchenRunParamsInterface from './interface/SKitchenRunParamsInterface.js';

import { __lowerFirst, __upperFirst } from '@coffeekraken/sugar/string';
import __defaultPackageJsonIngredient from './ingredients/defaultPackageJson/defaultPackageJsonIngredient.js';
import __defaultPagesIngredient from './ingredients/defaultPages/defaultPagesIngredient.js';
import __defaultScriptsIngredient from './ingredients/defaultScripts/defaultScriptsIngredient.js';
import __faviconIngredient from './ingredients/favicon/faviconIngredient.js';
import __frontspecIngredient from './ingredients/frontspec/frontspecIngredient.js';
import __manifestIngredient from './ingredients/manifest/manifestIngredient.js';
import __nvmrcIngredient from './ingredients/nvmrc/nvmrcIngredient.js';
import __postcssIngredient from './ingredients/postcss/postcssIngredient.js';
import __readmeIngredient from './ingredients/readme/readmeIngredient.js';
import __sugarIngredient from './ingredients/sugar/sugarIngredient.js';
import __sugarJsonIngredient from './ingredients/sugarJson/sugarJsonIngredient.js';

export interface ISKitchenSettings {}

export interface ISKitchenNewParams {}

export interface ISKitchenRecipesettings {
    process: Partial<ISProcessSettings>;
    processManager: Partial<ISProcessManagerProcessSettings>;
}

export interface ISKitchenIngredientContext {
    recipe?: string;
    projectType: IDetectProjectTypeResult;
    new: boolean;
}

export interface ISKitchenIngredientAddApi {
    ask(askObj: ISLogAsk): Promise<any>;
    log(message: string): void;
    context: ISKitchenIngredientContext;
}

export interface ISKitchenIngredient {
    id: string;
    description: string;
    projectTypes: string[];
    add(api: ISKitchenIngredientAddApi): Promise<any>;
}

export interface ISKitchenAction {
    id: string;
    title: string;
    description: string;
    params: any;
    command: string;
    process: string;
    settings: Partial<ISKitchenRecipesettings>;
    [key: string]: any;
}

export interface ISKitchenActionWrapper {
    action: ISKitchenAction;
    params: any;
    [key: string]: any;
}

export interface ISKitchenRecipeRequirements {
    commands: string[];
}

export interface ISKitchenRecipeStack {
    description: string;
    sharedParams: any;
    runInParallel: boolean;
    actions:
        | Record<string, ISKitchenAction>
        | Record<string, ISKitchenActionWrapper>;
}

export interface ISKitchenRecipe {
    id: string;
    title: string;
    description: string;
    requirements?: ISKitchenRecipeRequirements;
    defaultStack: string;
    stacks: Record<string, ISKitchenRecipeStack>;
}

export interface ISKitchenAddParams {
    ingredients: (
        | 'frontspec'
        | 'manifest'
        | 'favicon'
        | 'postcss'
        | 'sugarJson'
        | 'toolkit'
    )[];
}

export interface ISKitchenActionParams {
    action: string;
    params: string;
}

export interface ISKitchenRecipeParams {
    recipe: string;
    stack: string;
    exclude: string[];
}

export interface ISKitchenRunParams {
    recipe: string;
    action: string;
    stack: string;
}

export interface ISKitchenListParams {
    recipe: string;
    ingredients: boolean;
}

class SKitchen extends __SClass {
    /**
     * Store the registered ingredients object by id's
     */
    static _registeredIngredients: Record<string, ISKitchenIngredient> = {};

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
    static registerIngredient(ingredientObj: ISKitchenIngredient): void {
        // check ingredient
        if (
            !ingredientObj.id ||
            !ingredientObj.add ||
            typeof ingredientObj.add !== 'function'
        ) {
            throw new Error(
                `The ingredient you try to register is not valid... Please check your code to be sure your ingredient contains at least an "id" and an "add" method...`,
            );
        }

        // prevent overrides
        if (SKitchen._registeredIngredients[ingredientObj.id]) {
            throw new Error(
                `An ingredient called "${ingredientObj.id}" already exists...`,
            );
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
    constructor(settings?: Partial<ISKitchenSettings>) {
        super(__deepMerge({}, settings ?? {}));
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
    new(params: ISKitchenNewParams | string) {
        return new Promise(async (resolve) => {
            const kitchenConfig = __SSugarConfig.get('kitchen');
            const recipesObj = __filterObject(
                kitchenConfig.recipes,
                (key, recipeObj) => {
                    return recipeObj.stacks?.new !== undefined;
                },
            );

            const finalParams: ISKitchenNewParams =
                __SFronstackNewParamsInterface.apply(params);

            const availableRecipes = Object.keys(recipesObj).map((recipeId) => {
                return `- ${__upperFirst(recipeId)}${' '.repeat(
                    10 - recipeId.length,
                )}: ${recipesObj[recipeId].description}`;
            });

            await __wait(1000);

            let recipe = await console.ask?.({
                type: 'autocomplete',
                message: 'Please select one of the available recipes',
                choices: availableRecipes,
            });

            if (!recipe) process.exit();

            // process recipe to get only the id
            recipe = __lowerFirst(
                recipe.split(':')[0].replace(/^-\s+/, '').trim(),
            );

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

            resolve(
                this.run({
                    recipe,
                    stack: 'new',
                }),
            );
        });
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
    run(params: Partial<ISKitchenRunParams> | string) {
        const processesPromises: any[] = [];

        const duration = new __SDuration();

        return new Promise(async (resolve) => {
            const kitchenConfig = __SSugarConfig.get('kitchen'),
                recipesObj = kitchenConfig.recipes,
                actionsObj = kitchenConfig.actions,
                sugarJson = new __SSugarJson().current();

            let hasProcessEnded = false;
            __onProcessExit(() => {
                hasProcessEnded = true;
            });

            // initalise final params.
            // it will be merged with the "stackObj.sharedParams" later...
            let finalParams = __SKitchenRunParamsInterface.apply(params);

            // handle default recipe
            if (!finalParams.recipe) {
                finalParams.recipe =
                    sugarJson.recipe ?? kitchenConfig.defaultRecipe;
            }

            if (!finalParams.recipe) {
                throw new Error(
                    `<red>[recipe]</red> Sorry but it seems that you missed to pass a recipe to use or that you don't have any "<cyan>sugar.json</cyan>" file at the root of your project with a "<yellow>recipe</yellow>" property that define which recipe to use for this project...`,
                );
            }

            if (!recipesObj[finalParams.recipe]) {
                throw new Error(
                    `<red>[recipe]</red> Sorry but the specified "<yellow>${
                        finalParams.recipe
                    }</yellow>" recipe does not exists. Here's the available ones: <green>${Object.keys(
                        recipesObj,
                    ).join(', ')}</green>`,
                );
            }

            if (!finalParams.stack) {
                if (!recipesObj[finalParams.recipe].defaultStack) {
                    throw new Error(
                        `<red>[recipe]</red> Sorry but you MUST specify a "<yellow>stack</yellow>" to use in the requested "<cyan>${finalParams.recipe}</cyan>" recipe`,
                    );
                }
                finalParams.stack = recipesObj[finalParams.recipe].defaultStack;
            }

            // get the recipe object and treat it
            const recipeObj: ISKitchenRecipe =
                // @ts-ignore
                recipesObj[finalParams.recipe];

            const stackObj: Partial<ISKitchenRecipeStack> =
                recipeObj.stacks[finalParams.stack];

            // merge the finalParams with the stackObj.sharedParams object if exists...
            finalParams = __deepMerge(stackObj.sharedParams ?? {}, finalParams);

            // defined actions in the sugar.jcon file
            if (sugarJson.kitchen?.[finalParams.stack]) {
                for (let [key, value] of Object.entries(
                    sugarJson.kitchen?.[finalParams.stack],
                )) {
                    if (!kitchenConfig.actions[value.action]) {
                        throw new Error(
                            `The requested action "<yellow>${
                                value.action
                            }</yellow>" does not exists in the config.kitchen.actions stack... Here's the available ones: <green>${Object.keys(
                                kitchenConfig.actions,
                            ).join(',')}</green>`,
                        );
                    }
                    // @ts-ignore
                    recipeObj.stacks[finalParams.stack].actions[
                        `sugarJson-${value.action}`
                    ] = __deepMerge(
                        Object.assign(
                            {},
                            kitchenConfig.actions[value.action],
                            value,
                        ),
                    );
                    delete recipeObj.stacks[finalParams.stack].actions[
                        `sugarJson-${value.action}`
                    ].action;
                }
            }

            // check the recipe stacks
            if (!recipeObj.stacks || !Object.keys(recipeObj.stacks).length) {
                throw new Error(
                    `<red>[recipe]</red> Sorry but the requested "<yellow>${finalParams.recipe}</yellow>" configuration object missed the requested "<yellow>stacks</yellow>" property that list the stacks to execute`,
                );
            }
            if (!recipeObj.stacks[finalParams.stack]) {
                throw new Error(
                    `<red>[recipe]</red> Sorry but the requested "<yellow>${finalParams.recipe}.stacks</yellow>" configuration object missed the requested "<yellow>${finalParams.stack}</yellow>" stack`,
                );
            }

            // make sure this recipe has some actions
            if (
                !recipeObj.stacks[finalParams.stack].actions ||
                !Object.keys(recipeObj.stacks[finalParams.stack].actions).length
            ) {
                throw new Error(
                    `<red>[recipe]</red> Sorry but the requested "<yellow>${finalParams.recipe}.stacks.${finalParams.stack}.actions</yellow>" configuration object missed the requested "<yellow>actions</yellow>" property that list the actions to execute`,
                );
            }

            // requirements
            if (recipeObj.requirements) {
                if (recipeObj.requirements.commands) {
                    for (
                        let i = 0;
                        i < recipeObj.requirements.commands.length;
                        i++
                    ) {
                        console.verbose?.(
                            `<yellow>[requirements]</yellow> Checking for the "<magenta>${recipeObj.requirements.commands[i]}</magenta>" command to exists...`,
                        );
                        const version = await __isCommandExists(
                            recipeObj.requirements.commands[i],
                        );

                        if (!version) {
                            throw new Error(
                                `<red>[requirements]</red> Sorry but the command "<yellow>${recipeObj.requirements.commands[i]}</yellow>" is required but it does not exists.`,
                            );
                        } else {
                            console.verbose?.(
                                `<green>[requirements]</green> Command "<magenta>${
                                    recipeObj.requirements.commands[i]
                                }</magenta>" available in version <cyan>${__stripAnsi(
                                    String(version).replace('\n', ''),
                                )}</cyan>.`,
                            );
                        }
                    }
                }
            }

            // set runInParallel if not specified
            if (finalParams.runInParallel === undefined) {
                finalParams.runInParallel = stackObj.runInParallel ?? false;
            }

            // some info logs
            console.log(`Starting kitchen process`);
            console.log(
                `<yellow>○</yellow> Recipe : <yellow>${finalParams.recipe}</yellow>`,
            );
            console.log(
                `<yellow>○</yellow> Stack  : <cyan>${finalParams.stack}</cyan>`,
            );
            console.log(
                `<yellow>○</yellow> Action : <magenta>${
                    finalParams.action ?? '*'
                }</magenta>`,
            );
            console.log(
                `<yellow>○</yellow> Run in parallel : ${
                    finalParams.runInParallel
                        ? '<green>true</green>'
                        : '<red>false</red>'
                }`,
            );

            // loop on each actions for this recipe
            if (stackObj.actions) {
                for (let i = 0; i < Object.keys(stackObj.actions).length; i++) {
                    const actionName = Object.keys(stackObj.actions)[i];
                    let actionObj = stackObj.actions[actionName];
                    console.log(
                        `<yellow>○</yellow> <yellow>${actionName}</yellow> : ${
                            actionObj.title ?? 'No description'
                        }`,
                    );
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

                    // stop if process has ended
                    if (hasProcessEnded) {
                        break;
                    }

                    // if an action is setted in the finalParams, make sure we run only this one
                    if (
                        finalParams.action &&
                        actionName !== finalParams.action
                    ) {
                        console.error(
                            `<red>[action]</red> The requested action "<magenta>${finalParams.action}</magenta>" does not exists in the "<yellow>${finalParams.recipe}</yellow>.<cyan>${finalParams.stack}</cyan>" stack`,
                        );
                        continue;
                    }

                    let actionObj = stackObj.actions[actionName];
                    let actionParams = __deepMerge(
                        actionObj.params ?? {},
                        Object.assign({}, sharedParams),
                    );

                    // do not execute the action if it has benn excluded
                    if (
                        finalParams.exclude &&
                        finalParams.exclude.indexOf(actionName) !== -1
                    ) {
                        console.log(
                            `Excluding the action "<yellow>${actionName}</yellow>"`,
                        );
                        return;
                    }

                    // check `extends` property
                    if (actionObj.extends) {
                        if (!actionsObj[actionObj.extends]) {
                            throw new Error(
                                `<red>[action]</red> Your action "<yellow>${actionName}</yellow>" tries to extends the "<cyan>${
                                    actionObj.extends
                                }</cyan>" action that does not exists... Here's the available actions at this time: <green>${Object.keys(
                                    actionsObj,
                                ).join(',')}</green>`,
                            );
                        }
                        console.verbose?.(
                            `<yellow>○</yellow> <magenta>extends</magenta> : Your action "<yellow>${actionName}</yellow>" extends the "<cyan>${actionObj.extends}</cyan>" one`,
                        );
                        actionObj = <ISKitchenAction>(
                            __deepMerge(
                                Object.assign(
                                    {},
                                    actionsObj[actionObj.extends],
                                ),
                                actionObj,
                            )
                        );
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
                        InterfaceClass = await __import(actionObj.interface);
                        // filter shared params using each action "interface"
                        actionParams = __filterObject(
                            actionParams,
                            (key, value) => {
                                if (key === 'env') return true;
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
                                return (
                                    InterfaceClass.definition[key] !== undefined
                                );
                            },
                        );
                    }

                    const actionId = actionObj.id ?? actionName;
                    // create a process from the recipe object
                    let finalCommand = __replaceCommandTokens(
                        (actionObj.command ?? actionObj.process).trim(),
                        actionParams,
                    );

                    console.log(' ');
                    console.log({
                        group: 'SKitchen',
                        value: `Starting <yellow>${actionName}</yellow> action with command:`,
                    });
                    console.log({
                        group: 'SKitchen',
                        value: `<grey>$</grey> <cyan>${finalCommand}</cyan>`,
                    });

                    const pro = await __SProcess.from(finalCommand, {
                        before: actionObj.before,
                        after: actionObj.after,
                    });

                    const finalProcessManagerParams = {
                        ...sharedParams,
                        ...(actionObj.params ?? {}),
                    };

                    // add the process to the process manager
                    // @TODO    integrate log filter feature
                    processManager.attachProcess(actionId, pro, {});

                    try {
                        const processPro = processManager.run(
                            actionId,
                            finalProcessManagerParams,
                            {
                                ...(actionObj.settings?.process ?? {}),
                            },
                        );

                        if (!processesPromises.includes(processPro)) {
                            processesPromises.push(processPro);
                        }

                        if (!finalParams.runInParallel) {
                            const res = await processPro;
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }
            }

            await Promise.all(processesPromises);

            console.log(
                `<green>[success]</green> All actions have been executed <green>successfully</green> in <yellow>${
                    duration.end().formatedDuration
                }</yellow>`,
            );

            resolve(processesPromises);
        });
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
    listRecipes(): Record<string, ISKitchenRecipe> {
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
    list(params: ISKitchenListParams | string): Promise<void | any> {
        return new Promise((resolve) => {
            const recipes = this.listRecipes();

            const finalParams: ISKitchenL =
                __SKitchenListParamsInterface.apply(params);

            let recipe, stack;
            if (finalParams.recipe) {
                recipe = finalParams.recipe.split('.')[0];
                stack = finalParams.recipe.split('.')[1];
            }

            // list the ingredients
            if (finalParams.ingredients) {
                console.log(`Available ingredient(s) list:`);

                for (let [id, ingredientObj] of Object.entries(
                    SKitchen._registeredIngredients,
                )) {
                    console.log(
                        `- <magenta>${id}</magenta>${' '.repeat(
                            30 - id.length,
                        )}: ${ingredientObj.description}`,
                    );
                    console.log(
                        `   - Project type(s)${' '.repeat(
                            12,
                        )}: <cyan>${ingredientObj.projectTypes.join(
                            ',',
                        )}</cyan>`,
                    );
                    console.log({
                        margin: {
                            bottom: 1,
                        },
                        type: __SLog.TYPE_INFO,
                        value: `   - Command ${' '.repeat(
                            19,
                        )}: <yellow>sugar kitchen.add <magenta>${id}</magenta></yellow>`,
                    });
                }

                return resolve();
            }

            // available recipes
            if (!recipe) {
                console.log(`Available recipe(s) list:`);

                let largerName = '';
                for (const name in recipes) {
                    if (name.length > largerName.length) largerName = name;
                }
                for (const [name, obj] of Object.entries(recipes)) {
                    console.log(
                        `- <cyan>${name}</cyan>${' '.repeat(
                            largerName.length - name.length,
                        )} : ${obj.description}`,
                    );
                }

                return resolve(recipes);
            }

            if (recipe) {
                if (!recipes[recipe]) {
                    throw new Error(
                        `<red>[SKitchen.list]</red> Sorry but the recipe "<yellow>${recipe}</yellow> does not exists...`,
                    );
                }
            }

            if (recipe && !stack) {
                console.log(
                    `Stacks list for the recipe "<yellow>${recipe}</yellow>":`,
                );
                let largerName = '';
                for (const name in recipes[recipe].stacks) {
                    if (name.length > largerName.length) largerName = name;
                }
                for (const [name, obj] of Object.entries(
                    recipes[recipe].stacks,
                )) {
                    console.log(
                        `- <cyan>${name}</cyan>${' '.repeat(
                            largerName.length - name.length,
                        )} : ${obj.description}`,
                    );
                }

                return resolve(recipes[recipe]);
            }

            if (stack) {
                if (!recipes[recipe].stacks[stack]) {
                    throw new Error(
                        `<red>[SKitchen.list]</red> Sorry but the stack "<yellow>${stack}</yellow> does not exists in the recipe "<cyan>${recipe}</cyan>"...`,
                    );
                }
            }

            if (recipe && stack) {
                console.log(
                    `Actions list for the recipe "<yellow>${recipe}</yellow> and the stack "<cyan>${stack}</cyan>":`,
                );
                let largerName = '';
                for (const name in recipes[recipe].stacks[stack].actions) {
                    if (name.length > largerName.length) largerName = name;
                }
                for (const [name, obj] of Object.entries(
                    recipes[recipe].stacks[stack].actions,
                )) {
                    console.log(
                        `- <cyan>${name}</cyan>${' '.repeat(
                            largerName.length - name.length,
                        )} : ${obj.description}`,
                    );
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
    add(params: ISKitchenListParams | string): Promise<any | void> {
        return new Promise(async (resolve) => {
            // @ts-ignore
            const finalParams: ISKitchenAddParams =
                __SKitchenAddParamsInterface.apply(params);

            for (let i = 0; i < finalParams.ingredients.length; i++) {
                const id = finalParams.ingredients[i];

                if (!SKitchen._registeredIngredients[id]) {
                    console.log(
                        `<magenta>[add]</magenta> No ingredient with the id "<yellow>${id}</yellow>" does exists...`,
                    );
                    continue;
                }

                const ingredientObj = SKitchen._registeredIngredients[id];

                let context = {
                    ...__sharedContext(),
                    projectType: __detectProjectType(),
                };

                // check project type compatibility
                if (
                    !ingredientObj.projectTypes.includes('*') &&
                    !ingredientObj.projectTypes.includes(
                        context.projectType.type,
                    )
                ) {
                    console.log(
                        `<magenta>[${ingredientObj.id}]</magenta> The "<yellow>${ingredientObj.id}</yellow>" is not compatible with your project type "<cyan>${context.projectType.type}</cyan>"`,
                    );
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

                console.log(
                    `<yellow>[${ingredientObj.id}]</yellow> Adding the "<yellow>${ingredientObj.id}</yellow>" ingredient to your "<cyan>${context.projectType.type}</cyan>" project...`,
                );

                await ingredientObj.add({
                    ask(askObj: ISLogAsk) {
                        return console.ask?.(askObj);
                    },
                    log(message: string) {
                        return console.log(
                            `<yellow>[add.${id}]</yellow> ${message}`,
                        );
                    },
                    // pipe(...args) {
                    //     return pipe(...args);
                    // },
                    context,
                });

                console.log(
                    `<yellow>[${ingredientObj.id}]</yellow> Ingredient added <green>successfully</green>!`,
                );
            }

            resolve();
        });
    }
}

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
