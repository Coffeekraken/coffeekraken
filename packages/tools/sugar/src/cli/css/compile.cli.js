"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SScssCompilerProcess_1 = __importDefault(require("../../node/scss/compile/SScssCompilerProcess"));
function compileScss(stringArgs = '') {
    const pro = new SScssCompilerProcess_1.default({}, {
        process: {
            stdio: 'inherit'
        }
    });
    pro.run(stringArgs);
}
module.exports = compileScss;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZS5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21waWxlLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7OztBQUVkLHdHQUFnRjtBQUVoRixTQUFTLFdBQVcsQ0FBQyxVQUFVLEdBQUcsRUFBRTtJQUNsQyxNQUFNLEdBQUcsR0FBRyxJQUFJLDhCQUFvQixDQUNsQyxFQUFFLEVBQ0Y7UUFDRSxPQUFPLEVBQUU7WUFDUCxLQUFLLEVBQUUsU0FBUztTQUNqQjtLQUNGLENBQ0YsQ0FBQztJQUNGLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDdEIsQ0FBQztBQUVELGlCQUFTLFdBQVcsQ0FBQyJ9