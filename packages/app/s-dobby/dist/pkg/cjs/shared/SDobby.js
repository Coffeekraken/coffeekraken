"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
// import __SPromise from '@coffeekraken/s-promise';
const object_1 = require("@coffeekraken/sugar/object");
const SDobbyLighthouseTask_js_1 = __importDefault(require("./tasks/SDobbyLighthouseTask.js"));
const SDobbyResponseTimeTask_js_1 = __importDefault(require("./tasks/SDobbyResponseTimeTask.js"));
/**
 * @name                SDobby
 * @namespace           node
 * @type                Class
 * @extends             SClass
 * @platform            node
 * @status              beta
 *
 * Dobby is your little friend that will keep an eye on your services like websites, api's, etc... and produce reports with tools like lighthouse, eco-index, and more.
 *
 * @param           {String}                    uid                     A unique id for your dobby process. ^[a-zA-Z0-9_-]+$
 * @param           {ISDobbySettings}          [settings={}]           Some settings to configure your dobby instance
 *
 * @event           ready               Dispatched when the dobby process is started successfully
 *
 * @example         js
 * import __SDobby from '@coffeekraken/s-dobby';
 * const dobby = new __SDobby();
 * dobby.start();
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SDobby extends s_class_1.default {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings) {
        super((0, object_1.__deepMerge)({}, settings !== null && settings !== void 0 ? settings : {}));
    }
}
exports.default = SDobby;
/**
 * @name        registeredTasks
 * @type        Object
 *
 * Store all the registered tasks classes by id
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SDobby.registeredTasks = {
    responseTime: SDobbyResponseTimeTask_js_1.default,
    lighthouse: SDobbyLighthouseTask_js_1.default,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLG9EQUFvRDtBQUNwRCx1REFBeUQ7QUFFekQsOEZBQXFFO0FBQ3JFLGtHQUF5RTtBQUl6RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUVILE1BQXFCLE1BQU8sU0FBUSxpQkFBUTtJQWlCeEM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUEwQjtRQUNsQyxLQUFLLENBQUMsSUFBQSxvQkFBVyxFQUFDLEVBQUUsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7O0FBN0JMLHlCQThCQztBQTNCRzs7Ozs7Ozs7R0FRRztBQUNJLHNCQUFlLEdBQUc7SUFDckIsWUFBWSxFQUFFLG1DQUF3QjtJQUN0QyxVQUFVLEVBQUUsaUNBQXNCO0NBQ3JDLENBQUMifQ==