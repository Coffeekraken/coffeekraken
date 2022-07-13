import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';

export default function (env, config) {
    if (env.platform !== 'node') return;

    return {
        /**
         * @name            title
         * @namespace       config.kitchenRecipeNextJs
         * @type            String
         * @default         Default
         *
         * Specify the recipe name
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        title: 'NextJs',
        /**
         * @name            description
         * @namespace       config.kitchenRecipeNextJs
         * @type            String
         * @default         Default s-kitchen recipe
         *
         * Specify the recipe description
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        description:
            'Create easily a next.js app with coffeekraken tools support',
        /**
         * @name            requirements
         * @namespace       config.kitchenRecipeNextJs
         * @type            String[]
         * @default         ['[config.package.manager]']
         *
         * Specify some requirements for this recipe like commands (npm, composer, etc...)
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        requirements: {
            commands: ['[config.package.manager]'],
        },
        /**
         * @name            defaultStack
         * @namespace       config.kitchenRecipeNextJs
         * @type            String
         * @default         dev
         *
         * Specify the recipe default stack
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        defaultStack: 'dev',
        stacks: {
            new: {
                /**
                 * @name            description
                 * @namespace       config.kitchenRecipeNextJs.stacks.init
                 * @type            String
                 * @default         Init a new project with this recipe
                 *
                 * Specify the recipe init stack description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Init a new next.js project',
                actions: {
                    /**
                     * @name            createApp
                     * @namespace       config.kitchenRecipeNextJs.stacks.new.actions
                     * @type            String
                     *
                     * Specify the recipe init stack copy action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    createApp: __deepMerge({
                        title: 'Create the app',
                        description:
                            'Create the app using the create-next-app utility',
                        command: `npx create-next-app next-js --typescript`,
                        after() {
                            process.chdir(`${process.cwd()}/next-js`);
                        },
                        params: {},
                        settings: {},
                    }),
                    /**
                     * @name            rename
                     * @namespace       config.kitchenRecipeNextJs.stacks.new.actions
                     * @type            String
                     *
                     * Specify the recipe init stack rename action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    rename: __deepMerge(config.kitchen.actions.rename, {
                        params: {},
                    }),
                    /**
                     * @name            addSugarJson
                     * @namespace       config.kitchenRecipeNextJs.stacks.new.actions
                     * @type            String
                     *
                     * Specify the recipe init stack addSugarJson action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    addSugarJson: __deepMerge(
                        config.kitchen.actions.addSugarJson,
                        {
                            params: {
                                recipe: 'nextJs',
                            },
                        },
                    ),
                    /**
                     * @name            addManifestJson
                     * @namespace       config.kitchenRecipeNextJs.stacks.new.actions
                     * @type            String
                     *
                     * Specify the recipe init stack addManifestJson action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    addManifestJson: __deepMerge(
                        config.kitchen.actions.addManifestJson,
                        {
                            params: {},
                        },
                    ),

                    /**
                     * @name            addSugarPostcss
                     * @namespace       config.kitchenRecipeNextJs.stacks.new.actions
                     * @type            String
                     *
                     * Specify the recipe init stack addSugarPostcss action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    addSugarPostcss: __deepMerge(
                        config.kitchen.actions.addSugarPostcss,
                        {
                            params: {},
                        },
                    ),

                    // /**
                    //  * @name            installDependencies
                    //  * @namespace       config.kitchenRecipeNextJs.stacks.new.actions
                    //  * @type            String
                    //  *
                    //  * Specify the recipe init stack installDependencies action
                    //  *
                    //  * @since       2.0.0
                    //  * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                    //  */
                    // installDependencies: __deepMerge(config.kitchen.actions.installDependencies, {
                    //     params: {}
                    // })
                },
            },
            dev: {
                /**
                 * @name            description
                 * @namespace       config.kitchenRecipeNextJs.stacks.dev
                 * @type            String
                 * @default         Start the development stack
                 *
                 * Specify the recipe dev stack description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Start the development stack',
                runInParallel: true,
                actions: {
                    /**
                     * @name            frontendServer
                     * @namespace       config.kitchenRecipeNextJs.stacks.dev.actions
                     * @type            String
                     * @default         [config.kitchen.actions.frontendServer]
                     *
                     * Specify the recipe dev stack frontendServer action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    frontendServer: '[config.kitchen.actions.frontendServer]',
                    /**
                     * @name            vite
                     * @namespace       config.kitchenRecipeNextJs.stacks.dev.actions
                     * @type            String
                     * @default         [config.kitchen.actions.vite]
                     *
                     * Specify the recipe dev stack description
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    vite: '[config.kitchen.actions.vite]',
                },
            },
            prod: {
                /**
                 * @name            description
                 * @namespace       config.kitchenRecipeNextJs.stacks.prod
                 * @type            String
                 * @default         ...
                 *
                 * Specify the recipe prod stack description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Start the production testing stack',
                sharedParams: {
                    /**
                     * @name            env
                     * @namespace       config.kitchenRecipeNextJs.stacks.prod.sharedParams
                     * @type            String
                     * @default         production
                     *
                     * Specify the recipe prod stack env shared param
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    env: 'production',
                },
                actions: {
                    /**
                     * @name            frontendServer
                     * @namespace       config.kitchenRecipeNextJs.stacks.prod.actions
                     * @type            String
                     * @default         [config.kitchen.actions.frontendServer]
                     *
                     * Specify the recipe prod stack frontendServer action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    frontendServer: '[config.kitchen.actions.frontendServer]',
                },
            },
            build: {
                /**
                 * @name            description
                 * @namespace       config.kitchenRecipeNextJs.stacks.build
                 * @type            String
                 * @default         ...
                 *
                 * Specify the recipe build stack description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Build your final production ready dist package',
                sharedParams: {
                    /**
                     * @name            prod
                     * @namespace       config.kitchenRecipeNextJs.stacks.build.sharedParams
                     * @type            String
                     * @default         true
                     *
                     * Specify that the build is made for production
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    prod: true,
                },
                actions: {
                    /**
                     * @name            postcssBuild
                     * @namespace       config.kitchenRecipeNextJs.stacks.build.actions
                     * @type            String
                     * @default         [config.kitchen.actions.postcssBuild]
                     *
                     * Specify the recipe build stack postcssBuild action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    postcssBuild: '[config.kitchen.actions.postcssBuild]',
                    /**
                     * @name            viteBuild
                     * @namespace       config.kitchenRecipeNextJs.stacks.build.actions
                     * @type            String
                     * @default         [config.kitchen.actions.viteBuild]
                     *
                     * Specify the recipe build stack viteBuild action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    viteBuild: '[config.kitchen.actions.viteBuild]',
                    /**
                     * @name            imagesBuild
                     * @namespace       config.kitchenRecipeNextJs.stacks.build.actions
                     * @type            String
                     * @default         [config.kitchen.actions.imagesBuild]
                     *
                     * Specify the recipe build stack imagesBuild action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    imagesBuild: '[config.kitchen.actions.imagesBuild]',
                },
            },
        },
    };
}
