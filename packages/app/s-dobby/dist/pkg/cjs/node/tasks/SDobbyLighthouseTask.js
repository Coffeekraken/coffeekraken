"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const fs_1 = require("@coffeekraken/sugar/fs");
const path_1 = require("@coffeekraken/sugar/path");
const fs_2 = __importDefault(require("fs"));
const path_2 = __importDefault(require("path"));
const specs_1 = require("../../shared/specs");
// import __lighthouse from 'lighthouse/';
const __childProcess = __importStar(require("child_process"));
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
class SDobbyLighthouseTask extends SDobbyTask_1.default {
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
            const finalSettings = s_specs_1.default.apply((_a = this.metas.settings) !== null && _a !== void 0 ? _a : {}, specs_1.SDobbyLighthouseTaskSpec);
            const logs = [];
            const result = {};
            const outputJsonPath = `${(0, path_1.__homeDir)()}/.dobby/tmp/lighthouse${Date.now()}.json`;
            (0, fs_1.__ensureDirSync)(path_2.default.dirname(outputJsonPath));
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
                const outputJson = JSON.parse(fs_2.default.readFileSync(outputJsonPath).toString());
                // delete the outputJson
                fs_2.default.unlinkSync(outputJsonPath);
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
                fs_2.default.writeFileSync(`${(0, path_1.__homeDir)()}/.dobby/lighthouse.json`, JSON.stringify(result, null, 4));
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
exports.default = SDobbyLighthouseTask;
SDobbyLighthouseTask.settingsSpecs = specs_1.SDobbyLighthouseTaskSpec;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1REFBeUQ7QUFDekQsK0RBQXlDO0FBRXpDLG9FQUE2QztBQUM3QywrQ0FBeUQ7QUFDekQsbURBQXFEO0FBRXJELDRDQUFzQjtBQUN0QixnREFBMEI7QUFFMUIsOENBQThEO0FBUzlELDBDQUEwQztBQUMxQyw4REFBZ0Q7QUFFaEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsTUFBcUIsb0JBQ2pCLFNBQVEsb0JBQVk7SUFPcEI7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxTQUE0QjtRQUNwQyxLQUFLLENBQUMsSUFBQSxvQkFBVyxFQUFDLEVBQUUsRUFBRSxTQUFTLGFBQVQsU0FBUyxjQUFULFNBQVMsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxHQUFHOzs7OztRQUNDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTs7WUFDakMsTUFBTSxPQUFNLEtBQUssV0FBRSxDQUFDO1lBRXBCLE1BQU0sYUFBYSxHQUFHLGlCQUFRLENBQUMsS0FBSyxDQUNoQyxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxtQ0FBSSxFQUFFLEVBQ3pCLGdDQUF3QixDQUMzQixDQUFDO1lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO1lBQzFCLE1BQU0sTUFBTSxHQUFnQyxFQUFFLENBQUM7WUFDL0MsTUFBTSxjQUFjLEdBQUcsR0FBRyxJQUFBLGdCQUFTLEdBQUUseUJBQXlCLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDO1lBRWhGLElBQUEsb0JBQWUsRUFBQyxjQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFFaEQsTUFBTSxPQUFPLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FD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