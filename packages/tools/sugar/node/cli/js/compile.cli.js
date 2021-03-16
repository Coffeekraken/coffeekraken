"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SJsCompilerProcess_1 = __importDefault(require("../../node/js/compile/SJsCompilerProcess"));
function compileJs(stringArgs = '') {
    const pro = new SJsCompilerProcess_1.default({}, {
        process: {}
    });
    pro.run(stringArgs);
}
exports.default = compileJs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZS5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY2xpL2pzL2NvbXBpbGUuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtHQUEwRTtBQUUxRSxTQUFTLFNBQVMsQ0FBQyxVQUFVLEdBQUcsRUFBRTtJQUNoQyxNQUFNLEdBQUcsR0FBRyxJQUFJLDRCQUFrQixDQUNoQyxFQUFFLEVBQ0Y7UUFDRSxPQUFPLEVBQUUsRUFBRTtLQUNaLENBQ0YsQ0FBQztJQUNGLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDdEIsQ0FBQztBQUVELGtCQUFlLFNBQVMsQ0FBQyJ9