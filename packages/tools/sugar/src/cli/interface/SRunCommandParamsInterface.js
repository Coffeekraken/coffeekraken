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
     * @name                SRunCommandParamsInterface
     * @namespace           cli.interface
     * @type.                      Class
     * @extends             SInterface
     * @interface
     * @status              beta
     * @platform             node
     *
     * This class represent the interface that describe parameters of the `sugar command.run` command
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    class SRunCommandParamsInterface extends s_interface_1.default {
        static get _definition() {
            return {
                command: {
                    type: 'String',
                    description: 'Specify the command you want to execute',
                    alias: 'c',
                },
                directory: {
                    type: 'String',
                    description: 'Specify where you want to execute this command. Can be a glob to execute command into multiple directories at once',
                    alias: 'd',
                },
                verbose: {
                    type: 'Boolean',
                    description: 'Specify if you want each process to log or not',
                    default: false,
                    alias: 'v',
                },
            };
        }
    }
    exports.default = SRunCommandParamsInterface;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1J1bkNvbW1hbmRQYXJhbXNJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUnVuQ29tbWFuZFBhcmFtc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFBLDRFQUFxRDtJQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQkc7SUFFSCxNQUFxQiwwQkFBMkIsU0FBUSxxQkFBWTtRQUNoRSxNQUFNLEtBQUssV0FBVztZQUNsQixPQUFPO2dCQUNILE9BQU8sRUFBRTtvQkFDTCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxXQUFXLEVBQUUseUNBQXlDO29CQUN0RCxLQUFLLEVBQUUsR0FBRztpQkFDYjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1AsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsV0FBVyxFQUNQLG9IQUFvSDtvQkFDeEgsS0FBSyxFQUFFLEdBQUc7aUJBQ2I7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLElBQUksRUFBRSxTQUFTO29CQUNmLFdBQVcsRUFBRSxnREFBZ0Q7b0JBQzdELE9BQU8sRUFBRSxLQUFLO29CQUNkLEtBQUssRUFBRSxHQUFHO2lCQUNiO2FBQ0osQ0FBQztRQUNOLENBQUM7S0FDSjtJQXRCRCw2Q0FzQkMifQ==