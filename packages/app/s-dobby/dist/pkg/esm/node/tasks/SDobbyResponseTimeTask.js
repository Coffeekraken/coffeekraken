var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SDobbyTask from '../SDobbyTask';
import { __ttfb } from '@coffeekraken/sugar/network';
import __SSpecs from '@coffeekraken/s-specs';
import __ping from 'ping';
import { SDobbyResponseTimeTaskSpec } from '../../shared/specs';
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
export default class SDobbyTask extends __SDobbyTask {
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
        super(__deepMerge({}, taskMetas !== null && taskMetas !== void 0 ? taskMetas : {}));
    }
    run() {
        const _super = Object.create(null, {
            start: { get: () => super.start },
            end: { get: () => super.end }
        });
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            yield _super.start.call(this);
            const finalSettings = __SSpecs.apply((_a = this.settings) !== null && _a !== void 0 ? _a : {}, SDobbyResponseTimeTaskSpec);
            let res = yield __ping.promise.probe(this.settings.url, {
                timeout: finalSettings.timeout / 1000,
            });
            const responseTime = res.alive ? parseFloat(res.avg) : -1;
            const ttfb = yield __ttfb(this.settings.url, {
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
            resolve(Object.assign(Object.assign({}, _super.end.call(this)), { alive: res.alive, status,
                responseTime, ttfb: ttfb.ttfb, logs: [res.output] }));
        }));
    }
}
SDobbyTask.settingsSpecs = SDobbyResponseTimeTaskSpec;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLFlBQVksTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXJELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUUxQixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQVNoRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLFVBQVcsU0FBUSxZQUFZO0lBS2hEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksU0FBNEI7UUFDcEMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsU0FBUyxhQUFULFNBQVMsY0FBVCxTQUFTLEdBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsR0FBRzs7Ozs7UUFDQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7O1lBQ2pDLE1BQU0sT0FBTSxLQUFLLFdBQUUsQ0FBQztZQUVwQixNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUNoQyxNQUFBLElBQUksQ0FBQyxRQUFRLG1DQUFJLEVBQUUsRUFDbkIsMEJBQTBCLENBQzdCLENBQUM7WUFFRixJQUFJLEdBQUcsR0FBRyxNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFO2dCQUNwRCxPQUFPLEVBQUUsYUFBYSxDQUFDLE9BQU8sR0FBRyxJQUFJO2FBQ3hDLENBQUMsQ0FBQztZQUVILE1BQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFELE1BQU0sSUFBSSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFO2dCQUN6QyxPQUFPLEVBQUUsYUFBYSxDQUFDLE9BQU87YUFDakMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDO1lBQ3ZCLElBQUksWUFBWSxLQUFLLENBQUMsQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDcEMsTUFBTSxHQUFHLE9BQU8sQ0FBQzthQUNwQjtpQkFBTTtnQkFDSCxJQUFJLFlBQVksR0FBRyxHQUFHLEVBQUU7b0JBQ3BCLE1BQU0sR0FBRyxTQUFTLENBQUM7aUJBQ3RCO2dCQUNELElBQUksSUFBSSxHQUFHLEdBQUcsRUFBRTtvQkFDWixNQUFNLEdBQUcsU0FBUyxDQUFDO2lCQUN0QjthQUNKO1lBRUQsT0FBTyxpQ0FDQSxPQUFNLEdBQUcsZ0JBQ1osS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLLEVBQ2hCLE1BQU07Z0JBQ04sWUFBWSxFQUNaLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUNmLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFDcEIsQ0FBQztRQUNQLENBQUMsQ0FBQSxDQUFDLENBQUM7S0FDTjs7QUF6RE0sd0JBQWEsR0FBRywwQkFBMEIsQ0FBQyJ9