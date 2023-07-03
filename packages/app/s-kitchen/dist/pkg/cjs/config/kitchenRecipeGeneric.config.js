"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("@coffeekraken/sugar/fs");
const string_1 = require("@coffeekraken/sugar/string");
const fs_2 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
let newFolderName;
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
        templateDir: path_1.default.resolve(`${(0, fs_1.__dirname)()}/../templates/default`),
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
                        get command() {
                            newFolderName = (0, string_1.__uniqid)();
                            return `mkdir ${newFolderName}`;
                        },
                        after() {
                            process.chdir(`${process.cwd()}/${newFolderName}`);
                            fs_2.default.writeFileSync(`${process.cwd()}/yarn.lock`, '');
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
                        description: 'Add the frontspec.json file in your project',
                        params: {},
                    },
                    // /**
                    //  * @name            installDependencies
                    //  * @namespace       config.kitchenRecipeDefault.stacks.new.actions
                    //  * @type            String
                    //  *
                    //  * Specify the recipe init stack installDependencies action
                    //  *
                    //  * @since       2.0.0
                    //  * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                    //  */
                    // installDependencies: __deepMerge(
                    //     api.config.kitchen.actions.installDependencies,
                    //     {},
                    // ),
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
                },
            },
            preview: {
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
                description: 'Start the preview testing stack',
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
                    prod: true,
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
                    // /**
                    //  * @name            faviconBuild
                    //  * @namespace       config.kitchenRecipeDefault.stacks.build.actions
                    //  * @type            String
                    //  * @default         [config.kitchen.actions.faviconBuild]
                    //  *
                    //  * Specify the recipe build stack faviconBuild action
                    //  *
                    //  * @since       2.0.0
                    //  * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                    //  */
                    // get faviconBuild() {
                    //     return api.config.kitchen.actions.faviconBuild;
                    // },
                    // /**
                    //  * @name            docmapBuild
                    //  * @namespace       config.kitchenRecipeDefault.stacks.build.actions
                    //  * @type            String
                    //  * @default         [config.kitchen.actions.docmapBuild]
                    //  *
                    //  * Specify the recipe build stack docmapBuild action
                    //  *
                    //  * @since       2.0.0
                    //  * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                    //  */
                    // get docmapBuild() {
                    //     return api.config.kitchen.actions.docmapBuild;
                    // },
                    // /**
                    //  * @name            sitemapBuild
                    //  * @namespace       config.kitchenRecipeDefault.stacks.build.actions
                    //  * @type            String
                    //  * @default         [config.kitchen.actions.sitemapBuild]
                    //  *
                    //  * Specify the recipe build stack sitemapBuild action
                    //  *
                    //  * @since       2.0.0
                    //  * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                    //  */
                    // get sitemapBuild() {
                    //     return api.config.kitchen.actions.sitemapBuild;
                    // },
                    // /**
                    //  * @name            markdownBuild
                    //  * @namespace       config.kitchenRecipeDefault.stacks.build.actions
                    //  * @type            String
                    //  * @default         [config.kitchen.actions.markdownBuild]
                    //  *
                    //  * Specify the recipe build stack markdownBuild action
                    //  *
                    //  * @since       2.0.0
                    //  * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                    //  */
                    // get markdownBuild() {
                    //     return api.config.kitchen.actions.markdownBuild;
                    // },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0NBQW1EO0FBQ25ELHVEQUFzRDtBQUN0RCw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBRTFCLElBQUksYUFBYSxDQUFDO0FBRWxCLG1CQUF5QixHQUFHO0lBQ3hCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFFeEMsT0FBTztRQUNIOzs7Ozs7Ozs7O1dBVUc7UUFDSCxLQUFLLEVBQUUsU0FBUztRQUNoQjs7Ozs7Ozs7OztXQVVHO1FBQ0gsV0FBVyxFQUFFLDJCQUEyQjtRQUN4Qzs7Ozs7Ozs7OztXQVVHO1FBQ0gsV0FBVyxFQUFFLGNBQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFBLGNBQVMsR0FBRSx1QkFBdUIsQ0FBQztRQUNsRTs7Ozs7Ozs7OztXQVVHO1FBQ0gsWUFBWSxFQUFFO1lBQ1YsSUFBSSxRQUFRO2dCQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDcEQsQ0FBQztTQUNKO1FBQ0Q7Ozs7Ozs7Ozs7V0FVRztRQUNILFlBQVksRUFBRSxLQUFLO1FBQ25CLE1BQU0sRUFBRTtZQUNKLEdBQUcsRUFBRTtnQkFDRDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxXQUFXLEVBQUUscUNBQXFDO2dCQUNsRCxPQUFPLEVBQUU7b0JBQ0w7Ozs7Ozs7Ozt1QkFTRztvQkFDSCxTQUFTLEVBQUU7d0JBQ1AsS0FBSyxFQUFFLHdCQUF3Qjt3QkFDL0IsV0FBVyxFQUFFLDRCQUE0Qjt3QkFDekMsSUFBSSxPQUFPOzRCQUNQLGFBQWEsR0FBRyxJQUFBLGlCQUFRLEdBQUUsQ0FBQzs0QkFDM0IsT0FBTyxTQUFTLGFBQWEsRUFBRSxDQUFDO3dCQUNwQyxDQUFDO3dCQUNELEtBQUs7NEJBQ0QsT0FBTyxDQUFD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