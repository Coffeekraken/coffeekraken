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
import { __ensureDirSync, __readJsonSync } from '@coffeekraken/sugar/fs';
import { __homeDir } from '@coffeekraken/sugar/path';
import __fs from 'fs';
import __path from 'path';
import { SDobbyEcoIndexTaskSpec } from '../../shared/specs';
import * as __childProcess from 'child_process';
/**
 * @name                SDobbyEcoIndexTask
 * @namespace           node
 * @type                Class
 * @extends             SDobbyTask
 * @platform            node
 * @status              beta
 *
 * This class represent an eco-index task
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
            const finalSettings = __SSpecs.apply((_a = this.settings) !== null && _a !== void 0 ? _a : {}, SDobbyEcoIndexTaskSpec);
            const logs = [];
            let status = 'success';
            let url = finalSettings.url;
            if (!url.match(/^https?\:\/\//)) {
                url = `https://${url}`;
            }
            const outputPath = `${__homeDir()}/.dobby/tmp`, outputFileName = `ecoindex-${Date.now()}.json`;
            __ensureDirSync(__path.dirname(outputPath));
            const child = __childProcess.spawn([
                `docker run --rm -v ${outputPath}:${outputPath} vvatelot/ecoindex-cli:latest ecoindex-cli`,
                `analyze --no-interaction --url ${url} --export-format json --output-file ${outputPath}/${outputFileName}`,
            ].join(' '), [], {
                shell: true,
            });
            child.stdout.on('data', (data) => {
                console.log(data.toString());
                logs.push(data.toString());
            });
            child.stderr.on('data', (data) => {
                console.log(data.toString());
                logs.push(data.toString());
            });
            child.on('error', (error) => {
                console.log(error.message);
                logs.push(error.message);
                status = 'error';
            });
            child.on('close', () => {
                var _a;
                let json = {
                    width: -1,
                    height: -1,
                    url,
                    size: -1,
                    nodes: -1,
                    requests: -1,
                    grade: 'F',
                    score: -1,
                    ges: -1,
                    water: -1,
                    ecoindex_version: '5.4.2-1',
                    date: Date.toString(),
                    page_type: 'website',
                };
                if (!__fs.existsSync(`${outputPath}/${outputFileName}`)) {
                    status = 'error';
                    logs.push(`The output file ${outputPath}/${outputFileName} does not exists...`);
                }
                else {
                    json = (_a = __readJsonSync(`${outputPath}/${outputFileName}`)) === null || _a === void 0 ? void 0 : _a[0];
                    if (json.score < 33) {
                        status = 'error';
                    }
                    else if (json.score < 66) {
                        status = 'warning';
                    }
                    else {
                        status = 'success';
                    }
                    // delete the outputJson
                    __fs.unlinkSync(`${outputPath}/${outputFileName}`);
                }
                resolve(Object.assign(Object.assign({}, _super.end.call(this)), { ecoindex: json, status,
                    logs }));
            });
        }));
    }
}
SDobbyTask.settingsSpecs = SDobbyEcoIndexTaskSpec;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLFlBQVksTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUUxQixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUU1RCxPQUFPLEtBQUssY0FBYyxNQUFNLGVBQWUsQ0FBQztBQVVoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLFVBQVcsU0FBUSxZQUFZO0lBS2hEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksU0FBNEI7UUFDcEMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsU0FBUyxhQUFULFNBQVMsY0FBVCxTQUFTLEdBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsR0FBRzs7Ozs7UUFDQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7O1lBQ2pDLE1BQU0sT0FBTSxLQUFLLFdBQUUsQ0FBQztZQUVwQixNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUNoQyxNQUFBLElBQUksQ0FBQyxRQUFRLG1DQUFJLEVBQUUsRUFDbkIsc0JBQXNCLENBQ3pCLENBQUM7WUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7WUFFMUIsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFD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