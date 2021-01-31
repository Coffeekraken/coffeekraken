"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SPromise_1 = __importDefault(require("../../promise/SPromise"));
const SSugarAppProcess_1 = __importDefault(require("./SSugarAppProcess"));
const SSugarAppTerminalStdio_1 = __importDefault(require("./SSugarAppTerminalStdio"));
/**
 * @name            SSugarApp
 * @namespace       sugar.node.ui.sugar
 * @type            Class
 * @extends         SPromise
 * @wip
 *
 * This class represent the main sugar ui one. His work it to:
 * - Aggregate all the wanted modules registered through the ```sugar-app.config.js``` file
 * - Instantiate all the modules like frontend server, build scss, etc...
 * - Configure the frontend server to serve all the needed files like js or css ones, etc...
 * - Open a socket connection to allow the front modules parts to talk with the back parts easily
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @param       {Object}              [settings={}]           An object of settings to configure your sugar ui:
 * -
 *
 * @example         js
 * import SSugarApp from @coffeekraken/sugar/node/ui/sugar/SSugarApp';
 * const sugarUi = new SSugarApp();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SSugarApp extends SPromise_1.default {
    /**
     * @name              constructor
     * @type              Function
     * @constructor
     *
     * Constructor
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(stringArgs, settings = {}) {
        settings = deepMerge_1.default({
            id: 'SSugarApp',
            name: 'Sugar App'
        }, settings);
        super(settings);
        this._process = new SSugarAppProcess_1.default({
            process: {
                stdio: SSugarAppTerminalStdio_1.default
                // stdio: 'inherit'
            }
        });
        this._process.run(stringArgs);
    }
}
exports.default = SSugarApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyQXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N1Z2FyQXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHVFQUFpRDtBQUNqRCxzRUFBZ0Q7QUFFaEQsMEVBQW9EO0FBQ3BELHNGQUFnRTtBQUVoRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxNQUFxQixTQUFVLFNBQVEsa0JBQVU7SUFDL0M7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxVQUFVLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDbkMsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1lBQ0UsRUFBRSxFQUFFLFdBQVc7WUFDZixJQUFJLEVBQUUsV0FBVztTQUNsQixFQUNELFFBQVEsQ0FDVCxDQUFDO1FBRUYsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRWhCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSwwQkFBa0IsQ0FBQztZQUNyQyxPQUFPLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFLGdDQUF3QjtnQkFDL0IsbUJBQW1CO2FBQ3BCO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDaEMsQ0FBQztDQUNGO0FBOUJELDRCQThCQyJ9