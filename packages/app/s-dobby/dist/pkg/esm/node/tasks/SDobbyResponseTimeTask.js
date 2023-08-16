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
import __SSpecs from '@coffeekraken/s-specs';
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
SDobbyTask.settingsSpecs = SDobbyResponseTimeTaskSpec;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLFlBQVksTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFTaEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsTUFBTSxDQUFDLE9BQU8sT0FBTyxVQUFXLFNBQVEsWUFBWTtJQUtoRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFNBQTRCO1FBQ3BDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLFNBQVMsYUFBVCxTQUFTLGNBQVQsU0FBUyxHQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELEdBQUc7Ozs7O1FBQ0MsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFOztZQUNqQyxNQUFNLE9BQU0sS0FBSyxXQUFFLENBQUM7WUFFcEIsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FDaEMsTUFBQSxJQUFJLENBQUMsUUFBUSxtQ0FBSSxFQUFFLEVBQ25CLDBCQUEwQixDQUM3QixDQUFDO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFFckMsd0NBQXdDO1lBQ3hDLHNEQUFzRDtZQUN0RCxRQUFRO1lBQ1IsaURBQWlEO1lBQ2pELFNBQVM7WUFDVCxLQUFLO1lBRUwsNkRBQTZEO1lBQzdELGlEQUFpRDtZQUNqRCxzQ0FBc0M7WUFDdEMsTUFBTTtZQUVOLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQztZQUN2Qiw0Q0FBNEM7WUFDNUMsd0JBQXdCO1lBQ3hCLFdBQVc7WUFDWCxnQ0FBZ0M7WUFDaEMsOEJBQThCO1lBQzlCLFFBQVE7WUFDUix3QkFBd0I7WUFDeEIsOEJBQThCO1lBQzlCLFFBQVE7WUFDUixJQUFJO1lBRUosTUFBTSxXQUFXLEdBQUcsTUFBTSxPQUFNLEdBQUcsWUFBQztnQkFDaEMsb0JBQW9CO2dCQUNwQixLQUFLLEVBQUUsSUFBSTtnQkFDWCxNQUFNO2dCQUNOLGdCQUFnQjtnQkFDaEIsWUFBWSxFQUFFLElBQUk7Z0JBQ2xCLG1CQUFtQjtnQkFDbkIsSUFBSSxFQUFFLElBQUk7Z0JBQ1Ysc0JBQXNCO2dCQUN0QixJQUFJLEVBQUUsRUFBRTthQUNYLENBQUMsQ0FBQztZQUVILE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUEsQ0FBQyxDQUFDO0tBQ047O0FBbEVNLHdCQUFhLEdBQUcsMEJBQTBCLENBQUMifQ==