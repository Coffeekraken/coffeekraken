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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGFjZVBhdGhUb2tlbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXBsYWNlUGF0aFRva2Vucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUFnQztBQUNoQywwREFBb0M7QUFDcEMsMERBQW9DO0FBQ3BDLHdEQUFrQztBQUNsQyxzREFBZ0M7QUFDaEMsd0RBQWtDO0FBNkJsQyxTQUF3QixpQkFBaUIsQ0FDdkMsS0FBSyxFQUNMLFFBQThDO0lBRTlDLE1BQU0sR0FBRyxHQUFHLGdCQUNWLE1BQU0sRUFBRSxJQUFJLEVBQ1osUUFBUSxFQUFFLElBQUksRUFDZCxRQUFRLEVBQUUsSUFBSSxFQUNkLE9BQU8sRUFBRSxJQUFJLEVBQ2IsTUFBTSxFQUFFLElBQUksRUFDWixPQUFPLEVBQUUsSUFBSSxJQUNWLFFBQVEsQ0FDWixDQUFDO0lBRUYsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxJQUFJLENBQUMsT0FBTztRQUFFLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlCLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNwQyxJQUFJLEdBQUcsQ0FBQyxNQUFNO1lBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLGdCQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzNELElBQUksR0FBRyxDQUFDLFFBQVE7WUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsa0JBQVUsRUFBRSxDQUFDLENBQUM7UUFDakUsSUFBSSxHQUFHLENBQUMsUUFBUTtZQUFFLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxrQkFBVSxFQUFFLENBQUMsQ0FBQztRQUNqRSxJQUFJLEdBQUcsQ0FBQyxPQUFPO1lBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLGlCQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQzlELElBQUksR0FBRyxDQUFDLE1BQU07WUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsZ0JBQVEsRUFBRSxDQUFDLENBQUM7UUFDM0QsSUFBSSxHQUFHLENBQUMsT0FBTztZQUFFLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxpQkFBUyxFQUFFLENBQUMsQ0FBQztRQUM5RCxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbkMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDLENBQUMsQ0FBQztJQUNILElBQUksT0FBTztRQUFFLE9BQU8sVUFBVSxDQUFDOztRQUMxQixPQUFPLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBNUJELG9DQTRCQyJ9