"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const temp_dir_1 = __importDefault(require("temp-dir"));
const sugar_1 = __importDefault(require("../config/sugar"));
const ensureDirSync_1 = __importDefault(require("../fs/ensureDirSync"));
const fn = function (settings = {}) {
    settings = Object.assign({ scope: 'local' }, settings);
    if (settings.scope === 'local') {
        const tmpDir = sugar_1.default('storage.tmpDir');
        if (tmpDir !== undefined) {
            ensureDirSync_1.default(tmpDir);
            return tmpDir;
        }
    }
    ensureDirSync_1.default(temp_dir_1.default);
    return temp_dir_1.default;
};
exports.default = fn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG1wRGlyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidG1wRGlyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdEQUFnQztBQUNoQyw0REFBNEM7QUFDNUMsd0VBQWtEO0FBb0NsRCxNQUFNLEVBQUUsR0FBWSxVQUFVLFdBQTRCLEVBQUU7SUFDMUQsUUFBUSxtQkFDTixLQUFLLEVBQUUsT0FBTyxJQUNYLFFBQVEsQ0FDWixDQUFDO0lBQ0YsSUFBSSxRQUFRLENBQUMsS0FBSyxLQUFLLE9BQU8sRUFBRTtRQUM5QixNQUFNLE1BQU0sR0FBRyxlQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUMvQyxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDeEIsdUJBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN4QixPQUFPLE1BQU0sQ0FBQztTQUNmO0tBQ0Y7SUFDRCx1QkFBZSxDQUFDLGtCQUFRLENBQUMsQ0FBQztJQUMxQixPQUFPLGtCQUFRLENBQUM7QUFDbEIsQ0FBQyxDQUFDO0FBQ0Ysa0JBQWUsRUFBRSxDQUFDIn0=