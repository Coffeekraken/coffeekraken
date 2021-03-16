"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const s_promise_1 = __importDefault(require("../@coffeekraken/s-promise"));
const SSugarAppProcess_1 = __importDefault(require("./SSugarAppProcess"));
const SSugarAppTerminalStdio_1 = __importDefault(require("./SSugarAppTerminalStdio"));
/**
 * @name            SSugarApp
 * @namespace       sugar.node.ui.sugar
 * @type            Class
 * @extends         SPromise
 * @status              wip
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
class SSugarApp extends s_promise_1.default {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyQXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL25vZGUvYXBwL3N1Z2FyL1NTdWdhckFwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCx1RUFBaUQ7QUFDakQsMkVBQW9EO0FBRXBELDBFQUFvRDtBQUNwRCxzRkFBZ0U7QUFFaEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsTUFBcUIsU0FBVSxTQUFRLG1CQUFVO0lBQy9DOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksVUFBVSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQ25DLFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtZQUNFLEVBQUUsRUFBRSxXQUFXO1lBQ2YsSUFBSSxFQUFFLFdBQVc7U0FDbEIsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUVGLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVoQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksMEJBQWtCLENBQUM7WUFDckMsT0FBTyxFQUFFO2dCQUNQLEtBQUssRUFBRSxnQ0FBd0I7Z0JBQy9CLG1CQUFtQjthQUNwQjtTQUNGLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Q0FDRjtBQTlCRCw0QkE4QkMifQ==