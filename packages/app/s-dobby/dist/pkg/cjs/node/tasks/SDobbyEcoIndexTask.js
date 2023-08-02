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
const __childProcess = __importStar(require("child_process"));
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
class SDobbyTask extends SDobbyTask_1.default {
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
            const finalSettings = s_specs_1.default.apply((_a = this.settings) !== null && _a !== void 0 ? _a : {}, specs_1.SDobbyEcoIndexTaskSpec);
            const logs = [];
            let status = 'success';
            let url = finalSettings.url;
            if (!url.match(/^https?\:\/\//)) {
                url = `https://${url}`;
            }
            const outputPath = `${(0, path_1.__homeDir)()}/.dobby/tmp`, outputFileName = `ecoindex-${Date.now()}.json`;
            (0, fs_1.__ensureDirSync)(path_2.default.dirname(outputPath));
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
                if (!fs_2.default.existsSync(`${outputPath}/${outputFileName}`)) {
                    status = 'error';
                    logs.push(`The output file ${outputPath}/${outputFileName} does not exists...`);
                }
                else {
                    json = (_a = (0, fs_1.__readJsonSync)(`${outputPath}/${outputFileName}`)) === null || _a === void 0 ? void 0 : _a[0];
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
                    fs_2.default.unlinkSync(`${outputPath}/${outputFileName}`);
                }
                resolve(Object.assign(Object.assign({}, _super.end.call(this)), { ecoindex: json, status,
                    logs }));
            });
        }));
    }
}
exports.default = SDobbyTask;
SDobbyTask.settingsSpecs = specs_1.SDobbyEcoIndexTaskSpec;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1REFBeUQ7QUFDekQsK0RBQXlDO0FBRXpDLG9FQUE2QztBQUU3QywrQ0FBeUU7QUFDekUsbURBQXFEO0FBQ3JELDRDQUFzQjtBQUN0QixnREFBMEI7QUFFMUIsOENBQTREO0FBRTVELDhEQUFnRDtBQVVoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxNQUFxQixVQUFXLFNBQVEsb0JBQVk7SUFLaEQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxTQUE0QjtRQUNwQyxLQUFLLENBQUMsSUFBQSxvQkFBVyxFQUFDLEVBQUUsRUFBRSxTQUFTLGFBQVQsU0FBUyxjQUFULFNBQVMsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxHQUFHOzs7OztRQUNDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTs7WUFDakMsTUFBTSxPQUFNLEtBQUssV0FBRSxDQUFDO1lBRXBCLE1BQU0sYUFBYSxHQUFHLGlCQUFRLENBQUMsS0FBSyxDQUNoQyxNQUFBLElBQUksQ0FBQyxRQUFRLG1DQUFJLEVBQUUsRUFDbkIsOEJBQXNCLENBQ3pCLENBQUM7WUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7WUFFMUIsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDO1lBRXZCLElBQUksR0FBRyxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUM7WUFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEVBQUU7Z0JBQzdCLEdBQUcsR0FBRyxXQUFXLEdBQUcsRUFBRSxDQUFDO2FBQzFCO1lBRUQsTUFBTSxVQUFVLEdBQUcsR0FBRyxJQUFBLGdCQUFTLEdBQUUsYUFBYSxFQUMxQyxjQUFjLEdBQUcsWUFBWSxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQztZQUVuRCxJQUFBLG9CQUFlLEVBQUMsY0FBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBRTVDLE1BQU0sS0FBSyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQzlCO2dCQUNJLHNCQUFzQixVQUFVLElBQUksVUFBVSw0Q0FBNEM7Z0JBQzFGLGtDQUFrQyxHQUFHLHVDQUF1QyxVQUFVLElBQUksY0FBYyxFQUFFO2FBQzdHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUNYLEVBQUUsRUFDRjtnQkFDSSxLQUFLLEVBQUUsSUFBSTthQUNkLENBQ0osQ0FBQztZQUVGLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQy9CLENBQUMsQ0FBQyxDQUFDO1lBRUgsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDL0IsQ0FBQyxDQUFDLENBQUM7WUFFSCxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3pCLE1BQU0sR0FBRyxPQUFPLENBQUM7WUFDckIsQ0FBQyxDQUFDLENBQUM7WUFFSCxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7O2dCQUNuQixJQUFJLElBQUksR0FBb0I7b0JBQ3hCLEtBQUssRUFBRSxDQUFDLENBQUM7b0JBQ1QsTUFBTSxFQUFFLENBQUMsQ0FBQztvQkFDVixHQUFHO29CQUNILElBQUksRUFBRSxDQUFDLENBQUM7b0JBQ1IsS0FBSyxFQUFFLENBQUMsQ0FBQztvQkFDVCxRQUFRLEVBQUUsQ0FBQyxDQUFDO29CQUNaLEtBQUssRUFBRSxHQUFHO29CQUNWLEtBQUssRUFBRSxDQUFDLENBQUM7b0JBQ1QsR0FBRyxFQUFFLENBQUMsQ0FBQztvQkFDUCxLQUFLLEVBQUUsQ0FBQyxDQUFDO29CQUNULGdCQUFnQixFQUFFLFNBQVM7b0JBQzNCLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUNyQixTQUFTLEVBQUUsU0FBUztpQkFDdkIsQ0FBQztnQkFFRixJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFVBQVUsSUFBSSxjQUFjLEVBQUUsQ0FBQyxFQUFFO29CQUNyRCxNQUFNLEdBQUcsT0FBTyxDQUFDO29CQUNqQixJQUFJLENBQUMsSUFBSSxDQUNMLG1CQUFtQixVQUFVLElBQUksY0FBYyxxQkFBcUIsQ0FDdkUsQ0FBQztpQkFDTDtxQkFBTTtvQkFDSCxJQUFJLEdBQUcsTUFBQSxJQUFBLG1CQUFjLEVBQ2pCLEdBQUcsVUFBVSxJQUFJLGNBQWMsRUFBRSxDQUNwQywwQ0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDUCxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxFQUFFO3dCQUNqQixNQUFNLEdBQUcsT0FBTyxDQUFDO3FCQUNwQjt5QkFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxFQUFFO3dCQUN4QixNQUFNLEdBQUcsU0FBUyxDQUFDO3FCQUN0Qjt5QkFBTTt3QkFDSCxNQUFNLEdBQUcsU0FBUyxDQUFDO3FCQUN0QjtvQkFFRCx3QkFBd0I7b0JBQ3hCLFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxVQUFVLElBQUksY0FBYyxFQUFFLENBQUMsQ0FBQztpQkFDdEQ7Z0JBRUQsT0FBTyxpQ0FDQSxPQUFNLEdBQUcsZ0JBQ1osUUFBUSxFQUFFLElBQUksRUFDZCxNQUFNO29CQUNOLElBQUksSUFDTixDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUEsQ0FBQyxDQUFDO0tBQ047O0FBbkhMLDZCQW9IQztBQW5IVSx3QkFBYSxHQUFHLDhCQUFzQixDQUFDIn0=