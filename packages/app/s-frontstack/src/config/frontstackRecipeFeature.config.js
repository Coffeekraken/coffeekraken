var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/sugar/node/fs/dirname", "path"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
    const path_1 = __importDefault(require("path"));
    function default_1(env, config) {
        if (env.platform !== 'node')
            return;
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
            templateDir: path_1.default.resolve(`${(0, dirname_1.default)()}/../templates/feature`),
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
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRzdGFja1JlY2lwZUZlYXR1cmUuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJvbnRzdGFja1JlY2lwZUZlYXR1cmUuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQUEsa0ZBQTREO0lBQzVELGdEQUEwQjtJQUUxQixtQkFBeUIsR0FBRyxFQUFFLE1BQU07UUFDaEMsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07WUFBRSxPQUFPO1FBQ3BDLE9BQU87WUFDSDs7Ozs7Ozs7OztlQVVHO1lBQ0gsS0FBSyxFQUFFLGVBQWU7WUFDdEI7Ozs7Ozs7Ozs7ZUFVRztZQUNILFdBQVcsRUFBRSxzQkFBc0I7WUFDbkM7Ozs7Ozs7Ozs7ZUFVRztZQUNILFdBQVcsRUFBRSxjQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBQSxpQkFBUyxHQUFFLHVCQUF1QixDQUFDO1lBQ2xFOzs7Ozs7Ozs7O2VBVUc7WUFDSCxZQUFZLEVBQUUsS0FBSztZQUNuQixNQUFNLEVBQUU7Z0JBQ0osR0FBRyxFQUFFO29CQUNEOzs7Ozs7Ozs7O3VCQVVHO29CQUNILFdBQVcsRUFBRSw2QkFBNkI7b0JBQzFDLE9BQU8sRUFBRTt3QkFDTDs7Ozs7Ozs7OzsyQkFVRzt3QkFDSCxJQUFJLEVBQUUsa0NBQWtDO3FCQUMzQztpQkFDSjtnQkFDRCxLQUFLLEVBQUU7b0JBQ0g7Ozs7Ozs7Ozs7dUJBVUc7b0JBQ0gsV0FBVyxFQUFFLGdEQUFnRDtvQkFDN0QsT0FBTyxFQUFFO3dCQUNMLFNBQVMsRUFBRTs0QkFDUDs7Ozs7Ozs7OzsrQkFVRzs0QkFDSCxNQUFNLEVBQUUsdUNBQXVDOzRCQUMvQyxNQUFNLEVBQUU7Z0NBQ0o7Ozs7Ozs7Ozs7bUNBVUc7Z0NBQ0gsR0FBRyxFQUFFLElBQUk7NkJBQ1o7eUJBQ0o7cUJBQ0o7aUJBQ0o7YUFDSjtTQUNKLENBQUM7SUFDTixDQUFDO0lBOUhELDRCQThIQyJ9