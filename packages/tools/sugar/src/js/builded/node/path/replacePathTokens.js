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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGFjZVBhdGhUb2tlbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9ub2RlL3BhdGgvcmVwbGFjZVBhdGhUb2tlbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLG9EQUFnQztJQUNoQyx3REFBb0M7SUFDcEMsd0RBQW9DO0lBQ3BDLHNEQUFrQztJQUNsQyxvREFBZ0M7SUFDaEMsc0RBQWtDO0lBNkJsQyxTQUF3QixpQkFBaUIsQ0FDdkMsS0FBSyxFQUNMLFFBQThDO1FBRTlDLElBQU0sR0FBRyxHQUFHLFdBQ1YsTUFBTSxFQUFFLElBQUksRUFDWixRQUFRLEVBQUUsSUFBSSxFQUNkLFFBQVEsRUFBRSxJQUFJLEVBQ2QsT0FBTyxFQUFFLElBQUksRUFDYixNQUFNLEVBQUUsSUFBSSxFQUNaLE9BQU8sRUFBRSxJQUFJLElBQ1YsUUFBUSxDQUNaLENBQUM7UUFFRixJQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxPQUFPO1lBQUUsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUIsSUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUk7WUFDaEMsSUFBSSxHQUFHLENBQUMsTUFBTTtnQkFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsZ0JBQVEsRUFBRSxDQUFDLENBQUM7WUFDM0QsSUFBSSxHQUFHLENBQUMsUUFBUTtnQkFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsa0JBQVUsRUFBRSxDQUFDLENBQUM7WUFDakUsSUFBSSxHQUFHLENBQUMsUUFBUTtnQkFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsa0JBQVUsRUFBRSxDQUFDLENBQUM7WUFDakUsSUFBSSxHQUFHLENBQUMsT0FBTztnQkFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsaUJBQVMsRUFBRSxDQUFDLENBQUM7WUFDOUQsSUFBSSxHQUFHLENBQUMsTUFBTTtnQkFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsZ0JBQVEsRUFBRSxDQUFDLENBQUM7WUFDM0QsSUFBSSxHQUFHLENBQUMsT0FBTztnQkFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsaUJBQVMsRUFBRSxDQUFDLENBQUM7WUFDOUQsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ25DLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLE9BQU87WUFBRSxPQUFPLFVBQVUsQ0FBQzs7WUFDMUIsT0FBTyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQTVCRCxvQ0E0QkMifQ==