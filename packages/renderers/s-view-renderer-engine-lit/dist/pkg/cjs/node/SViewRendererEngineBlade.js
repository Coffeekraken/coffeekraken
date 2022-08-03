"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
const execPhp_1 = __importDefault(require("@coffeekraken/sugar/node/php/execPhp"));
const unique_1 = __importDefault(require("@coffeekraken/sugar/shared/array/unique"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const SViewRendererEngineBladeSettingsInterface_1 = __importDefault(require("./interface/SViewRendererEngineBladeSettingsInterface"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
class SViewRendererEngineBlade {
    constructor(settings) {
        this.settings = {};
        this.settings = settings !== null && settings !== void 0 ? settings : {};
    }
    render(viewPath, data = {}, viewRendererSettings) {
        return new s_promise_1.default(({ resolve, reject, emit }) => {
            if (!fs_1.default.existsSync(viewPath)) {
                return reject(`It seems that the view you passed "<cyan>${viewPath}</cyan>" does not exists...`);
            }
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
            resolve((0, execPhp_1.default)(path_1.default.resolve((0, packageRoot_1.default)((0, dirname_1.default)()), 'src/php/compile.php'), {
                rootDirs: (0, unique_1.default)([
                    ...viewRendererSettings.rootDirs,
                ]),
                viewDotPath,
                data,
                cacheDir: viewRendererSettings.cacheDir,
            }, {
                paramsThroughFile: true,
            }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0VBQWlEO0FBQ2pELGtGQUE0RDtBQUM1RCxtRkFBNkQ7QUFDN0QscUZBQStEO0FBQy9ELDRDQUFzQjtBQUN0QixnREFBMEI7QUFFMUIsc0lBQWdIO0FBRWhILDRGQUFzRTtBQWlCdEUsTUFBcUIsd0JBQXdCO0lBTXpDLFlBQVksUUFBcUQ7UUFGakUsYUFBUSxHQUFzQyxFQUFFLENBQUM7UUFHN0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELE1BQU0sQ0FDRixRQUFnQixFQUNoQixPQUFZLEVBQUUsRUFDZCxvQkFBNEM7UUFFNUMsT0FBTyxJQUFJLG1CQUFVLENBQ2pCLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQzVCLE9BQU8sTUFBTSxDQUNULDRDQUE0QyxRQUFRLDZCQUE2QixDQUNwRixDQUFDO2FBQ0w7WUFFRCxJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDakQsWUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLEVBQUU7b0JBQzFDLFNBQVMsRUFBRSxJQUFJO2lCQUNsQixDQUFDLENBQUM7YUFDTjtZQUVELElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQztZQUMzQixJQUFBLGdCQUFRLEVBQUMsQ0FBQyxHQUFHLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQzFELFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDdEQsQ0FBQyxDQUFDLENBQUM7WUFDSCxXQUFXLEdBQUcsV0FBVztpQkFDcEIsS0FBSyxDQUFDLEdBQUcsQ0FBQztpQkFDVixJQUFJLENBQUMsR0FBRyxDQUFDO2lCQUNULE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFL0IsT0FBTyxDQUNILElBQUEsaUJBQVMsRUFDTCxjQUFNLENBQUMsT0FBTyxDQUNWLElBQUEscUJBQWEsRUFBQyxJQUFBLGlCQUFTLEdBQUUsQ0FBQyxFQUMxQixxQkFBcUIsQ0FDeEIsRUFDRDtnQkFDSSxRQUFRLEVBQUUsSUFBQSxnQkFBUSxFQUFDO29CQUNmLEdBQUcsb0JBQW9CLENBQUMsUUFBUTtpQkFDbkMsQ0FBQztnQkFDRixXQUFXO2dCQUNYLElBQUk7Z0JBQ0osUUFBUSxFQUFFLG9CQUFvQixDQUFDLFFBQVE7YUFDMUMsRUFDRDtnQkFDSSxpQkFBaUIsRUFBRSxJQUFJO2FBQzFCLENBQ0osQ0FDSixDQUFDO1FBQ04sQ0FBQyxFQUNEO1lBQ0ksWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxJQUFJO2FBQ2I7U0FDSixDQUNKLENBQUM7SUFDTixDQUFDOztBQWhFTCwyQ0FpRUM7QUFoRVUsMkJBQUUsR0FBRyxPQUFPLENBQUM7QUFDYixtQ0FBVSxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDM0IsMENBQWlCLEdBQUcsbURBQTJDLENBQUMifQ==