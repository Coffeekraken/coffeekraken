var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/s-interface"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
    /**
     * @name                SSugarCliProcessKillParamsInterface
     * @namespace           cli.process.interface
     * @type.                      Class
     * @extends             SInterface
     * @interface
     * @status              beta
     * @platform             node
     *
     * This class represent the interface that describe parameters of the `sugar process.kill` command
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    class SSugarCliProcessKillParamsInterface extends s_interface_1.default {
        static get _definition() {
            return {
                id: {
                    description: 'Specify the process id you want to kill',
                    type: 'Number',
                    alias: 'i',
                },
                port: {
                    description: 'Specify the port on which the process you want to kill is binded',
                    type: 'Number',
                    alias: 'p',
                },
            };
        }
    }
    exports.default = SSugarCliProcessKillParamsInterface;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyQ2xpUHJvY2Vzc0tpbGxQYXJhbXNJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTU3VnYXJDbGlQcm9jZXNzS2lsbFBhcmFtc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFBLDRFQUFxRDtJQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQkc7SUFFSCxNQUFxQixtQ0FBb0MsU0FBUSxxQkFBWTtRQUN6RSxNQUFNLEtBQUssV0FBVztZQUNsQixPQUFPO2dCQUNILEVBQUUsRUFBRTtvQkFDQSxXQUFXLEVBQUUseUNBQXlDO29CQUN0RCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxLQUFLLEVBQUUsR0FBRztpQkFDYjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0YsV0FBVyxFQUNQLGtFQUFrRTtvQkFDdEUsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsS0FBSyxFQUFFLEdBQUc7aUJBQ2I7YUFDSixDQUFDO1FBQ04sQ0FBQztLQUNKO0lBaEJELHNEQWdCQyJ9