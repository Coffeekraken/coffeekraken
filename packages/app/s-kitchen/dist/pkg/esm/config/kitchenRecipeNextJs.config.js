import { __deepMerge } from '@coffeekraken/sugar/object';
import { __uniqid } from '@coffeekraken/sugar/string';
let newFolderName;
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
                            get command() {
                                newFolderName = __uniqid();
                                return `npx create-next-app ${newFolderName} --typescript`;
                            },
                            after() {
                                process.chdir(`${process.cwd()}/${newFolderName}`);
                            },
                            params: {},
                            settings: {
                                silent: true,
                            },
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
                     * @name            addSugar
                     * @namespace       config.kitchenRecipeNextJs.stacks.new.actions
                     * @type            String
                     *
                     * Specify the recipe init stack addSugar action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    addSugar: {
                        extends: 'addSugar',
                    },
                    /**
                     * @name            addNvmrc
                     * @namespace       config.kitchenRecipeDefault.stacks.new.actions
                     * @type            String
                     *
                     * Specify the recipe init stack addNvmrc action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    addNvmrc: {
                        extends: 'addNvmrc',
                        title: 'Add the .nvmrc file',
                        description: 'Add the .nvmrc file',
                        params: {},
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
                    /**
                     * @name            installDependencies
                     * @namespace       config.kitchenRecipeNextJs.stacks.new.actions
                     * @type            String
                     *
                     * Specify the recipe init stack installDependencies action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    installDependencies: __deepMerge(api.config.kitchen.actions.installDependencies, {
                        params: {},
                    }),
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
                     * @name            start
                     * @namespace       config.kitchenRecipeNextJs.stacks.dev.actions
                     * @type            Object
                     *
                     * Specify the recipe dev.start action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    start: {
                        title: 'Start development stack',
                        description: 'Start the development stack',
                        command: 'npm run dev',
                        params: {},
                        settings: {},
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
                     * @name            start
                     * @namespace       config.kitchenRecipeNextJs.stacks.prod.actions
                     * @type            Object
                     *
                     * Specify the recipe dev.start action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    start: {
                        title: 'Start production stack',
                        description: 'Start the production stack',
                        command: 'npm run start',
                        params: {},
                        settings: {},
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
                     * @name            start
                     * @namespace       config.kitchenRecipeNextJs.stacks.build.actions
                     * @type            Object
                     *
                     * Specify the recipe dev.start action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    start: {
                        title: 'Start the build',
                        description: 'Start the build',
                        command: 'npm run build',
                        params: {},
                        settings: {},
                    },
                },
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFdEQsSUFBSSxhQUFhLENBQUM7QUFFbEIsTUFBTSxDQUFDLE9BQU8sV0FBVyxHQUFHO0lBQ3hCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFFeEMsT0FBTztRQUNIOzs7Ozs7Ozs7O1dBVUc7UUFDSCxLQUFLLEVBQUUsUUFBUTtRQUNmOzs7Ozs7Ozs7O1dBVUc7UUFDSCxXQUFXLEVBQ1AsNkRBQTZEO1FBQ2pFOzs7Ozs7Ozs7O1dBVUc7UUFDSCxZQUFZLEVBQUU7WUFDVixJQUFJLFFBQVE7Z0JBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3hDLENBQUM7U0FDSjtRQUNEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxZQUFZLEVBQUUsS0FBSztRQUNuQixNQUFNLEVBQUU7WUFDSixHQUFHLEVBQUU7Z0JBQ0Q7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsV0FBVyxFQUFFLDRCQUE0QjtnQkFDekMsT0FBTyxFQUFFO29CQUNMOzs7Ozs7Ozs7dUJBU0c7b0JBQ0gsSUFBSSxTQUFTO3dCQUNULE9BQU8sV0FBVyxDQUFDOzRCQUNmLEtBQUssRUFBRSxnQkFBZ0I7NEJBQ3ZCLFdBQVcsRUFDUCxrREFBa0Q7NEJBQ3RELElBQUksT0FBTztnQ0FDUCxhQUFhLEdBQUcsUUFBUSxFQUFFLENBQUM7Z0NBQzNCLE9BQU8sdUJBQXVCLGFBQWEsZUFBZSxDQUFDOzRCQUMvRCxDQUFDOzRCQUNELEtBQUs7Z0NBQ0QsT0FBTyxDQUFDLEtBQUssQ0FDVCxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFB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