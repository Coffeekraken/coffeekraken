"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
        title: 'Generic',
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
        description: 'Generic s-frontstack recipe ',
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
                     * @name            createApp
                     * @namespace       config.frontstackRecipeDefault.stacks.new.actions
                     * @type            String
                     *
                     * Specify the recipe init stack createApp action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    createApp: {
                        title: 'Creating app directory',
                        description: 'Creating the app directory',
                        command: `mkdir generic`,
                        after() {
                            process.chdir(`${process.cwd()}/generic`);
                        },
                        params: {},
                        settings: {},
                    },
                    /**
                     * @name            initNpm
                     * @namespace       config.frontstackRecipeDefault.stacks.new.actions
                     * @type            String
                     *
                     * Specify the recipe init stack initNpm action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    initNpm: {
                        extends: 'initNpm',
                        params: {},
                        settings: {},
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
                        title: 'Rename generic template package',
                        description: 'Renamt the generic template package with the user input',
                        params: {},
                    },
                    /**
                     * @name            rename
                     * @namespace       config.frontstackRecipeDefault.stacks.new.actions
                     * @type            String
                     *
                     * Specify the recipe init stack applyDefaultPackageJson action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    applyDefaultPackageJson: {
                        extends: 'applyDefaultPackageJson',
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
                            recipe: 'generic',
                        },
                    },
                    /**
                     * @name            addFrontspecJson
                     * @namespace       config.frontstackRecipeDefault.stacks.new.actions
                     * @type            String
                     *
                     * Specify the recipe init stack addFrontspecJson action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    addFrontspecJson: {
                        extends: 'addFrontspecJson',
                        title: 'Add frontspec.json file',
                        description: 'Add the frontspec.json default file in your project',
                        params: {},
                    },
                    /**
                     * @name            addDefaultPages
                     * @namespace       config.frontstackRecipeNextJs.stacks.new.actions
                     * @type            String
                     *
                     * Specify the recipe init stack addDefaultPages action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    addDefaultPages: {
                        extends: 'addDefaultPages',
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
                     * @name            addSugarPostcss
                     * @namespace       config.frontstackRecipeNextJs.stacks.new.actions
                     * @type            String
                     *
                     * Specify the recipe init stack addSugarPostcss action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    addSugarPostcss: {
                        extends: 'addSugarPostcss',
                    },
                    /**
                     * @name            addFavicon
                     * @namespace       config.frontstackRecipeNextJs.stacks.new.actions
                     * @type            String
                     *
                     * Specify the recipe init stack addFavicon action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    addFavicon: {
                        extends: 'addFavicon',
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
                    // installDependencies: {
                    //     extends: 'installDependencies',
                    //     title: 'Install the dependencies',
                    //     description:
                    //         'Install the package dependencies (npm,composer)',
                    //     params: {},
                    // },
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
                     * @name            typescriptBuild
                     * @namespace       config.frontstackRecipeDefault.stacks.dev.actions
                     * @type            String
                     * @default         [config.frontstack.actions.typescriptBuild]
                     *
                     * Specify the recipe dev stack frontendServer action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    typescriptBuild: '[config.frontstack.actions.typescriptBuild]',
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
                     * @name            corsProxy
                     * @namespace       config.frontstackRecipeDefault.stacks.dev.actions
                     * @type            String
                     * @default         [config.frontstack.actions.corsProxy]
                     *
                     * Specify the recipe prod stack corsProxy action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    corsProxy: '[config.frontstack.actions.corsProxy]',
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
                    /**
                     * @name            corsProxy
                     * @namespace       config.frontstackRecipeDefault.stacks.prod.actions
                     * @type            String
                     * @default         [config.frontstack.actions.corsProxy]
                     *
                     * Specify the recipe prod stack corsProxy action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    corsProxy: '[config.frontstack.actions.corsProxy]',
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
                    /**
                     * @name            copyAssets
                     * @namespace       config.frontstackRecipeDefault.stacks.build.actions
                     * @type            String
                     *
                     * Specify the recipe build stack copyAssets action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    copyAssets: {
                        extends: 'copy',
                        params: {
                            src: 'src',
                            glob: '+(fonts|doc)',
                            dest: 'dist',
                        },
                    },
                },
            },
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0ZBQTREO0FBQzVELGdEQUEwQjtBQUUxQixtQkFBeUIsR0FBRyxFQUFFLE1BQU07SUFDaEMsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXBDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsS0FBSyxFQUFFLFNBQVM7UUFDaEI7Ozs7Ozs7Ozs7V0FVRztRQUNILFdBQVcsRUFBRSw4QkFBOEI7UUFDM0M7Ozs7Ozs7Ozs7V0FVRztRQUNILFdBQVcsRUFBRSxjQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBQSxpQkFBUyxHQUFFLHVCQUF1QixDQUFDO1FBQ2xFOzs7Ozs7Ozs7O1dBVUc7UUFDSCxZQUFZLEVBQUU7WUFDVixRQUFRLEVBQUUsQ0FBQywwQkFBMEIsRUFBRSxVQUFVLENBQUM7U0FDckQ7UUFDRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsWUFBWSxFQUFFLEtBQUs7UUFDbkIsTUFBTSxFQUFFO1lBQ0osR0FBRyxFQUFFO2dCQUNEOzs7Ozs7Ozs7O21CQVVHO2dCQUNILFdBQVcsRUFBRSxxQ0FBcUM7Z0JBQ2xELE9BQU8sRUFBRTtvQkFDTDs7Ozs7Ozs7O3VCQVNHO29CQUNILFNBQVMsRUFBRTt3QkFDUCxLQUFLLEVBQUUsd0JBQXdCO3dCQUMvQixXQUFXLEVBQUUsNEJBQTRCO3dCQUN6QyxPQUFPLEVBQUUsZUFBZTt3QkFDeEIsS0FBSzs0QkFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQzt3QkFDOUMsQ0FBQzt3QkFDRCxNQUFNLEVBQUUsRUFBRTt3QkFDVixRQUFRLEVBQUUsRUFBRTtxQkFDZjtvQkFDRDs7Ozs7Ozs7O3VCQVNHO29CQUNILE9BQU8sRUFBRTt3QkFDTCxPQUFPLEVBQUUsU0FBUzt3QkFDbEIs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