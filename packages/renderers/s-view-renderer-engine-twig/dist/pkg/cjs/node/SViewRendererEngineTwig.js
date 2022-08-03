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
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const execPhp_1 = __importDefault(require("@coffeekraken/sugar/node/php/execPhp"));
const unique_1 = __importDefault(require("@coffeekraken/sugar/shared/array/unique"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const SViewRendererEngineTwigSettingsInterface_1 = __importDefault(require("./interface/SViewRendererEngineTwigSettingsInterface"));
class SViewRendererEngineTwig {
    constructor(settings) {
        this.settings = {};
        this.settings = settings !== null && settings !== void 0 ? settings : {};
    }
    render(viewPath, data = {}, sharedDataFilePath, viewRendererSettings) {
        return new s_promise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            if (!fs_1.default.existsSync(viewPath)) {
                return reject(`It seems that the view you passed "<cyan>${viewPath}</cyan>" does not exists...`);
            }
            if (!fs_1.default.existsSync(viewRendererSettings.cacheDir)) {
                fs_1.default.mkdirSync(viewRendererSettings.cacheDir, {
                    recursive: true,
                });
            }
            (0, unique_1.default)([...viewRendererSettings.rootDirs]).forEach((path) => {
                viewPath = viewPath.replace(`${path}/`, '');
            });
            // pass the shared data file path through the data
            data._sharedDataFilePath = sharedDataFilePath;
            const resPro = (0, execPhp_1.default)(path_1.default.resolve((0, packageRoot_1.default)((0, dirname_1.default)()), 'src/php/compile.php'), {
                rootDirs: (0, unique_1.default)([...viewRendererSettings.rootDirs]),
                viewPath,
                data,
                cacheDir: viewRendererSettings.cacheDir,
            }, {
                paramsThroughFile: true,
            });
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: 'ehheineij',
            });
            resPro.catch((e) => {
                // @TODO            make the 'log' event displayed on the terminal
                console.log(e, {
                    viewPath,
                    data,
                });
                emit('log', {
                    type: s_log_1.default.TYPE_ERROR,
                    value: e,
                });
            });
            const res = yield resPro;
            resolve(res);
        }), {
            eventEmitter: {
                bind: this,
            },
        });
    }
}
exports.default = SViewRendererEngineTwig;
SViewRendererEngineTwig.id = 'twig';
SViewRendererEngineTwig.extensions = ['.twig'];
SViewRendererEngineTwig.settingsInterface = SViewRendererEngineTwigSettingsInterface_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQXlDO0FBQ3pDLHdFQUFpRDtBQUVqRCxrRkFBNEQ7QUFDNUQsNEZBQXNFO0FBQ3RFLG1GQUE2RDtBQUM3RCxxRkFBK0Q7QUFDL0QsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUMxQixvSUFBOEc7QUFpQjlHLE1BQXFCLHVCQUF1QjtJQU14QyxZQUFZLFFBQW9EO1FBRmhFLGFBQVEsR0FBcUMsRUFBRSxDQUFDO1FBRzVDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxNQUFNLENBQ0YsUUFBZ0IsRUFDaEIsT0FBWSxFQUFFLEVBQ2Qsa0JBQTBCLEVBQzFCLG9CQUE0QztRQUU1QyxPQUFPLElBQUksbUJBQVUsQ0FDakIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUNoQyxJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDNUIsT0FBTyxNQUFNLENBQ1QsNENBQTRDLFFBQVEsNkJBQTZCLENBQ3BGLENBQUM7YUFDTDtZQUVELElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNqRCxZQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLFFBQVEsRUFBRTtvQkFDMUMsU0FBUyxFQUFFLElBQUk7aUJBQ2xCLENBQUMsQ0FBQzthQUNOO1lBRUQsSUFBQSxnQkFBUSxFQUFDLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUMxRCxRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2hELENBQUMsQ0FBQyxDQUFDO1lBRUgsa0RBQWtEO1lBQ2xELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxrQkFBa0IsQ0FBQztZQUU5QyxNQUFNLE1BQU0sR0FBRyxJQUFBLGlCQUFTLEVBQ3BCLGNBQU0sQ0FBQyxPQUFPLENBQ1YsSUFBQSxxQkFBYSxFQUFDLElBQUEsaUJBQVMsR0FBRSxDQUFDLEVBQzFCLHFCQUFxQixDQUN4QixFQUNEO2dCQUNJLFFBQVEsRUFBRSxJQUFBLGdCQUFRLEVBQUMsQ0FBQyxHQUFHLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN0RCxRQUFRO2dCQUNSLElBQUk7Z0JBQ0osUUFBUSxFQUFFLG9CQUFvQixDQUFDLFFBQVE7YUFDMUMsRUFDRDtnQkFDSSxpQkFBaUIsRUFBRSxJQUFJO2FBQzFCLENBQ0osQ0FBQztZQUVGLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLGVBQU0sQ0FBQyxTQUFTO2dCQUN0QixLQUFLLEVBQUUsV0FBVzthQUNyQixDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2Ysa0VBQWtFO2dCQUNsRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtvQkFDWCxRQUFRO29CQUNSLElBQUk7aUJBQ1AsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLGVBQU0sQ0FBQyxVQUFVO29CQUN2QixLQUFLLEVBQUUsQ0FBQztpQkFDWCxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sR0FBRyxHQUFHLE1BQU0sTUFBTSxDQUFDO1lBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixDQUFDLENBQUEsRUFDRDtZQUNJLFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsSUFBSTthQUNiO1NBQ0osQ0FDSixDQUFDO0lBQ04sQ0FBQzs7QUE5RUwsMENBK0VDO0FBOUVVLDBCQUFFLEdBQUcsTUFBTSxDQUFDO0FBQ1osa0NBQVUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3ZCLHlDQUFpQixHQUFHLGtEQUEwQyxDQUFDIn0=