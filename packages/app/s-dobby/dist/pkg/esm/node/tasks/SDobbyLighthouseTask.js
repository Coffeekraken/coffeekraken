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
            const outputJsonPath = `${__homeDir()}/.dobby/tmp/lighthouse${Date.now()}.json`;
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
                var _a, _b, _c;
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
                    if ([
                        'largest-contentful-paint',
                        'max-potential-fid',
                        'cumulative-layout-shift',
                    ].includes(auditId) ||
                        (audit.score !== undefined && audit.score <= 0.33)) {
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
                // check status
                let total = 0;
                for (let [id, category] of Object.entries((_b = result.categories) !== null && _b !== void 0 ? _b : {})) {
                    total += category.score * 100;
                }
                const categoriesCount = Object.keys((_c = result.categories) !== null && _c !== void 0 ? _c : {}).length, globalScore = Math.round((100 / (100 * categoriesCount)) * total);
                if (globalScore < 33) {
                    status = 'error';
                }
                else if (globalScore < 66) {
                    status = 'warning';
                }
                resolve(Object.assign(Object.assign(Object.assign({}, _super.end.call(this)), result), { status,
                    logs }));
            });
        }));
    }
}
SDobbyLighthouseTask.settingsSpecs = SDobbyLighthouseTaskSpec;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLFlBQVksTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVyRCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBRTFCLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBUzlELDBDQUEwQztBQUMxQyxPQUFPLEtBQUssY0FBYyxNQUFNLGVBQWUsQ0FBQztBQUVoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLG9CQUNqQixTQUFRLFlBQVk7SUFPcEI7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxTQUE0QjtRQUNwQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxTQUFTLGFBQVQsU0FBUyxjQUFULFNBQVMsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxHQUFHOzs7OztRQUNDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTs7WUFDakMsTUFBTSxPQUFNLEtBQUssV0FBRSxDQUFDO1lBRXBCLE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQ2hDLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLG1DQUFJLEVBQUUsRUFDekIsd0JBQXdCLENBQzNCLENBQUM7WUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7WUFDMUIsTUFBTSxNQUFN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