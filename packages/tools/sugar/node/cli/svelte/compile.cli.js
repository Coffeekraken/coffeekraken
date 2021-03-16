"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SSvelteCompilerProcess_1 = __importDefault(require("../../node/svelte/compile/SSvelteCompilerProcess"));
function compileSvelte(stringArgs = '') {
    const pro = new SSvelteCompilerProcess_1.default({}, {
        process: {
            stdio: 'inherit'
        }
    });
    pro.run(stringArgs);
}
exports.default = compileSvelte;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZS5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY2xpL3N2ZWx0ZS9jb21waWxlLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCw4R0FBc0Y7QUFFdEYsU0FBUyxhQUFhLENBQUMsVUFBVSxHQUFHLEVBQUU7SUFDcEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxnQ0FBc0IsQ0FDcEMsRUFBRSxFQUNGO1FBQ0UsT0FBTyxFQUFFO1lBQ1AsS0FBSyxFQUFFLFNBQVM7U0FDakI7S0FDRixDQUNGLENBQUM7SUFDRixHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3RCLENBQUM7QUFFRCxrQkFBZSxhQUFhLENBQUMifQ==