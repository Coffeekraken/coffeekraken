"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SSugarAppModuleTerminalUi_1 = __importDefault(require("../../app/sugar/SSugarAppModuleTerminalUi"));
/**
 * @name            SBuildFrontspecSugarAppTerminalUi
 * @namespace       sugar.node.build.frontspec
 * @type            Class
 * @extends         SSugarAppModuleTerminalUi
 * @status              wip
 *
 * This class represent the display of the build js module for the terminal
 *
 * @param           {Object}            [settings={}]           An object of settings to configure your display
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SBuildFrontspecSugarAppTerminalUi extends SSugarAppModuleTerminalUi_1.default {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since           2.0.0
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(sources, settings = {}) {
        super(sources, settings);
    }
}
exports.default = SBuildFrontspecSugarAppTerminalUi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0J1aWxkRnJvbnRzcGVjU3VnYXJBcHBUZXJtaW5hbFVpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0J1aWxkRnJvbnRzcGVjU3VnYXJBcHBUZXJtaW5hbFVpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDBHQUFvRjtBQUVwRjs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxNQUFxQixpQ0FBa0MsU0FBUSxtQ0FBMkI7SUFDeEY7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxPQUFPLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDaEMsS0FBSyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMzQixDQUFDO0NBQ0Y7QUFkRCxvREFjQyJ9