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
const SViewRendererEngineTwigSettingsInterface_1 = __importDefault(require("./interface/SViewRendererEngineTwigSettingsInterface"));
class SViewRendererEngineTwig {
    constructor(settings) {
        this.settings = {};
        this.settings = settings !== null && settings !== void 0 ? settings : {};
    }
    render(viewPath, data = {}, sharedDataFilePath, viewRendererSettings) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            if (!fs_2.default.existsSync(viewRendererSettings.cacheDir)) {
                fs_2.default.mkdirSync(viewRendererSettings.cacheDir, {
                    recursive: true,
                });
            }
            if (!viewPath.includes('/')) {
                viewPath = viewPath.replace(/\.(?!md|twig)/gm, '/');
            }
            if (!viewPath.match(/\.twig$/)) {
                viewPath += '.twig';
            }
            (0, array_1.__unique)([...viewRendererSettings.rootDirs]).forEach((path) => {
                viewPath = viewPath.replace(`${path}/`, '');
            });
            // pass the shared data file path through the data
            data._sharedDataFilePath = sharedDataFilePath;
            const resPro = (0, exec_1.__execPhp)(path_2.default.resolve((0, path_1.__packageRootDir)((0, fs_1.__dirname)()), 'src/php/compile.php'), {
                rootDirs: (0, array_1.__unique)([...viewRendererSettings.rootDirs]),
                viewPath,
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
SViewRendererEngineTwig.settingsInterface = SViewRendererEngineTwigSettingsInterface_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0EscURBQXFEO0FBQ3JELG1EQUFxRDtBQUNyRCwrQ0FBbUQ7QUFDbkQsbURBQTREO0FBQzVELDRDQUFzQjtBQUN0QixnREFBMEI7QUFDMUIsb0lBQThHO0FBaUI5RyxNQUFxQix1QkFBdUI7SUFNeEMsWUFBWSxRQUFvRDtRQUZoRSxhQUFRLEdBQXFDLEVBQUUsQ0FBQztRQUc1QyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsTUFBTSxDQUNGLFFBQWdCLEVBQ2hCLE9BQVksRUFBRSxFQUNkLGtCQUEwQixFQUMxQixvQkFBNEM7UUFFNUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNqRCxZQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLFFBQVEsRUFBRTtvQkFDMUMsU0FBUyxFQUFFLElBQUk7aUJBQ2xCLENBQUMsQ0FBQzthQUNOO1lBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3pCLFFBQVEsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ3ZEO1lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQzVCLFFBQVEsSUFBSSxPQUFPLENBQUM7YUFDdkI7WUFFRCxJQUFBLGdCQUFRLEVBQUMsQ0FBQyxHQUFHLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQzFELFFBQVEsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDaEQsQ0FBQyxDQUFDLENBQUM7WUFFSCxrREFBa0Q7WUFDbEQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLGtCQUFrQixDQUFDO1lBRTlDLE1BQU0sTUFBTSxHQUFHLElBQUEsZ0JBQVMsRUFDcEIsY0FBTSxDQUFDLE9BQU8sQ0FDVixJQUFBLHVCQUFnQixFQUFDLElBQUEsY0FBUyxHQUFFLENBQUMsRUFDN0IscUJBQXFCLENBQ3hCLEVBQ0Q7Z0JBQ0ksUUFBUSxFQUFFLElBQUEsZ0JBQVEsRUFBQyxDQUFDLEdBQUcsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3RELFFBQVE7Z0JBQ1IsSUFBSTtnQkFDSixRQUFRLEVBQUUsb0JBQW9CLENBQUMsUUFBUTthQUMxQyxFQUNEO2dCQUNJLGlCQUFpQixFQUFFLElBQUk7YUFDMUIsQ0FDSixDQUFDO1lBRUYsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRWpCLE9BQU8sQ0FBQztvQkFDSixLQUFLLEVBQUUsQ0FBQztpQkFDWCxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sR0FBRyxHQUFHLE1BQU0sTUFBTSxDQUFDO1lBRXpCLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxFQUFFO2dCQUMzQyxPQUFPLENBQUM7b0JBQ0osS0FBSyxFQUFFLEdBQUc7aUJBQ2IsQ0FBQyxDQUFDO2FBQ047aUJBQU07Z0JBQ0gsT0FBTyxDQUFDO29CQUNKLEtBQUssRUFBRSxHQUFHO2lCQUNiLENBQUMsQ0FBQzthQUNOO1FBQ0wsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNQLENBQUM7O0FBeEVMLDBDQXlFQztBQXhFVSwwQkFBRSxHQUFHLE1BQU0sQ0FBQztBQUNaLGtDQUFVLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN0Qix5Q0FBaUIsR0FBRyxrREFBMEMsQ0FBQyJ9