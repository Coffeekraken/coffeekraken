"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_bench_1 = __importDefault(require("@coffeekraken/s-bench"));
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const execPhp_1 = __importDefault(require("@coffeekraken/sugar/node/php/execPhp"));
const unique_1 = __importDefault(require("@coffeekraken/sugar/shared/array/unique"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const SViewRendererEngineBladeSettingsInterface_1 = __importDefault(require("./interface/SViewRendererEngineBladeSettingsInterface"));
class SViewRendererEngineBlade {
    constructor(settings) {
        this.settings = {};
        this.settings = settings !== null && settings !== void 0 ? settings : {};
    }
    render(viewPath, data = {}, sharedDataFilePath, viewRendererSettings) {
        return new s_promise_1.default(({ resolve, reject, emit }) => {
            if (!fs_1.default.existsSync(viewPath)) {
                return reject(`It seems that the view you passed "<cyan>${viewPath}</cyan>" does not exists...`);
            }
            s_bench_1.default.start('SViewRendererEngineBlade.render');
            s_bench_1.default.step('SViewRendererEngineBlade.render', `beforeRender.${viewPath}`);
            if (!fs_1.default.existsSync(viewRendererSettings.cacheDir)) {
                fs_1.default.mkdirSync(viewRendererSettings.cacheDir, {
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
            const resPro = (0, execPhp_1.default)(path_1.default.resolve((0, packageRoot_1.default)((0, dirname_1.default)()), 'src/php/compile.php'), {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLGdFQUF5QztBQUN6Qyx3RUFBaUQ7QUFFakQsa0ZBQTREO0FBQzVELDRGQUFzRTtBQUN0RSxtRkFBNkQ7QUFDN0QscUZBQStEO0FBQy9ELDRDQUFzQjtBQUN0QixnREFBMEI7QUFDMUIsc0lBQWdIO0FBaUJoSCxNQUFxQix3QkFBd0I7SUFNekMsWUFBWSxRQUFxRDtRQUZqRSxhQUFRLEdBQXNDLEVBQUUsQ0FBQztRQUc3QyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsTUFBTSxDQUNGLFFBQWdCLEVBQ2hCLE9BQVksRUFBRSxFQUNkLGtCQUEwQixFQUMxQixvQkFBNEM7UUFFNUMsT0FBTyxJQUFJLG1CQUFVLENBQ2pCLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQzVCLE9BQU8sTUFBTSxDQUNULDRDQUE0QyxRQUFRLDZCQUE2QixDQUNwRixDQUFDO2FBQ0w7WUFDRCxpQkFBUSxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1lBRWxELGlCQUFRLENBQUMsSUFBSSxDQUNULGlDQUFpQyxFQUNqQyxnQkFBZ0IsUUFBUSxFQUFFLENBQzdCLENBQUM7WUFFRixJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDakQsWUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLEVBQUU7b0JBQzFDLFNBQVMsRUFBRSxJQUFJO2lCQUNsQixDQUFDLENBQUM7YUFDTjtZQUVELElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQztZQUMzQixJQUFBLGdCQUFRLEVBQUMsQ0FBQyxHQUFHLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQzFELFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDdEQsQ0FBQyxDQUFDLENBQUM7WUFDSCxXQUFXLEdBQUcsV0FBVztpQkFDcEIsS0FBSyxDQUFDLEdBQUcsQ0FBQztpQkFDVixJQUFJLENBQUMsR0FBRyxDQUFDO2lCQUNULE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFL0Isa0RBQWtEO1lBQ2xELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxrQkFBa0IsQ0FBQztZQUU5QyxNQUFNLE1BQU0sR0FBRyxJQUFBLGlCQUFTLEVBQ3BCLGNBQU0sQ0FBQyxPQUFPLENBQ1YsSUFBQSxxQkFBYSxFQUFDLElBQUEsaUJBQVMsR0FBRSxDQUFDLEVBQzFCLHFCQUFxQixDQUN4QixFQUNEO2dCQUNJLFFBQVEsRUFBRSxJQUFBLGdCQUFRLEVBQUMsQ0FBQyxHQUFHLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN0RCxXQUFXO2dCQUNYLElBQUk7Z0JBQ0osUUFBUSxFQUFFLG9CQUFvQixDQUFDLFFBQVE7YUFDMUMsRUFDRDtnQkFDSSxpQkFBaUIsRUFBRSxJQUFJO2FBQzFCLENBQ0osQ0FBQztZQUVGLE1BQU0sQ0FBQyxJQUFJLENBQ1AsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDSixPQUFPLENBQUM7b0JBQ0osS0FBSyxFQUFFLEdBQUc7aUJBQ2IsQ0FBQyxDQUFDO2dCQUVILHFCQUFxQjtnQkFFckIsaUJBQVEsQ0FBQyxJQUFJLENBQ1QsaUNBQWlDLEVBQ2pDLGVBQWUsUUFBUSxFQUFFLENBQzVCLENBQUM7Z0JBRUYsaUJBQVEsQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUMxRCxDQUFDLEVBQ0QsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDRixrRUFBa0U7Z0JBQ2xFLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLGVBQU0sQ0FBQyxVQUFVO29CQUN2QixLQUFLLEVBQUUsQ0FBQztpQkFDWCxDQUFDLENBQUM7Z0JBRUgsT0FBTyxDQUFDO29CQUNKLEtBQUssRUFBRSxDQUFDO2lCQUNYLENBQUMsQ0FBQztnQkFFSCxpQkFBUSxDQUFDLElBQUksQ0FDVCxpQ0FBaUMsRUFDakMsZUFBZSxRQUFRLEVBQUUsQ0FDNUIsQ0FBQztnQkFFRixpQkFBUSxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQzFELENBQUMsQ0FDSixDQUFDO1FBQ04sQ0FBQyxFQUNEO1lBQ0ksWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxJQUFJO2FBQ2I7U0FDSixDQUNKLENBQUM7SUFDTixDQUFDOztBQXpHTCwyQ0EwR0M7QUF6R1UsMkJBQUUsR0FBRyxPQUFPLENBQUM7QUFDYixtQ0FBVSxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDM0IsMENBQWlCLEdBQUcsbURBQTJDLENBQUMifQ==