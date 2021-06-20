import __packageTmpDir from './packageTmpDir';
import __packageLocalDir from './packageLocalDir';
import __packageCacheDir from './packageCacheDir';
import __packageRootDir from './packageRootDir';
import __srcRootDir from './srcRootDir';
import __distRootDir from './distRootDir';
import __srcJsDir from './srcJsDir';
import __srcCssDir from './srcCssDir';
import __srcFontsDir from './srcFontsDir';
import __srcIconsDir from './srcIconsDir';
import __srcImgDir from './srcImgDir';
import __srcNodeDir from './srcNodeDir';
import __srcViewsDir from './srcViewsDir';
import __distJsDir from './distJsDir';
import __distCssDir from './distCssDir';
import __distFontsDir from './distFontsDir';
import __distIconsDir from './distIconsDir';
import __distImgDir from './distImgDir';
import __distNodeDir from './distNodeDir';
import __distViewsDir from './distViewsDir';
export default function replacePathTokens(paths, settings) {
    const set = Object.assign({ packageTmpDir: true, packageLocalDir: true, packageCacheDir: true, packageRootDir: true, srcRootDir: true, distRootDir: true, srcJsDir: true, srcCssDir: true, srcFontsDir: true, srcIconsDir: true, srcImgDir: true, srcNodeDir: true, srcViewsDir: true, distJsDir: true, distCssDir: true, distFontsDir: true, distIconsDir: true, distImgDir: true, distNodeDir: true, distViewsDir: true }, settings);
    const isArray = Array.isArray(paths);
    if (!isArray)
        paths = [paths];
    const finalPaths = paths.map((path) => {
        if (set.packageTmpDir)
            path = path.replace('%packageTmpDir', __packageTmpDir());
        if (set.packageLocalDir)
            path = path.replace('%packageLocalDir', __packageLocalDir());
        if (set.packageCacheDir)
            path = path.replace('%packageCacheDir', __packageCacheDir());
        if (set.packageRootDir)
            path = path.replace('%packageRootDir', __packageRootDir());
        if (set.srcRootDir)
            path = path.replace('%srcRootDir', __srcRootDir());
        if (set.distRootDir)
            path = path.replace('%distRootDir', __distRootDir());
        if (set.srcJsDir)
            path = path.replace('%srcJsDir', __srcJsDir());
        if (set.srcCssDir)
            path = path.replace('%srcCssDir', __srcCssDir());
        if (set.srcFontsDir)
            path = path.replace('%srcFontsDir', __srcFontsDir());
        if (set.srcIconsDir)
            path = path.replace('%srcIconsDir', __srcIconsDir());
        if (set.srcImgDir)
            path = path.replace('%srcImgDir', __srcImgDir());
        if (set.srcNodeDir)
            path = path.replace('%srcNodeDir', __srcNodeDir());
        if (set.srcViewsDir)
            path = path.replace('%srcViewsDir', __srcViewsDir());
        if (set.distJsDir)
            path = path.replace('%distJsDir', __distJsDir());
        if (set.distCssDir)
            path = path.replace('%distCssDir', __distCssDir());
        if (set.distFontsDir)
            path = path.replace('%distFontsDir', __distFontsDir());
        if (set.distIconsDir)
            path = path.replace('%distIconsDir', __distIconsDir());
        if (set.distImgDir)
            path = path.replace('%distImgDir', __distImgDir());
        if (set.distNodeDir)
            path = path.replace('%distNodeDir', __distNodeDir());
        if (set.distViewsDir)
            path = path.replace('%distViewsDir', __distViewsDir());
        path = path.replace(/\/\//gm, '/');
        return path;
    });
    if (isArray)
        return finalPaths;
    else
        return finalPaths[0];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGFjZVBhdGhUb2tlbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXBsYWNlUGF0aFRva2Vucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGVBQWUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5QyxPQUFPLGlCQUFpQixNQUFNLG1CQUFtQixDQUFDO0FBQ2xELE9BQU8saUJBQWlCLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxnQkFBZ0IsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLFlBQVksTUFBTSxjQUFjLENBQUM7QUFDeEMsT0FBTyxhQUFhLE1BQU0sZUFBZSxDQUFDO0FBRTFDLE9BQU8sVUFBVSxNQUFNLFlBQVksQ0FBQztBQUNwQyxPQUFPLFdBQVcsTUFBTSxhQUFhLENBQUM7QUFDdEMsT0FBTyxhQUFhLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sYUFBYSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLFdBQVcsTUFBTSxhQUFhLENBQUM7QUFDdEMsT0FBTyxZQUFZLE1BQU0sY0FBYyxDQUFDO0FBQ3hDLE9BQU8sYUFBYSxNQUFNLGVBQWUsQ0FBQztBQUUxQyxPQUFPLFdBQVcsTUFBTSxhQUFhLENBQUM7QUFDdEMsT0FBTyxZQUFZLE1BQU0sY0FBYyxDQUFDO0FBQ3hDLE9BQU8sY0FBYyxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sY0FBYyxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sWUFBWSxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLGFBQWEsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxjQUFjLE1BQU0sZ0JBQWdCLENBQUM7QUEyQzVDLE1BQU0sQ0FBQyxPQUFPLFVBQVUsaUJBQWlCLENBQ3ZDLEtBQUssRUFDTCxRQUE4QztJQUU5QyxNQUFNLEdBQUcsR0FBRyxnQkFDVixhQUFhLEVBQUUsSUFBSSxFQUNuQixlQUFlLEVBQUUsSUFBSSxFQUNyQixlQUFlLEVBQUUsSUFBSSxFQUNy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