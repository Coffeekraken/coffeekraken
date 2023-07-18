"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDobbyResponseTimeTaskSettingsSpecs = void 0;
const object_1 = require("@coffeekraken/sugar/object");
const SDobbyTask_1 = __importDefault(require("../SDobbyTask"));
const s_specs_1 = __importDefault(require("@coffeekraken/s-specs"));
const ping_1 = __importDefault(require("ping"));
/**
 * @name                SDobbyResponseTimeTask
 * @namespace           node
 * @type                Class
 * @extends             SDobbyTask
 * @platform            node
 * @status              beta
 *
 * This class represent a response time task
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
exports.SDobbyResponseTimeTaskSettingsSpecs = {
    type: 'Object',
    title: 'Response time settings',
    description: 'Specify some settings for your responseTime task',
    props: {
        timeout: {
            type: 'Number',
            title: 'Timeout (ms)',
            description: 'Specify a timeout in ms before considering the target as offline',
            default: 10000,
        },
    },
};
class SDobbyTask extends SDobbyTask_1.default {
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
        super((0, object_1.__deepMerge)({}, taskMetas !== null && taskMetas !== void 0 ? taskMetas : {}));
    }
    run() {
        const _super = Object.create(null, {
            start: { get: () => super.start },
            end: { get: () => super.end }
        });
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            _super.start.call(this);
            const finalSettings = s_specs_1.default.apply((_a = this.metas.settings) !== null && _a !== void 0 ? _a : {}, exports.SDobbyResponseTimeTaskSettingsSpecs);
            let res = yield ping_1.default.promise.probe('coffeekraken.io', {
                timeout: finalSettings.timeout,
            });
            const responseTime = parseFloat(res.avg);
            let status = 'success';
            if (responseTime >= 200) {
                status = 'warning';
            }
            if (responseTime >= finalSettings.timeout) {
                status = 'error';
            }
            return Object.assign(Object.assign({}, _super.end.call(this)), { alive: res.alive, status,
                responseTime, logs: [res.output] });
        });
    }
}
exports.default = SDobbyTask;
SDobbyTask.settingsSpecs = exports.SDobbyResponseTimeTaskSettingsSpecs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVEQUF5RDtBQUN6RCwrREFBeUM7QUFFekMsb0VBQTZDO0FBRTdDLGdEQUEwQjtBQUkxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFVSxRQUFBLG1DQUFtQyxHQUFHO0lBQy9DLElBQUksRUFBRSxRQUFRO0lBQ2QsS0FBSyxFQUFFLHdCQUF3QjtJQUMvQixXQUFXLEVBQUUsa0RBQWtEO0lBQy9ELEtBQUssRUFBRTtRQUNILE9BQU8sRUFBRTtZQUNMLElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLGNBQWM7WUFDckIsV0FBVyxFQUNQLGtFQUFrRTtZQUN0RSxPQUFPLEVBQUUsS0FBSztTQUNqQjtLQUNKO0NBQ0osQ0FBQztBQUVGLE1BQXFCLFVBQVcsU0FBUSxvQkFBWTtJQUdoRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFNBQXdDO1FBQ2hELEtBQUssQ0FBQyxJQUFBLG9CQUFXLEVBQUMsRUFBRSxFQUFFLFNBQVMsYUFBVCxTQUFTLGNBQVQsU0FBUyxHQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVLLEdBQUc7Ozs7Ozs7WUFDTCxPQUFNLEtBQUssWUFBRztZQUVkLE1BQU0sYUFBYSxHQUFHLGlCQUFRLENBQUMsS0FBSyxDQUNoQyxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxtQ0FBSSxFQUFFLEVBQ3pCLDJDQUFtQyxDQUN0QyxDQUFDO1lBRUYsSUFBSSxHQUFHLEdBQUcsTUFBTSxjQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRTtnQkFDcEQsT0FBTyxFQUFFLGFBQWEsQ0FBQyxPQUFPO2FBQ2pDLENBQUMsQ0FBQztZQUVILE1BQU0sWUFBWSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFekMsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDO1lBQ3ZCLElBQUksWUFBWSxJQUFJLEdBQUcsRUFBRTtnQkFDckIsTUFBTSxHQUFHLFNBQVMsQ0FBQzthQUN0QjtZQUNELElBQUksWUFBWSxJQUFJLGFBQWEsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3ZDLE1BQU0sR0FBRyxPQUFPLENBQUM7YUFDcEI7WUFFRCx1Q0FDTyxPQUFNLEdBQUcsZ0JBQ1osS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLLEVBQ2hCLE1BQU07Z0JBQ04sWUFBWSxFQUNaLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFDcEI7O0tBQ0w7O0FBOUNMLDZCQStDQztBQTlDVSx3QkFBYSxHQUFHLDJDQUFtQyxDQUFDIn0=