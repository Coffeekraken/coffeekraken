"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
module.exports = fn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG1wRGlyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidG1wRGlyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7O0FBRWQsd0RBQWdDO0FBQ2hDLDREQUE0QztBQUM1Qyx3RUFBa0Q7QUFvQ2xELE1BQU0sRUFBRSxHQUFZLFVBQVUsV0FBNEIsRUFBRTtJQUMxRCxRQUFRLG1CQUNOLEtBQUssRUFBRSxPQUFPLElBQ1gsUUFBUSxDQUNaLENBQUM7SUFDRixJQUFJLFFBQVEsQ0FBQyxLQUFLLEtBQUssT0FBTyxFQUFFO1FBQzlCLE1BQU0sTUFBTSxHQUFHLGVBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQy9DLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUN4Qix1QkFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hCLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7S0FDRjtJQUNELHVCQUFlLENBQUMsa0JBQVEsQ0FBQyxDQUFDO0lBQzFCLE9BQU8sa0JBQVEsQ0FBQztBQUNsQixDQUFDLENBQUM7QUFDRixpQkFBUyxFQUFFLENBQUMifQ==