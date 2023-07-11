"use strict";
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
const array_1 = require("@coffeekraken/sugar/array");
const exec_1 = require("@coffeekraken/sugar/exec");
const fs_1 = require("@coffeekraken/sugar/fs");
const path_1 = require("@coffeekraken/sugar/path");
const fs_2 = __importDefault(require("fs"));
const path_2 = __importDefault(require("path"));
const SViewRendererEngineTwigSettingsInterface_js_1 = __importDefault(require("./interface/SViewRendererEngineTwigSettingsInterface.js"));
class SViewRendererEngineTwig {
    constructor(settings) {
        this.settings = {};
        this.settings = settings !== null && settings !== void 0 ? settings : {};
    }
    render({ viewDotPath, viewRelPath, viewPath, data, sharedDataFilePath, viewRendererSettings, }) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            if (!fs_2.default.existsSync(viewRendererSettings.cacheDir)) {
                fs_2.default.mkdirSync(viewRendererSettings.cacheDir, {
                    recursive: true,
                });
            }
            if (!viewRelPath.includes('/')) {
                viewRelPath = viewRelPath.replace(/\.(?!md|twig)/gm, '/');
            }
            if (!viewRelPath.match(/\.twig$/)) {
                viewRelPath += '.twig';
            }
            // pass the shared data file path through the data
            data._sharedDataFilePath = sharedDataFilePath;
            const resPro = (0, exec_1.__execPhp)(path_2.default.resolve((0, path_1.__packageRootDir)((0, fs_1.__dirname)()), 'src/php/compile.php'), {
                rootDirs: (0, array_1.__unique)([...viewRendererSettings.rootDirs]),
                viewRelPath,
                data,
                cacheDir: viewRendererSettings.cacheDir,
            }, {
                paramsThroughFile: true,
            });
            resPro.catch((e) => {
                console.error(e);
                resolve({
                    error: e,
                });
            });
            const res = yield resPro;
            if (res.match(/^Twig\\Error\\[a-zA-Z]+Error/)) {
                resolve({
                    error: res,
                });
            }
            else {
                resolve({
                    value: res,
                });
            }
        }));
    }
}
exports.default = SViewRendererEngineTwig;
SViewRendererEngineTwig.id = 'twig';
SViewRendererEngineTwig.extensions = ['twig'];
SViewRendererEngineTwig.settingsInterface = SViewRendererEngineTwigSettingsInterface_js_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEscURBQXFEO0FBQ3JELG1EQUFxRDtBQUNyRCwrQ0FBbUQ7QUFDbkQsbURBQTREO0FBQzVELDRDQUFzQjtBQUN0QixnREFBMEI7QUFDMUIsMElBQWlIO0FBbUJqSCxNQUFxQix1QkFBdUI7SUFNeEMsWUFBWSxRQUFvRDtRQUZoRSxhQUFRLEdBQXFDLEVBQUUsQ0FBQztRQUc1QyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsTUFBTSxDQUFDLEVBQ0gsV0FBVyxFQUNYLFdBQVcsRUFDWCxRQUFRLEVBQ1IsSUFBSSxFQUNKLGtCQUFrQixFQUNsQixvQkFBb0IsR0FDdkI7UUFDRyxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7WUFDakMsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ2pELFlBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsUUFBUSxFQUFFO29CQUMxQyxTQUFTLEVBQUUsSUFBSTtpQkFDbEIsQ0FBQyxDQUFDO2FBQ047WUFFRCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDNUIsV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDN0Q7WUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDL0IsV0FBVyxJQUFJLE9BQU8sQ0FBQzthQUMxQjtZQUVELGtEQUFrRDtZQUNsRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsa0JBQWtCLENBQUM7WUFFOUMsTUFBTSxNQUFNLEdBQUcsSUFBQSxnQkFBUyxFQUNwQixjQUFNLENBQUMsT0FBTyxDQUNWLElBQUEsdUJBQWdCLEVBQUMsSUFBQSxjQUFTLEdBQUUsQ0FBQyxFQUM3QixxQkFBcUIsQ0FDeEIsRUFDRDtnQkFDSSxRQUFRLEVBQUUsSUFBQSxnQkFBUSxFQUFDLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdEQsV0FBVztnQkFDWCxJQUFJO2dCQUNKLFFBQVEsRUFBRSxvQkFBb0IsQ0FBQyxRQUFRO2FBQzFDLEVBQ0Q7Z0JBQ0ksaUJBQWlCLEVBQUUsSUFBSTthQUMxQixDQUNKLENBQUM7WUFFRixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFakIsT0FBTyxDQUFDO29CQUNKLEtBQUssRUFBRSxDQUFDO2lCQUNYLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxHQUFHLEdBQUcsTUFBTSxNQUFNLENBQUM7WUFFekIsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLDhCQUE4QixDQUFDLEVBQUU7Z0JBQzNDLE9BQU8sQ0FBQztvQkFDSixLQUFLLEVBQUUsR0FBRztpQkFDYixDQUFDLENBQUM7YUFDTjtpQkFBTTtnQkFDSCxPQUFPLENBQUM7b0JBQ0osS0FBSyxFQUFFLEdBQUc7aUJBQ2IsQ0FBQyxDQUFDO2FBQ047UUFDTCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7QUF0RUwsMENBdUVDO0FBdEVVLDBCQUFFLEdBQUcsTUFBTSxDQUFDO0FBQ1osa0NBQVUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3RCLHlDQUFpQixHQUFHLHFEQUEwQyxDQUFDIn0=