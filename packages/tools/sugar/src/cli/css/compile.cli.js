"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SScssCompilerProcess_1 = __importDefault(require("../../node/scss/compile/SScssCompilerProcess"));
function compileScss(stringArgs = '') {
    const pro = new SScssCompilerProcess_1.default({}, {
        process: {
            stdio: 'inherit'
        }
    });
    pro.run(stringArgs);
}
exports.default = compileScss;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZS5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21waWxlLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCx3R0FBZ0Y7QUFFaEYsU0FBUyxXQUFXLENBQUMsVUFBVSxHQUFHLEVBQUU7SUFDbEMsTUFBTSxHQUFHLEdBQUcsSUFBSSw4QkFBb0IsQ0FDbEMsRUFBRSxFQUNGO1FBQ0UsT0FBTyxFQUFFO1lBQ1AsS0FBSyxFQUFFLFNBQVM7U0FDakI7S0FDRixDQUNGLENBQUM7SUFDRixHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3RCLENBQUM7QUFFRCxrQkFBZSxXQUFXLENBQUMifQ==