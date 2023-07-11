"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const packageCacheDir_js_1 = __importDefault(require("./packageCacheDir.js"));
const packageLocalDir_js_1 = __importDefault(require("./packageLocalDir.js"));
const packageRootDir_js_1 = __importDefault(require("./packageRootDir.js"));
const packageTmpDir_js_1 = __importDefault(require("./packageTmpDir.js"));
const srcCssDir_js_1 = __importDefault(require("./srcCssDir.js"));
const srcDocDir_js_1 = __importDefault(require("./srcDocDir.js"));
const srcFontsDir_js_1 = __importDefault(require("./srcFontsDir.js"));
const srcIconsDir_js_1 = __importDefault(require("./srcIconsDir.js"));
const srcImgDir_js_1 = __importDefault(require("./srcImgDir.js"));
const srcJsDir_js_1 = __importDefault(require("./srcJsDir.js"));
const srcNodeDir_js_1 = __importDefault(require("./srcNodeDir.js"));
const srcRootDir_js_1 = __importDefault(require("./srcRootDir.js"));
const srcViewsDir_js_1 = __importDefault(require("./srcViewsDir.js"));
const distCssDir_js_1 = __importDefault(require("./distCssDir.js"));
const distDocDir_js_1 = __importDefault(require("./distDocDir.js"));
const distFontsDir_js_1 = __importDefault(require("./distFontsDir.js"));
const distIconsDir_js_1 = __importDefault(require("./distIconsDir.js"));
const distImgDir_js_1 = __importDefault(require("./distImgDir.js"));
const distJsDir_js_1 = __importDefault(require("./distJsDir.js"));
const distNodeDir_js_1 = __importDefault(require("./distNodeDir.js"));
const distRootDir_js_1 = __importDefault(require("./distRootDir.js"));
const distViewsDir_js_1 = __importDefault(require("./distViewsDir.js"));
function __replacePathTokens(paths, settings) {
    const set = Object.assign({ packageTmpDir: true, packageLocalDir: true, packageCacheDir: true, packageRootDir: true, srcRootDir: true, distRootDir: true, srcJsDir: true, srcCssDir: true, srcDocDir: true, srcFontsDir: true, srcIconsDir: true, srcImgDir: true, srcNodeDir: true, srcViewsDir: true, distJsDir: true, distCssDir: true, distDocDir: true, distFontsDir: true, distIconsDir: true, distImgDir: true, distNodeDir: true, distViewsDir: true }, settings);
    const isArray = Array.isArray(paths);
    if (!isArray)
        paths = [paths];
    const finalPaths = paths.map((path) => {
        if (set.packageTmpDir)
            path = path.replace('%packageTmpDir', (0, packageTmpDir_js_1.default)());
        if (set.packageLocalDir)
            path = path.replace('%packageLocalDir', (0, packageLocalDir_js_1.default)());
        if (set.packageCacheDir)
            path = path.replace('%packageCacheDir', (0, packageCacheDir_js_1.default)());
        if (set.packageRootDir)
            path = path.replace('%packageRootDir', (0, packageRootDir_js_1.default)());
        if (set.srcRootDir)
            path = path.replace('%srcRootDir', (0, srcRootDir_js_1.default)());
        if (set.distRootDir)
            path = path.replace('%distRootDir', (0, distRootDir_js_1.default)());
        if (set.srcJsDir)
            path = path.replace('%srcJsDir', (0, srcJsDir_js_1.default)());
        if (set.srcCssDir)
            path = path.replace('%srcCssDir', (0, srcCssDir_js_1.default)());
        if (set.srcDocDir)
            path = path.replace('%srcDocDir', (0, srcDocDir_js_1.default)());
        if (set.srcFontsDir)
            path = path.replace('%srcFontsDir', (0, srcFontsDir_js_1.default)());
        if (set.srcIconsDir)
            path = path.replace('%srcIconsDir', (0, srcIconsDir_js_1.default)());
        if (set.srcImgDir)
            path = path.replace('%srcImgDir', (0, srcImgDir_js_1.default)());
        if (set.srcNodeDir)
            path = path.replace('%srcNodeDir', (0, srcNodeDir_js_1.default)());
        if (set.srcViewsDir)
            path = path.replace('%srcViewsDir', (0, srcViewsDir_js_1.default)());
        if (set.distJsDir)
            path = path.replace('%distJsDir', (0, distJsDir_js_1.default)());
        if (set.distCssDir)
            path = path.replace('%distCssDir', (0, distCssDir_js_1.default)());
        if (set.distDocDir)
            path = path.replace('%distDocDir', (0, distDocDir_js_1.default)());
        if (set.distFontsDir)
            path = path.replace('%distFontsDir', (0, distFontsDir_js_1.default)());
        if (set.distIconsDir)
            path = path.replace('%distIconsDir', (0, distIconsDir_js_1.default)());
        if (set.distImgDir)
            path = path.replace('%distImgDir', (0, distImgDir_js_1.default)());
        if (set.distNodeDir)
            path = path.replace('%distNodeDir', (0, distNodeDir_js_1.default)());
        if (set.distViewsDir)
            path = path.replace('%distViewsDir', (0, distViewsDir_js_1.default)());
        path = path.replace(/\/\//gm, '/');
        return path;
    });
    if (isArray)
        return finalPaths;
    else
        return finalPaths[0];
}
exports.default = __replacePathTokens;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOEVBQXFEO0FBQ3JELDhFQUFxRDtBQUNyRCw0RUFBbUQ7QUFDbkQsMEVBQWlEO0FBRWpELGtFQUF5QztBQUN6QyxrRUFBeUM7QUFDekMsc0VBQTZDO0FBQzdDLHNFQUE2QztBQUM3QyxrRUFBeUM7QUFDekMsZ0VBQXVDO0FBQ3ZDLG9FQUEyQztBQUMzQyxvRUFBMkM7QUFDM0Msc0VBQTZDO0FBRTdDLG9FQUEyQztBQUMzQyxvRUFBMkM7QUFDM0Msd0VBQStDO0FBQy9DLHdFQUErQztBQUMvQyxvRUFBMkM7QUFDM0Msa0VBQXlDO0FBQ3pDLHNFQUE2QztBQUM3QyxzRUFBNkM7QUFDN0Msd0VBQStDO0FBaUQvQyxTQUF3QixtQkFBbUIsQ0FDdkMsS0FBSyxFQUNMLFFBQThDO0lBRTlDLE1BQU0sR0FBRyxHQUFHLGdCQUNSLGFBQWEsRUFBRSxJQUFJLEVBQ25CLGVBQWUsRUFBRSxJQUFJLEVBQ3JCLGVBQWUsRUFBRSxJQUFJLEVBQ3JCLGNBQWMsRUFBRSxJQUFJLEVBQ3BCLFVBQVUsRUFBRSxJQUFJLEVBQ2hCLFdBQVcsRUFBRSxJQUFJLEVBQ2pCLFFBQVEsRUFBRSxJQUFJLEVBQ2QsU0FBUyxFQUFFLElBQUksRUFDZixTQUFTLEVBQUUsSUFBSSxFQUNmLFdBQVcsRUFBRSxJQUFJLEVBQ2pCLFdBQVcsRUFBRSxJQUFJLEVBQ2pCLFNBQVMsRUFBRSxJQUFJLEVBQ2YsVUFBVSxFQUFFLElBQUksRUFDaEIsV0FBVyxFQUFFLElBQUksRUFDakIsU0FBUyxFQUFFLElBQUksRUFDZixVQUFVLEVBQUUsSUFBSSxFQUNoQixVQUFVLEVBQUUsSUFBSSxFQUNoQixZQUFZLEVBQUUsSUFBSSxFQUNsQixZQUFZLEVBQUUsSUFBSSxFQUNsQixVQUFVLEVBQUUsSUFBSSxFQUNoQixXQUFXLEVBQUUsSUFBSSxFQUNqQixZQUFZLEVBQUUs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