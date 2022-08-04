"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
function default_1(settings = {}) {
    settings = Object.assign({}, settings);
    const srcFontsDir = s_sugar_config_1.default.get('storage.src.fontsDir');
    if (srcFontsDir !== undefined) {
        // __fs.ensureDirSync(srcFontsDir);
        return srcFontsDir;
    }
    return undefined;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtGQUEwRDtBQStCMUQsbUJBQXlCLFdBQWlDLEVBQUU7SUFDeEQsUUFBUSxxQkFDRCxRQUFRLENBQ2QsQ0FBQztJQUNGLE1BQU0sV0FBVyxHQUFHLHdCQUFjLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDL0QsSUFBSSxXQUFXLEtBQUssU0FBUyxFQUFFO1FBQzNCLG1DQUFtQztRQUNuQyxPQUFPLFdBQVcsQ0FBQztLQUN0QjtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ3JCLENBQUM7QUFWRCw0QkFVQyJ9