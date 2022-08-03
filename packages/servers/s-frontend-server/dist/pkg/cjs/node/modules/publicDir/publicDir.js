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
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const express_1 = __importDefault(require("express"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_glob_1 = __importDefault(require("@coffeekraken/s-glob"));
function rootFiles(express, settings, config) {
    return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        const packageRoot = (0, packageRoot_1.default)(), publicDir = s_sugar_config_1.default.get('storage.src.publicDir');
        const files = s_glob_1.default.resolve('**/*', {
            cwd: publicDir,
        });
        emit('log', {
            value: `<yellow>[publicDir]</yellow> Exposing <magenta>${files.length}</magenta> file(s) from public directory`,
        });
        files.forEach((file) => {
            emit('log', {
                value: `<yellow>[publicDir]</yellow> Exposing file "<yellow>${file.relPath}</yellow>"`,
            });
            express.get(`/${file.relPath}`, express_1.default.static(file.dirPath, {
                index: file.name,
            }));
        });
        resolve(true);
    }), {
        metas: {
            id: 'SFrontendServer',
        },
    });
}
exports.default = rootFiles;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNEZBQXNFO0FBR3RFLHNEQUFnQztBQUNoQyx3RUFBaUQ7QUFDakQsa0ZBQTBEO0FBQzFELGtFQUEyQztBQUUzQyxTQUF3QixTQUFTLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNO0lBQ3ZELE9BQU8sSUFBSSxtQkFBVSxDQUNqQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUN0QyxNQUFNLFdBQVcsR0FBRyxJQUFBLHFCQUFhLEdBQUUsRUFDL0IsU0FBUyxHQUFHLHdCQUFjLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDNUQsTUFBTSxLQUFLLEdBQUcsZ0JBQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ2xDLEdBQUcsRUFBRSxTQUFTO1NBQ2pCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDUixLQUFLLEVBQUUsa0RBQWtELEtBQUssQ0FBQyxNQUFNLDBDQUEwQztTQUNsSCxDQUFDLENBQUM7UUFFSCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDbkIsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixLQUFLLEVBQUUsdURBQXVELElBQUksQ0FBQyxPQUFPLFlBQVk7YUFDekYsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FDUCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFDbEIsaUJBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDM0IsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJO2FBQ25CLENBQUMsQ0FDTCxDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsQ0FBQyxDQUFBLEVBQ0Q7UUFDSSxLQUFLLEVBQUU7WUFDSCxFQUFFLEVBQUUsaUJBQWlCO1NBQ3hCO0tBQ0osQ0FDSixDQUFDO0FBQ04sQ0FBQztBQWpDRCw0QkFpQ0MifQ==