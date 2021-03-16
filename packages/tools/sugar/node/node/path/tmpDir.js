"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const temp_dir_1 = __importDefault(require("temp-dir"));
const sugar_1 = __importDefault(require("../config/sugar"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const fn = function (settings = {}) {
    settings = Object.assign({ scope: 'local' }, settings);
    if (settings.scope === 'local') {
        const tmpDir = sugar_1.default('storage.tmpDir');
        if (tmpDir !== undefined) {
            fs_extra_1.default.ensureDirSync(tmpDir);
            return tmpDir;
        }
    }
    fs_extra_1.default.ensureDirSync(temp_dir_1.default);
    return temp_dir_1.default;
};
exports.default = fn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG1wRGlyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL25vZGUvcGF0aC90bXBEaXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsd0RBQWdDO0FBQ2hDLDREQUE0QztBQUM1Qyx3REFBNEI7QUFvQzVCLE1BQU0sRUFBRSxHQUFZLFVBQVUsV0FBNEIsRUFBRTtJQUMxRCxRQUFRLG1CQUNOLEtBQUssRUFBRSxPQUFPLElBQ1gsUUFBUSxDQUNaLENBQUM7SUFDRixJQUFJLFFBQVEsQ0FBQyxLQUFLLEtBQUssT0FBTyxFQUFFO1FBQzlCLE1BQU0sTUFBTSxHQUFHLGVBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQy9DLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUN4QixrQkFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzQixPQUFPLE1BQU0sQ0FBQztTQUNmO0tBQ0Y7SUFDRCxrQkFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBUSxDQUFDLENBQUM7SUFDN0IsT0FBTyxrQkFBUSxDQUFDO0FBQ2xCLENBQUMsQ0FBQztBQUNGLGtCQUFlLEVBQUUsQ0FBQyJ9