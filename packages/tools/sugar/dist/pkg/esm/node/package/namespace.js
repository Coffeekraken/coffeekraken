// @ts-nocheck
import __SugarConfig from '@coffeekraken/s-sugar-config';
import { __fileName } from '@coffeekraken/sugar/fs';
import __deepMerge from '../../shared/object/deepMerge';
import __json from './json';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxXQUFXLE1BQU0sK0JBQStCLENBQUM7QUFDeEQsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsU0FBUyxTQUFTLENBQUMsSUFBSSxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQ2xDLFFBQVEsR0FBRyxXQUFXLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM1RSwrQkFBK0I7SUFDL0IsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDdkQsSUFBSSxXQUFXLEdBQUcsRUFBRSxFQUNoQixjQUFjLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJO1FBQ2pCLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6RSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTztRQUNwQixjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXZELDJCQUEyQjtJQUMzQixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUM7SUFDekIsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLElBQUksUUFBUSxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUNqRCxhQUFhLEdBQUcsYUFBYTthQUN4QixPQUFPLENBQUMsR0FBRyxHQUFHLFFBQVEsRUFBRSxFQUFFLENBQUM7YUFDM0IsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUM5QjtJQUNELGFBQWEsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXZFLElBQUksZUFBZSxHQUFHLFFBQVEsQ0FBQyxPQUFPO1NBQ2pDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxXQUFXLENBQUM7U0FDdEMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLGNBQWMsQ0FBQztTQUM1QyxPQUFPLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQztTQUNoQyxJQUFJLEVBQUUsQ0FBQztJQUNaLGVBQWUsR0FBRyxlQUFlO1NBQzVCLEtBQUssQ0FBQyxLQUFLLENBQUM7U0FDWixJQUFJLENBQUMsR0FBRyxDQUFDO1NBQ1QsS0FBSyxDQUFDLElBQUksQ0FBQztTQUNYLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNmLE9BQU8sZUFBZSxDQUFDO0FBQzNCLENBQUM7QUFDRCxlQUFlLFNBQVMsQ0FBQyJ9