import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __path from 'path';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
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
                     * @default         [config.frontstack.actions.frontendServer]
                     *
                     * Specify the recipe init stack copy action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    copy: __deepMerge(config.frontstack.actions.copy, {
                        params: {
                            0: __path.resolve(__dirname(), `../templates/default/.`),
                            1: `${process.cwd()}/default`
                        }
                    }),
                    /**
                     * @name            rename
                     * @namespace       config.frontstackRecipeDefault.stacks.new.actions
                     * @type            String
                     * @default         [config.frontstack.actions.frontendServer]
                     *
                     * Specify the recipe init stack rename action
                     *
                     * @since       2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    rename: __deepMerge(config.frontstack.actions.rename, {
                        params: {}
                    })
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
                    prod: true,
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
                },
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRzdGFja1JlY2lwZURlZmF1bHQuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJvbnRzdGFja1JlY2lwZURlZmF1bHQuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUV0RSxNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUcsRUFBRSxNQUFNO0lBQ2hDLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUVwQyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILEtBQUssRUFBRSxTQUFTO1FBQ2hCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxXQUFXLEVBQUUsOEJBQThCO1FBQzNDOzs7Ozs7Ozs7O1dBVUc7UUFDSCxXQUFXLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQVMsRUFBRSx1QkFBdUIsQ0FBQztRQUNsRTs7Ozs7Ozs7OztXQVVHO1FBQ0gsWUFBWSxFQUFFLEtBQUs7UUFDbkIsTUFBTSxFQUFFO1lBQ0osR0FBRyxFQUFFO2dCQUNEOzs7Ozs7Ozs7O21CQVVHO2dCQUNILFdBQVcsRUFBRSxxQ0FBcUM7Z0JBQ2xELE9BQU8sRUFBRTtvQkFDTDs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxJQUFJLEVBQUUsV0FBVyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTt3QkFDOUMsTUFBTSxFQUFFOzRCQUNKLENBQUMsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLHdCQUF3QixDQUFDOzRCQUN4RCxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLFVBQVU7eUJBQ2hDO3FCQUNKLENBQUM7b0JBQ0Y7Ozs7Ozs7Ozs7dUJBVUc7b0JBQ0gsTUFBTSxFQUFFLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7d0JBQ2xELE1BQU0sRUFBRSxFQUNQO3FCQUNKLENBQUM7aUJBQ0w7YUFDSjtZQUNELEdBQUcsRUFBRTtnQkFDRDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxXQUFXLEVBQUUsNkJBQTZCO2dCQUMxQyxhQUFhLEVBQUUsSUFBSTtnQkFDbkIsT0FBTyxFQUFFO29CQUNMOzs7Ozs7Ozs7O3VCQVVHO29CQUNILGNBQWMsRUFDViw0Q0FBNEM7b0JBQ2hEOzs7Ozs7Ozs7O3VCQVVHO29CQUNILElBQUksRUFBRSxrQ0FBa0M7aUJBQzNDO2FBQ0o7WUFDRCxJQUFJLEVBQUU7Z0JBQ0Y7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsV0FBVyxFQUFFLG9DQUFvQztnQkFDakQsWUFBWSxFQUFFO29CQUNWOzs7Ozs7Ozs7O3VCQVVHO29CQUNILEdBQUcsRUFBRSxZQUFZO2lCQUNwQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0w7Ozs7Ozs7Ozs7dUJBVUc7b0JBQ0gsY0FBYyxFQUNWLDRDQUE0QztpQkFDbkQ7YUFDSjtZQUNELEtBQUssRUFBRTtnQkFDSDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxXQUFXLEVBQUUsZ0RBQWdEO2dCQUM3RCxZQUFZLEVBQUU7b0JBQ1Y7Ozs7Ozs7Ozs7dUJBVUc7b0JBQ0gsSUFBSSxFQUFFLElBQUk7aUJBQ2I7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMOzs7Ozs7Ozs7O3VCQVVHO29CQUNILFlBQVksRUFBRSwwQ0FBMEM7b0JBQ3hEOzs7Ozs7Ozs7O3VCQVVHO29CQUNILFNBQVMsRUFBRSx1Q0FBdUM7b0JBQ2xEOzs7Ozs7Ozs7O3VCQVVHO29CQUNILFdBQVcsRUFBRSx5Q0FBeUM7aUJBQ3pEO2FBQ0o7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDIn0=