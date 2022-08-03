"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
function default_1(settings = {}) {
    settings = Object.assign({}, settings);
    const distJsDir = s_sugar_config_1.default.get('storage.dist.jsDir');
    if (distJsDir !== undefined) {
        // __fs.ensureDirSync(distJsDir);
        return distJsDir;
    }
    return undefined;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtGQUEwRDtBQStCMUQsbUJBQXlCLFdBQStCLEVBQUU7SUFDdEQsUUFBUSxxQkFDRCxRQUFRLENBQ2QsQ0FBQztJQUNGLE1BQU0sU0FBUyxHQUFHLHdCQUFjLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDM0QsSUFBSSxTQUFTLEtBQUssU0FBUyxFQUFFO1FBQ3pCLGlDQUFpQztRQUNqQyxPQUFPLFNBQVMsQ0FBQztLQUNwQjtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ3JCLENBQUM7QUFWRCw0QkFVQyJ9