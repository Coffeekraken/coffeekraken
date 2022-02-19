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
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        requirements: {
            commands: ['[config.package.manager]', 'composer']
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
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    copy: {
                        extends: 'copy',
                        title: 'Copy default template',
                        description: 'Copy the default template files',
                        params: {
                            'src': __path.resolve(__dirname(), `../templates/default/.`),
                            'dest': `${process.cwd()}/default`,
                            'chdir': true
                        }
                    },
                    /**
                     * @name            rename
                     * @namespace       config.frontstackRecipeDefault.stacks.new.actions
                     * @type            String
                     *
                     * Specify the recipe init stack rename action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    rename: {
                        extends: 'rename',
                        title: 'Rename default template package',
                        description: 'Renamt the default template package with the user input',
                        params: {}
                    },
                    /**
                     * @name            addSugarJson
                     * @namespace       config.frontstackRecipeDefault.stacks.new.actions
                     * @type            String
                     *
                     * Specify the recipe init stack addSugarJson action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    addSugarJson: {
                        extends: 'addSugarJson',
                        title: 'Add the sugar.json file',
                        description: 'Add the sugar.json file',
                        params: {
                            recipe: 'default'
                        }
                    },
                    /**
                     * @name            addManifestJson
                     * @namespace       config.frontstackRecipeDefault.stacks.new.actions
                     * @type            String
                     *
                     * Specify the recipe init stack addManifestJson action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    addManifestJson: {
                        extends: 'addManifestJson',
                        title: 'Add manifest.json file',
                        description: 'Add the manifest.json file',
                        params: {}
                    },
                    /**
                     * @name            installDependencies
                     * @namespace       config.frontstackRecipeDefault.stacks.new.actions
                     * @type            String
                     *
                     * Specify the recipe init stack installDependencies action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    installDependencies: {
                        extends: 'installDependencies',
                        title: 'Install the dependencies',
                        description: 'Install the package dependencies (npm,composer)',
                        params: {}
                    }
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
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    faviconBuild: '[config.frontstack.actions.faviconBuild]',
                    // /**
                    //  * @name            sitemapBuild
                    //  * @namespace       config.frontstackRecipeDefault.stacks.build.actions
                    //  * @type            String
                    //  * @default         [config.frontstack.actions.sitemapBuild]
                    //  *
                    //  * Specify the recipe build stack sitemapBuild action
                    //  *
                    //  * @since       2.0.0
                    //  * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                    //  */
                    // sitemapBuild: '[config.frontstack.actions.sitemapBuild]'
                },
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRzdGFja1JlY2lwZURlZmF1bHQuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJvbnRzdGFja1JlY2lwZURlZmF1bHQuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUkxQixNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUcsRUFBRSxNQUFNO0lBQ2hDLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUVwQyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILEtBQUssRUFBRSxTQUFTO1FBQ2hCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxXQUFXLEVBQUUsOEJBQThCO1FBQzNDOzs7Ozs7Ozs7O1dBVUc7UUFDSCxXQUFXLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQVMsRUFBRSx1QkFBdUIsQ0FBQztRQUNsRTs7Ozs7Ozs7OztXQVVHO1FBQ0gsWUFBWSxFQUFFO1lBQ1YsUUFBUSxFQUFFLENBQUMsMEJBQTBCLEVBQUMsVUFBVSxDQUFDO1NBQ3BEO1FBQ0Q7Ozs7Ozs7Ozs7V0FVRztRQUNILFlBQVksRUFBRSxLQUFLO1FBQ25CLE1BQU0sRUFBRTtZQUNKLEdBQUcsRUFBRTtnQkFDRDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxXQUFXLEVBQUUscUNBQXFDO2dCQUNsRCxPQUFPLEVBQUU7b0JBQ0w7Ozs7Ozs7Ozt1QkFTRztvQkFDSCxJQUFJLEVBQUU7d0JBQ0YsT0FBTyxFQUFFLE1BQU07d0JBQ2YsS0FBSyxFQUFFLHVCQUF1Qjt3QkFDOUIsV0FBVyxFQUFFLGlDQUFpQzt3QkFDOUMsTUFBTSxFQUFFOzRCQUNKLEtBQUssRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLHdCQUF3QixDQUFDOzRCQUM1RCxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FB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