"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const sugarHeading_1 = __importDefault(require("../../node/ascii/sugarHeading"));
const json_1 = __importDefault(require("../../node/package/json"));
function heading(stringArgs = '') {
    console.log(sugarHeading_1.default({
        version: json_1.default(__dirname).version
    }));
}
module.exports = heading;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGluZy5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJoZWFkaW5nLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7OztBQUVkLGlGQUEwRDtBQUMxRCxtRUFBbUQ7QUFFbkQsU0FBUyxPQUFPLENBQUUsVUFBVSxHQUFHLEVBQUU7SUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FDVCxzQkFBYSxDQUFDO1FBQ1osT0FBTyxFQUFFLGNBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPO0tBQ3pDLENBQUMsQ0FDSCxDQUFDO0FBQ0osQ0FBQztBQUVELGlCQUFTLE9BQU8sQ0FBQyJ9