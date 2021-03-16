"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tmpDir_1 = __importDefault(require("./tmpDir"));
const localDir_1 = __importDefault(require("./localDir"));
const cacheDir_1 = __importDefault(require("./cacheDir"));
const rootDir_1 = __importDefault(require("./rootDir"));
const srcDir_1 = __importDefault(require("./srcDir"));
const distDir_1 = __importDefault(require("./distDir"));
function replacePathTokens(paths, settings) {
    const set = Object.assign({ tmpDir: true, localDir: true, cacheDir: true, rootDir: true, srcDir: true, distDir: true }, settings);
    const isArray = Array.isArray(paths);
    if (!isArray)
        paths = [paths];
    const finalPaths = paths.map((path) => {
        if (set.tmpDir)
            path = path.replace('%tmpDir', tmpDir_1.default());
        if (set.localDir)
            path = path.replace('%localDir', localDir_1.default());
        if (set.cacheDir)
            path = path.replace('%cacheDir', cacheDir_1.default());
        if (set.rootDir)
            path = path.replace('%rootDir', rootDir_1.default());
        if (set.srcDir)
            path = path.replace('%srcDir', srcDir_1.default());
        if (set.distDir)
            path = path.replace('%distDir', distDir_1.default());
        path = path.replace(/\/\//gm, '/');
        return path;
    });
    if (isArray)
        return finalPaths;
    else
        return finalPaths[0];
}
exports.default = replacePathTokens;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGFjZVBhdGhUb2tlbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbm9kZS9wYXRoL3JlcGxhY2VQYXRoVG9rZW5zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQWdDO0FBQ2hDLDBEQUFvQztBQUNwQywwREFBb0M7QUFDcEMsd0RBQWtDO0FBQ2xDLHNEQUFnQztBQUNoQyx3REFBa0M7QUE2QmxDLFNBQXdCLGlCQUFpQixDQUN2QyxLQUFLLEVBQ0wsUUFBOEM7SUFFOUMsTUFBTSxHQUFHLEdBQUcsZ0JBQ1YsTUFBTSxFQUFFLElBQUksRUFDWixRQUFRLEVBQUUsSUFBSSxFQUNkLFFBQVEsRUFBRSxJQUFJLEVBQ2QsT0FBTyxFQUFFLElBQUksRUFDYixNQUFNLEVBQUUsSUFBSSxFQUNaLE9BQU8sRUFBRSxJQUFJLElBQ1YsUUFBUSxDQUNaLENBQUM7SUFFRixNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLElBQUksQ0FBQyxPQUFPO1FBQUUsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3BDLElBQUksR0FBRyxDQUFDLE1BQU07WUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsZ0JBQVEsRUFBRSxDQUFDLENBQUM7UUFDM0QsSUFBSSxHQUFHLENBQUMsUUFBUTtZQUFFLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxrQkFBVSxFQUFFLENBQUMsQ0FBQztRQUNqRSxJQUFJLEdBQUcsQ0FBQyxRQUFRO1lBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLGtCQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQ2pFLElBQUksR0FBRyxDQUFDLE9BQU87WUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsaUJBQVMsRUFBRSxDQUFDLENBQUM7UUFDOUQsSUFBSSxHQUFHLENBQUMsTUFBTTtZQUFFLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxnQkFBUSxFQUFFLENBQUMsQ0FBQztRQUMzRCxJQUFJLEdBQUcsQ0FBQyxPQUFPO1lBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLGlCQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQzlELElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNuQyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUMsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxPQUFPO1FBQUUsT0FBTyxVQUFVLENBQUM7O1FBQzFCLE9BQU8sVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzVCLENBQUM7QUE1QkQsb0NBNEJDIn0=