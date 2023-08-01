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
            const outputJsonPath = `${(0, path_1.__homeDir)()}/.dobby/tmp/${Date.now()}.json`;
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
                var _a;
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
                fs_2.default.writeFileSync(`${(0, path_1.__homeDir)()}/.dobby/lighthouse.json`, JSON.stringify(result, null, 4));
                resolve(Object.assign(Object.assign(Object.assign({}, _super.end.call(this)), result), { status,
                    logs }));
            });
        }));
    }
}
exports.default = SDobbyLighthouseTask;
SDobbyLighthouseTask.settingsSpecs = specs_1.SDobbyLighthouseTaskSpec;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1REFBeUQ7QUFDekQsK0RBQXlDO0FBRXpDLG9FQUE2QztBQUM3QywrQ0FBeUQ7QUFDekQsbURBQXFEO0FBRXJELDRDQUFzQjtBQUN0QixnREFBMEI7QUFFMUIsOENBQThEO0FBUzlELDBDQUEwQztBQUMxQyw4REFBZ0Q7QUFFaEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsTUFBcUIsb0JBQ2pCLFNBQVEsb0JBQVk7SUFPcEI7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxTQUE0QjtRQUNwQyxLQUFLLENBQUMsSUFBQSxvQkFBVyxFQUFDLEVBQUUsRUFBRSxTQUFTLGFBQVQsU0FBUyxjQUFULFNBQVMsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxHQUFHOzs7OztRQUNDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTs7WUFDakMsTUFBTSxPQUFNLEtBQUssV0FBRSxDQUFDO1lBRXBCLE1BQU0sYUFBYSxHQUFHLGlCQUFRLENBQUMsS0FBSyxDQUNoQyxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxtQ0FBSSxFQUFFLEVBQ3pCLGdDQUF3QixDQUMzQixDQUFDO1lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO1lBQzFCLE1BQU0sTUFBTSxHQUFnQyxFQUFFLENBQUM7WUFDL0MsTUFBTSxjQUFjLEdBQUcsR0FBRyxJQUFBLGdCQUFTLEdBQUUsZUFBZSxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQztZQUV0RSxJQUFBLG9CQUFlLEVBQUMsY0FBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBRWhELE1BQU0sT0FBTyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQ2hD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