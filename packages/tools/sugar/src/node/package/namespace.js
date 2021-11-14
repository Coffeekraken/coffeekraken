// @ts-nocheck
import __json from './json';
import __deepMerge from '../../shared/object/deepMerge';
import __getFilename from '../fs/filename';
import __SugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name          namespace
 * @namespace            node.package
 * @type          Function
 * @platform        node
 * @status          wip
 *
 * This function take a string as parameter like a path, or a doted string like "something.cool" and return you
 * a proper namespace build using the package name, your passed string sanitized, etc...
 *
 * @param       {String}        path        The string path to convert into a proper namespace
 * @param       {Object}        [settings={}]     An object of settings to configure your namespace generation
 * @return      {String}                    The generated namespace
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import namespace from '@coffeekraken/sugar/node/package/namespace';
 * namespace('something.cool'); => // coffeekraken.sugar.something.cool
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function namespace(path, settings = {}) {
    settings = __deepMerge(__SugarConfig.get('core.namespace') || {}, settings);
    // get the package json content
    const json = __json(settings.context || process.cwd());
    let packageName = '', packageVersion = '';
    if (json && json.name)
        packageName = json.name.replace('@', '').split('/').join('.').trim();
    if (json && json.version)
        packageVersion = json.version.split('.').join('-');
    // sanitize the passed path
    let sanitizedPath = path;
    const filename = __getFilename(path);
    if (filename && sanitizedPath.split('/').length > 1) {
        sanitizedPath = sanitizedPath
            .replace('/' + filename, '')
            .replace(filename, '');
    }
    sanitizedPath = sanitizedPath.split(' ').join('').split('/').join('.');
    let resultNamespace = settings.pattern
        .replace('{package.name}', packageName)
        .replace('{package.version}', packageVersion)
        .replace('{path}', sanitizedPath)
        .trim();
    resultNamespace = resultNamespace
        .split('...')
        .join('.')
        .split('..')
        .join('.');
    return resultNamespace;
}
export default namespace;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFtZXNwYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmFtZXNwYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxXQUFXLE1BQU0sK0JBQStCLENBQUM7QUFDeEQsT0FBTyxhQUFhLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFFekQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILFNBQVMsU0FBUyxDQUFDLElBQUksRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUNsQyxRQUFRLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDNUUsK0JBQStCO0lBQy9CLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELElBQUksV0FBVyxHQUFHLEVBQUUsRUFDaEIsY0FBYyxHQUFHLEVBQUUsQ0FBQztJQUN4QixJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSTtRQUNqQixXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDekUsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU87UUFDcEIsY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUV2RCwyQkFBMkI7SUFDM0IsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLE1BQU0sUUFBUSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxJQUFJLFFBQVEsSUFBSSxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDakQsYUFBYSxHQUFHLGFBQWE7YUFDeEIsT0FBTyxDQUFDLEdBQUcsR0FBRyxRQUFRLEVBQUUsRUFBRSxDQUFDO2FBQzNCLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDOUI7SUFDRCxhQUFhLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUV2RSxJQUFJLGVBQWUsR0FBRyxRQUFRLENBQUMsT0FBTztTQUNqQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsV0FBVyxDQUFDO1NBQ3RDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxjQUFjLENBQUM7U0FDNUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUM7U0FDaEMsSUFBSSxFQUFFLENBQUM7SUFDWixlQUFlLEdBQUcsZUFBZTtTQUM1QixLQUFLLENBQUMsS0FBSyxDQUFDO1NBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQztTQUNULEtBQUssQ0FBQyxJQUFJLENBQUM7U0FDWCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDZixPQUFPLGVBQWUsQ0FBQztBQUMzQixDQUFDO0FBQ0QsZUFBZSxTQUFTLENBQUMifQ==