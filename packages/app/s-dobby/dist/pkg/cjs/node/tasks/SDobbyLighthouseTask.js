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
exports.SDobbyLighthouseTaskSettingsSpecs = void 0;
const object_1 = require("@coffeekraken/sugar/object");
const SDobbyTask_1 = __importDefault(require("../SDobbyTask"));
const path_1 = require("@coffeekraken/sugar/path");
const s_specs_1 = __importDefault(require("@coffeekraken/s-specs"));
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
exports.SDobbyLighthouseTaskSettingsSpecs = {
    type: 'Object',
    title: 'Lighthouse settings',
    description: 'Specify some settings for your lighthouse task',
    props: {},
};
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
        _super.start.call(this);
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const finalSettings = s_specs_1.default.apply((_a = this.metas.settings) !== null && _a !== void 0 ? _a : {}, exports.SDobbyLighthouseTaskSettingsSpecs);
            const command = __childProcess.spawn(`npx lighthouse https://coffeekraken.io --chrome-flags="--headless --window-size=1280,1080" --output=json --only-categories=accessibility,best-practices,performance,pwa,seo --output-path="${(0, path_1.__homeDir)()}/report.json"`, [], {
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
exports.default = SDobbyLighthouseTask;
SDobbyLighthouseTask.settingsSpecs = exports.SDobbyLighthouseTaskSettingsSpecs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQXlEO0FBQ3pELCtEQUF5QztBQUV6QyxtREFBcUQ7QUFFckQsb0VBQTZDO0FBUTdDLDBDQUEwQztBQUMxQyw4REFBZ0Q7QUFFaEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRVUsUUFBQSxpQ0FBaUMsR0FBRztJQUM3QyxJQUFJLEVBQUUsUUFBUTtJQUNkLEtBQUssRUFBRSxxQkFBcUI7SUFDNUIsV0FBVyxFQUFFLGdEQUFnRDtJQUM3RCxLQUFLLEVBQUUsRUFBRTtDQUNaLENBQUM7QUFFRixNQUFxQixvQkFDakIsU0FBUSxvQkFBWTtJQUtwQjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFNBQTRCO1FBQ3BDLEtBQUssQ0FBQyxJQUFBLG9CQUFXLEVBQUMsRUFBRSxFQUFFLFNBQVMsYUFBVCxTQUFTLGNBQVQsU0FBUyxHQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELEdBQUc7Ozs7O1FBQ0MsT0FBTSxLQUFLLFlBQUc7UUFFZCxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7O1lBQ2pDLE1BQU0sYUFBYSxHQUFHLGlCQUFRLENBQUMsS0FBSyxDQUNoQyxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxtQ0FBSSxFQUFFLEVBQ3pCLHlDQUFpQyxDQUNwQyxDQUFDO1lBRUYsTUFBTSxPQUFPLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FDaEMsOExBQThMLElBQUEsZ0JBQVMsR0FBRSxlQUFlLEVBQ3hOLEVBQUUsRUFDRjtnQkFDSSxLQUFLLEVBQUUsSUFBSTtnQkFDWCxnQ0FBZ0M7YUFDbkMsQ0FDSixDQUFDO1lBRUYsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQzNDLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDekIsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDO2dCQUN2QixPQUFPLGlDQUNBLE9BQU0sR0FBRyxnQkFDWixNQUFNLElBQ1IsQ0FBQztnQkFFSCxPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQzFELENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFBLENBQUMsQ0FBQztLQUNOOztBQTVETCx1Q0E2REM7QUF6RFUsa0NBQWEsR0FBRyx5Q0FBaUMsQ0FBQyJ9