"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const uniqid_1 = __importDefault(require("@coffeekraken/sugar/shared/string/uniqid"));
let newFolderName;
function default_1(api) {
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
                        return (0, deepMerge_1.default)({
                            title: 'Create the app',
                            description: 'Create the app using the create-next-app utility',
                            get command() {
                                newFolderName = (0, uniqid_1.default)();
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
                        return (0, deepMerge_1.default)(api.config.kitchen.actions.rename, {
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
                        return (0, deepMerge_1.default)(api.config.kitchen.actions.addSugarJson, {
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
                        return (0, deepMerge_1.default)(api.config.kitchen.actions.addManifestJson, {
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
                        return (0, deepMerge_1.default)(api.config.kitchen.actions.addSugarPostcss, {
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
                    installDependencies: (0, deepMerge_1.default)(api.config.kitchen.actions.installDependencies, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEZBQXNFO0FBQ3RFLHNGQUFnRTtBQUVoRSxJQUFJLGFBQWEsQ0FBQztBQUVsQixtQkFBeUIsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsS0FBSyxFQUFFLFFBQVE7UUFDZjs7Ozs7Ozs7OztXQVVHO1FBQ0gsV0FBVyxFQUNQLDZEQUE2RDtRQUNqRTs7Ozs7Ozs7OztXQVVHO1FBQ0gsWUFBWSxFQUFFO1lBQ1YsSUFBSSxRQUFRO2dCQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN4QyxDQUFDO1NBQ0o7UUFDRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsWUFBWSxFQUFFLEtBQUs7UUFDbkIsTUFBTSxFQUFFO1lBQ0osR0FBRyxFQUFFO2dCQUNEOzs7Ozs7Ozs7O21CQVVHO2dCQUNILFdBQVcsRUFBRSw0QkFBNEI7Z0JBQ3pDLE9BQU8sRUFBRTtvQkFDTDs7Ozs7Ozs7O3VCQVNHO29CQUNILElBQUksU0FBUzt3QkFDVCxPQUFPLElBQUEsbUJBQVcsRUFBQzs0QkFDZixLQUFLLEVBQUUsZ0JBQWdCOzRCQUN2QixXQUFXLEVBQ1Asa0RBQWtEOzRCQUN0RCxJQUFJLE9BQU87Z0NBQ1AsYUFBYSxHQUFHLElBQUEsZ0JBQVEsR0FBRSxDQUFDO2dDQUMzQixPQUFPLHVCQUF1QixhQUFhLGVBQWUsQ0FBQzs0QkFDL0QsQ0FBQzs0QkFDRCxLQUFLO2dDQUNELE9BQU8sQ0FBQyxLQUFLLENBQ1QsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksYUFBYSxFQUFFLENBQ3RDLENBQUM7NEJBQ04sQ0FBQzs0QkFDRCxNQUFNLEVBQUUsRUFBRTs0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