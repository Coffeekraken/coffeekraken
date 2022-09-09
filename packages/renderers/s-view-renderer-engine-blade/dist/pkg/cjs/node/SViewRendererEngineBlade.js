"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_bench_1 = __importDefault(require("@coffeekraken/s-bench"));
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const fs_1 = require("@coffeekraken/sugar/fs");
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const execPhp_1 = __importDefault(require("@coffeekraken/sugar/node/php/execPhp"));
const unique_1 = __importDefault(require("@coffeekraken/sugar/shared/array/unique"));
const fs_2 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const SViewRendererEngineBladeSettingsInterface_1 = __importDefault(require("./interface/SViewRendererEngineBladeSettingsInterface"));
class SViewRendererEngineBlade {
    constructor(settings) {
        this.settings = {};
        this.settings = settings !== null && settings !== void 0 ? settings : {};
    }
    render(viewPath, data = {}, sharedDataFilePath, viewRendererSettings) {
        return new s_promise_1.default(({ resolve, reject, emit }) => {
            if (!fs_2.default.existsSync(viewPath)) {
                return reject(`It seems that the view you passed "<cyan>${viewPath}</cyan>" does not exists...`);
            }
            s_bench_1.default.start('SViewRendererEngineBlade.render');
            s_bench_1.default.step('SViewRendererEngineBlade.render', `beforeRender.${viewPath}`);
            if (!fs_2.default.existsSync(viewRendererSettings.cacheDir)) {
                fs_2.default.mkdirSync(viewRendererSettings.cacheDir, {
                    recursive: true,
                });
            }
            let viewDotPath = viewPath;
            (0, unique_1.default)([...viewRendererSettings.rootDirs]).forEach((path) => {
                viewDotPath = viewDotPath.replace(`${path}/`, '');
            });
            viewDotPath = viewDotPath
                .split('/')
                .join('.')
                .replace('.blade.php', '');
            // pass the shared data file path through the data
            data._sharedDataFilePath = sharedDataFilePath;
            const resPro = (0, execPhp_1.default)(path_1.default.resolve((0, packageRoot_1.default)((0, fs_1.__dirname)()), 'src/php/compile.php'), {
                rootDirs: (0, unique_1.default)([...viewRendererSettings.rootDirs]),
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
                s_bench_1.default.step('SViewRendererEngineBlade.render', `afterRender.${viewPath}`);
                s_bench_1.default.end('SViewRendererEngineBlade.render').log();
            }, (e) => {
                // @TODO            make the 'log' event displayed on the terminal
                emit('log', {
                    type: s_log_1.default.TYPE_ERROR,
                    value: e,
                });
                resolve({
                    error: e,
                });
                s_bench_1.default.step('SViewRendererEngineBlade.render', `afterRender.${viewPath}`);
                s_bench_1.default.end('SViewRendererEngineBlade.render').log();
            });
        }, {
            eventEmitter: {
                bind: this,
            },
        });
    }
}
exports.default = SViewRendererEngineBlade;
SViewRendererEngineBlade.id = 'blade';
SViewRendererEngineBlade.extensions = ['blade.php'];
SViewRendererEngineBlade.settingsInterface = SViewRendererEngineBladeSettingsInterface_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLGdFQUF5QztBQUN6Qyx3RUFBaUQ7QUFFakQsK0NBQW1EO0FBQ25ELDRGQUFzRTtBQUN0RSxtRkFBNkQ7QUFDN0QscUZBQStEO0FBQy9ELDRDQUFzQjtBQUN0QixnREFBMEI7QUFDMUIsc0lBQWdIO0FBaUJoSCxNQUFxQix3QkFBd0I7SUFNekMsWUFBWSxRQUFxRDtRQUZqRSxhQUFRLEdBQXNDLEVBQUUsQ0FBQztRQUc3QyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsTUFBTSxDQUNGLFFBQWdCLEVBQ2hCLE9BQVksRUFBRSxFQUNkLGtCQUEwQixFQUMxQixvQkFBNEM7UUFFNUMsT0FBTyxJQUFJLG1CQUFVLENBQ2pCLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQzVCLE9BQU8sTUFBTSxDQUNULDRDQUE0QyxRQUFRLDZCQUE2QixDQUNwRixDQUFDO2FBQ0w7WUFDRCxpQkFBUSxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1lBRWxELGlCQUFRLENBQUMsSUFBSSxDQUNULGlDQUFpQyxFQUNqQyxnQkFBZ0IsUUFBUSxFQUFFLENBQzdCLENBQUM7WUFFRixJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDakQsWUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLEVBQUU7b0JBQzFDLFNBQVMsRUFBRSxJQUFJO2lCQUNsQixDQUFDLENBQUM7YUFDTjtZQUVELElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQztZQUMzQixJQUFBLGdCQUFRLEVBQUMsQ0FBQyxHQUFHLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQzFELFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDdEQsQ0FBQyxDQUFDLENBQUM7WUFDSCxXQUFXLEdBQUcsV0FBVztpQkFDcEIsS0FBSyxDQUFDLEdBQUcsQ0FBQztpQkFDVixJQUFJLENBQUMsR0FBRyxDQUFDO2lCQUNULE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFL0Isa0RBQWtEO1lBQ2xELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxrQkFBa0IsQ0FBQztZQUU5QyxNQUFNLE1BQU0sR0FBRyxJQUFBLGlCQUFTLEVBQ3BCLGNBQU0sQ0FBQyxPQUFPLENBQ1YsSUFBQSxxQkFBYSxFQUFDLElBQUEsY0FBUyxHQUFFLENBQUMsRUFDMUIscUJBQXFCLENBQ3hCLEVBQ0Q7Z0JBQ0ksUUFBUSxFQUFFLElBQUEsZ0JBQVEsRUFBQyxDQUFDLEdBQUcsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3RELFdBQVc7Z0JBQ1gsSUFBSTtnQkFDSixRQUFRLEVBQUUsb0JBQW9CLENBQUMsUUFBUTthQUMxQyxFQUNEO2dCQUNJLGlCQUFpQixFQUFFLElBQUk7YUFDMUIsQ0FDSixDQUFDO1lBRUYsTUFBTSxDQUFDLElBQUksQ0FDUCxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNKLE9BQU8sQ0FBQztvQkFDSixLQUFLLEVBQUUsR0FBRztpQkFDYixDQUFDLENBQUM7Z0JBRUgscUJBQXFCO2dCQUVyQixpQkFBUSxDQUFDLElBQUksQ0FDVCxpQ0FBaUMsRUFDakMsZUFBZSxRQUFRLEVBQUUsQ0FDNUIsQ0FBQztnQkFFRixpQkFBUSxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQzFELENBQUMsRUFDRCxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNGLGtFQUFrRTtnQkFDbEUsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixJQUFJLEVBQUUsZUFBTSxDQUFDLFVBQVU7b0JBQ3ZCLEtBQUssRUFBRSxDQUFDO2lCQUNYLENBQUMsQ0FBQztnQkFFSCxPQUFPLENBQUM7b0JBQ0osS0FBSyxFQUFFLENBQUM7aUJBQ1gsQ0FBQyxDQUFDO2dCQUVILGlCQUFRLENBQUMsSUFBSSxDQUNULGlDQUFpQyxFQUNqQyxlQUFlLFFBQVEsRUFBRSxDQUM1QixDQUFDO2dCQUVGLGlCQUFRLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDMUQsQ0FBQyxDQUNKLENBQUM7UUFDTixDQUFDLEVBQ0Q7WUFDSSxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLElBQUk7YUFDYjtTQUNKLENBQ0osQ0FBQztJQUNOLENBQUM7O0FBekdMLDJDQTBHQztBQXpHVSwyQkFBRSxHQUFHLE9BQU8sQ0FBQztBQUNiLG1DQUFVLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUMzQiwwQ0FBaUIsR0FBRyxtREFBMkMsQ0FBQyJ9