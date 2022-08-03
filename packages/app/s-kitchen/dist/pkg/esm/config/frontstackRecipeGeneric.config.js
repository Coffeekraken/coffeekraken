import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __path from 'path';
export default function (env, config) {
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
        templateDir: __path.resolve(`${__dirname()}/../templates/default`),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUUxQixNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUcsRUFBRSxNQUFNO0lBQ2hDLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUVwQyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILEtBQUssRUFBRSxTQUFTO1FBQ2hCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxXQUFXLEVBQUUsOEJBQThCO1FBQzNDOzs7Ozs7Ozs7O1dBVUc7UUFDSCxXQUFXLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQVMsRUFBRSx1QkFBdUIsQ0FBQztRQUNsRTs7Ozs7Ozs7OztXQVVHO1FBQ0gsWUFBWSxFQUFFO1lBQ1YsUUFBUSxFQUFFLENBQUMsMEJBQTBCLEVBQUUsVUFBVSxDQUFDO1NBQ3JEO1FBQ0Q7Ozs7Ozs7Ozs7V0FVRztRQUNILFlBQVksRUFBRSxLQUFLO1FBQ25CLE1BQU0sRUFBRTtZQUNKLEdBQUcsRUFBRTtnQkFDRDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxXQUFXLEVBQUUscUNBQXFDO2dCQUNsRCxPQUFPLEVBQUU7b0JBQ0w7Ozs7Ozs7Ozt1QkFTRztvQkFDSCxTQUFTLEVBQUU7d0JBQ1AsS0FBSyxFQUFFLHdCQUF3Qjt3QkFDL0IsV0FBVyxFQUFFLDRCQUE0Qjt3QkFDekMsT0FBTyxFQUFFLGVBQWU7d0JBQ3hCLEtBQUs7NEJBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7d0JBQzlDLENBQUM7d0JBQ0QsTUFBTSxFQUFFLEVBQUU7d0JBQ1YsUUFBUSxFQUFFLEVBQUU7cUJBQ2Y7b0JBQ0Q7Ozs7Ozs7Ozt1QkFTRztvQkFD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