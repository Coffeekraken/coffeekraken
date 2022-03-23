import {
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
import __packageTmpDir from "./packageTmpDir";
import __packageLocalDir from "./packageLocalDir";
import __packageCacheDir from "./packageCacheDir";
import __packageRootDir from "./packageRootDir";
import __srcRootDir from "./srcRootDir";
import __distRootDir from "./distRootDir";
import __srcJsDir from "./srcJsDir";
import __srcCssDir from "./srcCssDir";
import __srcDocDir from "./srcDocDir";
import __srcFontsDir from "./srcFontsDir";
import __srcIconsDir from "./srcIconsDir";
import __srcImgDir from "./srcImgDir";
import __srcNodeDir from "./srcNodeDir";
import __srcViewsDir from "./srcViewsDir";
import __distJsDir from "./distJsDir";
import __distCssDir from "./distCssDir";
import __distDocDir from "./distDocDir";
import __distFontsDir from "./distFontsDir";
import __distIconsDir from "./distIconsDir";
import __distImgDir from "./distImgDir";
import __distNodeDir from "./distNodeDir";
import __distViewsDir from "./distViewsDir";
function replacePathTokens(paths, settings) {
  const set = __spreadValues({
    packageTmpDir: true,
    packageLocalDir: true,
    packageCacheDir: true,
    packageRootDir: true,
    srcRootDir: true,
    distRootDir: true,
    srcJsDir: true,
    srcCssDir: true,
    srcDocDir: true,
    srcFontsDir: true,
    srcIconsDir: true,
    srcImgDir: true,
    srcNodeDir: true,
    srcViewsDir: true,
    distJsDir: true,
    distCssDir: true,
    distDocDir: true,
    distFontsDir: true,
    distIconsDir: true,
    distImgDir: true,
    distNodeDir: true,
    distViewsDir: true
  }, settings);
  const isArray = Array.isArray(paths);
  if (!isArray)
    paths = [paths];
  const finalPaths = paths.map((path) => {
    if (set.packageTmpDir)
      path = path.replace("%packageTmpDir", __packageTmpDir());
    if (set.packageLocalDir)
      path = path.replace("%packageLocalDir", __packageLocalDir());
    if (set.packageCacheDir)
      path = path.replace("%packageCacheDir", __packageCacheDir());
    if (set.packageRootDir)
      path = path.replace("%packageRootDir", __packageRootDir());
    if (set.srcRootDir)
      path = path.replace("%srcRootDir", __srcRootDir());
    if (set.distRootDir)
      path = path.replace("%distRootDir", __distRootDir());
    if (set.srcJsDir)
      path = path.replace("%srcJsDir", __srcJsDir());
    if (set.srcCssDir)
      path = path.replace("%srcCssDir", __srcCssDir());
    if (set.srcDocDir)
      path = path.replace("%srcDocDir", __srcDocDir());
    if (set.srcFontsDir)
      path = path.replace("%srcFontsDir", __srcFontsDir());
    if (set.srcIconsDir)
      path = path.replace("%srcIconsDir", __srcIconsDir());
    if (set.srcImgDir)
      path = path.replace("%srcImgDir", __srcImgDir());
    if (set.srcNodeDir)
      path = path.replace("%srcNodeDir", __srcNodeDir());
    if (set.srcViewsDir)
      path = path.replace("%srcViewsDir", __srcViewsDir());
    if (set.distJsDir)
      path = path.replace("%distJsDir", __distJsDir());
    if (set.distCssDir)
      path = path.replace("%distCssDir", __distCssDir());
    if (set.distDocDir)
      path = path.replace("%distDocDir", __distDocDir());
    if (set.distFontsDir)
      path = path.replace("%distFontsDir", __distFontsDir());
    if (set.distIconsDir)
      path = path.replace("%distIconsDir", __distIconsDir());
    if (set.distImgDir)
      path = path.replace("%distImgDir", __distImgDir());
    if (set.distNodeDir)
      path = path.replace("%distNodeDir", __distNodeDir());
    if (set.distViewsDir)
      path = path.replace("%distViewsDir", __distViewsDir());
    path = path.replace(/\/\//gm, "/");
    return path;
  });
  if (isArray)
    return finalPaths;
  else
    return finalPaths[0];
}
export {
  replacePathTokens as default
};
