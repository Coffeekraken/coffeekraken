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
const path_1 = require("@coffeekraken/sugar/path");
const express_1 = __importDefault(require("express"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_glob_1 = __importDefault(require("@coffeekraken/s-glob"));
function rootFiles(express, settings, config) {
    return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        const packageRoot = (0, path_1.__packageRootDir)(), publicDir = s_sugar_config_1.default.get('storage.src.publicDir');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQTREO0FBRzVELHNEQUFnQztBQUNoQyx3RUFBaUQ7QUFDakQsa0ZBQTBEO0FBQzFELGtFQUEyQztBQUUzQyxTQUF3QixTQUFTLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNO0lBQ3ZELE9BQU8sSUFBSSxtQkFBVSxDQUNqQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUN0QyxNQUFNLFdBQVcsR0FBRyxJQUFBLHVCQUFnQixHQUFFLEVBQ2xDLFNBQVMsR0FBRyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQzVELE1BQU0sS0FBSyxHQUFHLGdCQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNsQyxHQUFHLEVBQUUsU0FBUztTQUNqQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1IsS0FBSyxFQUFFLGtEQUFrRCxLQUFLLENBQUMsTUFBTSwwQ0FBMEM7U0FDbEgsQ0FBQyxDQUFDO1FBRUgsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ25CLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLHVEQUF1RCxJQUFJLENBQUMsT0FBTyxZQUFZO2FBQ3pGLENBQUMsQ0FBQztZQUNILE9BQU8sQ0FBQyxHQUFHLENBQ1AsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQ2xCLGlCQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQzNCLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSTthQUNuQixDQUFDLENBQ0wsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLENBQUMsQ0FBQSxFQUNEO1FBQ0ksS0FBSyxFQUFFO1lBQ0gsRUFBRSxFQUFFLGlCQUFpQjtTQUN4QjtLQUNKLENBQ0osQ0FBQztBQUNOLENBQUM7QUFqQ0QsNEJBaUNDIn0=