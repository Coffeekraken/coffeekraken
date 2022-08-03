import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __path from 'path';
export default function (env, config) {
    if (env.platform !== 'node')
        return;
    return {
        /**
         * @name            title
         * @namespace       config.kitchenRecipeFeature
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
         * @namespace       config.kitchenRecipeFeature
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
         * @namespace       config.kitchenRecipeFeature
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
         * @namespace       config.kitchenRecipeFeature
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
                 * @namespace       config.kitchenRecipeFeature.stacks.dev
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
                     * @namespace       config.kitchenRecipeFeature.stacks.dev.actions
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
                 * @namespace       config.kitchenRecipeFeature.stacks.build.actions
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
                         * @namespace       config.kitchenRecipeFeature.stacks.build.actions.viteBuild
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
                             * @namespace       config.kitchenRecipeFeature.stacks.build.actions.viteBuild.params
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUUxQixNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUcsRUFBRSxNQUFNO0lBQ2hDLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUNwQyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILEtBQUssRUFBRSxlQUFlO1FBQ3RCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxXQUFXLEVBQUUsc0JBQXNCO1FBQ25DOzs7Ozs7Ozs7O1dBVUc7UUFDSCxXQUFXLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQVMsRUFBRSx1QkFBdUIsQ0FBQztRQUNsRTs7Ozs7Ozs7OztXQVVHO1FBQ0gsWUFBWSxFQUFFLEtBQUs7UUFDbkIsTUFBTSxFQUFFO1lBQ0osR0FBRyxFQUFFO2dCQUNEOzs7Ozs7Ozs7O21CQVVHO2dCQUNILFdBQVcsRUFBRSw2QkFBNkI7Z0JBQzFDLE9BQU8sRUFBRTtvQkFDTDs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxJQUFJLEVBQUUsK0JBQStCO2lCQUN4QzthQUNKO1lBQ0QsS0FBSyxFQUFFO2dCQUNIOzs7Ozs7Ozs7O21CQVVHO2dCQUNILFdBQVcsRUFBRSxnREFBZ0Q7Z0JBQzdELE9BQU8sRUFBRTtvQkFDTCxTQUFTLEVBQUU7d0JBQ1A7Ozs7Ozs7Ozs7MkJBVUc7d0JBQ0gsTUFBTSxFQUFFLG9DQUFvQzt3QkFDNUMsTUFBTSxFQUFFOzRCQUNKOzs7Ozs7Ozs7OytCQVVHOzRCQUNILEdBQUcsRUFBRSxJQUFJO3lCQUNaO3FCQUNKO2lCQUNKO2FBQ0o7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDIn0=