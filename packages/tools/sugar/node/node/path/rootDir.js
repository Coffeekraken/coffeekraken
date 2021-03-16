"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sugar_1 = __importDefault(require("../config/sugar"));
const fs_extra_1 = __importDefault(require("fs-extra"));
function default_1(settings = {}) {
    settings = Object.assign({ scope: 'local' }, settings);
    if (settings.scope === 'local') {
        const rootDir = sugar_1.default('storage.rootDir');
        if (rootDir !== undefined) {
            fs_extra_1.default.ensureDirSync(rootDir);
            return rootDir;
        }
    }
    return '/';
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdERpci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub2RlL3BhdGgvcm9vdERpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCw0REFBNEM7QUFDNUMsd0RBQTRCO0FBa0M1QixtQkFBeUIsV0FBNkIsRUFBRTtJQUN0RCxRQUFRLG1CQUNOLEtBQUssRUFBRSxPQUFPLElBQ1gsUUFBUSxDQUNaLENBQUM7SUFDRixJQUFJLFFBQVEsQ0FBQyxLQUFLLEtBQUssT0FBTyxFQUFFO1FBQzlCLE1BQU0sT0FBTyxHQUFHLGVBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2pELElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtZQUN6QixrQkFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1QixPQUFPLE9BQU8sQ0FBQztTQUNoQjtLQUNGO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBYkQsNEJBYUMifQ==