import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __path from 'path';

export default function (env, config) {
    if (env.platform !== 'node') return;
    return {
        /**
         * @name            title
         * @namespace       config.frontstackRecipeFeature
         * @type            String
         * @default         LitElement component
         *
         * Specify the recipe title
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        title: 'Sugar feature',
        /**
         * @name            description
         * @namespace       config.frontstackRecipeFeature
         * @type            String
         * @default         ...
         *
         * Specify the recipe description
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        description: 'Sugar feature recipe',
        /**
         * @name            templateDir
         * @namespace       config.frontstackRecipeFeature
         * @type            String
         * @default         __path.resolve(`${__dirname()}/../templates/feature`)
         *
         * Specify the recipe template directory
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        templateDir: __path.resolve(`${__dirname()}/../templates/feature`),
        /**
         * @name            defaultStack
         * @namespace       config.frontstackRecipeFeature
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
            dev: {
                /**
                 * @name            description
                 * @namespace       config.frontstackRecipeFeature.stacks.dev
                 * @type            String
                 * @default        ...
                 *
                 * Specify the recipe dev stack description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Start the development stack',
                actions: {
                    /**
                     * @name            vite
                     * @namespace       config.frontstackRecipeFeature.stacks.dev.actions
                     * @type            String
                     * @default        [config.frontstack.actions.vite]
                     *
                     * Specify the recipe dev stack vite action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    vite: '[config.frontstack.actions.vite]',
                },
            },
            build: {
                /**
                 * @name            description
                 * @namespace       config.frontstackRecipeFeature.stacks.build.actions
                 * @type            String
                 * @default        ...
                 *
                 * Specify the recipe build stack description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'Build your final production ready dist package',
                actions: {
                    viteBuild: {
                        /**
                         * @name            action
                         * @namespace       config.frontstackRecipeFeature.stacks.build.actions.viteBuild
                         * @type            String
                         * @default        [config.frontstack.actions.viteBuild]
                         *
                         * Specify the recipe build stack viteBuild action
                         *
                         * @since       2.0.0
                         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        action: '[config.frontstack.actions.viteBuild]',
                        params: {
                            /**
                             * @name            lib
                             * @namespace       config.frontstackRecipeFeature.stacks.build.actions.viteBuild.params
                             * @type            String
                             * @default        true
                             *
                             * Specify the recipe build stack viteBuild action lib param
                             *
                             * @since       2.0.0
                             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                             */
                            lib: true,
                        },
                    },
                },
            },
        },
    };
}
