import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __uniqid from '@coffeekraken/sugar/shared/string/uniqid';
import __path from 'path';
let newFolderName;
export default function (api) {
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
        templateDir: __path.resolve(`${__dirname()}/../templates/default`),
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
                            newFolderName = __uniqid();
                            return `mkdir ${newFolderName}`;
                        },
                        after() {
                            process.chdir(`${process.cwd()}/${newFolderName}`);
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
                     * @name            markdownBuild
                     * @namespace       config.kitchenRecipeDefault.stacks.build.actions
                     * @type            String
                     * @default         [config.kitchen.actions.markdownBuild]
                     *
                     * Specify the recipe build stack markdownBuild action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    get markdownBuild() {
                        return api.config.kitchen.actions.markdownBuild;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sUUFBUSxNQUFNLDBDQUEwQyxDQUFDO0FBQ2hFLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUUxQixJQUFJLGFBQWEsQ0FBQztBQUVsQixNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUV4QyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILEtBQUssRUFBRSxTQUFTO1FBQ2hCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxXQUFXLEVBQUUsMkJBQTJCO1FBQ3hDOzs7Ozs7Ozs7O1dBVUc7UUFDSCxXQUFXLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQVMsRUFBRSx1QkFBdUIsQ0FBQztRQUNsRTs7Ozs7Ozs7OztXQVVHO1FBQ0gsWUFBWSxFQUFFO1lBQ1YsSUFBSSxRQUFRO2dCQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDcEQsQ0FBQztTQUNKO1FBQ0Q7Ozs7Ozs7Ozs7V0FVRztRQUNILFlBQVksRUFBRSxLQUFLO1FBQ25CLE1BQU0sRUFBRTtZQUNKLEdBQUcsRUFBRTtnQkFDRDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxXQUFXLEVBQUUscUNBQXFDO2dCQUNsRCxPQUFPLEVBQUU7b0JBQ0w7Ozs7Ozs7Ozt1QkFTRztvQkFDSCxTQUFTLEVBQUU7d0JBQ1AsS0FBSyxFQUFFLHdCQUF3Qjt3QkFDL0IsV0FBVyxFQUFFLDRCQUE0Qjt3QkFDekMsSUFBSSxPQUFPOzRCQUNQLGFBQWEsR0FBRyxRQUFRLEVBQUUsQ0FBQzs0QkFDM0IsT0FBTyxTQUFTLGFBQWEsRUFBRSxD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