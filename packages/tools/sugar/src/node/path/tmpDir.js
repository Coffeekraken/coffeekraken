"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const temp_dir_1 = __importDefault(require("temp-dir"));
const sugar_1 = __importDefault(require("../../shared/config/sugar"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG1wRGlyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidG1wRGlyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdEQUFnQztBQUNoQyxzRUFBc0Q7QUFDdEQsd0RBQTRCO0FBb0M1QixNQUFNLEVBQUUsR0FBWSxVQUFVLFdBQTRCLEVBQUU7SUFDMUQsUUFBUSxtQkFDTixLQUFLLEVBQUUsT0FBTyxJQUNYLFFBQVEsQ0FDWixDQUFDO0lBQ0YsSUFBSSxRQUFRLENBQUMsS0FBSyxLQUFLLE9BQU8sRUFBRTtRQUM5QixNQUFNLE1BQU0sR0FBRyxlQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUMvQyxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDeEIsa0JBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDM0IsT0FBTyxNQUFNLENBQUM7U0FDZjtLQUNGO0lBQ0Qsa0JBQUksQ0FBQyxhQUFhLENBQUMsa0JBQVEsQ0FBQyxDQUFDO0lBQzdCLE9BQU8sa0JBQVEsQ0FBQztBQUNsQixDQUFDLENBQUM7QUFDRixrQkFBZSxFQUFFLENBQUMifQ==