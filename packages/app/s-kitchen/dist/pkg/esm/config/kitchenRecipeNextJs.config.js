import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
export default function (api) {
    if (api.env.platform !== 'node')
        return;
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
        description: 'Create easily a next.js app with coffeekraken tools support',
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
            get commands() {
                return [api.config.package.manager];
            },
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
                    get createApp() {
                        return __deepMerge({
                            title: 'Create the app',
                            description: 'Create the app using the create-next-app utility',
                            command: `npx create-next-app next-js --typescript`,
                            after() {
                                process.chdir(`${process.cwd()}/next-js`);
                            },
                            params: {},
                            settings: {},
                        });
                    },
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
                    get rename() {
                        return __deepMerge(api.config.kitchen.actions.rename, {
                            params: {},
                        });
                    },
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
                    get addSugarJson() {
                        return __deepMerge(api.config.kitchen.actions.addSugarJson, {
                            params: {
                                recipe: 'nextJs',
                            },
                        });
                    },
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
                    get addManifestJson() {
                        return __deepMerge(api.config.kitchen.actions.addManifestJson, {
                            params: {},
                        });
                    },
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
                    get addSugarPostcss() {
                        return __deepMerge(api.config.kitchen.actions.addSugarPostcss, {
                            params: {},
                        });
                    },
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
                    get frontendServer() {
                        return api.config.kitchen.actions.frontendServer;
                    },
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
                    get vite() {
                        return api.config.kitchen.actions.vite;
                    },
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
                    get frontendServer() {
                        return api.config.kitchen.actions.frontendServer;
                    },
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
                    get postcssBuild() {
                        return api.config.kitchen.actions.postcssBuild;
                    },
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
                    get viteBuild() {
                        return api.config.kitchen.actions.viteBuild;
                    },
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
                    get imagesBuild() {
                        return api.config.kitchen.actions.imagesBuild;
                    },
                },
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBRXRFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsS0FBSyxFQUFFLFFBQVE7UUFDZjs7Ozs7Ozs7OztXQVVHO1FBQ0gsV0FBVyxFQUNQLDZEQUE2RDtRQUNqRTs7Ozs7Ozs7OztXQVVHO1FBQ0gsWUFBWSxFQUFFO1lBQ1YsSUFBSSxRQUFRO2dCQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN4QyxDQUFDO1NBQ0o7UUFDRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsWUFBWSxFQUFFLEtBQUs7UUFDbkIsTUFBTSxFQUFFO1lBQ0osR0FBRyxFQUFFO2dCQUNEOzs7Ozs7Ozs7O21CQVVHO2dCQUNILFdBQVcsRUFBRSw0QkFBNEI7Z0JBQ3pDLE9BQU8sRUFBRTtvQkFDTDs7Ozs7Ozs7O3VCQVNHO29CQUNILElBQUksU0FBUzt3QkFDVCxPQUFPLFdBQVcsQ0FBQzs0QkFDZixLQUFLLEVBQUUsZ0JBQWdCOzRCQUN2QixXQUFXLEVBQ1Asa0RBQWtEOzRCQUN0RCxPQUFPLEVBQUUsMENBQTBDOzRCQUNuRCxLQUFLO2dDQUNELE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDOzRCQUM5QyxDQUFDOzRCQUNELE1BQU0sRUFBRSxFQUFFOzRCQUNWLFFBQVEsRUFBRSxFQUFFO3lCQUNmLENBQUMsQ0FBQztvQkFDUCxDQUFDO29CQUNEOzs7Ozs7Ozs7dUJBU0c7b0JBQ0gsSUFBSSxNQUFNO3dCQUNOLE9BQU8sV0FB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