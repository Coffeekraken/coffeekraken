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
const s_glob_1 = __importDefault(require("@coffeekraken/s-glob"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const path_1 = require("@coffeekraken/sugar/path");
const express_1 = __importDefault(require("express"));
function rootFiles(express, settings, config) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const packageRoot = (0, path_1.__packageRootDir)(), publicDir = s_sugar_config_1.default.get('storage.src.publicDir');
        const files = s_glob_1.default.resolve('**/*', {
            cwd: publicDir,
        });
        (_a = console.verbose) === null || _a === void 0 ? void 0 : _a.call(console, `<yellow>[publicDir]</yellow> Exposing <magenta>${files.length}</magenta> file(s) from public directory`);
        files.forEach((file) => {
            var _a;
            (_a = console.verbose) === null || _a === void 0 ? void 0 : _a.call(console, `<yellow>[publicDir]</yellow> Exposing file "<yellow>${file.relPath}</yellow>"`);
            express.get(`/${file.relPath}`, express_1.default.static(file.dirPath, {
                index: file.name,
            }));
        });
        resolve(true);
    }));
}
exports.default = rootFiles;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0VBQTJDO0FBQzNDLGtGQUEwRDtBQUMxRCxtREFBNEQ7QUFDNUQsc0RBQWdDO0FBRWhDLFNBQXdCLFNBQVMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU07SUFDdkQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFOztRQUNqQyxNQUFNLFdBQVcsR0FBRyxJQUFBLHVCQUFnQixHQUFFLEVBQ2xDLFNBQVMsR0FBRyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQzVELE1BQU0sS0FBSyxHQUFHLGdCQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNsQyxHQUFHLEVBQUUsU0FBUztTQUNqQixDQUFDLENBQUM7UUFFSCxNQUFBLE9BQU8sQ0FBQyxPQUFPLHdEQUNYLGtEQUFrRCxLQUFLLENBQUMsTUFBTSwwQ0FBMEMsQ0FDM0csQ0FBQztRQUVGLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTs7WUFDbkIsTUFBQSxPQUFPLENBQUMsT0FBTyx3REFDWCx1REFBdUQsSUFBSSxDQUFDLE9BQU8sWUFBWSxDQUNsRixDQUFDO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FDUCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFDbEIsaUJBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDM0IsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJO2FBQ25CLENBQUMsQ0FDTCxDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUM7QUExQkQsNEJBMEJDIn0=