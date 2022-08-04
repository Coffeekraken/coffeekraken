"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
const path_1 = __importDefault(require("path"));
function default_1(api) {
    if (api.env.platform !== 'node')
        return;
    return {
        /**
         * @name            title
         * @namespace       config.kitchenRecipeDefault
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
         * @namespace       config.kitchenRecipeDefault
         * @type            String
         * @default         Default s-kitchen recipe
         *
         * Specify the recipe description
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        description: 'Generic s-kitchen recipe ',
        /**
         * @name            templateDir
         * @namespace       config.kitchenRecipeDefault
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
         * @namespace       config.kitchenRecipeDefault
         * @type            Object
         * @default         dev
         *
         * Specify some requirements for this recipe like commands (npm, composer, etc...)
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        requirements: {
            get commands() {
                return [api.config.package.manager, 'composer'];
            },
        },
        /**
         * @name            defaultStack
         * @namespace       config.kitchenRecipeDefault
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
                 * @namespace       config.kitchenRecipeDefault.stacks.init
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
                     * @namespace       config.kitchenRecipeDefault.stacks.new.actions
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
                     * @namespace       config.kitchenRecipeDefault.stacks.new.actions
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
                     * @namespace       config.kitchenRecipeDefault.stacks.new.actions
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
                     * @name            addDefaultPackageJson
                     * @namespace       config.kitchenRecipeDefault.stacks.new.actions
                     * @type            String
                     *
                     * Specify the recipe init stack addDefaultPackageJson action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    addDefaultPackageJson: {
                        extends: 'addDefaultPackageJson',
                    },
                    /**
                     * @name            addSugarJson
                     * @namespace       config.kitchenRecipeDefault.stacks.new.actions
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
                        params: {},
                    },
                    /**
                     * @name            addFrontspecJson
                     * @namespace       config.kitchenRecipeDefault.stacks.new.actions
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
                     * @namespace       config.kitchenRecipeNextJs.stacks.new.actions
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
                     * @name            addDefaultScripts
                     * @namespace       config.kitchenRecipeNextJs.stacks.new.actions
                     * @type            String
                     *
                     * Specify the recipe init stack addDefaultScripts action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    addDefaultScripts: {
                        extends: 'addDefaultScripts',
                    },
                    /**
                     * @name            addManifestJson
                     * @namespace       config.kitchenRecipeDefault.stacks.new.actions
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
                     * @namespace       config.kitchenRecipeNextJs.stacks.new.actions
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
                     * @namespace       config.kitchenRecipeNextJs.stacks.new.actions
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
                     * @name            addReadme
                     * @namespace       config.kitchenRecipeNextJs.stacks.new.actions
                     * @type            String
                     *
                     * Specify the recipe init stack addReadme action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    addReadme: {
                        extends: 'addReadme',
                    },
                    /**
                     * @name            installDependencies
                     * @namespace       config.kitchenRecipeDefault.stacks.new.actions
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
                 * @namespace       config.kitchenRecipeDefault.stacks.dev
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
                     * @namespace       config.kitchenRecipeDefault.stacks.dev.actions
                     * @type            String
                     * @default         [config.kitchen.actions.typescriptBuild]
                     *
                     * Specify the recipe dev stack frontendServer action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    get typescriptBuild() {
                        return api.config.kitchen.actions.typescriptBuild;
                    },
                    /**
                     * @name            frontendServer
                     * @namespace       config.kitchenRecipeDefault.stacks.dev.actions
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
                     * @name            corsProxy
                     * @namespace       config.kitchenRecipeDefault.stacks.dev.actions
                     * @type            String
                     * @default         [config.kitchen.actions.corsProxy]
                     *
                     * Specify the recipe prod stack corsProxy action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    get corsProxy() {
                        return api.config.kitchen.actions.corsProxy;
                    },
                    /**
                     * @name            vite
                     * @namespace       config.kitchenRecipeDefault.stacks.dev.actions
                     * @type            String
                     * @default         [config.kitchen.actions.vite]
                     *
                     * Specify the vite action settings
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    get vite() {
                        return api.config.kitchen.actions.vite;
                    },
                    /**
                     * @name            format
                     * @namespace       config.kitchenRecipeDefault.stacks.dev.actions
                     * @type            String
                     * @default         [config.kitchen.actions.format]
                     *
                     * Specify the format action settings
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    get format() {
                        return api.config.kitchen.actions.format;
                    },
                },
            },
            prod: {
                /**
                 * @name            description
                 * @namespace       config.kitchenRecipeDefault.stacks.prod
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
                     * @namespace       config.kitchenRecipeDefault.stacks.prod.sharedParams
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
                     * @namespace       config.kitchenRecipeDefault.stacks.prod.actions
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
                    /**
                     * @name            corsProxy
                     * @namespace       config.kitchenRecipeDefault.stacks.prod.actions
                     * @type            String
                     * @default         [config.kitchen.actions.corsProxy]
                     *
                     * Specify the recipe prod stack corsProxy action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    get corsProxy() {
                        return api.config.kitchen.actions.corsProxy;
                    },
                },
            },
            build: {
                /**
                 * @name            description
                 * @namespace       config.kitchenRecipeDefault.stacks.build
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
                 * @namespace       config.kitchenRecipeDefault.stacks.build.sharedParams
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
                     * @namespace       config.kitchenRecipeDefault.stacks.build.actions
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
                     * @namespace       config.kitchenRecipeDefault.stacks.build.actions
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
                     * @namespace       config.kitchenRecipeDefault.stacks.build.actions
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
                    /**
                     * @name            faviconBuild
                     * @namespace       config.kitchenRecipeDefault.stacks.build.actions
                     * @type            String
                     * @default         [config.kitchen.actions.faviconBuild]
                     *
                     * Specify the recipe build stack faviconBuild action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    get faviconBuild() {
                        return api.config.kitchen.actions.faviconBuild;
                    },
                    /**
                     * @name            docmapBuild
                     * @namespace       config.kitchenRecipeDefault.stacks.build.actions
                     * @type            String
                     * @default         [config.kitchen.actions.docmapBuild]
                     *
                     * Specify the recipe build stack docmapBuild action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    get docmapBuild() {
                        return api.config.kitchen.actions.docmapBuild;
                    },
                    /**
                     * @name            sitemapBuild
                     * @namespace       config.kitchenRecipeDefault.stacks.build.actions
                     * @type            String
                     * @default         [config.kitchen.actions.sitemapBuild]
                     *
                     * Specify the recipe build stack sitemapBuild action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    get sitemapBuild() {
                        return api.config.kitchen.actions.sitemapBuild;
                    },
                    /**
                     * @name            copyAssets
                     * @namespace       config.kitchenRecipeDefault.stacks.build.actions
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0ZBQTREO0FBQzVELGdEQUEwQjtBQUUxQixtQkFBeUIsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsS0FBSyxFQUFFLFNBQVM7UUFDaEI7Ozs7Ozs7Ozs7V0FVRztRQUNILFdBQVcsRUFBRSwyQkFBMkI7UUFDeEM7Ozs7Ozs7Ozs7V0FVRztRQUNILFdBQVcsRUFBRSxjQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBQSxpQkFBUyxHQUFFLHVCQUF1QixDQUFDO1FBQ2xFOzs7Ozs7Ozs7O1dBVUc7UUFDSCxZQUFZLEVBQUU7WUFDVixJQUFJLFFBQVE7Z0JBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztZQUNwRCxDQUFDO1NBQ0o7UUFDRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsWUFBWSxFQUFFLEtBQUs7UUFDbkIsTUFBTSxFQUFFO1lBQ0osR0FBRyxFQUFFO2dCQUNEOzs7Ozs7Ozs7O21CQVVHO2dCQUNILFdBQVcsRUFBRSxxQ0FBcUM7Z0JBQ2xELE9BQU8sRUFBRTtvQkFDTDs7Ozs7Ozs7O3VCQVNHO29CQUNILFNBQVMsRUFBRTt3QkFDUCxLQUFLLEVBQUUsd0JBQXdCO3dCQUMvQixXQUFXLEVBQUUsNEJBQTRCO3dCQUN6QyxPQUFPLEVBQUUsZUFBZTt3QkFDeEIsS0FBSzs0QkFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQzt3QkFDOUMsQ0FBQzt3QkFDRCxNQUFNLEVBQUUsRUFBRTt3QkFDVixRQUFRLEVBQUUsRUFBRTtxQkFDZjtvQkFDRDs7Ozs7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