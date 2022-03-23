// @ts-nocheck
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
     * @name                SCliSugarPostcssPluginInstallParamsInterface
     * @namespace           cli.interface
     * @type.                      Class
     * @extends             SInterface
     * @interface
     * @status              beta
     * @platform             node
     *
     * This interface specify the parameters needed to the `sugar postcss.install` command.
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    class SCliSugarPostcssPluginInstallParamsInterface extends s_interface_1.default {
        static get _definition() {
            return {
                install: {
                    description: 'Specify if you want to install the postcss plugins automatcally',
                    type: 'Boolean',
                    default: true,
                },
            };
        }
    }
    exports.default = SCliSugarPostcssPluginInstallParamsInterface;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NsaVN1Z2FyUG9zdGNzc1BsdWdpbkluc3RhbGxQYXJhbXNJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ2xpU3VnYXJQb3N0Y3NzUGx1Z2luSW5zdGFsbFBhcmFtc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCw0RUFBcUQ7SUFFckQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILE1BQXFCLDRDQUE2QyxTQUFRLHFCQUFZO1FBQ2xGLE1BQU0sS0FBSyxXQUFXO1lBQ2xCLE9BQU87Z0JBQ0gsT0FBTyxFQUFFO29CQUNMLFdBQVcsRUFDUCxpRUFBaUU7b0JBQ3JFLElBQUksRUFBRSxTQUFTO29CQUNmLE9BQU8sRUFBRSxJQUFJO2lCQUNoQjthQUNKLENBQUM7UUFDTixDQUFDO0tBQ0o7SUFYRCwrREFXQyJ9