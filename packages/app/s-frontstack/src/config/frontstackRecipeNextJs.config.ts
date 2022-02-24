import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __path from 'path';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

export default function (env, config) {
    if (env.platform !== 'node') return;

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
            commands: ['[config.package.manager]']
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
                    createApp: __deepMerge(config.frontstack.actions.copy, {
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
                    rename: __deepMerge(config.frontstack.actions.rename, {
                        params: {
                        }
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
                    addSugarJson: __deepMerge(config.frontstack.actions.addSugarJson, {
                        params: {
                            recipe: 'nextJs'
                        }
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
                    addManifestJson: __deepMerge(config.frontstack.actions.addManifestJson, {
                        params: {}
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
                    frontendServer:
                        '[config.frontstack.actions.frontendServer]',
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
                    frontendServer:
                        '[config.frontstack.actions.frontendServer]',
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
