import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __path from 'path';

const recipe = 'default';

export default function (env, config) {
    if (env.platform !== 'node') return;
    return {
        /**
         * @name            title
         * @namespace       config.frontstackRecipeLitElement
         * @type            String
         * @default         LitElement component
         *
         * Specify the recipe title
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        title: 'LitElement component',
        /**
         * @name            description
         * @namespace       config.frontstackRecipeLitElement
         * @type            String
         * @default         ...
         *
         * Specify the recipe description
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        description: 'LitElement webcomponent recipe',
        /**
         * @name            templateDir
         * @namespace       config.frontstackRecipeLitElement
         * @type            String
         * @default         __path.resolve(`${__dirname()}/../templates/litElement`)
         *
         * Specify the recipe template directory
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        templateDir: __path.resolve(`${__dirname()}/../templates/litElement`),
        /**
         * @name            defaultStack
         * @namespace       config.frontstackRecipeLitElement
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
            dev: {
                /**
                 * @name            description
                 * @namespace       config.frontstackRecipeLitElement.stacks.dev
                 * @type            String
                 * @default        ...
                 *
                 * Specify the recipe dev stack description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                description: 'Start the development stack',
                actions: {
                    /**
                     * @name            vite
                     * @namespace       config.frontstackRecipeLitElement.stacks.dev.actions
                     * @type            String
                     * @default        [config.frontstack.actions.vite]
                     *
                     * Specify the recipe dev stack vite action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    vite: '[config.frontstack.actions.vite]',
                },
            },
            build: {
                /**
                 * @name            description
                 * @namespace       config.frontstackRecipeLitElement.stacks.build.actions
                 * @type            String
                 * @default        ...
                 *
                 * Specify the recipe build stack description
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                description: 'Build your final production ready dist package',
                actions: {
                    viteBuild: {
                        /**
                         * @name            action
                         * @namespace       config.frontstackRecipeLitElement.stacks.build.actions.viteBuild
                         * @type            String
                         * @default        [config.frontstack.actions.viteBuild]
                         *
                         * Specify the recipe build stack viteBuild action
                         *
                         * @since       2.0.0
                         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                         */
                        action: '[config.frontstack.actions.viteBuild]',
                        params: {
                            /**
                             * @name            lib
                             * @namespace       config.frontstackRecipeLitElement.stacks.build.actions.viteBuild.params
                             * @type            String
                             * @default        true
                             *
                             * Specify the recipe build stack viteBuild action lib param
                             *
                             * @since       2.0.0
                             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                             */
                            lib: true,
                        },
                    },
                },
            },
        },
    };
}
