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
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SSugarJson from '@coffeekraken/s-sugar-json';
import __commandExists from '@coffeekraken/sugar/node/command/commandExists';
import __import from '@coffeekraken/sugar/node/esm/import';
import __sharedContext from '@coffeekraken/sugar/node/process/sharedContext';
import type { IDetectTypeResult } from '@coffeekraken/sugar/node/project/detectType';
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

export interface ISKitchenSettings {}

export interface ISKitchenNewParams {}

export interface ISKitchenRecipesettings {
    process: Partial<ISProcessSettings>;
    processManager: Partial<ISProcessManagerProcessSettings>;
}

export interface ISKitchenIngredientContext {
    recipe?: string;
    projectType: IDetectTypeResult;
    new: boolean;
}

export interface ISKitchenIngredientAddApi {
    ask(askObj: ISLogAsk): Promise<any>;
    log(message: string): void;
    emit(type: 'log' | 'ask', what: any): void;
    pipe: Function;
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
        return new __SPromise(
            async ({ resolve, reject, emit, pipe }) => {
                const kitchenConfig = __SSugarConfig.get('kitchen');
                const recipesObj = __filter(
                    kitchenConfig.recipes,
                    (key, recipeObj) => {
                        return recipeObj.stacks?.new !== undefined;
                    },
                );

                const finalParams: ISKitchenNewParams =
                    __SFronstackNewParamsInterface.apply(params);

                const availableRecipes = Object.keys(recipesObj).map(
                    (recipeId) => {
                        return `- ${__upperFirst(recipeId)}${' '.repeat(
                            10 - recipeId.length,
                        )}: ${recipesObj[recipeId].description}`;
                    },
                );

                let recipe = await emit('ask', {
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

                emit('log', {
                    margin: {
                        bottom: 1,
                    },
                    type: __SLog.TYPE_INFO,
                    value: `Starting project creation using the "<yellow>${recipe}</yellow>" recipe...`,
                });

                resolve(
                    pipe(
                        this.recipe({
                            recipe,
                            stack: 'new',
                        }),
                    ),
                );
            },
            {
                metas: {
                    id: this.constructor.name,
                },
            },
        );
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
    action(params: ISKitchenActionParams | string) {
        return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
            const kitchenConfig = __SSugarConfig.get('kitchen');
            const actionsObj = kitchenConfig.actions;

            const finalParams: ISKitchenActionParams =
                __SKitchenActionInterface.apply(params);

            const availableActions = Object.keys(actionsObj);

            if (availableActions.indexOf(finalParams.action) === -1) {
                throw new Error(
                    `<red>[${
                        this.constructor.name
                    }.action]</red> Sorry but the requested action "<yellow>${
                        finalParams.action
                    }</yellow>" does not exists. Here's the list of available action(s):\n${availableActions
                        .map((r) => `- <yellow>${r}</yellow>`)
                        .join('\n')}`,
                );
            }

            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `Starting kitchen process using "<yellow>${finalParams.action}</yellow>" action`,
            });

            // get the recipe object and treat it
            const actionObj: Partial<ISKitchenAction> =
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
                actionObj.command ?? actionObj.process,
                // params
            );

            const actionId = actionObj.id ?? finalParams.action;
            // create a process from the recipe object
            const pro = await __SProcess.from(finalCommand);
            // add the process to the process manager
            // @TODO    integrate log filter feature
            processManager.attachProcess(actionId, pro, {
                // log: {
                //   filter: undefined
                // }
            });

            processManager.run(
                actionId,
                finalParams.params ?? actionObj.params ?? {},
                actionObj.settings?.process ?? {},
            );
        }, {}).bind(this);
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
    recipe(params: Partial<ISKitchenRecipeParams> | string) {
        const processesPromises: any[] = [];

        const duration = new __SDuration();

        return new __SPromise(
            async ({ resolve, reject, emit, pipe }) => {
                const kitchenConfig = __SSugarConfig.get('kitchen');
                const recipesObj = kitchenConfig.recipes;
                const actionsObj = kitchenConfig.actions;

                const sugarJson = new __SSugarJson().current();

                // initalise final params.
                // it will be merged with the "stackObj.sharedParams" later...
                let finalParams = __SKitchenRecipeParamsInterface.apply(params);

                if (!finalParams.recipe) {
                    if (sugarJson.recipe) finalParams.recipe = sugarJson.recipe;
                }
                if (!finalParams.recipe) {
                    finalParams.recipe = kitchenConfig.defaultRecipe;
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
                    finalParams.stack =
                        recipesObj[finalParams.recipe].defaultStack;
                }

                // get the recipe object and treat it
                const recipeObj: ISKitchenRecipe =
                    // @ts-ignore
                    recipesObj[finalParams.recipe];

                const stackObj: Partial<ISKitchenRecipeStack> =
                    recipeObj.stacks[finalParams.stack];

                // merge the finalParams with the stackObj.sharedParams object if exists...
                finalParams = __deepMerge(
                    stackObj.sharedParams ?? {},
                    finalParams,
                );

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
                if (
                    !recipeObj.stacks ||
                    !Object.keys(recipeObj.stacks).length
                ) {
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
                    !Object.keys(recipeObj.stacks[finalParams.stack].actions)
                        .length
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
                            emit('log', {
                                type: __SLog.TYPE_VERBOSE,
                                value: `<yellow>[requirements]</yellow> Checking for the "<magenta>${recipeObj.requirements.commands[i]}</magenta>" command to exists...`,
                            });
                            const version = await __commandExists(
                                recipeObj.requirements.commands[i],
                            );
                            if (!version) {
                                throw new Error(
                                    `<red>[requirements]</red> Sorry but the command "<yellow>${recipeObj.requirements.commands[i]}</yellow>" is required but it does not exists.`,
                                );
                            } else {
                                emit('log', {
                                    type: __SLog.TYPE_VERBOSE,
                                    value: `<green>[requirements]</green> Command "<magenta>${
                                        recipeObj.requirements.commands[i]
                                    }</magenta>" available in version <cyan>${__stripAnsi(
                                        String(version).replace('\n', ''),
                                    )}</cyan>.`,
                                });
                            }
                        }
                    }
                }

                // set runInParallel if not specified
                if (finalParams.runInParallel === undefined) {
                    finalParams.runInParallel = stackObj.runInParallel ?? false;
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
                    value: `<yellow>○</yellow> Run in parallel : ${
                        finalParams.runInParallel
                            ? '<green>true</green>'
                            : '<red>false</red>'
                    }`,
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
                    for (
                        let i = 0;
                        i < Object.keys(stackObj.actions).length;
                        i++
                    ) {
                        const actionName = Object.keys(stackObj.actions)[i];
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
                            emit('log', {
                                type: __SLog.TYPE_VERBOSE,
                                value: `Excluding the action "<yellow>${actionName}</yellow>"`,
                            });
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
                            emit('log', {
                                type: __SLog.TYPE_VERBOSE,
                                value: `<yellow>○</yellow> <magenta>extends</magenta> : Your action "<yellow>${actionName}</yellow>" extends the "<cyan>${actionObj.extends}</cyan>" one`,
                            });
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
                                actionParams[
                                    key.replace(`${actionName}.`, '')
                                ] = value;
                            }
                        }

                        // filter action params depending on each action interface if specified
                        let InterfaceClass;
                        if (actionObj.interface) {
                            InterfaceClass = await __import(
                                actionObj.interface,
                            );
                            // filter shared params using each action "interface"
                            actionParams = __filter(
                                actionParams,
                                (key, value) => {
                                    if (key === 'env') return true;
                                    return (
                                        InterfaceClass.definition[key] !==
                                        undefined
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

                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `<yellow>○</yellow> <yellow>${actionName}</yellow> : <cyan>${finalCommand}</cyan>`,
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

                            if (!actionObj.settings?.silent) {
                                pipe(processPro);
                            }

                            if (!processesPromises.includes(processPro)) {
                                processesPromises.push(processPro);
                            }

                            if (!finalParams.runInParallel) {
                                await processPro;
                            }
                        } catch (e) {
                            // console.log(e);
                        }
                    }
                }

                await Promise.all(processesPromises);

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<green>[success]</green> All actions have been executed <green>successfully</green> in <yellow>${
                        duration.end().formatedDuration
                    }</yellow>`,
                });

                resolve(processesPromises);
            },
            {
                eventEmitter: {
                    bind: this,
                },
            },
        ).bind(this);
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
    list(params: ISKitchenListParams | string): Promise<any> {
        return new __SPromise(
            ({ resolve, reject, emit }) => {
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
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `Available ingredient(s) list:`,
                    });

                    for (let [id, ingredientObj] of Object.entries(
                        SKitchen._registeredIngredients,
                    )) {
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `- <magenta>${id}</magenta>${' '.repeat(
                                30 - id.length,
                            )}: ${ingredientObj.description}`,
                        });
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `   - Project type(s)${' '.repeat(
                                12,
                            )}: <cyan>${ingredientObj.projectTypes.join(
                                ',',
                            )}</cyan>`,
                        });
                        emit('log', {
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
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `Available recipe(s) list:`,
                    });

                    let largerName = '';
                    for (const name in recipes) {
                        if (name.length > largerName.length) largerName = name;
                    }
                    for (const [name, obj] of Object.entries(recipes)) {
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `- <cyan>${name}</cyan>${' '.repeat(
                                largerName.length - name.length,
                            )} : ${obj.description}`,
                        });
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
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `Stacks list for the recipe "<yellow>${recipe}</yellow>":`,
                    });
                    let largerName = '';
                    for (const name in recipes[recipe].stacks) {
                        if (name.length > largerName.length) largerName = name;
                    }
                    for (const [name, obj] of Object.entries(
                        recipes[recipe].stacks,
                    )) {
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `- <cyan>${name}</cyan>${' '.repeat(
                                largerName.length - name.length,
                            )} : ${obj.description}`,
                        });
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
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `Actions list for the recipe "<yellow>${recipe}</yellow> and the stack "<cyan>${stack}</cyan>":`,
                    });
                    let largerName = '';
                    for (const name in recipes[recipe].stacks[stack].actions) {
                        if (name.length > largerName.length) largerName = name;
                    }
                    for (const [name, obj] of Object.entries(
                        recipes[recipe].stacks[stack].actions,
                    )) {
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `- <cyan>${name}</cyan>${' '.repeat(
                                largerName.length - name.length,
                            )} : ${obj.description}`,
                        });
                    }

                    return resolve(recipes[recipe].stacks[stack]);
                }
            },
            {
                metas: {
                    id: 'SKitchen.list',
                },
            },
        );
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
    add(params: ISKitchenListParams | string): Promise<any> {
        return new __SPromise(
            async ({ resolve, reject, emit, pipe }) => {
                // @ts-ignore
                const finalParams: ISKitchenAddParams =
                    __SKitchenAddParamsInterface.apply(params);

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

                    await ingredientObj.add({
                        ask(askObj: ISLogAsk) {
                            return emit('ask', askObj);
                        },
                        log(message: string) {
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
            },
            {
                metas: {
                    id: 'SKitchen.add',
                },
            },
        );
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
