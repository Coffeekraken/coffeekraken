"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SSvelteCompileProcess_1 = __importDefault(require("../../node/svelte/compile/SSvelteCompileProcess"));
function compileSvelte(stringArgs = '') {
    const pro = new SSvelteCompileProcess_1.default({}, {
        process: {
            stdio: 'inherit'
        }
    });
    pro.run(stringArgs);
}
module.exports = compileSvelte;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZS5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21waWxlLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7OztBQUVkLDRHQUFvRjtBQUVwRixTQUFTLGFBQWEsQ0FBQyxVQUFVLEdBQUcsRUFBRTtJQUNwQyxNQUFNLEdBQUcsR0FBRyxJQUFJLCtCQUFxQixDQUNuQyxFQUFFLEVBQ0Y7UUFDRSxPQUFPLEVBQUU7WUFDUCxLQUFLLEVBQUUsU0FBUztTQUNqQjtLQUNGLENBQ0YsQ0FBQztJQUNGLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDdEIsQ0FBQztBQUVELGlCQUFTLGFBQWEsQ0FBQyJ9