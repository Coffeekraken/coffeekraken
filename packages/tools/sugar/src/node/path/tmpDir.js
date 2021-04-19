"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const temp_dir_1 = __importDefault(require("temp-dir"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const fn = function (settings = {}) {
    settings = Object.assign({ scope: 'local' }, settings);
    if (settings.scope === 'local') {
        const tmpDir = s_sugar_config_1.default('storage.tmpDir');
        if (tmpDir !== undefined) {
            fs_extra_1.default.ensureDirSync(tmpDir);
            return tmpDir;
        }
    }
    fs_extra_1.default.ensureDirSync(temp_dir_1.default);
    return temp_dir_1.default;
};
exports.default = fn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG1wRGlyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidG1wRGlyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdEQUFnQztBQUNoQyxrRkFBeUQ7QUFDekQsd0RBQTRCO0FBb0M1QixNQUFNLEVBQUUsR0FBWSxVQUFVLFdBQTRCLEVBQUU7SUFDMUQsUUFBUSxtQkFDTixLQUFLLEVBQUUsT0FBTyxJQUNYLFFBQVEsQ0FDWixDQUFDO0lBQ0YsSUFBSSxRQUFRLENBQUMsS0FBSyxLQUFLLE9BQU8sRUFBRTtRQUM5QixNQUFNLE1BQU0sR0FBRyx3QkFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDL0MsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQ3hCLGtCQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNCLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7S0FDRjtJQUNELGtCQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFRLENBQUMsQ0FBQztJQUM3QixPQUFPLGtCQUFRLENBQUM7QUFDbEIsQ0FBQyxDQUFDO0FBQ0Ysa0JBQWUsRUFBRSxDQUFDIn0=