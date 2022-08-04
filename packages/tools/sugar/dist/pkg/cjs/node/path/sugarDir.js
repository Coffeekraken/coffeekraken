"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
function default_1(settings = {}) {
    settings = Object.assign({}, settings);
    const sugarRootDir = s_sugar_config_1.default.get('storage.sugar.rootDir');
    if (sugarRootDir !== undefined) {
        // __fs.ensureDirSync(sugarRootDir);
        return sugarRootDir;
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtGQUEwRDtBQWdDMUQsbUJBQXlCLFdBQWtDLEVBQUU7SUFDekQsUUFBUSxxQkFDRCxRQUFRLENBQ2QsQ0FBQztJQUNGLE1BQU0sWUFBWSxHQUFHLHdCQUFjLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDakUsSUFBSSxZQUFZLEtBQUssU0FBUyxFQUFFO1FBQzVCLG9DQUFvQztRQUNwQyxPQUFPLFlBQVksQ0FBQztLQUN2QjtBQUNMLENBQUM7QUFURCw0QkFTQyJ9