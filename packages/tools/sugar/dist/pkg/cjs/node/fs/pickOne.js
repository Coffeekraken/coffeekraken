"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const fs_1 = __importDefault(require("fs"));
const micromatch_1 = __importDefault(require("micromatch"));
function pickOne(filesNames, settings) {
    const finalSettings = Object.assign({ cwd: process.cwd(), SFile: true }, (settings !== null && settings !== void 0 ? settings : {}));
    // check if we have a file
    const files = fs_1.default.readdirSync(finalSettings.cwd);
    for (const fileName of files) {
        if (micromatch_1.default.isMatch(fileName, filesNames)) {
            if (finalSettings.SFile) {
                return new s_file_1.default(fileName, {
                    cwd: finalSettings.cwd,
                });
            }
            else {
                return `${finalSettings.cwd}/${fileName}`;
            }
        }
    }
}
exports.default = pickOne;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0VBQTJDO0FBQzNDLDRDQUFzQjtBQUN0Qiw0REFBc0M7QUErQnRDLFNBQXdCLE9BQU8sQ0FDM0IsVUFBb0IsRUFDcEIsUUFBb0M7SUFFcEMsTUFBTSxhQUFhLG1CQUNmLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQ2xCLEtBQUssRUFBRSxJQUFJLElBQ1IsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUNGLDBCQUEwQjtJQUMxQixNQUFNLEtBQUssR0FBRyxZQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsRCxLQUFLLE1BQU0sUUFBUSxJQUFJLEtBQUssRUFBRTtRQUMxQixJQUFJLG9CQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsRUFBRTtZQUM1QyxJQUFJLGFBQWEsQ0FBQyxLQUFLLEVBQUU7Z0JBQ3JCLE9BQU8sSUFBSSxnQkFBTyxDQUFDLFFBQVEsRUFBRTtvQkFDekIsR0FBRyxFQUFFLGFBQWEsQ0FBQyxHQUFHO2lCQUN6QixDQUFDLENBQUM7YUFDTjtpQkFBTTtnQkFDSCxPQUFPLEdBQUcsYUFBYSxDQUFDLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQzthQUM3QztTQUNKO0tBQ0o7QUFDTCxDQUFDO0FBdEJELDBCQXNCQyJ9