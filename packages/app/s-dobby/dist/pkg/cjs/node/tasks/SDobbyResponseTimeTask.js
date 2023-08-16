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
const s_specs_1 = __importDefault(require("@coffeekraken/s-specs"));
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
            console.log('SETTTT', finalSettings);
            // let res = await __ping.promise.probe(
            //     this.settings.url.replace(/^https?\:\/\//, ''),
            //     {
            //         timeout: finalSettings.timeout / 1000,
            //     },
            // );
            // const responseTime = res.alive ? parseFloat(res.avg) : -1;
            // const ttfb = await __ttfb(this.settings.url, {
            //     timeout: finalSettings.timeout,
            // });
            let status = 'success';
            // if (responseTime === -1 || ttfb === -1) {
            //     status = 'error';
            // } else {
            //     if (responseTime > 100) {
            //         status = 'warning';
            //     }
            //     if (ttfb > 150) {
            //         status = 'warning';
            //     }
            // }
            const finalResult = yield _super.end.call(this, {
                // alive: res.alive,
                alive: true,
                status,
                // responseTime,
                responseTime: 1200,
                // ttfb: ttfb.ttfb,
                ttfb: 1200,
                // logs: [res.output],
                logs: [],
            });
            resolve(finalResult);
        }));
    }
}
exports.default = SDobbyTask;
SDobbyTask.settingsSpecs = specs_1.SDobbyResponseTimeTaskSpec;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQXlEO0FBQ3pELCtEQUF5QztBQUV6QyxvRUFBNkM7QUFFN0MsOENBQWdFO0FBU2hFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE1BQXFCLFVBQVcsU0FBUSxvQkFBWTtJQUtoRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFNBQTRCO1FBQ3BDLEtBQUssQ0FBQyxJQUFBLG9CQUFXLEVBQUMsRUFBRSxFQUFFLFNBQVMsYUFBVCxTQUFTLGNBQVQsU0FBUyxHQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELEdBQUc7Ozs7O1FBQ0MsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFOztZQUNqQyxNQUFNLE9BQU0sS0FBSyxXQUFFLENBQUM7WUFFcEIsTUFBTSxhQUFhLEdBQUcsaUJBQVEsQ0FBQyxLQUFLLENBQ2hDLE1BQUEsSUFBSSxDQUFDLFFBQVEsbUNBQUksRUFBRSxFQUNuQixrQ0FBMEIsQ0FDN0IsQ0FBQztZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBRXJDLHdDQUF3QztZQUN4QyxzREFBc0Q7WUFDdEQsUUFBUTtZQUNSLGlEQUFpRDtZQUNqRCxTQUFTO1lBQ1QsS0FBSztZQUVMLDZEQUE2RDtZQUM3RCxpREFBaUQ7WUFDakQsc0NBQXNDO1lBQ3RDLE1BQU07WUFFTixJQUFJLE1BQU0sR0FBRyxTQUFTLENBQUM7WUFDdkIsNENBQTRDO1lBQzVDLHdCQUF3QjtZQUN4QixXQUFXO1lBQ1gsZ0NBQWdDO1lBQ2hDLDhCQUE4QjtZQUM5QixRQUFRO1lBQ1Isd0JBQXdCO1lBQ3hCLDhCQUE4QjtZQUM5QixRQUFRO1lBQ1IsSUFBSTtZQUVKLE1BQU0sV0FBVyxHQUFHLE1BQU0sT0FBTSxHQUFHLFlBQUM7Z0JBQ2hDLG9CQUFvQjtnQkFDcEIsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsTUFBTTtnQkFDTixnQkFBZ0I7Z0JBQ2hCLFlBQVksRUFBRSxJQUFJO2dCQUNsQixtQkFBbUI7Z0JBQ25CLElBQUksRUFBRSxJQUFJO2dCQUNWLHNCQUFzQjtnQkFDdEIsSUFBSSxFQUFFLEVBQUU7YUFDWCxDQUFDLENBQUM7WUFFSCxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFBLENBQUMsQ0FBQztLQUNOOztBQW5FTCw2QkFvRUM7QUFuRVUsd0JBQWEsR0FBRyxrQ0FBMEIsQ0FBQyJ9