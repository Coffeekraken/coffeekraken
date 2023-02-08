"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const packageCacheDir_1 = __importDefault(require("./packageCacheDir"));
const packageLocalDir_1 = __importDefault(require("./packageLocalDir"));
const packageRootDir_1 = __importDefault(require("./packageRootDir"));
const packageTmpDir_1 = __importDefault(require("./packageTmpDir"));
const srcCssDir_1 = __importDefault(require("./srcCssDir"));
const srcDocDir_1 = __importDefault(require("./srcDocDir"));
const srcFontsDir_1 = __importDefault(require("./srcFontsDir"));
const srcIconsDir_1 = __importDefault(require("./srcIconsDir"));
const srcImgDir_1 = __importDefault(require("./srcImgDir"));
const srcJsDir_1 = __importDefault(require("./srcJsDir"));
const srcNodeDir_1 = __importDefault(require("./srcNodeDir"));
const srcRootDir_1 = __importDefault(require("./srcRootDir"));
const srcViewsDir_1 = __importDefault(require("./srcViewsDir"));
const distCssDir_1 = __importDefault(require("./distCssDir"));
const distDocDir_1 = __importDefault(require("./distDocDir"));
const distFontsDir_1 = __importDefault(require("./distFontsDir"));
const distIconsDir_1 = __importDefault(require("./distIconsDir"));
const distImgDir_1 = __importDefault(require("./distImgDir"));
const distJsDir_1 = __importDefault(require("./distJsDir"));
const distNodeDir_1 = __importDefault(require("./distNodeDir"));
const distRootDir_1 = __importDefault(require("./distRootDir"));
const distViewsDir_1 = __importDefault(require("./distViewsDir"));
function __replacePathTokens(paths, settings) {
    const set = Object.assign({ packageTmpDir: true, packageLocalDir: true, packageCacheDir: true, packageRootDir: true, srcRootDir: true, distRootDir: true, srcJsDir: true, srcCssDir: true, srcDocDir: true, srcFontsDir: true, srcIconsDir: true, srcImgDir: true, srcNodeDir: true, srcViewsDir: true, distJsDir: true, distCssDir: true, distDocDir: true, distFontsDir: true, distIconsDir: true, distImgDir: true, distNodeDir: true, distViewsDir: true }, settings);
    const isArray = Array.isArray(paths);
    if (!isArray)
        paths = [paths];
    const finalPaths = paths.map((path) => {
        if (set.packageTmpDir)
            path = path.replace('%packageTmpDir', (0, packageTmpDir_1.default)());
        if (set.packageLocalDir)
            path = path.replace('%packageLocalDir', (0, packageLocalDir_1.default)());
        if (set.packageCacheDir)
            path = path.replace('%packageCacheDir', (0, packageCacheDir_1.default)());
        if (set.packageRootDir)
            path = path.replace('%packageRootDir', (0, packageRootDir_1.default)());
        if (set.srcRootDir)
            path = path.replace('%srcRootDir', (0, srcRootDir_1.default)());
        if (set.distRootDir)
            path = path.replace('%distRootDir', (0, distRootDir_1.default)());
        if (set.srcJsDir)
            path = path.replace('%srcJsDir', (0, srcJsDir_1.default)());
        if (set.srcCssDir)
            path = path.replace('%srcCssDir', (0, srcCssDir_1.default)());
        if (set.srcDocDir)
            path = path.replace('%srcDocDir', (0, srcDocDir_1.default)());
        if (set.srcFontsDir)
            path = path.replace('%srcFontsDir', (0, srcFontsDir_1.default)());
        if (set.srcIconsDir)
            path = path.replace('%srcIconsDir', (0, srcIconsDir_1.default)());
        if (set.srcImgDir)
            path = path.replace('%srcImgDir', (0, srcImgDir_1.default)());
        if (set.srcNodeDir)
            path = path.replace('%srcNodeDir', (0, srcNodeDir_1.default)());
        if (set.srcViewsDir)
            path = path.replace('%srcViewsDir', (0, srcViewsDir_1.default)());
        if (set.distJsDir)
            path = path.replace('%distJsDir', (0, distJsDir_1.default)());
        if (set.distCssDir)
            path = path.replace('%distCssDir', (0, distCssDir_1.default)());
        if (set.distDocDir)
            path = path.replace('%distDocDir', (0, distDocDir_1.default)());
        if (set.distFontsDir)
            path = path.replace('%distFontsDir', (0, distFontsDir_1.default)());
        if (set.distIconsDir)
            path = path.replace('%distIconsDir', (0, distIconsDir_1.default)());
        if (set.distImgDir)
            path = path.replace('%distImgDir', (0, distImgDir_1.default)());
        if (set.distNodeDir)
            path = path.replace('%distNodeDir', (0, distNodeDir_1.default)());
        if (set.distViewsDir)
            path = path.replace('%distViewsDir', (0, distViewsDir_1.default)());
        path = path.replace(/\/\//gm, '/');
        return path;
    });
    if (isArray)
        return finalPaths;
    else
        return finalPaths[0];
}
exports.default = __replacePathTokens;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0VBQWtEO0FBQ2xELHdFQUFrRDtBQUNsRCxzRUFBZ0Q7QUFDaEQsb0VBQThDO0FBRTlDLDREQUFzQztBQUN0Qyw0REFBc0M7QUFDdEMsZ0VBQTBDO0FBQzFDLGdFQUEwQztBQUMxQyw0REFBc0M7QUFDdEMsMERBQW9DO0FBQ3BDLDhEQUF3QztBQUN4Qyw4REFBd0M7QUFDeEMsZ0VBQTBDO0FBRTFDLDhEQUF3QztBQUN4Qyw4REFBd0M7QUFDeEMsa0VBQTRDO0FBQzVDLGtFQUE0QztBQUM1Qyw4REFBd0M7QUFDeEMsNERBQXNDO0FBQ3RDLGdFQUEwQztBQUMxQyxnRUFBMEM7QUFDMUMsa0VBQTRDO0FBK0M1QyxTQUF3QixtQkFBbUIsQ0FDdkMsS0FBSyxFQUNMLFFBQThDO0lBRTlDLE1BQU0sR0FBRyxHQUFHLGdCQUNSLGFBQWEsRUFBRSxJQUFJLEVBQ25CLGVBQWUsRUFBRSxJQUFJLEVBQ3JCLGVBQWUsRUFBRSxJQUFJLEVBQ3JCLGNBQWMsRUFBRSxJQUFJLEVBQ3BCLFVBQVUsRUFBRSxJQUFJLEVBQ2hCLFdBQVcsRUFBRSxJQUFJLEVBQ2pCLFFBQVEsRUFBRSxJQUFJLEVBQ2QsU0FBUyxFQUFFLElBQUksRUFDZixTQUFTLEVBQUUsSUFBSSxFQUNmLFdBQVcsRUFBRSxJQUFJLEVBQ2pCLFdBQVcsRUFBRSxJQUFJLEVBQ2pCLFNBQVMsRUFBRSxJQUFJLEVBQ2YsVUFBVSxFQUFFLElBQUksRUFDaEIsV0FBVyxFQUFFLElBQUksRUFDakIsU0FBUyxFQUFFLElBQUksRUFDZixVQUFVLEVBQUUsSUFBSSxFQUNoQixVQUFVLEVBQUUsSUFBSSxFQUNoQixZQUFZLEVBQUUsSUFBSSxFQUNsQixZQUFZLEVBQUUsSUFBSSxFQUNsQixVQUFVLEVBQUUsSUFBSSxFQUNoQixXQUFXLEVBQUUsSUFBSSxFQUNqQixZQUFZLEVBQUUs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