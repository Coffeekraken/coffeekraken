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
import { __homeDir } from '@coffeekraken/sugar/path';
import __SSpecs from '@coffeekraken/s-specs';
// import __lighthouse from 'lighthouse/';
import * as __childProcess from 'child_process';
/**
 * @name                SDobbyLighthouseTask
 * @namespace           node
 * @type                Class
 * @extends             SDobbyTask
 * @platform            node
 * @status              beta
 *
 * This class represent a lighthouse task
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
export const SDobbyLighthouseTaskSettingsSpecs = {
    type: 'Object',
    title: 'Lighthouse settings',
    description: 'Specify some settings for your lighthouse task',
    props: {},
};
export default class SDobbyLighthouseTask extends __SDobbyTask {
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
        _super.start.call(this);
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const finalSettings = __SSpecs.apply((_a = this.metas.settings) !== null && _a !== void 0 ? _a : {}, SDobbyLighthouseTaskSettingsSpecs);
            const command = __childProcess.spawn(`npx lighthouse https://coffeekraken.io --chrome-flags="--headless --window-size=1280,1080" --output=json --only-categories=accessibility,best-practices,performance,pwa,seo --output-path="${__homeDir()}/report.json"`, [], {
                shell: true,
                // maxBuffer: 1024 * 1024 * 100,
            });
            command.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
            });
            command.stderr.on('data', (data) => {
                console.log(`stderr: ${data}`);
            });
            command.on('error', (error) => {
                console.log(`error: ${error.message}`);
            });
            command.on('close', (code) => {
                let status = 'success';
                resolve(Object.assign(Object.assign({}, _super.end.call(this)), { status }));
                console.log(`child process exited with code ${code}`);
            });
        }));
    }
}
SDobbyLighthouseTask.settingsSpecs = SDobbyLighthouseTaskSettingsSpecs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLFlBQVksTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXJELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBUTdDLDBDQUEwQztBQUMxQyxPQUFPLEtBQUssY0FBYyxNQUFNLGVBQWUsQ0FBQztBQUVoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxNQUFNLENBQUMsTUFBTSxpQ0FBaUMsR0FBRztJQUM3QyxJQUFJLEVBQUUsUUFBUTtJQUNkLEtBQUssRUFBRSxxQkFBcUI7SUFDNUIsV0FBVyxFQUFFLGdEQUFnRDtJQUM3RCxLQUFLLEVBQUUsRUFBRTtDQUNaLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxPQUFPLG9CQUNqQixTQUFRLFlBQVk7SUFLcEI7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxTQUE0QjtRQUNwQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxTQUFTLGFBQVQsU0FBUyxjQUFULFNBQVMsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxHQUFHOzs7OztRQUNDLE9BQU0sS0FBSyxZQUFHO1FBRWQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFOztZQUNqQyxNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUNoQyxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxtQ0FBSSxFQUFFLEVBQ3pCLGlDQUFpQyxDQUNwQyxDQUFDO1lBRUYsTUFBTSxPQUFPLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FDaEMsOExBQThMLFNBQVMsRUFBRSxlQUFlLEVBQ3hOLEVBQUUsRUFDRjtnQkFDSSxLQUFLLEVBQUUsSUFBSTtnQkFDWCxnQ0FBZ0M7YUFDbkMsQ0FDSixDQUFDO1lBRUYsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQzNDLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDekIsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDO2dCQUN2QixPQUFPLGlDQUNBLE9BQU0sR0FBRyxnQkFDWixNQUFNLElBQ1IsQ0FBQztnQkFFSCxPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQzFELENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFBLENBQUMsQ0FBQztLQUNOOztBQXhETSxrQ0FBYSxHQUFHLGlDQUFpQyxDQUFDIn0=