"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sugarHeading_1 = __importDefault(require("../../node/ascii/sugarHeading"));
const json_1 = __importDefault(require("../../node/package/json"));
function heading(stringArgs = '') {
    console.log(sugarHeading_1.default({
        version: json_1.default(__dirname).version
    }));
}
exports.default = heading;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGluZy5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY2xpL3N1Z2FyL2hlYWRpbmcuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGlGQUEwRDtBQUMxRCxtRUFBbUQ7QUFFbkQsU0FBUyxPQUFPLENBQUMsVUFBVSxHQUFHLEVBQUU7SUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FDVCxzQkFBYSxDQUFDO1FBQ1osT0FBTyxFQUFFLGNBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPO0tBQ3pDLENBQUMsQ0FDSCxDQUFDO0FBQ0osQ0FBQztBQUVELGtCQUFlLE9BQU8sQ0FBQyJ9