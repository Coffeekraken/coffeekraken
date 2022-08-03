import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __path from 'path';
const recipe = 'default';
export default function (env, config) {
    if (env.platform !== 'node')
        return;
    return {
        /**
         * @name            title
         * @namespace       config.kitchenRecipeLitElement
         * @type            String
         * @default         LitElement component
         *
         * Specify the recipe title
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        title: 'LitElement component',
        /**
         * @name            description
         * @namespace       config.kitchenRecipeLitElement
         * @type            String
         * @default         ...
         *
         * Specify the recipe description
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        description: 'LitElement webcomponent recipe',
        /**
         * @name            templateDir
         * @namespace       config.kitchenRecipeLitElement
         * @type            String
         * @default         __path.resolve(`${__dirname()}/../templates/litElement`)
         *
         * Specify the recipe template directory
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        templateDir: __path.resolve(`${__dirname()}/../templates/litElement`),
        /**
         * @name            defaultStack
         * @namespace       config.kitchenRecipeLitElement
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
                 * @namespace       config.kitchenRecipeLitElement.stacks.dev
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
                     * @namespace       config.kitchenRecipeLitElement.stacks.dev.actions
                     * @type            String
                     * @default        [config.kitchen.actions.vite]
                     *
                     * Specify the recipe dev stack vite action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    vite: '[config.kitchen.actions.vite]',
                },
            },
            build: {
                /**
                 * @name            description
                 * @namespace       config.kitchenRecipeLitElement.stacks.build.actions
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
                         * @namespace       config.kitchenRecipeLitElement.stacks.build.actions.viteBuild
                         * @type            String
                         * @default        [config.kitchen.actions.viteBuild]
                         *
                         * Specify the recipe build stack viteBuild action
                         *
                         * @since       2.0.0
                         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        action: '[config.kitchen.actions.viteBuild]',
                        params: {
                            /**
                             * @name            lib
                             * @namespace       config.kitchenRecipeLitElement.stacks.build.actions.viteBuild.params
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUUxQixNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUM7QUFFekIsTUFBTSxDQUFDLE9BQU8sV0FBVyxHQUFHLEVBQUUsTUFBTTtJQUNoQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFDcEMsT0FBTztRQUNIOzs7Ozs7Ozs7O1dBVUc7UUFDSCxLQUFLLEVBQUUsc0JBQXNCO1FBQzdCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxXQUFXLEVBQUUsZ0NBQWdDO1FBQzdDOzs7Ozs7Ozs7O1dBVUc7UUFDSCxXQUFXLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQVMsRUFBRSwwQkFBMEIsQ0FBQztRQUNyRTs7Ozs7Ozs7OztXQVVHO1FBQ0gsWUFBWSxFQUFFLEtBQUs7UUFDbkIsTUFBTSxFQUFFO1lBQ0osR0FBRyxFQUFFO2dCQUNEOzs7Ozs7Ozs7O21CQVVHO2dCQUNILFdBQVcsRUFBRSw2QkFBNkI7Z0JBQzFDLE9BQU8sRUFBRTtvQkFDTDs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxJQUFJLEVBQUUsK0JBQStCO2lCQUN4QzthQUNKO1lBQ0QsS0FBSyxFQUFFO2dCQUNIOzs7Ozs7Ozs7O21CQVVHO2dCQUNILFdBQVcsRUFBRSxnREFBZ0Q7Z0JBQzdELE9BQU8sRUFBRTtvQkFDTCxTQUFTLEVBQUU7d0JBQ1A7Ozs7Ozs7Ozs7MkJBVUc7d0JBQ0gsTUFBTSxFQUFFLG9DQUFvQzt3QkFDNUMsTUFBTSxFQUFFOzRCQUNKOzs7Ozs7Ozs7OytCQVVHOzRCQUNILEdBQUcsRUFBRSxJQUFJO3lCQUNaO3FCQUNKO2lCQUNKO2FBQ0o7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDIn0=