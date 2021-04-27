"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_process_1 = __importDefault(require("@coffeekraken/s-process"));
const STsCompiler_1 = __importDefault(require("./STsCompiler"));
const STsCompilerInterface_1 = __importDefault(require("./interface/STsCompilerInterface"));
function start(stringArgs = '') {
    const compiler = new STsCompiler_1.default();
    const pro = s_process_1.default.from(compiler._compile.bind(compiler), {
        process: {
            interface: STsCompilerInterface_1.default
        }
    });
    pro.run(stringArgs);
}
exports.default = start;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZS5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21waWxlLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdFQUFpRDtBQUNqRCxnRUFBMEM7QUFDMUMsNEZBQXNFO0FBRXRFLFNBQXdCLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRTtJQUMzQyxNQUFNLFFBQVEsR0FBRyxJQUFJLHFCQUFhLEVBQUUsQ0FBQztJQUNyQyxNQUFNLEdBQUcsR0FBRyxtQkFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUM1RCxPQUFPLEVBQUU7WUFDUCxTQUFTLEVBQUUsOEJBQXNCO1NBQ2xDO0tBQ0YsQ0FBQyxDQUFDO0lBQ0gsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN0QixDQUFDO0FBUkQsd0JBUUMifQ==