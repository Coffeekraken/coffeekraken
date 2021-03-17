var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./tmpDir", "./localDir", "./cacheDir", "./rootDir", "./srcDir", "./distDir"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tmpDir_1 = __importDefault(require("./tmpDir"));
    var localDir_1 = __importDefault(require("./localDir"));
    var cacheDir_1 = __importDefault(require("./cacheDir"));
    var rootDir_1 = __importDefault(require("./rootDir"));
    var srcDir_1 = __importDefault(require("./srcDir"));
    var distDir_1 = __importDefault(require("./distDir"));
    function replacePathTokens(paths, settings) {
        var set = __assign({ tmpDir: true, localDir: true, cacheDir: true, rootDir: true, srcDir: true, distDir: true }, settings);
        var isArray = Array.isArray(paths);
        if (!isArray)
            paths = [paths];
        var finalPaths = paths.map(function (path) {
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGFjZVBhdGhUb2tlbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbm9kZS9wYXRoL3JlcGxhY2VQYXRoVG9rZW5zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSxvREFBZ0M7SUFDaEMsd0RBQW9DO0lBQ3BDLHdEQUFvQztJQUNwQyxzREFBa0M7SUFDbEMsb0RBQWdDO0lBQ2hDLHNEQUFrQztJQTZCbEMsU0FBd0IsaUJBQWlCLENBQ3ZDLEtBQUssRUFDTCxRQUE4QztRQUU5QyxJQUFNLEdBQUcsR0FBRyxXQUNWLE1BQU0sRUFBRSxJQUFJLEVBQ1osUUFBUSxFQUFFLElBQUksRUFDZCxRQUFRLEVBQUUsSUFBSSxFQUNkLE9BQU8sRUFBRSxJQUFJLEVBQ2IsTUFBTSxFQUFFLElBQUksRUFDWixPQUFPLEVBQUUsSUFBSSxJQUNWLFFBQVEsQ0FDWixDQUFDO1FBRUYsSUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsT0FBTztZQUFFLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlCLElBQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFJO1lBQ2hDLElBQUksR0FBRyxDQUFDLE1BQU07Z0JBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLGdCQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQzNELElBQUksR0FBRyxDQUFDLFFBQVE7Z0JBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLGtCQUFVLEVBQUUsQ0FBQyxDQUFDO1lBQ2pFLElBQUksR0FBRyxDQUFDLFFBQVE7Z0JBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLGtCQUFVLEVBQUUsQ0FBQyxDQUFDO1lBQ2pFLElBQUksR0FBRyxDQUFDLE9BQU87Z0JBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLGlCQUFTLEVBQUUsQ0FBQyxDQUFDO1lBQzlELElBQUksR0FBRyxDQUFDLE1BQU07Z0JBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLGdCQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQzNELElBQUksR0FBRyxDQUFDLE9BQU87Z0JBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLGlCQUFTLEVBQUUsQ0FBQyxDQUFDO1lBQzlELElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNuQyxPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxPQUFPO1lBQUUsT0FBTyxVQUFVLENBQUM7O1lBQzFCLE9BQU8sVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUE1QkQsb0NBNEJDIn0=