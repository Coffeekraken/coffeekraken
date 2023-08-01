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
import { __ensureDirSync } from '@coffeekraken/sugar/fs';
import { __homeDir } from '@coffeekraken/sugar/path';
import __fs from 'fs';
import __path from 'path';
import { SDobbyLighthouseTaskSpec } from '../../shared/specs';
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
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            yield _super.start.call(this);
            const finalSettings = __SSpecs.apply((_a = this.metas.settings) !== null && _a !== void 0 ? _a : {}, SDobbyLighthouseTaskSpec);
            const logs = [];
            const result = {};
            const outputJsonPath = `${__homeDir()}/.dobby/tmp/${Date.now()}.json`;
            __ensureDirSync(__path.dirname(outputJsonPath));
            const command = __childProcess.spawn(`npx lighthouse https://coffeekraken.io --chrome-flags="--headless --window-size=1280,1080" --output=json --only-categories=accessibility,best-practices,performance,pwa,seo --output-path="${outputJsonPath}"`, [], {
                shell: true,
            });
            let status = 'success';
            command.stdout.on('data', (data) => {
                console.log(data.toString());
                logs.push(data.toString());
            });
            command.stderr.on('data', (data) => {
                console.log(data.toString());
                logs.push(data.toString());
            });
            command.on('error', (error) => {
                console.log(error.message);
                logs.push(error.message);
                status = 'error';
            });
            command.on('close', (code) => {
                var _a;
                // read the output json
                const outputJson = JSON.parse(__fs.readFileSync(outputJsonPath).toString());
                // delete the outputJson
                __fs.unlinkSync(outputJsonPath);
                // build the final result object
                result.lighthouseVersion = outputJson.lighthouseVersion;
                result.requestedUrl = outputJson.requestedUrl;
                result.userAgent = outputJson.userAgent;
                result.audits = {};
                for (let [auditId, audit] of Object.entries(outputJson.audits)) {
                    if (audit.score !== undefined && audit.score <= 0.33) {
                        result.audits[auditId] = {
                            id: audit.id,
                            title: audit.title,
                            description: audit.description,
                            score: audit.score,
                            displayValue: audit.displayValue,
                        };
                    }
                }
                result.categories = {};
                for (let [categoryId, category] of Object.entries((_a = outputJson.categories) !== null && _a !== void 0 ? _a : {})) {
                    result.categories[categoryId] = {
                        title: category.title,
                        score: category.score,
                        audits: [],
                    };
                    for (let [i, audit] of category.auditRefs.entries()) {
                        if (result.audits[audit.id]) {
                            result.categories[categoryId].audits.push(audit.id);
                        }
                    }
                }
                result.entities = [];
                for (let [i, entity] of outputJson.entities.entries()) {
                    result.entities.push({
                        name: entity.name,
                        origins: entity.origins,
                        homepage: entity.homepage,
                        category: entity.category,
                    });
                }
                result.screenshot = {
                    data: outputJson.fullPageScreenshot.screenshot.data,
                    width: outputJson.fullPageScreenshot.screenshot.width,
                    height: outputJson.fullPageScreenshot.screenshot.height,
                };
                // save the json
                __fs.writeFileSync(`${__homeDir()}/.dobby/lighthouse.json`, JSON.stringify(result, null, 4));
                resolve(Object.assign(Object.assign(Object.assign({}, _super.end.call(this)), result), { status,
                    logs }));
            });
        }));
    }
}
SDobbyLighthouseTask.settingsSpecs = SDobbyLighthouseTaskSpec;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLFlBQVksTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVyRCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBRTFCLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBUzlELDBDQUEwQztBQUMxQyxPQUFPLEtBQUssY0FBYyxNQUFNLGVBQWUsQ0FBQztBQUVoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLG9CQUNqQixTQUFRLFlBQVk7SUFPcEI7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxTQUE0QjtRQUNwQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxTQUFTLGFBQVQsU0FBUyxjQUFULFNBQVMsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxHQUFHOzs7OztRQUNDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTs7WUFDakMsTUFBTSxPQUFNLEtBQUssV0FBRSxDQUFDO1lBRXBCLE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQ2hDLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLG1DQUFJLEVBQUUsRUFDekIsd0JBQXdCLENBQzNCLENBQUM7WUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7WUFDMUIsTUFBTSxNQUFN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