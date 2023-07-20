"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const string_1 = require("@coffeekraken/sugar/string");
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
/**
 * @name                SDobbyTask
 * @namespace           node
 * @type                Class
 * @extends             SClass
 * @platform            node
 * @status              beta
 *
 * This class represent a base task
 *
 * @param           {ISDobbyTaskSettings}          [settings={}]           Some settings to configure your dobby task instance
 *
 * @example         js
 * import { __SDobbyTask } from '@coffeekraken/s-dobby';
 * export default class MyCoolDobbyAdapter extends __SDobbyTask {
 *   // ...
 * }
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SDobbyTask extends s_class_1.default {
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
    constructor(taskMetas) {
        super();
        this.metas = taskMetas;
    }
    start() {
        console.log(`<yellow>[SDobby]</yellow> Starting <magenta>${this.metas.name} (${this.metas.type})</magenta> task...`);
        this._time = Date.now();
        this._duration = new s_duration_1.default();
    }
    end() {
        const durationObj = this._duration.end();
        console.log(`<green>[SDobby]</green> Task <magenta>${this.metas.name} (${this.metas.type})</magenta> finished <green>successfully</green> in <cyan>${durationObj.formatedDuration}</cyan>`);
        return {
            uid: (0, string_1.__uniqid)(),
            time: this._time,
            duration: durationObj,
            task: this.metas,
        };
    }
}
exports.default = SDobbyTask;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBRTdDLHVEQUFzRDtBQUV0RCwwRUFBbUQ7QUFJbkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsTUFBcUIsVUFBVyxTQUFRLGlCQUFRO0lBWTVDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksU0FBNEI7UUFDcEMsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztJQUMzQixDQUFDO0lBS0QsS0FBSztRQUNELE9BQU8sQ0FBQyxHQUFHLENBQ1AsK0NBQStDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxxQkFBcUIsQ0FDMUcsQ0FBQztRQUNGLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxvQkFBVyxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVELEdBQUc7UUFDQyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQ1AseUNBQXlDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSw2REFBNkQsV0FBVyxDQUFDLGdCQUFnQixTQUFTLENBQ2pMLENBQUM7UUFDRixPQUFPO1lBQ0gsR0FBRyxFQUFFLElBQUEsaUJBQVEsR0FBRTtZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSztZQUNoQixRQUFRLEVBQUUsV0FBVztZQUNyQixJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUs7U0FDbkIsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQWxERCw2QkFrREMifQ==