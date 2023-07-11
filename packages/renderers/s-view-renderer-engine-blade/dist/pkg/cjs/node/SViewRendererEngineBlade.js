"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_bench_1 = __importDefault(require("@coffeekraken/s-bench"));
const array_1 = require("@coffeekraken/sugar/array");
const exec_1 = require("@coffeekraken/sugar/exec");
const fs_1 = require("@coffeekraken/sugar/fs");
const path_1 = require("@coffeekraken/sugar/path");
const fs_2 = __importDefault(require("fs"));
const path_2 = __importDefault(require("path"));
const SViewRendererEngineBladeSettingsInterface_js_1 = __importDefault(require("./interface/SViewRendererEngineBladeSettingsInterface.js"));
class SViewRendererEngineBlade {
    constructor(settings) {
        this.settings = {};
        this.settings = settings !== null && settings !== void 0 ? settings : {};
    }
    render(viewPath, data = {}, sharedDataFilePath, viewRendererSettings) {
        return new Promise((resolve) => {
            const bench = new s_bench_1.default(`SViewRendererEngineBlade.render.${viewPath.replace((0, path_1.__packageRootDir)(), '')}`);
            bench.step(`beforeRender`);
            if (!fs_2.default.existsSync(`${viewRendererSettings.cacheDir}/blade`)) {
                fs_2.default.mkdirSync(`${viewRendererSettings.cacheDir}/blade`, {
                    recursive: true,
                });
            }
            let viewDotPath = viewPath;
            (0, array_1.__unique)([...viewRendererSettings.rootDirs]).forEach((path) => {
                viewDotPath = viewDotPath.replace(`${path}/`, '');
            });
            viewDotPath = viewDotPath
                .split('/')
                .join('.')
                .replace('.blade.php', '');
            // pass the shared data file path through the data
            data._sharedDataFilePath = sharedDataFilePath;
            const resPro = (0, exec_1.__execPhp)(path_2.default.resolve((0, path_1.__packageRootDir)((0, fs_1.__dirname)()), 'src/php/compile.php'), {
                rootDirs: (0, array_1.__unique)([...viewRendererSettings.rootDirs]),
                viewDotPath,
                data,
                cacheDir: viewRendererSettings.cacheDir,
            }, {
                paramsThroughFile: true,
            });
            resPro.then((res) => {
                resolve({
                    value: res,
                });
                // if (res.match(//))
                bench.end();
            }, (e) => {
                // @TODO            make the 'log' event displayed on the terminal
                console.error(e);
                resolve({
                    error: e,
                });
                bench.end();
            });
        });
    }
}
exports.default = SViewRendererEngineBlade;
SViewRendererEngineBlade.id = 'blade';
SViewRendererEngineBlade.extensions = ['blade.php'];
SViewRendererEngineBlade.settingsInterface = SViewRendererEngineBladeSettingsInterface_js_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBRTdDLHFEQUFxRDtBQUNyRCxtREFBcUQ7QUFDckQsK0NBQW1EO0FBQ25ELG1EQUE0RDtBQUM1RCw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLDRJQUFtSDtBQW1CbkgsTUFBcUIsd0JBQXdCO0lBTXpDLFlBQVksUUFBcUQ7UUFGakUsYUFBUSxHQUFzQyxFQUFFLENBQUM7UUFHN0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELE1BQU0sQ0FDRixRQUFnQixFQUNoQixPQUFZLEVBQUUsRUFDZCxrQkFBMEIsRUFDMUIsb0JBQTRDO1FBRTVDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUMzQixNQUFNLEtBQUssR0FBRyxJQUFJLGlCQUFRLENBQ3RCLG1DQUFtQyxRQUFRLENBQUMsT0FBTyxDQUMvQyxJQUFBLHVCQUFnQixHQUFFLEVBQ2xCLEVBQUUsQ0FDTCxFQUFFLENBQ04sQ0FBQztZQUVGLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFFM0IsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxRQUFRLFFBQVEsQ0FBQyxFQUFFO2dCQUM1RCxZQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsb0JBQW9CLENBQUMsUUFBUSxRQUFRLEVBQUU7b0JBQ3JELFNBQVMsRUFBRSxJQUFJO2lCQUNsQixDQUFDLENBQUM7YUFDTjtZQUVELElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQztZQUMzQixJQUFBLGdCQUFRLEVBQUMsQ0FBQyxHQUFHLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQzFELFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDdEQsQ0FBQyxDQUFDLENBQUM7WUFDSCxXQUFXLEdBQUcsV0FBVztpQkFDcEIsS0FBSyxDQUFDLEdBQUcsQ0FBQztpQkFDVixJQUFJLENBQUMsR0FBRyxDQUFDO2lCQUNULE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFL0Isa0RBQWtEO1lBQ2xELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxrQkFBa0IsQ0FBQztZQUU5QyxNQUFNLE1BQU0sR0FBRyxJQUFBLGdCQUFTLEVBQ3BCLGNBQU0sQ0FBQyxPQUFPLENBQ1YsSUFBQSx1QkFBZ0IsRUFBQyxJQUFBLGNBQVMsR0FBRSxDQUFDLEVBQzdCLHFCQUFxQixDQUN4QixFQUNEO2dCQUNJLFFBQVEsRUFBRSxJQUFBLGdCQUFRLEVBQUMsQ0FBQyxHQUFHLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN0RCxXQUFXO2dCQUNYLElBQUk7Z0JBQ0osUUFBUSxFQUFFLG9CQUFvQixDQUFDLFFBQVE7YUFDMUMsRUFDRDtnQkFDSSxpQkFBaUIsRUFBRSxJQUFJO2FBQzFCLENBQ0osQ0FBQztZQUVGLE1BQU0sQ0FBQyxJQUFJLENBQ1AsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDSixPQUFPLENBQUM7b0JBQ0osS0FBSyxFQUFFLEdBQUc7aUJBQ2IsQ0FBQyxDQUFDO2dCQUVILHFCQUFxQjtnQkFFckIsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLENBQUMsRUFDRCxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNGLGtFQUFrRTtnQkFDbEUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFakIsT0FBTyxDQUFDO29CQUNKLEtBQUssRUFBRSxDQUFDO2lCQUNYLENBQUMsQ0FBQztnQkFFSCxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDaEIsQ0FBQyxDQUNKLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7O0FBbEZMLDJDQW1GQztBQWxGVSwyQkFBRSxHQUFHLE9BQU8sQ0FBQztBQUNiLG1DQUFVLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUMzQiwwQ0FBaUIsR0FBRyxzREFBMkMsQ0FBQyJ9