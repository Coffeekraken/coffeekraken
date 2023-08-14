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
const object_1 = require("@coffeekraken/sugar/object");
const SDobbyTask_1 = __importDefault(require("../SDobbyTask"));
const network_1 = require("@coffeekraken/sugar/network");
const s_specs_1 = __importDefault(require("@coffeekraken/s-specs"));
const ping_1 = __importDefault(require("ping"));
const specs_1 = require("../../shared/specs");
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
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            yield _super.start.call(this);
            const finalSettings = s_specs_1.default.apply((_a = this.settings) !== null && _a !== void 0 ? _a : {}, specs_1.SDobbyResponseTimeTaskSpec);
            let res = yield ping_1.default.promise.probe(this.settings.url.replace(/^https?\:\/\//, ''), {
                timeout: finalSettings.timeout / 1000,
            });
            const responseTime = res.alive ? parseFloat(res.avg) : -1;
            const ttfb = yield (0, network_1.__ttfb)(this.settings.url, {
                timeout: finalSettings.timeout,
            });
            let status = 'success';
            if (responseTime === -1 || ttfb === -1) {
                status = 'error';
            }
            else {
                if (responseTime > 100) {
                    status = 'warning';
                }
                if (ttfb > 150) {
                    status = 'warning';
                }
            }
            const finalResult = yield _super.end.call(this, {
                alive: res.alive,
                status,
                responseTime,
                ttfb: ttfb.ttfb,
                logs: [res.output],
            });
            resolve(finalResult);
        }));
    }
}
exports.default = SDobbyTask;
SDobbyTask.settingsSpecs = specs_1.SDobbyResponseTimeTaskSpec;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQXlEO0FBQ3pELCtEQUF5QztBQUV6Qyx5REFBcUQ7QUFFckQsb0VBQTZDO0FBRTdDLGdEQUEwQjtBQUUxQiw4Q0FBZ0U7QUFTaEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsTUFBcUIsVUFBVyxTQUFRLG9CQUFZO0lBS2hEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksU0FBNEI7UUFDcEMsS0FBSyxDQUFDLElBQUEsb0JBQVcsRUFBQyxFQUFFLEVBQUUsU0FBUyxhQUFULFNBQVMsY0FBVCxTQUFTLEdBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsR0FBRzs7Ozs7UUFDQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7O1lBQ2pDLE1BQU0sT0FBTSxLQUFLLFdBQUUsQ0FBQztZQUVwQixNQUFNLGFBQWEsR0FBRyxpQkFBUSxDQUFDLEtBQUssQ0FDaEMsTUFBQSxJQUFJLENBQUMsUUFBUSxtQ0FBSSxFQUFFLEVBQ25CLGtDQUEwQixDQUM3QixDQUFDO1lBRUYsSUFBSSxHQUFHLEdBQUcsTUFBTSxjQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUMsRUFDOUM7Z0JBQ0ksT0FBTyxFQUFFLGFBQWEsQ0FBQyxPQUFPLEdBQUcsSUFBSTthQUN4QyxDQUNKLENBQUM7WUFFRixNQUFNLFlBQVksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxRCxNQUFNLElBQUksR0FBRyxNQUFNLElBQUEsZ0JBQU0sRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRTtnQkFDekMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxPQUFPO2FBQ2pDLENBQUMsQ0FBQztZQUVILElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQztZQUN2QixJQUFJLFlBQVksS0FBSyxDQUFDLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ3BDLE1BQU0sR0FBRyxPQUFPLENBQUM7YUFDcEI7aUJBQU07Z0JBQ0gsSUFBSSxZQUFZLEdBQUcsR0FBRyxFQUFFO29CQUNwQixNQUFNLEdBQUcsU0FBUyxDQUFDO2lCQUN0QjtnQkFDRCxJQUFJLElBQUksR0FBRyxHQUFHLEVBQUU7b0JBQ1osTUFBTSxHQUFHLFNBQVMsQ0FBQztpQkFDdEI7YUFDSjtZQUVELE1BQU0sV0FBVyxHQUFHLE1BQU0sT0FBTSxHQUFHLFlBQUM7Z0JBQ2hDLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSztnQkFDaEIsTUFBTTtnQkFDTixZQUFZO2dCQUNaLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDZixJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO2FBQ3JCLENBQUMsQ0FBQztZQUVILE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUEsQ0FBQyxDQUFDO0tBQ047O0FBOURMLDZCQStEQztBQTlEVSx3QkFBYSxHQUFHLGtDQUEwQixDQUFDIn0=