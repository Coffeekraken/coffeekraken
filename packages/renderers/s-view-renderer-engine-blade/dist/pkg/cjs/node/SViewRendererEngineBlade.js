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
const SViewRendererEngineBladeSettingsInterface_1 = __importDefault(require("./interface/SViewRendererEngineBladeSettingsInterface"));
class SViewRendererEngineBlade {
    constructor(settings) {
        this.settings = {};
        this.settings = settings !== null && settings !== void 0 ? settings : {};
    }
    render(viewPath, data = {}, sharedDataFilePath, viewRendererSettings) {
        return new Promise((resolve) => {
            const bench = new s_bench_1.default(`SViewRendererEngineBlade.render.${viewPath.replace((0, path_1.__packageRootDir)(), '')}`);
            bench.step(`beforeRender`);
            if (!fs_2.default.existsSync(viewRendererSettings.cacheDir)) {
                fs_2.default.mkdirSync(viewRendererSettings.cacheDir, {
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
SViewRendererEngineBlade.settingsInterface = SViewRendererEngineBladeSettingsInterface_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBRTdDLHFEQUFxRDtBQUNyRCxtREFBcUQ7QUFDckQsK0NBQW1EO0FBQ25ELG1EQUE0RDtBQUM1RCw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLHNJQUFnSDtBQWlCaEgsTUFBcUIsd0JBQXdCO0lBTXpDLFlBQVksUUFBcUQ7UUFGakUsYUFBUSxHQUFzQyxFQUFFLENBQUM7UUFHN0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELE1BQU0sQ0FDRixRQUFnQixFQUNoQixPQUFZLEVBQUUsRUFDZCxrQkFBMEIsRUFDMUIsb0JBQTRDO1FBRTVDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUMzQixNQUFNLEtBQUssR0FBRyxJQUFJLGlCQUFRLENBQ3RCLG1DQUFtQyxRQUFRLENBQUMsT0FBTyxDQUMvQyxJQUFBLHVCQUFnQixHQUFFLEVBQ2xCLEVBQUUsQ0FDTCxFQUFFLENBQ04sQ0FBQztZQUVGLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFFM0IsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ2pELFlBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsUUFBUSxFQUFFO29CQUMxQyxTQUFTLEVBQUUsSUFBSTtpQkFDbEIsQ0FBQyxDQUFDO2FBQ047WUFFRCxJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUM7WUFDM0IsSUFBQSxnQkFBUSxFQUFDLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUMxRCxXQUFXLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3RELENBQUMsQ0FBQyxDQUFDO1lBQ0gsV0FBVyxHQUFHLFdBQVc7aUJBQ3BCLEtBQUssQ0FBQyxHQUFHLENBQUM7aUJBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQztpQkFDVCxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRS9CLGtEQUFrRDtZQUNsRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsa0JBQWtCLENBQUM7WUFFOUMsTUFBTSxNQUFNLEdBQUcsSUFBQSxnQkFBUyxFQUNwQixjQUFNLENBQUMsT0FBTyxDQUNWLElBQUEsdUJBQWdCLEVBQUMsSUFBQSxjQUFTLEdBQUUsQ0FBQyxFQUM3QixxQkFBcUIsQ0FDeEIsRUFDRDtnQkFDSSxRQUFRLEVBQUUsSUFBQSxnQkFBUSxFQUFDLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdEQsV0FBVztnQkFDWCxJQUFJO2dCQUNKLFFBQVEsRUFBRSxvQkFBb0IsQ0FBQyxRQUFRO2FBQzFDLEVBQ0Q7Z0JBQ0ksaUJBQWlCLEVBQUUsSUFBSTthQUMxQixDQUNKLENBQUM7WUFFRixNQUFNLENBQUMsSUFBSSxDQUNQLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ0osT0FBTyxDQUFDO29CQUNKLEtBQUssRUFBRSxHQUFHO2lCQUNiLENBQUMsQ0FBQztnQkFFSCxxQkFBcUI7Z0JBRXJCLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNoQixDQUFDLEVBQ0QsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDRixrRUFBa0U7Z0JBQ2xFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRWpCLE9BQU8sQ0FBQztvQkFDSixLQUFLLEVBQUUsQ0FBQztpQkFDWCxDQUFDLENBQUM7Z0JBRUgsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLENBQUMsQ0FDSixDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOztBQWxGTCwyQ0FtRkM7QUFsRlUsMkJBQUUsR0FBRyxPQUFPLENBQUM7QUFDYixtQ0FBVSxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDM0IsMENBQWlCLEdBQUcsbURBQTJDLENBQUMifQ==