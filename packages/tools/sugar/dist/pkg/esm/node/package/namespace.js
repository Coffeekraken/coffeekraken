// @ts-nocheck
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __deepMerge from '../../shared/object/deepMerge.js';
import __fileName from '../fs/filename.js';
import __json from './json.js';
/**
 * @name          namespace
 * @namespace            node.package
 * @type          Function
 * @platform        node
 * @status          wip
 * @private
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
 * import { __namespace } from '@coffeekraken/sugar/package';
 * __namespace('something.cool'); => // coffeekraken.sugar.something.cool
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
    const filename = __fileName(path);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLFdBQVcsTUFBTSxrQ0FBa0MsQ0FBQztBQUMzRCxPQUFPLFVBQVUsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQyxPQUFPLE1BQU0sTUFBTSxXQUFXLENBQUM7QUFFL0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxTQUFTLFNBQVMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDbEMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzVFLCtCQUErQjtJQUMvQixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUN2RCxJQUFJLFdBQVcsR0FBRyxFQUFFLEVBQ2hCLGNBQWMsR0FBRyxFQUFFLENBQUM7SUFDeEIsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUk7UUFDakIsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pFLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPO1FBQ3BCLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFdkQsMkJBQTJCO0lBQzNCLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQztJQUN6QixNQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsSUFBSSxRQUFRLElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ2pELGFBQWEsR0FBRyxhQUFhO2FBQ3hCLE9BQU8sQ0FBQyxHQUFHLEdBQUcsUUFBUSxFQUFFLEVBQUUsQ0FBQzthQUMzQixPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQzlCO0lBQ0QsYUFBYSxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFdkUsSUFBSSxlQUFlLEdBQUcsUUFBUSxDQUFDLE9BQU87U0FDakMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLFdBQVcsQ0FBQztTQUN0QyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsY0FBYyxDQUFDO1NBQzVDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDO1NBQ2hDLElBQUksRUFBRSxDQUFDO0lBQ1osZUFBZSxHQUFHLGVBQWU7U0FDNUIsS0FBSyxDQUFDLEtBQUssQ0FBQztTQUNaLElBQUksQ0FBQyxHQUFHLENBQUM7U0FDVCxLQUFLLENBQUMsSUFBSSxDQUFDO1NBQ1gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsT0FBTyxlQUFlLENBQUM7QUFDM0IsQ0FBQztBQUNELGVBQWUsU0FBUyxDQUFDIn0=