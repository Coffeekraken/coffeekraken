import __isGlob from '../../shared/is/glob';
import __isPath from '../../shared/is/path';
import __path from 'path';
import __packageRootDir from './packageRootDir';

/**
 * @name            relative
 * @namespace            node.path
 * @type            Function
 * @platform        ts
 * @platform        node
 * @status          beta
 *
 * This function take as input either a string or an array of string and transform the pathes to relative
 * depending on the second argument which is the "from" one.
 *
 * @param       {String|Array<String>}          path            The path(s) to transform into relative ones
 * @param       {String}                [from=__packageRootDir()]                    The path to the base directory from which transform the path(s) to relative
 * @param       {IRelativeSettings}     [settings={}]           Some settings to configure your transform process
 * @return      {String|Array<String>}                          The new transformed paths
 *
 * @setting         {Boolean}       [glob=true]             Specify if you want to transform the globs
 * @setting         {Boolean}       [absolute=true]         Specify if you want to transform the absolute paths
 *
 * @example         js
 * import relative from '@coffeekraken/sugar/js/path/relative';
 * relative([
 *  '/my/cool/path'
 * ], '/my/cool'); => ['path']
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
 */

interface IRelativeSettings {
    glob?: boolean;
    absolute?: boolean;
}

function relative(
    path,
    from = __packageRootDir(),
    settings: IRelativeSettings = {},
) {
    settings = {
        glob: true,
        absolute: true,
        ...settings,
    };
    const isArray = Array.isArray(path);
    if (!isArray) path = [path];

    path = path.map((p) => {
        if (__isGlob(p)) {
            if (settings.glob) return __path.relative(from, p);
            return p;
        } else if (__path.isAbsolute(p)) {
            if (settings.absolute) return __path.relative(from, p);
            return p;
        } else if (__isPath(p)) return __path.relative(from, p);
        return p;
    });

    if (isArray) return path;
    return path[0];
}

export default relative;
