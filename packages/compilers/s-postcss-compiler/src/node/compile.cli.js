"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_process_1 = __importDefault(require("@coffeekraken/s-process"));
const SPostcssCompiler_1 = __importDefault(require("./SPostcssCompiler"));
const SPostcssCompilerInterface_1 = __importDefault(require("./interface/SPostcssCompilerInterface"));
function start(stringArgs = '') {
    const compiler = new SPostcssCompiler_1.default();
    const pro = s_process_1.default.from(compiler.compile.bind(compiler), {
        process: {
            interface: SPostcssCompilerInterface_1.default
        }
    });
    pro.run(stringArgs);
}
exports.default = start;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZS5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21waWxlLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdFQUFpRDtBQUNqRCwwRUFBb0Q7QUFDcEQsc0dBQWdGO0FBRWhGLFNBQXdCLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRTtJQUMzQyxNQUFNLFFBQVEsR0FBRyxJQUFJLDBCQUFrQixFQUFFLENBQUM7SUFDMUMsTUFBTSxHQUFHLEdBQUcsbUJBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDM0QsT0FBTyxFQUFFO1lBQ1AsU0FBUyxFQUFFLG1DQUEyQjtTQUN2QztLQUNGLENBQUMsQ0FBQztJQUNILEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDdEIsQ0FBQztBQVJELHdCQVFDIn0=