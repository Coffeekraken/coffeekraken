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
    const recipe = 'default';
    function default_1(env, config) {
        if (env.platform !== 'node')
            return;
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
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            templateDir: path_1.default.resolve(`${(0, dirname_1.default)()}/../templates/litElement`),
            /**
             * @name            defaultStack
             * @namespace       config.frontstackRecipeLitElement
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
                     * @namespace       config.frontstackRecipeLitElement.stacks.dev
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
                         * @namespace       config.frontstackRecipeLitElement.stacks.dev.actions
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
                     * @namespace       config.frontstackRecipeLitElement.stacks.build.actions
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
                             * @namespace       config.frontstackRecipeLitElement.stacks.build.actions.viteBuild
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
                                 * @namespace       config.frontstackRecipeLitElement.stacks.build.actions.viteBuild.params
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRzdGFja1JlY2lwZUxpdEVsZW1lbnQuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJvbnRzdGFja1JlY2lwZUxpdEVsZW1lbnQuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQUEsa0ZBQTREO0lBQzVELGdEQUEwQjtJQUUxQixNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUM7SUFFekIsbUJBQXlCLEdBQUcsRUFBRSxNQUFNO1FBQ2hDLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1lBQUUsT0FBTztRQUNwQyxPQUFPO1lBQ0g7Ozs7Ozs7Ozs7ZUFVRztZQUNILEtBQUssRUFBRSxzQkFBc0I7WUFDN0I7Ozs7Ozs7Ozs7ZUFVRztZQUNILFdBQVcsRUFBRSxnQ0FBZ0M7WUFDN0M7Ozs7Ozs7Ozs7ZUFVRztZQUNILFdBQVcsRUFBRSxjQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBQSxpQkFBUyxHQUFFLDBCQUEwQixDQUFDO1lBQ3JFOzs7Ozs7Ozs7O2VBVUc7WUFDSCxZQUFZLEVBQUUsS0FBSztZQUNuQixNQUFNLEVBQUU7Z0JBQ0osR0FBRyxFQUFFO29CQUNEOzs7Ozs7Ozs7O3VCQVVHO29CQUNILFdBQVcsRUFBRSw2QkFBNkI7b0JBQzFDLE9BQU8sRUFBRTt3QkFDTDs7Ozs7Ozs7OzsyQkFVRzt3QkFDSCxJQUFJLEVBQUUsa0NBQWtDO3FCQUMzQztpQkFDSjtnQkFDRCxLQUFLLEVBQUU7b0JBQ0g7Ozs7Ozs7Ozs7dUJBVUc7b0JBQ0gsV0FBVyxFQUFFLGdEQUFnRDtvQkFDN0QsT0FBTyxFQUFFO3dCQUNMLFNBQVMsRUFBRTs0QkFDUDs7Ozs7Ozs7OzsrQkFVRzs0QkFDSCxNQUFNLEVBQUUsdUNBQXVDOzRCQUMvQyxNQUFNLEVBQUU7Z0NBQ0o7Ozs7Ozs7Ozs7bUNBVUc7Z0NBQ0gsR0FBRyxFQUFFLElBQUk7NkJBQ1o7eUJBQ0o7cUJBQ0o7aUJBQ0o7YUFDSjtTQUNKLENBQUM7SUFDTixDQUFDO0lBOUhELDRCQThIQyJ9