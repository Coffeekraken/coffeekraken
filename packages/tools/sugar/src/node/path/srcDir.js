"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const fs_extra_1 = __importDefault(require("fs-extra"));
function default_1(settings = {}) {
    settings = Object.assign({}, settings);
    const srcDir = s_sugar_config_1.default('storage.srcDir');
    if (srcDir !== undefined) {
        fs_extra_1.default.ensureDirSync(srcDir);
        return srcDir;
    }
    return undefined;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjRGlyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3JjRGlyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtGQUF5RDtBQUN6RCx3REFBNEI7QUE4QjVCLG1CQUF5QixXQUE0QixFQUFFO0lBQ3JELFFBQVEscUJBQ0gsUUFBUSxDQUNaLENBQUM7SUFDRixNQUFNLE1BQU0sR0FBRyx3QkFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDL0MsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO1FBQ3hCLGtCQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNCLE9BQU8sTUFBTSxDQUFDO0tBQ2Y7SUFDRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDO0FBVkQsNEJBVUMifQ==