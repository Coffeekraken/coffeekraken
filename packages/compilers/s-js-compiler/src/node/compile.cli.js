"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_process_1 = __importDefault(require("@coffeekraken/s-process"));
const SJsCompiler_1 = __importDefault(require("./SJsCompiler"));
const SJsCompilerInterface_1 = __importDefault(require("./interface/SJsCompilerInterface"));
function compile(stringArgs = '') {
    const compiler = new SJsCompiler_1.default();
    const pro = s_process_1.default.from(compiler.compile.bind(compiler), {
        process: {
            interface: SJsCompilerInterface_1.default
        }
    });
    pro.run(stringArgs);
}
exports.default = compile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZS5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21waWxlLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdFQUFpRDtBQUNqRCxnRUFBMEM7QUFDMUMsNEZBQXNFO0FBRXRFLFNBQXdCLE9BQU8sQ0FBQyxVQUFVLEdBQUcsRUFBRTtJQUM3QyxNQUFNLFFBQVEsR0FBRyxJQUFJLHFCQUFhLEVBQUUsQ0FBQztJQUNyQyxNQUFNLEdBQUcsR0FBRyxtQkFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUMzRCxPQUFPLEVBQUU7WUFDUCxTQUFTLEVBQUUsOEJBQXNCO1NBQ2xDO0tBQ0YsQ0FBQyxDQUFDO0lBQ0gsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN0QixDQUFDO0FBUkQsMEJBUUMifQ==