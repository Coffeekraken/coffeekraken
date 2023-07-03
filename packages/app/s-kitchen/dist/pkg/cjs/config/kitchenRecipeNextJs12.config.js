"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_1 = require("@coffeekraken/sugar/object");
const string_1 = require("@coffeekraken/sugar/string");
let newFolderName;
function default_1(api) {
    if (api.env.platform !== 'node')
        return;
    return {
        /**
         * @name            title
         * @namespace       config.kitchenRecipeNextJs
         * @type            String
         * @default         NextJs 12
         *
         * Specify the recipe name
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        title: 'NextJs 12',
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
        description: 'Create easily a next.js 12 app with coffeekraken tools support',
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
                description: 'Init a new next.js 12 project',
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
                        return (0, object_1.__deepMerge)({
                            title: 'Create the app',
                            description: 'Create the app using the create-next-app utility',
                            get command() {
                                newFolderName = (0, string_1.__uniqid)();
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
                        return (0, object_1.__deepMerge)(api.config.kitchen.actions.rename, {
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
                        return (0, object_1.__deepMerge)(api.config.kitchen.actions.addSugarJson, {
                            params: {
                                recipe: 'nextJs12',
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
                        return (0, object_1.__deepMerge)(api.config.kitchen.actions.addManifestJson, {
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
                        return (0, object_1.__deepMerge)(api.config.kitchen.actions.addSugarPostcss, {
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
                    installDependencies: (0, object_1.__deepMerge)(api.config.kitchen.actions.installDependencies, {
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdURBQXlEO0FBQ3pELHVEQUFzRDtBQUV0RCxJQUFJLGFBQWEsQ0FBQztBQUVsQixtQkFBeUIsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsS0FBSyxFQUFFLFdBQVc7UUFDbEI7Ozs7Ozs7Ozs7V0FVRztRQUNILFdBQVcsRUFDUCxnRUFBZ0U7UUFDcEU7Ozs7Ozs7Ozs7V0FVRztRQUNILFlBQVksRUFBRTtZQUNWLElBQUksUUFBUTtnQkFDUixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDeEMsQ0FBQztTQUNKO1FBQ0Q7Ozs7Ozs7Ozs7V0FVRztRQUNILFlBQVksRUFBRSxLQUFLO1FBQ25CLE1BQU0sRUFBRTtZQUNKLEdBQUcsRUFBRTtnQkFDRDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxXQUFXLEVBQUUsK0JBQStCO2dCQUM1QyxPQUFPLEVBQUU7b0JBQ0w7Ozs7Ozs7Ozt1QkFTRztvQkFDSCxJQUFJLFNBQVM7d0JBQ1QsT0FBTyxJQUFBLG9CQUFXLEVBQUM7NEJBQ2YsS0FBSyxFQUFFLGdCQUFnQjs0QkFDdkIsV0FBVyxFQUNQLGtEQUFrRDs0QkFDdEQsSUFBSSxPQUFPO2dDQUNQLGFBQWEsR0FBRyxJQUFBLGlCQUFRLEdBQUUsQ0FBQztnQ0FDM0IsT0FBTyx1QkFBdUIsYUFBYSxlQUFlLENBQUM7NEJBQy9ELENBQUM7NEJBQ0QsS0FBSztnQ0FDRCxPQUFPLENBQUMsS0FBSyxDQUNULEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLGFBQWEsRUFBRSxDQUN0QyxDQUFDOzRCQUNOLENBQUM7NEJBQ0QsTUFBTSxFQUFFLEVBQUU7NEJB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