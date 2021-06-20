import __isGlob from '../../shared/is/glob';
import __isPath from '../../shared/is/path';
import __path from 'path';
import __packageRootDir from './packageRootDir';

/**
 * @name            absolute
 * @namespace            js.path
 * @type            Function
 * @status              beta
 *
 * This function take as input either a string or an array of string and transform the pathes to absolute
 * depending on the second argument which is the "from" one.
 *
 * @param       {String|Array<String>}          path            The path(s) to transform into relative ones
 * @param       {String}                [from=__packageRootDir()]                    The path to the base directory from which transform the path(s) to relative
 * @param       {IAbsoluteSettings}     [settings={}]           Some settings to configure your transform process
 * @return      {String|Array<String>}                          The new transformed paths
 *
 * @setting         {Boolean}       [glob=true]             Specify if you want to transform the globs
 * @setting         {Boolean}       [relative=true]         Specify if you want to transform the absolute paths
 *
 * @example         js
 * import relative from '@coffeekraken/sugar/js/path/absolute';
 * absolute([
 *  'path'
 * ], '/my/cool'); => ['/my/cool/path']
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
 */

interface IAbsoluteSettings {
  glob?: boolean;
  relative?: boolean;
}

function absolute(
  path,
  from = __packageRootDir(),
  settings: IAbsoluteSettings = {}
) {
  settings = {
    glob: true,
    ...settings
  };
  const isArray = Array.isArray(path);
  if (!isArray) path = [path];

  path = path.map((p) => {
    if (__path.isAbsolute(p)) return p;
    if (__isGlob(p)) {
      if (settings.glob) return __path.resolve(from, p);
      return p;
    } else if (__isPath(p)) return __path.resolve(from, p);
    return p;
  });
  if (isArray) return path;
  return path[0];
}

export default absolute;
