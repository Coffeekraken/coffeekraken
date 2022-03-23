var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/sugar/node/path/packageRoot"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
    function default_1(env) {
        if (env.platform !== 'node')
            return;
        return {
            namespace: {
                /**
                 * @name            pattern
                 * @namespace       config.core.namespace
                 * @type            String
                 * @default         {path}
                 *
                 * Specify a generation pattern to generate the namespace. Here's the available tokens:
                 * - {package.name}: The package name specified in the package.json
                 * - {package.version}: The package version specified in the package.json
                 * - {path}: The passed path parameter
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                pattern: '{path}',
                /**
                 * @name            context
                 * @namespace       config.core.namespace
                 * @type            String
                 * @default         __packageRoot()
                 *
                 * Specify the context in which to generate the namespace.
                 * The context is simply a root folder from which to search for the package.json
                 * file to get the name that serve to the namespace generation
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                context: (0, packageRoot_1.default)(),
            },
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb3JlLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFBLDRGQUFzRTtJQUd0RSxtQkFBeUIsR0FBRztRQUN4QixJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtZQUFFLE9BQU87UUFFcEMsT0FBTztZQUNILFNBQVMsRUFBRTtnQkFDUDs7Ozs7Ozs7Ozs7OzttQkFhRztnQkFDSCxPQUFPLEVBQUUsUUFBUTtnQkFFakI7Ozs7Ozs7Ozs7OzttQkFZRztnQkFDSCxPQUFPLEVBQUUsSUFBQSxxQkFBYSxHQUFFO2FBQzNCO1NBQ0osQ0FBQztJQUNOLENBQUM7SUFyQ0QsNEJBcUNDIn0=