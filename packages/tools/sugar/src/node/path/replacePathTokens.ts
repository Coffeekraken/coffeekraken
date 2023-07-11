import __packageCacheDir from './packageCacheDir.js';
import __packageLocalDir from './packageLocalDir.js';
import __packageRootDir from './packageRootDir.js';
import __packageTmpDir from './packageTmpDir.js';

import __srcCssDir from './srcCssDir.js';
import __srcDocDir from './srcDocDir.js';
import __srcFontsDir from './srcFontsDir.js';
import __srcIconsDir from './srcIconsDir.js';
import __srcImgDir from './srcImgDir.js';
import __srcJsDir from './srcJsDir.js';
import __srcNodeDir from './srcNodeDir.js';
import __srcRootDir from './srcRootDir.js';
import __srcViewsDir from './srcViewsDir.js';

import __distCssDir from './distCssDir.js';
import __distDocDir from './distDocDir.js';
import __distFontsDir from './distFontsDir.js';
import __distIconsDir from './distIconsDir.js';
import __distImgDir from './distImgDir.js';
import __distJsDir from './distJsDir.js';
import __distNodeDir from './distNodeDir.js';
import __distRootDir from './distRootDir.js';
import __distViewsDir from './distViewsDir.js';

/**
 * @name            replacePathTokens
 * @namespace            node.path
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function take as parameter either a path string, or an array of paths
 * and return the according value type with the tokens (%tmpDir, %packageCacheDir, etc...) replaced
 *
 * @param       {String|Array<String>}          paths           The path(s) you want to process
 * @param       {IReplacePathTokensSettings}            [settings={}]       Some settings to configure your tokens replacements
 * @return      {String|Array<String>}                          If passed a string, get back a string, if passed an array, get back an array
 *
 * @snippet         __replacePathTokens($1)
 *
 * @example         js
 * import { __replacePathTokens } from '@coffeekraken/sugar/path';
 * __replacePathTokens('%packageCacheDir/something.txt'); // => /path/to/cache/directory/something.txt'
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface IReplacePathTokensSettings {
    packageTmpDir: boolean;
    packageLocalDir: boolean;
    packageCacheDir: boolean;
    packageRootDir: boolean;
    srcRootDir: boolean;
    distRootDir: boolean;
    srcJsDir: boolean;
    srcCssDir: boolean;
    srcDocDir: boolean;
    srcFontsDir: boolean;
    srcIconsDir: boolean;
    srcImgDir: boolean;
    srcNodeDir: boolean;
    srcViewsDir: boolean;
    distJsDir: boolean;
    distCssDir: boolean;
    distDocDir: boolean;
    distFontsDir: boolean;
    distIconsDir: boolean;
    distImgDir: boolean;
    distNodeDir: boolean;
    distViewsDir: boolean;
}
export default function __replacePathTokens(
    paths,
    settings?: Partial<IReplacePathTokensSettings>,
): string | string[] {
    const set = <IReplacePathTokensSettings>{
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
        distViewsDir: true,
        ...settings,
    };

    const isArray = Array.isArray(paths);
    if (!isArray) paths = [paths];
    const finalPaths = paths.map((path) => {
        if (set.packageTmpDir)
            path = path.replace('%packageTmpDir', __packageTmpDir());
        if (set.packageLocalDir)
            path = path.replace('%packageLocalDir', __packageLocalDir());
        if (set.packageCacheDir)
            path = path.replace('%packageCacheDir', __packageCacheDir());
        if (set.packageRootDir)
            path = path.replace('%packageRootDir', __packageRootDir());
        if (set.srcRootDir) path = path.replace('%srcRootDir', __srcRootDir());
        if (set.distRootDir)
            path = path.replace('%distRootDir', __distRootDir());

        if (set.srcJsDir) path = path.replace('%srcJsDir', __srcJsDir());
        if (set.srcCssDir) path = path.replace('%srcCssDir', __srcCssDir());
        if (set.srcDocDir) path = path.replace('%srcDocDir', __srcDocDir());
        if (set.srcFontsDir)
            path = path.replace('%srcFontsDir', __srcFontsDir());
        if (set.srcIconsDir)
            path = path.replace('%srcIconsDir', __srcIconsDir());
        if (set.srcImgDir) path = path.replace('%srcImgDir', __srcImgDir());
        if (set.srcNodeDir) path = path.replace('%srcNodeDir', __srcNodeDir());
        if (set.srcViewsDir)
            path = path.replace('%srcViewsDir', __srcViewsDir());

        if (set.distJsDir) path = path.replace('%distJsDir', __distJsDir());
        if (set.distCssDir) path = path.replace('%distCssDir', __distCssDir());
        if (set.distDocDir) path = path.replace('%distDocDir', __distDocDir());
        if (set.distFontsDir)
            path = path.replace('%distFontsDir', __distFontsDir());
        if (set.distIconsDir)
            path = path.replace('%distIconsDir', __distIconsDir());
        if (set.distImgDir) path = path.replace('%distImgDir', __distImgDir());
        if (set.distNodeDir)
            path = path.replace('%distNodeDir', __distNodeDir());
        if (set.distViewsDir)
            path = path.replace('%distViewsDir', __distViewsDir());

        path = path.replace(/\/\//gm, '/');
        return path;
    });
    if (isArray) return finalPaths;
    else return finalPaths[0];
}
