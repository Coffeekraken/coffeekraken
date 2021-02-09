"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SJsCompilerProcess_1 = __importDefault(require("../../node/js/compile/SJsCompilerProcess"));
function compileJs(stringArgs = '') {
    const pro = new SJsCompilerProcess_1.default({}, {
        process: {
            stdio: 'inherit'
        }
    });
    pro.run(stringArgs);
}
exports.default = compileJs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZS5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21waWxlLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxrR0FBMEU7QUFFMUUsU0FBUyxTQUFTLENBQUMsVUFBVSxHQUFHLEVBQUU7SUFDaEMsTUFBTSxHQUFHLEdBQUcsSUFBSSw0QkFBa0IsQ0FDaEMsRUFBRSxFQUNGO1FBQ0UsT0FBTyxFQUFFO1lBQ1AsS0FBSyxFQUFFLFNBQVM7U0FDakI7S0FDRixDQUNGLENBQUM7SUFDRixHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3RCLENBQUM7QUFFRCxrQkFBZSxTQUFTLENBQUMifQ==