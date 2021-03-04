"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sugar_1 = __importDefault(require("../config/sugar"));
const fs_extra_1 = __importDefault(require("fs-extra"));
function default_1(settings = {}) {
    settings = Object.assign({}, settings);
    const srcDir = sugar_1.default('storage.srcDir');
    if (srcDir !== undefined) {
        fs_extra_1.default.ensureDirSync(srcDir);
        return srcDir;
    }
    return undefined;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjRGlyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3JjRGlyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDREQUE0QztBQUM1Qyx3REFBNEI7QUE4QjVCLG1CQUF5QixXQUE0QixFQUFFO0lBQ3JELFFBQVEscUJBQ0gsUUFBUSxDQUNaLENBQUM7SUFDRixNQUFNLE1BQU0sR0FBRyxlQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUMvQyxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7UUFDeEIsa0JBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0IsT0FBTyxNQUFNLENBQUM7S0FDZjtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7QUFWRCw0QkFVQyJ9