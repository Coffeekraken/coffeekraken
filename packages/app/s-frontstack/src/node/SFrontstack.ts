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
import __sugarBanner from '@coffeekraken/sugar/shared/ascii/sugarBanner';
import __SProcess, {
    SProcessManager as __SProcessManager,
    ISProcessSettings,
    ISProcessManagerProcessSettings,
} from '@coffeekraken/s-process';
import __stripAnsi from '@coffeekraken/sugar/shared/string/stripAnsi';
import __SLog from '@coffeekraken/s-log';
import __SSugarCli from '@coffeekraken/cli';
import __filter from '@coffeekraken/sugar/shared/object/filter';
import __commandExists from '@coffeekraken/sugar/node/command/commandExists';

import __SFrontspec from '@coffeekraken/s-frontspec';

export interface ISFrontstackSettings {}
export interface ISFrontstackCtorSettings {
    frontstack: Partial<ISFrontstackSettings>;
}

export interface ISFrontstackNewParams {
    
}

export interface ISFrontstackRecipesettings {
    process: Partial<ISProcessSettings>;
    processManager: Partial<ISProcessManagerProcessSettings>;
}

export interface ISFrontstackAction {
    id: string;
    title: string;
    description: string;
    params: any;
    command: string;
    process: string;
    settings: Partial<ISFrontstackRecipesettings>;
    [key: string]: any;
}

export interface ISFrontstackActionWrapper {
    action: ISFrontstackAction;
    params: any;
    [key: string]: any;
}

export interface ISFrontstackRecipeRequirements {
    commands: string[];
}

export interface ISFrontstackRecipeStack {
    description: string;
    sharedParams: any;
    runInParallel: boolean;
    actions:
    | Record<string, ISFrontstackAction>
    | Record<string, ISFrontstackActionWrapper>;
}

export interface ISFrontstackRecipe {
    id: string;
    title: string;
    description: string;
    requirements?: ISFrontstackRecipeRequirements;
    defaultStack: string;
    stacks: Record<string, ISFrontstackRecipeStack>;
}

export interface ISFrontstackActionParams {
    action: string;
    params: string;
}

export interface ISFrontstackRecipeParams {
    recipe: string;
    stack: string;
    exclude: string[];
}

export interface ISFrontstackListParams {
    recipe: string;
}

export default class SFrontstack extends __SClass {
    static interfaces = {
        startParams: __SFrontstackActionInterface,
    };

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
    get frontstackSettings(): ISFrontstackSettings {
        return (<any>this)._settings.frontstack;
    }

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
    constructor(settings?: ISFrontstackCtorSettings) {
        super(
            __deepMerge(
                {
                    frontstack: {},
                },
                settings ?? {},
            ),
        );
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
    new(params: ISFrontstackNewParams | string) {
        return new __SPromise(
            async ({ resolve, reject, emit, pipe }) => {
                const frontstackConfig = __SSugarConfig.get('frontstack');
                const recipesObj = __filter(frontstackConfig.recipes, (key, recipeObj) => {
                    return recipeObj.stacks?.new !== undefined;
                });

                const finalParams: ISFrontstackNewParams =
                    __SFronstackNewParamsInterface.apply(params);

                const availableRecipes = Object.keys(recipesObj);

                const recipe = await emit('ask', {
                    type: 'autocomplete',
                    message: 'Please select one of the available recipes',
                    choices: availableRecipes,
                });

                if (!recipe) process.exit();

                const recipeObj = recipesObj[recipe];

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `Starting project creation using the "<yellow>${recipe}</yellow>" recipe...`,
                });

                resolve(pipe(this.recipe({
                    recipe,
                    stack: 'new'
                })));

            }
        ).bind(this);
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
    action(params: ISFrontstackActionParams | string) {
        return new __SPromise(
            async ({ resolve, reject, emit, pipe }) => {
                const frontstackConfig = __SSugarConfig.get('frontstack');
                const actionsObj = frontstackConfig.actions;

                const finalParams: ISFrontstackActionParams =
                    __SFrontstackActionInterface.apply(params);

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
                    value: `Starting frontstack process using "<yellow>${finalParams.action}</yellow>" action`,
                });

                // get the recipe object and treat it
                const actionObj: Partial<ISFrontstackAction> =
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
            },
            {
            },
        ).bind(this);
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
    recipe(params: Partial<ISFrontstackRecipeParams> | string) {

        const processesPromises: any[] = [];

        const duration = new __SDuration();

        return new __SPromise(
            async ({ resolve, reject, emit, pipe }) => {
                const frontstackConfig = __SSugarConfig.get('frontstack');
                const recipesObj = frontstackConfig.recipes;
                const actionsObj = frontstackConfig.actions;

                const finalParams =
                    __SFrontstackRecipeParamsInterface.apply(params);

                const sugarJson = new __SSugarJson().current();
                
                if (!finalParams.recipe) {
                    if (sugarJson.recipe) finalParams.recipe = sugarJson.recipe;
                }
                if (!finalParams.recipe) {
                    finalParams.recipe = frontstackConfig.defaultRecipe;
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
                const recipeObj: ISFrontstackRecipe =
                    // @ts-ignore
                    recipesObj[finalParams.recipe];

                // defined actions in the sugar.jcon file
                if (sugarJson.frontstack?.[finalParams.stack]) {
                    for (let [key, value] of Object.entries(sugarJson.frontstack?.[finalParams.stack])) {
                        if (!frontstackConfig.actions[value.action]) {
                            throw new Error(`The requested action "<yellow>${value.action}</yellow>" does not exists in the config.frontstack.actions stack... Here's the available ones: <green>${Object.keys(frontstackConfig.actions).join(',')}</green>`)
                        }
                        // @ts-ignore
                        recipeObj.stacks[finalParams.stack].actions[`sugarJson-${value.action}`] = __deepMerge(Object.assign({}, frontstackConfig.actions[value.action], value));
                        delete recipeObj.stacks[finalParams.stack].actions[`sugarJson-${value.action}`].action;
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
                        for (let i=0; i<recipeObj.requirements.commands.length; i++) {
                            emit('log', {
                                type: __SLog.TYPE_INFO,
                                value: `<yellow>[requirements]</yellow> Checking for the "<magenta>${recipeObj.requirements.commands[i]}</magenta>" command to exists...`
                            });
                            const version = await __commandExists(recipeObj.requirements.commands[i])
                            if (!version) {
                                throw new Error(
                                    `<red>[requirements]</red> Sorry but the command "<yellow>${recipeObj.requirements.commands[i]}</yellow>" is required but it does not exists.`,
                                );
                            } else {
                                emit('log', {
                                    type: __SLog.TYPE_INFO,
                                    value: `<green>[requirements]</green> Command "<magenta>${recipeObj.requirements.commands[i]}</magenta>" available in version <cyan>${__stripAnsi(String(version).replace('\n',''))}</cyan>.`
                                });
                            }
                        }
                    }
                }

                const stackObj: Partial<ISFrontstackRecipeStack> = recipeObj.stacks[finalParams.stack];
                
                if (!finalParams.runInParallel) {
                    finalParams.runInParallel = stackObj.runInParallel ?? false;
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
                    sharedParams = {
                        ...stackObj.sharedParams,
                        ...sharedParams,
                    };
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
                    for (
                        let i = 0;
                        i <
                        Object.keys(stackObj.actions)
                            .length;
                        i++
                    ) {
                        const actionName = Object.keys(
                            stackObj.actions,
                        )[i];

                        // Object.keys(
                        //     stackObj.actions,
                        // ).forEach(async (actionName) => {
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

                        // @ts-ignore
                        let actionObj =
                            // @ts-ignore
                            stackObj.actions[
                                actionName
                            ];

                        // check `extends` property
                        if (actionObj.extends) {
                            if (!actionsObj[actionObj.extends]) {
                                throw new Error(`<red>[action]</red> Your action "<yellow>${actionName}</yellow>" tries to extends the "<cyan>${actionObj.extends}</cyan>" action that does not exists... Here's the available actions at this time: <green>${Object.keys(actionsObj).join(',')}</green>`);
                            }
                            emit('log', {
                                type: __SLog.TYPE_INFO,
                                value: `<yellow>○</yellow> <magenta>extends</magenta> : Your action "<yellow>${actionName}</yellow>" extends the "<cyan>${actionObj.extends}</cyan>" one`,
                            })
                            actionObj = <ISFrontstackAction>__deepMerge(Object.assign({}, actionsObj[actionObj.extends]), actionObj);
                        }

                        let actionSpecificParams = {},
                            actionParams = {};

                        if (
                            actionObj.action &&
                            !actionObj.process &&
                            !actionObj.command
                        ) {
                            actionSpecificParams = actionObj.params ?? {};
                            actionObj = actionObj.action;
                        }
                        actionParams = actionObj.params ?? {};

                        const finalActionParams = __deepMerge(
                            actionParams,
                            actionSpecificParams,
                        );

                        const sharedParamsStr =
                            __argsToString(sharedParams).trim();

                        // build shared params cli string

                        const actionId = actionObj.id ?? actionName;
                        // create a process from the recipe object
                        let finalCommand =
                            (actionObj.command ?? actionObj.process).trim() +
                            ' ' +
                            sharedParamsStr;
                        finalCommand = __SSugarCli.replaceTokens(finalCommand, finalActionParams);

                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `<yellow>○</yellow> <yellow>${actionName}</yellow> : <cyan>${finalCommand}</cyan>`,
                        });

                        const pro = await __SProcess.from(finalCommand, {
                            process: {
                                before: actionObj.before,
                                after: actionObj.after,
                            }
                        });

                        const finalProcessManagerParams = {
                            ...sharedParams,
                            ...(actionObj.params ?? {}),
                        };

                        // add the process to the process manager
                        // @TODO    integrate log filter feature
                        processManager.attachProcess(actionId, pro, {});


                        const processPro = processManager.run(
                            actionId,
                            finalProcessManagerParams,
                            actionObj.settings?.process ?? {},
                        );
                        if (!processesPromises.includes(processPro)) {
                            processesPromises.push(processPro);
                        }

                    }
                }

                await Promise.all(processesPromises);

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<green>[success]</green> All actions have been executed <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`,
                })

                resolve(processesPromises);

            },
            {
            },
        ).bind(this);
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
    listRecipes(): Record<string, ISFrontstackRecipe> {
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
    list(
        params: ISFrontstackListParams | string,
    ): Promise<
        | Record<string, ISFrontstackRecipe>
        | Record<string, ISFrontstackRecipeStack>
        | Record<string, ISFrontstackAction>
    > {
        return new __SPromise(
            ({ resolve, reject, emit }) => {
                const recipes = this.listRecipes();

                const finalParams =
                    __SFrontstackListParamsInterface.apply(params);

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
                            `<red>[SFrontstack.list]</red> Sorry but the recipe "<yellow>${recipe}</yellow> does not exists...`,
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
                            `<red>[SFrontstack.list]</red> Sorry but the stack "<yellow>${stack}</yellow> does not exists in the recipe "<cyan>${recipe}</cyan>"...`,
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
                    id: 'SFrontstack.list',
                },
            },
        );
    }
}
