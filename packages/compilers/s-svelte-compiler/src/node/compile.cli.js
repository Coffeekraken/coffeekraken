"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SSvelteCompilerProcess_1 = __importDefault(require("./SSvelteCompilerProcess"));
function compile(stringArgs = '') {
    const pro = new SSvelteCompilerProcess_1.default({}, {});
    pro.run(stringArgs);
}
exports.default = compile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZS5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21waWxlLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNGQUE4RDtBQUU5RCxTQUF3QixPQUFPLENBQUMsVUFBVSxHQUFHLEVBQUU7SUFDN0MsTUFBTSxHQUFHLEdBQUcsSUFBSSxnQ0FBc0IsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDL0MsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN0QixDQUFDO0FBSEQsMEJBR0MifQ==