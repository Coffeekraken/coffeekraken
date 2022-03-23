var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/s-interface", "@coffeekraken/s-log"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
    const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
    /**
     * @name                SSugarCliParamsInterface
     * @namespace           cli.interface
     * @type.                      Class
     * @extends             SInterface
     * @interface
     * @status              beta
     * @platform             node
     *
     * This class represent the interface that describe parameters of the SSugarCli class
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    class SSugarCliParamsInterface extends s_interface_1.default {
        static get _definition() {
            return {
                bench: {
                    type: {
                        type: 'Array<String> | Boolean',
                        splitChars: [','],
                    },
                    default: false,
                    explicit: true,
                },
                logPreset: {
                    type: 'String',
                    values: s_log_1.default.PRESETS,
                    default: 'default',
                    explicit: true,
                },
            };
        }
    }
    exports.default = SSugarCliParamsInterface;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyQ2xpUGFyYW1zSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N1Z2FyQ2xpUGFyYW1zSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQUEsNEVBQXFEO0lBQ3JELGdFQUF5QztJQUV6Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQkc7SUFDSCxNQUFxQix3QkFBeUIsU0FBUSxxQkFBWTtRQUM5RCxNQUFNLEtBQUssV0FBVztZQUNsQixPQUFPO2dCQUNILEtBQUssRUFBRTtvQkFDSCxJQUFJLEVBQUU7d0JBQ0YsSUFBSSxFQUFFLHlCQUF5Qjt3QkFDL0IsVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDO3FCQUNwQjtvQkFDRCxPQUFPLEVBQUUsS0FBSztvQkFDZCxRQUFRLEVBQUUsSUFBSTtpQkFDakI7Z0JBQ0QsU0FBUyxFQUFFO29CQUNQLElBQUksRUFBRSxRQUFRO29CQUNkLE1BQU0sRUFBRSxlQUFNLENBQUMsT0FBTztvQkFDdEIsT0FBTyxFQUFFLFNBQVM7b0JBQ2xCLFFBQVEsRUFBRSxJQUFJO2lCQUNqQjthQUNKLENBQUM7UUFDTixDQUFDO0tBQ0o7SUFuQkQsMkNBbUJDIn0=