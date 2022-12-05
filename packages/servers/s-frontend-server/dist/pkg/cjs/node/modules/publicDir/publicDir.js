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
const s_env_1 = __importDefault(require("@coffeekraken/s-env"));
const s_glob_1 = __importDefault(require("@coffeekraken/s-glob"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const path_1 = require("@coffeekraken/sugar/path");
const express_1 = __importDefault(require("express"));
function rootFiles(express, settings, config) {
    return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        const packageRoot = (0, path_1.__packageRootDir)(), publicDir = s_sugar_config_1.default.get('storage.src.publicDir');
        const files = s_glob_1.default.resolve('**/*', {
            cwd: publicDir,
        });
        if (s_env_1.default.is('verbose')) {
            emit('log', {
                value: `<yellow>[publicDir]</yellow> Exposing <magenta>${files.length}</magenta> file(s) from public directory`,
            });
        }
        files.forEach((file) => {
            if (s_env_1.default.is('verbose')) {
                emit('log', {
                    value: `<yellow>[publicDir]</yellow> Exposing file "<yellow>${file.relPath}</yellow>"`,
                });
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQXlDO0FBQ3pDLGtFQUEyQztBQUMzQyx3RUFBaUQ7QUFDakQsa0ZBQTBEO0FBQzFELG1EQUE0RDtBQUM1RCxzREFBZ0M7QUFFaEMsU0FBd0IsU0FBUyxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTTtJQUN2RCxPQUFPLElBQUksbUJBQVUsQ0FDakIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDdEMsTUFBTSxXQUFXLEdBQUcsSUFBQSx1QkFBZ0IsR0FBRSxFQUNsQyxTQUFTLEdBQUcsd0JBQWMsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUM1RCxNQUFNLEtBQUssR0FBRyxnQkFBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDbEMsR0FBRyxFQUFFLFNBQVM7U0FDakIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxlQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLGtEQUFrRCxLQUFLLENBQUMsTUFBTSwwQ0FBMEM7YUFDbEgsQ0FBQyxDQUFDO1NBQ047UUFFRCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDbkIsSUFBSSxlQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUN0QixJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLEtBQUssRUFBRSx1REFBdUQsSUFBSSxDQUFDLE9BQU8sWUFBWTtpQkFDekYsQ0FBQyxDQUFDO2FBQ047WUFDRCxPQUFPLENBQUMsR0FBRyxDQUNQLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUNsQixpQkFBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUMzQixLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUk7YUFDbkIsQ0FBQyxDQUNMLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQixDQUFDLENBQUEsRUFDRDtRQUNJLEtBQUssRUFBRTtZQUNILEVBQUUsRUFBRSxpQkFBaUI7U0FDeEI7S0FDSixDQUNKLENBQUM7QUFDTixDQUFDO0FBckNELDRCQXFDQyJ9