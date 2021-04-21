import __tmpDir from './tmpDir';
import __localDir from './localDir';
import __cacheDir from './cacheDir';
import __rootDir from './rootDir';
import __srcDir from './srcDir';
import __distDir from './distDir';

/**
 * @name            replacePathTokens
 * @namespace            node.path
 * @type            Function
 *
 * This function take as parameter either a path string, or an array of paths
 * and return the according value type with the tokens (%tmpDir, %cacheDir, etc...) replaced
 *
 * @param       {String|Array<String>}          paths           The path(s) you want to process
 * @param       {IReplacePathTokensSettings}            [settings={}]       Some settings to configure your tokens replacements
 * @return      {String|Array<String>}                          If passed a string, get back a string, if passed an array, get back an array
 *
 * @example         js
 * import replacePathTokens from '@coffeekraken/sugar/node/path/replacePathTokens';
 * replacePathTokens('%cacheDir/something.txt'); // => /path/to/cache/directory/something.txt'
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export interface IReplacePathTokensSettings {
  tmpDir: boolean;
  localDir: boolean;
  cacheDir: boolean;
  rootDir: boolean;
  srcDir: boolean;
  distDir: boolean;
}
export default function replacePathTokens(
  paths,
  settings?: Partial<IReplacePathTokensSettings>
): string | string[] {
  const set = <IReplacePathTokensSettings>{
    tmpDir: true,
    localDir: true,
    cacheDir: true,
    rootDir: true,
    srcDir: true,
    distDir: true,
    ...settings
  };

  const isArray = Array.isArray(paths);
  if (!isArray) paths = [paths];
  const finalPaths = paths.map((path) => {
    if (set.tmpDir) path = path.replace('%tmpDir', __tmpDir());
    if (set.localDir) path = path.replace('%localDir', __localDir());
    if (set.cacheDir) path = path.replace('%cacheDir', __cacheDir());
    if (set.rootDir) path = path.replace('%rootDir', __rootDir());
    if (set.srcDir) path = path.replace('%srcDir', __srcDir());
    if (set.distDir) path = path.replace('%distDir', __distDir());
    path = path.replace(/\/\//gm, '/');
    return path;
  });
  if (isArray) return finalPaths;
  else return finalPaths[0];
}
