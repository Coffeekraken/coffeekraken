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
function rootFiles({ express, settings, config }) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const packageRoot = (0, path_1.__packageRootDir)(), publicDir = s_sugar_config_1.default.get('storage.src.publicDir');
        const files = s_glob_1.default.resolveSync('**/*', {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0VBQTJDO0FBQzNDLGtGQUEwRDtBQUMxRCxtREFBNEQ7QUFDNUQsc0RBQWdDO0FBRWhDLFNBQXdCLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFO0lBQzNELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTs7UUFDakMsTUFBTSxXQUFXLEdBQUcsSUFBQSx1QkFBZ0IsR0FBRSxFQUNsQyxTQUFTLEdBQUcsd0JBQWMsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUM1RCxNQUFNLEtBQUssR0FBRyxnQkFBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUU7WUFDdEMsR0FBRyxFQUFFLFNBQVM7U0FDakIsQ0FBQyxDQUFDO1FBRUgsTUFBQSxPQUFPLENBQUMsT0FBTyx3REFDWCxrREFBa0QsS0FBSyxDQUFDLE1BQU0sMENBQTBDLENBQzNHLENBQUM7UUFFRixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7O1lBQ25CLE1BQUEsT0FBTyxDQUFDLE9BQU8sd0RBQ1gsdURBQXVELElBQUksQ0FBQyxPQUFPLFlBQVksQ0FDbEYsQ0FBQztZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQ1AsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQ2xCLGlCQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQzNCLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSTthQUNuQixDQUFDLENBQ0wsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDO0FBMUJELDRCQTBCQyJ9