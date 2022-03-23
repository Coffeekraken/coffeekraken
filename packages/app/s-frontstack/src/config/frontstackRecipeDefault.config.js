var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/sugar/node/fs/dirname", "path"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
    const path_1 = __importDefault(require("path"));
    function default_1(env, config) {
        if (env.platform !== 'node')
            return;
        return {
            /**
             * @name            title
             * @namespace       config.frontstackRecipeDefault
             * @type            String
             * @default         Default
             *
             * Specify the recipe name
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            title: 'Default',
            /**
             * @name            description
             * @namespace       config.frontstackRecipeDefault
             * @type            String
             * @default         Default s-frontstack recipe
             *
             * Specify the recipe description
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            description: 'Default s-frontstack recipe ',
            /**
             * @name            templateDir
             * @namespace       config.frontstackRecipeDefault
             * @type            String
             * @default         __path.resolve(`${__dirname()}/../templates/default`)e
             *
             * Specify the recipe template directory
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            templateDir: path_1.default.resolve(`${(0, dirname_1.default)()}/../templates/default`),
            /**
             * @name            requirements
             * @namespace       config.frontstackRecipeDefault
             * @type            Object
             * @default         dev
             *
             * Specify some requirements for this recipe like commands (npm, composer, etc...)
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            requirements: {
                commands: ['[config.package.manager]', 'composer'],
            },
            /**
             * @name            defaultStack
             * @namespace       config.frontstackRecipeDefault
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
                     * @namespace       config.frontstackRecipeDefault.stacks.init
                     * @type            String
                     * @default         Init a new project with this recipe
                     *
                     * Specify the recipe init stack description
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    description: 'Init a new project with this recipe',
                    actions: {
                        /**
                         * @name            copy
                         * @namespace       config.frontstackRecipeDefault.stacks.new.actions
                         * @type            String
                         *
                         * Specify the recipe init stack copy action
                         *
                         * @since       2.0.0
                         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        copy: {
                            extends: 'copy',
                            title: 'Copy default template',
                            description: 'Copy the default template files',
                            params: {
                                src: path_1.default.resolve((0, dirname_1.default)(), `../templates/default/.`),
                                dest: `${process.cwd()}/default`,
                                chdir: true,
                            },
                        },
                        /**
                         * @name            rename
                         * @namespace       config.frontstackRecipeDefault.stacks.new.actions
                         * @type            String
                         *
                         * Specify the recipe init stack rename action
                         *
                         * @since       2.0.0
                         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        rename: {
                            extends: 'rename',
                            title: 'Rename default template package',
                            description: 'Renamt the default template package with the user input',
                            params: {},
                        },
                        /**
                         * @name            addSugarJson
                         * @namespace       config.frontstackRecipeDefault.stacks.new.actions
                         * @type            String
                         *
                         * Specify the recipe init stack addSugarJson action
                         *
                         * @since       2.0.0
                         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        addSugarJson: {
                            extends: 'addSugarJson',
                            title: 'Add the sugar.json file',
                            description: 'Add the sugar.json file',
                            params: {
                                recipe: 'default',
                            },
                        },
                        /**
                         * @name            addManifestJson
                         * @namespace       config.frontstackRecipeDefault.stacks.new.actions
                         * @type            String
                         *
                         * Specify the recipe init stack addManifestJson action
                         *
                         * @since       2.0.0
                         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        addManifestJson: {
                            extends: 'addManifestJson',
                            title: 'Add manifest.json file',
                            description: 'Add the manifest.json file',
                            params: {},
                        },
                        /**
                         * @name            installDependencies
                         * @namespace       config.frontstackRecipeDefault.stacks.new.actions
                         * @type            String
                         *
                         * Specify the recipe init stack installDependencies action
                         *
                         * @since       2.0.0
                         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        installDependencies: {
                            extends: 'installDependencies',
                            title: 'Install the dependencies',
                            description: 'Install the package dependencies (npm,composer)',
                            params: {},
                        },
                    },
                },
                dev: {
                    /**
                     * @name            description
                     * @namespace       config.frontstackRecipeDefault.stacks.dev
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
                         * @namespace       config.frontstackRecipeDefault.stacks.dev.actions
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
                         * @namespace       config.frontstackRecipeDefault.stacks.dev.actions
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
                     * @namespace       config.frontstackRecipeDefault.stacks.prod
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
                         * @namespace       config.frontstackRecipeDefault.stacks.prod.sharedParams
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
                         * @namespace       config.frontstackRecipeDefault.stacks.prod.actions
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
                     * @namespace       config.frontstackRecipeDefault.stacks.build
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
                     * @namespace       config.frontstackRecipeDefault.stacks.build.sharedParams
                     * @type            String
                     * @default         true
                     *
                     * Specify that the build is made for production
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    // prod: true,
                    },
                    actions: {
                        /**
                         * @name            postcssBuild
                         * @namespace       config.frontstackRecipeDefault.stacks.build.actions
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
                         * @namespace       config.frontstackRecipeDefault.stacks.build.actions
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
                         * @namespace       config.frontstackRecipeDefault.stacks.build.actions
                         * @type            String
                         * @default         [config.frontstack.actions.imagesBuild]
                         *
                         * Specify the recipe build stack imagesBuild action
                         *
                         * @since       2.0.0
                         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        imagesBuild: '[config.frontstack.actions.imagesBuild]',
                        /**
                         * @name            faviconBuild
                         * @namespace       config.frontstackRecipeDefault.stacks.build.actions
                         * @type            String
                         * @default         [config.frontstack.actions.faviconBuild]
                         *
                         * Specify the recipe build stack faviconBuild action
                         *
                         * @since       2.0.0
                         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        faviconBuild: '[config.frontstack.actions.faviconBuild]',
                        /**
                         * @name            docmapBuild
                         * @namespace       config.frontstackRecipeDefault.stacks.build.actions
                         * @type            String
                         * @default         [config.frontstack.actions.docmapBuild]
                         *
                         * Specify the recipe build stack docmapBuild action
                         *
                         * @since       2.0.0
                         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        docmapBuild: '[config.frontstack.actions.docmapBuild]',
                        /**
                         * @name            sitemapBuild
                         * @namespace       config.frontstackRecipeDefault.stacks.build.actions
                         * @type            String
                         * @default         [config.frontstack.actions.sitemapBuild]
                         *
                         * Specify the recipe build stack sitemapBuild action
                         *
                         * @since       2.0.0
                         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        sitemapBuild: '[config.frontstack.actions.sitemapBuild]',
                    },
                },
            },
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRzdGFja1JlY2lwZURlZmF1bHQuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJvbnRzdGFja1JlY2lwZURlZmF1bHQuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQUEsa0ZBQTREO0lBQzVELGdEQUEwQjtJQUkxQixtQkFBeUIsR0FBRyxFQUFFLE1BQU07UUFDaEMsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07WUFBRSxPQUFPO1FBRXBDLE9BQU87WUFDSDs7Ozs7Ozs7OztlQVVHO1lBQ0gsS0FBSyxFQUFFLFNBQVM7WUFDaEI7Ozs7Ozs7Ozs7ZUFVRztZQUNILFdBQVcsRUFBRSw4QkFBOEI7WUFDM0M7Ozs7Ozs7Ozs7ZUFVRztZQUNILFdBQVcsRUFBRSxjQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBQSxpQkFBUyxHQUFFLHVCQUF1QixDQUFDO1lBQ2xFOzs7Ozs7Ozs7O2VBVUc7WUFDSCxZQUFZLEVBQUU7Z0JBQ1YsUUFBUSxFQUFFLENBQUMsMEJBQTBCLEVBQUUsVUFBVSxDQUFDO2FBQ3JEO1lBQ0Q7Ozs7Ozs7Ozs7ZUFVRztZQUNILFlBQVksRUFBRSxLQUFLO1lBQ25CLE1BQU0sRUFBRTtnQkFDSixHQUFHLEVBQUU7b0JBQ0Q7Ozs7Ozs7Ozs7dUJBVUc7b0JBQ0gsV0FBVyxFQUFFLHFDQUFxQztvQkFDbEQsT0FBTyxFQUFFO3dCQUNMOzs7Ozs7Ozs7MkJBU0c7d0JBQ0gsSUFBSSxFQUFFOzRCQUNGLE9BQU8sRUFBRSxNQUFNOzRCQUNmLEtBQUssRUFBRSx1QkFBdUI7NEJBQzlCLFdBQVcsRUFBRSxpQ0FBaUM7NEJBQzlDLE1BQU0sRUFBRTtnQ0FDSixHQUFHLEVBQUUsY0FBTSxDQUFDLE9BQU8sQ0FDZixJQUFBLGlCQUFTLEdBQUUsRUFDWCx3QkFBd0IsQ0FDM0I7Z0NBQ0QsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxVQUFVO2dDQUNoQyxLQUFLLEVBQUUsSUFBSTs2QkFDZDt5QkFDSjt3QkFDRDs7Ozs7Ozs7OzJCQVNHO3dCQUNILE1BQU0sRUFBRTs0QkFDSixPQUFPLEVBQUUsUUFBUTs0QkFDakIsS0FBSyxFQUFFLGlDQUFpQzs0QkFDeEMsV0FBVyxFQUNQLHlEQUF5RDs0QkFDN0QsTUFBTSxFQUFFLEVBQUU7eUJBQ2I7d0JBQ0Q7Ozs7Ozs7OzsyQkFTRzt3QkFDSCxZQUFZLEVBQUU7NEJBQ1YsT0FBTyxFQUFFLGNBQWM7NEJBQ3ZCLEtBQUssRUFBRSx5QkFBeUI7NEJBQ2hDLFdBQVcsRUFBRSx5QkFBeUI7NEJBQ3RDLE1BQU0sRUFBRTtnQ0FDSixNQUFNLEVBQUUsU0FBUzs2QkFDcEI7eUJBQ0o7d0JBQ0Q7Ozs7Ozs7OzsyQkFTRzt3QkFDSCxlQUFlLEVBQUU7NEJBQ2IsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsS0FBSyxFQUFFLHdCQUF3Qjs0QkFDL0IsV0FBVyxFQUFFLDRCQUE0Qjs0QkFDekMsTUFBTSxFQUFFLEVBQUU7eUJBQ2I7d0JBQ0Q7Ozs7Ozs7OzsyQkFTRzt3QkFDSCxtQkFBbUIsRUFBRTs0QkFDakIsT0FBTyxFQUFFLHFCQUFxQjs0QkFDOUIsS0FBSyxFQUFFLDBCQUEwQjs0QkFDakMsV0FBVyxFQUNQLGlEQUFpRDs0QkFDckQsTUFBTSxFQUFFLEVBQUU7eUJBQ2I7cUJBQ0o7aUJBQ0o7Z0JBQ0QsR0FBRyxFQUFFO29CQUNEOzs7Ozs7Ozs7O3VCQVVHO29CQUNILFdBQVcsRUFBRSw2QkFBNkI7b0JBQzFDLGFBQWEsRUFBRSxJQUFJO29CQUNuQixPQUFPLEVBQUU7d0JBQ0w7Ozs7Ozs7Ozs7MkJBVUc7d0JBQ0gsY0FBYyxFQUNWLDRDQUE0Qzt3QkFDaEQ7Ozs7Ozs7Ozs7MkJBVUc7d0JBQ0gsSUFBSSxFQUFFLGtDQUFrQztxQkFDM0M7aUJBQ0o7Z0JBQ0QsSUFBSSxFQUFFO29CQUNGOzs7Ozs7Ozs7O3VCQVVHO29CQUNILFdBQVcsRUFBRSxvQ0FBb0M7b0JBQ2pELFlBQVksRUFBRTt3QkFDVjs7Ozs7Ozs7OzsyQkFVRzt3QkFDSCxHQUFHLEVBQUUsWUFBWTtxQkFDcEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMOzs7Ozs7Ozs7OzJCQVVHO3dCQUNILGNBQWMsRUFDViw0Q0FBNEM7cUJBQ25EO2lCQUNKO2dCQUNELEtBQUssRUFBRTtvQkFDSDs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxXQUFXLEVBQUUsZ0RBQWdEO29CQUM3RCxZQUFZLEVBQUU7b0JBQ1Y7Ozs7Ozs7Ozs7dUJBVUc7b0JBQ0gsY0FBYztxQkFDakI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMOzs7Ozs7Ozs7OzJCQVVHO3dCQUNILFlBQVksRUFBRSwwQ0FBMEM7d0JBQ3hEOzs7Ozs7Ozs7OzJCQVVHO3dCQUNILFNBQVMsRUFBRSx1Q0FBdUM7d0JBQ2xEOzs7Ozs7Ozs7OzJCQVVHO3dCQUNILFdBQVcsRUFBRSx5Q0FBeUM7d0JBQ3REOzs7Ozs7Ozs7OzJCQVVHO3dCQUNILFlBQVksRUFBRSwwQ0FBMEM7d0JBQ3hEOzs7Ozs7Ozs7OzJCQVVHO3dCQUNILFdBQVcsRUFBRSx5Q0FBeUM7d0JBQ3REOzs7Ozs7Ozs7OzJCQVVHO3dCQUNILFlBQVksRUFBRSwwQ0FBMEM7cUJBQzNEO2lCQUNKO2FBQ0o7U0FDSixDQUFDO0lBQ04sQ0FBQztJQTNXRCw0QkEyV0MifQ==