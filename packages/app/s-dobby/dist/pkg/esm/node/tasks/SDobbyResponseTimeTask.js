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
import __ping from 'ping';
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
export const SDobbyResponseTimeTaskSettingsSpecs = {
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
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            _super.start.call(this);
            const finalSettings = __SSpecs.apply((_a = this.metas.settings) !== null && _a !== void 0 ? _a : {}, SDobbyResponseTimeTaskSettingsSpecs);
            let res = yield __ping.promise.probe('coffeekraken.io', {
                timeout: finalSettings.timeout,
            });
            return Object.assign(Object.assign({}, _super.end.call(this)), { alive: res.alive, responseTime: parseFloat(res.avg), logs: [res.output] });
        });
    }
}
SDobbyTask.settingsSpecs = SDobbyResponseTimeTaskSettingsSpecs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLFlBQVksTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBSzFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE1BQU0sQ0FBQyxNQUFNLG1DQUFtQyxHQUFHO0lBQy9DLElBQUksRUFBRSxRQUFRO0lBQ2QsS0FBSyxFQUFFLHdCQUF3QjtJQUMvQixXQUFXLEVBQUUsa0RBQWtEO0lBQy9ELEtBQUssRUFBRTtRQUNILE9BQU8sRUFBRTtZQUNMLElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLGNBQWM7WUFDckIsV0FBVyxFQUNQLGtFQUFrRTtZQUN0RSxPQUFPLEVBQUUsS0FBSztTQUNqQjtLQUNKO0NBQ0osQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLE9BQU8sVUFBVyxTQUFRLFlBQVk7SUFHaEQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxTQUF3QztRQUNoRCxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxTQUFTLGFBQVQsU0FBUyxjQUFULFNBQVMsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFSyxHQUFHOzs7Ozs7O1lBQ0wsT0FBTSxLQUFLLFlBQUc7WUFFZCxNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUNoQyxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxtQ0FBSSxFQUFFLEVBQ3pCLG1DQUFtQyxDQUN0QyxDQUFDO1lBRUYsSUFBSSxHQUFHLEdBQUcsTUFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRTtnQkFDcEQsT0FBTyxFQUFFLGFBQWEsQ0FBQyxPQUFPO2FBQ2pDLENBQUMsQ0FBQztZQUVILHVDQUNPLE9BQU0sR0FBRyxnQkFDWixLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUssRUFDaEIsWUFBWSxFQUFFLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQ2pDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFDcEI7O0tBQ0w7O0FBbENNLHdCQUFhLEdBQUcsbUNBQW1DLENBQUMifQ==