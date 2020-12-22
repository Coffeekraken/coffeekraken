"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SPromise_1 = __importDefault(require("../../promise/SPromise"));
const SSugarAppProcess_1 = __importDefault(require("./SSugarAppProcess"));
const SSugarAppTerminalUi_1 = __importDefault(require("./SSugarAppTerminalUi"));
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
     * @name          state
     * @type          String
     * @values        loading,ready,running,error
     * @default       loading
     *
     * Store the module state
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    // _state = 'loading';
    // get state() {
    //   return this._state;
    // }
    // set state(value) {
    //   this._setState(value);
    // }
    // _setState(value) {
    //   if (['loading', 'ready', 'error'].indexOf(value) === -1) {
    //     throw new __SError(
    //       `Sorry but the "<yellow>state</yellow>" property setted to "<magenta>${__toString(
    //         value
    //       )}</magenta>" of your "<cyan>${
    //         this.constructor.name
    //       }</cyan>" class can contain only one of these values: ${[
    //         'loading',
    //         'ready',
    //         'error'
    //       ]
    //         .map((i) => {
    //           return `"<green>${i}</green>"`;
    //         })
    //         .join(', ')}`
    //     );
    //   }
    //   // trigger an event
    //   this.trigger('state', value);
    //   this._state = value;
    // }
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
            stdio: SSugarAppTerminalUi_1.default
        });
        this._process.run(stringArgs);
    }
}
exports.default = SSugarApp;
//# sourceMappingURL=SSugarApp.js.map