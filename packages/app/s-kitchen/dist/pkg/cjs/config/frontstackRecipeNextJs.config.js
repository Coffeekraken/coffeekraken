"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
function default_1(env, config) {
    if (env.platform !== 'node')
        return;
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
            commands: ['[config.package.manager]'],
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
                    createApp: (0, deepMerge_1.default)({
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
                    rename: (0, deepMerge_1.default)(config.frontstack.actions.rename, {
                        params: {},
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
                    addSugarJson: (0, deepMerge_1.default)(config.frontstack.actions.addSugarJson, {
                        params: {
                            recipe: 'nextJs',
                        },
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
                    addManifestJson: (0, deepMerge_1.default)(config.frontstack.actions.addManifestJson, {
                        params: {},
                    }),
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
                    addSugarPostcss: (0, deepMerge_1.default)(config.frontstack.actions.addSugarPostcss, {
                        params: {},
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
                    frontendServer: '[config.frontstack.actions.frontendServer]',
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
                    frontendServer: '[config.frontstack.actions.frontendServer]',
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsNEZBQXNFO0FBR3RFLG1CQUF5QixHQUFHLEVBQUUsTUFBTTtJQUNoQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFFcEMsT0FBTztRQUNIOzs7Ozs7Ozs7O1dBVUc7UUFDSCxLQUFLLEVBQUUsUUFBUTtRQUNmOzs7Ozs7Ozs7O1dBVUc7UUFDSCxXQUFXLEVBQ1AsNkRBQTZEO1FBQ2pFOzs7Ozs7Ozs7O1dBVUc7UUFDSCxZQUFZLEVBQUU7WUFDVixRQUFRLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztTQUN6QztRQUNEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxZQUFZLEVBQUUsS0FBSztRQUNuQixNQUFNLEVBQUU7WUFDSixHQUFHLEVBQUU7Z0JBQ0Q7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsV0FBVyxFQUFFLDRCQUE0QjtnQkFDekMsT0FBTyxFQUFFO29CQUNMOzs7Ozs7Ozs7dUJBU0c7b0JBQ0gsU0FBUyxFQUFFLElBQUEsbUJBQVcsRUFBQzt3QkFDbkIsS0FBSyxFQUFFLGdCQUFnQjt3QkFDdkIsV0FBVyxFQUNQLGtEQUFrRDt3QkFDdEQsT0FBTyxFQUFFLDBDQUEwQzt3QkFDbkQsS0FBSzs0QkFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQzt3QkFDOUMsQ0FBQzt3QkFDRCxNQUFNLEVBQUUsRUFBRTt3QkFDVixRQUFRLEVBQUUsRUFBRTtxQkFDZixDQUFDO29CQUNGOzs7Ozs7Ozs7dUJBU0c7b0JBQ0gsTUFBTSxFQUFFLElBQUEsbUJBQVcsRUFBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7d0JBQ2xELE1BQU0sRUFBRSxFQUFFO3FCQUNiLENBQUM7b0JBQ0Y7Ozs7Ozs7Ozt1QkFTRztvQkFDSCxZQUFZLEVBQUUsSUFBQSxtQkFBVyxFQUNyQixNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQ3RDO3dCQUNJLE1BQU0sRUFBRTs0QkFDSixNQUFNLEVBQUUsUUFBUTt5QkFDbkI7cUJBQ0osQ0FDSjtvQkFDRDs7Ozs7Ozs7O3VCQVNHO29CQUNILGVBQWUsRUFBRSxJQUFBLG1CQUFXLEVBQ3hCLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFDekM7d0JBQ0ksTUFBTSxFQUFFLEVBQUU7cUJBQ2IsQ0FDSjtvQkFFRDs7Ozs7Ozs7O3VCQVNHO29CQUNILGVBQWUsRUFBRSxJQUFBLG1CQUFXLEVBQ3hCLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFDekM7d0JBQ0ksTUFBTSxFQUFFLEVBQUU7cUJBQ2IsQ0FDSjtvQkFFRCxNQUFNO29CQUNOLDBDQUEwQztvQkFDMUMsdUVBQXVFO29CQUN2RSw2QkFBNkI7b0JBQzdCLEtBQUs7b0JBQ0wsOERBQThEO29CQUM5RCxLQUFLO29CQUNMLHdCQUF3QjtvQkFDeEIsb0ZBQW9GO29CQUNwRixNQUFNO29CQUNOLG9GQUFvRjtvQkFDcEYsaUJBQWlCO29CQUNqQixLQUFLO2lCQUNSO2FBQ0o7WUFDRCxHQUFHLEVBQUU7Z0JBQ0Q7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsV0FBVyxFQUFFLDZCQUE2QjtnQkFDMUMsYUFBYSxFQUFFLElBQUk7Z0JBQ25CLE9BQU8sRUFBRTtvQkFDTDs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxjQUFjLEVBQ1YsNENBQTRDO29CQUNoRDs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxJQUFJLEVBQUUsa0NBQWtDO2lCQUMzQzthQUNKO1lBQ0QsSUFBSSxFQUFFO2dCQUNGOzs7Ozs7Ozs7O21CQVVHO2dCQUNILFdBQVcsRUFBRSxvQ0FBb0M7Z0JBQ2pELFlBQVksRUFBRTtvQkFDVjs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxHQUFHLEVBQUUsWUFBWTtpQkFDcEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMOzs7Ozs7Ozs7O3VCQVVHO29CQUNILGNBQWMsRUFDViw0Q0FBNEM7aUJBQ25EO2FBQ0o7WUFDRCxLQUFLLEVBQUU7Z0JBQ0g7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsV0FBVyxFQUFFLGdEQUFnRDtnQkFDN0QsWUFBWSxFQUFFO29CQUNWOzs7Ozs7Ozs7O3VCQVVHO29CQUNILElBQUksRUFBRSxJQUFJO2lCQUNiO2dCQUNELE9BQU8sRUFBRTtvQkFDTDs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxZQUFZLEVBQUUsMENBQTBDO29CQUN4RDs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxTQUFTLEVBQUUsdUNBQXVDO29CQUNsRDs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxXQUFXLEVBQUUseUNBQXlDO2lCQUN6RDthQUNKO1NBQ0o7S0FDSixDQUFDO0FBQ04sQ0FBQztBQXBVRCw0QkFvVUMifQ==