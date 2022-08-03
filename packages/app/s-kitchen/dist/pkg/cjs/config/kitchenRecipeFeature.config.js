"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
const path_1 = __importDefault(require("path"));
function default_1(env, config) {
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
        templateDir: path_1.default.resolve(`${(0, dirname_1.default)()}/../templates/feature`),
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0ZBQTREO0FBQzVELGdEQUEwQjtBQUUxQixtQkFBeUIsR0FBRyxFQUFFLE1BQU07SUFDaEMsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBQ3BDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsS0FBSyxFQUFFLGVBQWU7UUFDdEI7Ozs7Ozs7Ozs7V0FVRztRQUNILFdBQVcsRUFBRSxzQkFBc0I7UUFDbkM7Ozs7Ozs7Ozs7V0FVRztRQUNILFdBQVcsRUFBRSxjQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBQSxpQkFBUyxHQUFFLHVCQUF1QixDQUFDO1FBQ2xFOzs7Ozs7Ozs7O1dBVUc7UUFDSCxZQUFZLEVBQUUsS0FBSztRQUNuQixNQUFNLEVBQUU7WUFDSixHQUFHLEVBQUU7Z0JBQ0Q7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsV0FBVyxFQUFFLDZCQUE2QjtnQkFDMUMsT0FBTyxFQUFFO29CQUNMOzs7Ozs7Ozs7O3VCQVVHO29CQUNILElBQUksRUFBRSwrQkFBK0I7aUJBQ3hDO2FBQ0o7WUFDRCxLQUFLLEVBQUU7Z0JBQ0g7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsV0FBVyxFQUFFLGdEQUFnRDtnQkFDN0QsT0FBTyxFQUFFO29CQUNMLFNBQVMsRUFBRTt3QkFDUDs7Ozs7Ozs7OzsyQkFVRzt3QkFDSCxNQUFNLEVBQUUsb0NBQW9DO3dCQUM1QyxNQUFNLEVBQUU7NEJBQ0o7Ozs7Ozs7Ozs7K0JBVUc7NEJBQ0gsR0FBRyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0o7aUJBQ0o7YUFDSjtTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUM7QUE5SEQsNEJBOEhDIn0=