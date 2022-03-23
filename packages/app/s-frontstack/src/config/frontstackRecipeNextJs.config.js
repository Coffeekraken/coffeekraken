var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/sugar/shared/object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
    function default_1(env, config) {
        if (env.platform !== 'node')
            return;
        return {
            /**
             * @name            title
             * @namespace       config.frontstackRecipeNextJs
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
             * @namespace       config.frontstackRecipeNextJs
             * @type            String
             * @default         Default s-frontstack recipe
             *
             * Specify the recipe description
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            description: 'Create easily a next.js app with coffeekraken tools support',
            /**
             * @name            requirements
             * @namespace       config.frontstackRecipeNextJs
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
             * @namespace       config.frontstackRecipeNextJs
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
                     * @namespace       config.frontstackRecipeNextJs.stacks.init
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
                         * @namespace       config.frontstackRecipeNextJs.stacks.new.actions
                         * @type            String
                         *
                         * Specify the recipe init stack copy action
                         *
                         * @since       2.0.0
                         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        createApp: (0, deepMerge_1.default)(config.frontstack.actions.copy, {
                            title: 'Create the app',
                            description: 'Create the app using the create-next-app utility',
                            command: `npx create-next-app next-js --typescript`,
                            after() {
                                process.chdir(`${process.cwd()}/next-js`);
                            },
                            params: {},
                            settings: {},
                        }),
                        /**
                         * @name            rename
                         * @namespace       config.frontstackRecipeNextJs.stacks.new.actions
                         * @type            String
                         *
                         * Specify the recipe init stack rename action
                         *
                         * @since       2.0.0
                         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        rename: (0, deepMerge_1.default)(config.frontstack.actions.rename, {
                            params: {},
                        }),
                        /**
                         * @name            addSugarJson
                         * @namespace       config.frontstackRecipeNextJs.stacks.new.actions
                         * @type            String
                         *
                         * Specify the recipe init stack addSugarJson action
                         *
                         * @since       2.0.0
                         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        addSugarJson: (0, deepMerge_1.default)(config.frontstack.actions.addSugarJson, {
                            params: {
                                recipe: 'nextJs',
                            },
                        }),
                        /**
                         * @name            addManifestJson
                         * @namespace       config.frontstackRecipeNextJs.stacks.new.actions
                         * @type            String
                         *
                         * Specify the recipe init stack addManifestJson action
                         *
                         * @since       2.0.0
                         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        addManifestJson: (0, deepMerge_1.default)(config.frontstack.actions.addManifestJson, {
                            params: {},
                        }),
                        /**
                         * @name            addSugarPostcss
                         * @namespace       config.frontstackRecipeNextJs.stacks.new.actions
                         * @type            String
                         *
                         * Specify the recipe init stack addSugarPostcss action
                         *
                         * @since       2.0.0
                         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        addSugarPostcss: (0, deepMerge_1.default)(config.frontstack.actions.addSugarPostcss, {
                            params: {},
                        }),
                        // /**
                        //  * @name            installDependencies
                        //  * @namespace       config.frontstackRecipeNextJs.stacks.new.actions
                        //  * @type            String
                        //  *
                        //  * Specify the recipe init stack installDependencies action
                        //  *
                        //  * @since       2.0.0
                        //  * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                        //  */
                        // installDependencies: __deepMerge(config.frontstack.actions.installDependencies, {
                        //     params: {}
                        // })
                    },
                },
                dev: {
                    /**
                     * @name            description
                     * @namespace       config.frontstackRecipeNextJs.stacks.dev
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
                         * @namespace       config.frontstackRecipeNextJs.stacks.dev.actions
                         * @type            String
                         * @default         [config.frontstack.actions.frontendServer]
                         *
                         * Specify the recipe dev stack frontendServer action
                         *
                         * @since       2.0.0
                         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        frontendServer: '[config.frontstack.actions.frontendServer]',
                        /**
                         * @name            vite
                         * @namespace       config.frontstackRecipeNextJs.stacks.dev.actions
                         * @type            String
                         * @default         [config.frontstack.actions.vite]
                         *
                         * Specify the recipe dev stack description
                         *
                         * @since       2.0.0
                         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        vite: '[config.frontstack.actions.vite]',
                    },
                },
                prod: {
                    /**
                     * @name            description
                     * @namespace       config.frontstackRecipeNextJs.stacks.prod
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
                         * @namespace       config.frontstackRecipeNextJs.stacks.prod.sharedParams
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
                         * @namespace       config.frontstackRecipeNextJs.stacks.prod.actions
                         * @type            String
                         * @default         [config.frontstack.actions.frontendServer]
                         *
                         * Specify the recipe prod stack frontendServer action
                         *
                         * @since       2.0.0
                         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        frontendServer: '[config.frontstack.actions.frontendServer]',
                    },
                },
                build: {
                    /**
                     * @name            description
                     * @namespace       config.frontstackRecipeNextJs.stacks.build
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
                         * @namespace       config.frontstackRecipeNextJs.stacks.build.sharedParams
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
                         * @namespace       config.frontstackRecipeNextJs.stacks.build.actions
                         * @type            String
                         * @default         [config.frontstack.actions.postcssBuild]
                         *
                         * Specify the recipe build stack postcssBuild action
                         *
                         * @since       2.0.0
                         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        postcssBuild: '[config.frontstack.actions.postcssBuild]',
                        /**
                         * @name            viteBuild
                         * @namespace       config.frontstackRecipeNextJs.stacks.build.actions
                         * @type            String
                         * @default         [config.frontstack.actions.viteBuild]
                         *
                         * Specify the recipe build stack viteBuild action
                         *
                         * @since       2.0.0
                         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        viteBuild: '[config.frontstack.actions.viteBuild]',
                        /**
                         * @name            imagesBuild
                         * @namespace       config.frontstackRecipeNextJs.stacks.build.actions
                         * @type            String
                         * @default         [config.frontstack.actions.imagesBuild]
                         *
                         * Specify the recipe build stack imagesBuild action
                         *
                         * @since       2.0.0
                         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        imagesBuild: '[config.frontstack.actions.imagesBuild]',
                    },
                },
            },
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRzdGFja1JlY2lwZU5leHRKcy5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcm9udHN0YWNrUmVjaXBlTmV4dEpzLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUVBLDRGQUFzRTtJQUd0RSxtQkFBeUIsR0FBRyxFQUFFLE1BQU07UUFDaEMsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07WUFBRSxPQUFPO1FBRXBDLE9BQU87WUFDSDs7Ozs7Ozs7OztlQVVHO1lBQ0gsS0FBSyxFQUFFLFFBQVE7WUFDZjs7Ozs7Ozs7OztlQVVHO1lBQ0gsV0FBVyxFQUNQLDZEQUE2RDtZQUNqRTs7Ozs7Ozs7OztlQVVHO1lBQ0gsWUFBWSxFQUFFO2dCQUNWLFFBQVEsRUFBRSxDQUFDLDBCQUEwQixDQUFDO2FBQ3pDO1lBQ0Q7Ozs7Ozs7Ozs7ZUFVRztZQUNILFlBQVksRUFBRSxLQUFLO1lBQ25CLE1BQU0sRUFBRTtnQkFDSixHQUFHLEVBQUU7b0JBQ0Q7Ozs7Ozs7Ozs7dUJBVUc7b0JBQ0gsV0FBVyxFQUFFLDRCQUE0QjtvQkFDekMsT0FBTyxFQUFFO3dCQUNMOzs7Ozs7Ozs7MkJBU0c7d0JBQ0gsU0FBUyxFQUFFLElBQUEsbUJBQVcsRUFBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7NEJBQ25ELEtBQUssRUFBRSxnQkFBZ0I7NEJBQ3ZCLFdBQVcsRUFDUCxrREFBa0Q7NEJBQ3RELE9BQU8sRUFBRSwwQ0FBMEM7NEJBQ25ELEtBQUs7Z0NBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7NEJBQzlDLENBQUM7NEJBQ0QsTUFBTSxFQUFFLEVBQUU7NEJBQ1YsUUFBUSxFQUFFLEVBQUU7eUJBQ2YsQ0FBQzt3QkFDRjs7Ozs7Ozs7OzJCQVNHO3dCQUNILE1BQU0sRUFBRSxJQUFBLG1CQUFXLEVBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFOzRCQUNsRCxNQUFNLEVBQUUsRUFBRTt5QkFDYixDQUFDO3dCQUNGOzs7Ozs7Ozs7MkJBU0c7d0JBQ0gsWUFBWSxFQUFFLElBQUEsbUJBQVcsRUFDckIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUN0Qzs0QkFDSSxNQUFNLEVBQUU7Z0NBQ0osTUFBTSxFQUFFLFFBQVE7NkJBQ25CO3lCQUNKLENBQ0o7d0JBQ0Q7Ozs7Ozs7OzsyQkFTRzt3QkFDSCxlQUFlLEVBQUUsSUFBQSxtQkFBVyxFQUN4QixNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQ3pDOzRCQUNJLE1BQU0sRUFBRSxFQUFFO3lCQUNiLENBQ0o7d0JBRUQ7Ozs7Ozs7OzsyQkFTRzt3QkFDSCxlQUFlLEVBQUUsSUFBQSxtQkFBVyxFQUN4QixNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQ3pDOzRCQUNJLE1BQU0sRUFBRSxFQUFFO3lCQUNiLENBQ0o7d0JBRUQsTUFBTTt3QkFDTiwwQ0FBMEM7d0JBQzFDLHVFQUF1RTt3QkFDdkUsNkJBQTZCO3dCQUM3QixLQUFLO3dCQUNMLDhEQUE4RDt3QkFDOUQsS0FBSzt3QkFDTCx3QkFBd0I7d0JBQ3hCLG9GQUFvRjt3QkFDcEYsTUFBTTt3QkFDTixvRkFBb0Y7d0JBQ3BGLGlCQUFpQjt3QkFDakIsS0FBSztxQkFDUjtpQkFDSjtnQkFDRCxHQUFHLEVBQUU7b0JBQ0Q7Ozs7Ozs7Ozs7dUJBVUc7b0JBQ0gsV0FBVyxFQUFFLDZCQUE2QjtvQkFDMUMsYUFBYSxFQUFFLElBQUk7b0JBQ25CLE9BQU8sRUFBRTt3QkFDTDs7Ozs7Ozs7OzsyQkFVRzt3QkFDSCxjQUFjLEVBQ1YsNENBQTRDO3dCQUNoRDs7Ozs7Ozs7OzsyQkFVRzt3QkFDSCxJQUFJLEVBQUUsa0NBQWtDO3FCQUMzQztpQkFDSjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0Y7Ozs7Ozs7Ozs7dUJBVUc7b0JBQ0gsV0FBVyxFQUFFLG9DQUFvQztvQkFDakQsWUFBWSxFQUFFO3dCQUNWOzs7Ozs7Ozs7OzJCQVVHO3dCQUNILEdBQUcsRUFBRSxZQUFZO3FCQUNwQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0w7Ozs7Ozs7Ozs7MkJBVUc7d0JBQ0gsY0FBYyxFQUNWLDRDQUE0QztxQkFDbkQ7aUJBQ0o7Z0JBQ0QsS0FBSyxFQUFFO29CQUNIOzs7Ozs7Ozs7O3VCQVVHO29CQUNILFdBQVcsRUFBRSxnREFBZ0Q7b0JBQzdELFlBQVksRUFBRTt3QkFDVjs7Ozs7Ozs7OzsyQkFVRzt3QkFDSCxJQUFJLEVBQUUsSUFBSTtxQkFDYjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0w7Ozs7Ozs7Ozs7MkJBVUc7d0JBQ0gsWUFBWSxFQUFFLDBDQUEwQzt3QkFDeEQ7Ozs7Ozs7Ozs7MkJBVUc7d0JBQ0gsU0FBUyxFQUFFLHVDQUF1Qzt3QkFDbEQ7Ozs7Ozs7Ozs7MkJBVUc7d0JBQ0gsV0FBVyxFQUFFLHlDQUF5QztxQkFDekQ7aUJBQ0o7YUFDSjtTQUNKLENBQUM7SUFDTixDQUFDO0lBcFVELDRCQW9VQyJ9