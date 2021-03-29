"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SJsCompilerProcess_1 = __importDefault(require("./SJsCompilerProcess"));
function compileJs(stringArgs = '') {
    const pro = new SJsCompilerProcess_1.default({}, {});
    pro.run(stringArgs);
}
exports.default = compileJs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZS5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21waWxlLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhFQUFzRDtBQUV0RCxTQUF3QixTQUFTLENBQUMsVUFBVSxHQUFHLEVBQUU7SUFDL0MsTUFBTSxHQUFHLEdBQUcsSUFBSSw0QkFBa0IsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDM0MsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN0QixDQUFDO0FBSEQsNEJBR0MifQ==