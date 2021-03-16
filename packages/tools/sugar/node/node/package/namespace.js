"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const json_1 = __importDefault(require("./json"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const filename_1 = __importDefault(require("../fs/filename"));
const sugar_1 = __importDefault(require("../config/sugar"));
/**
 * @name          namespace
 * @namespace     sugar.node.package
 * @type          Function
 * @status              wip
 *
 * This function take a string as parameter like a path, or a doted string like "something.cool" and return you
 * a proper namespace build using the package name, your passed string sanitized, etc...
 *
 * @param       {String}        path        The string path to convert into a proper namespace
 * @param       {Object}        [settings={}]     An object of settings to configure your namespace generation
 * @return      {String}                    The generated namespace
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
    settings = deepMerge_1.default(sugar_1.default('core.namespace') || {}, settings);
    // get the package json content
    const json = json_1.default(settings.context || process.cwd());
    let packageName = '', packageVersion = '';
    if (json && json.name)
        packageName = json.name.replace('@', '').split('/').join('.').trim();
    if (json && json.version)
        packageVersion = json.version.split('.').join('-');
    // sanitize the passed path
    let sanitizedPath = path;
    const filename = filename_1.default(path);
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
exports.default = namespace;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFtZXNwYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL25vZGUvcGFja2FnZS9uYW1lc3BhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsa0RBQTRCO0FBQzVCLG9FQUE4QztBQUM5Qyw4REFBMkM7QUFDM0MsNERBQTRDO0FBRTVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQVMsU0FBUyxDQUFDLElBQUksRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUNwQyxRQUFRLEdBQUcsbUJBQVcsQ0FBQyxlQUFhLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDeEUsK0JBQStCO0lBQy9CLE1BQU0sSUFBSSxHQUFHLGNBQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELElBQUksV0FBVyxHQUFHLEVBQUUsRUFDbEIsY0FBYyxHQUFHLEVBQUUsQ0FBQztJQUN0QixJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSTtRQUNuQixXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdkUsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU87UUFBRSxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRTdFLDJCQUEyQjtJQUMzQixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUM7SUFDekIsTUFBTSxRQUFRLEdBQUcsa0JBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxJQUFJLFFBQVEsSUFBSSxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDbkQsYUFBYSxHQUFHLGFBQWE7YUFDMUIsT0FBTyxDQUFDLEdBQUcsR0FBRyxRQUFRLEVBQUUsRUFBRSxDQUFDO2FBQzNCLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDMUI7SUFDRCxhQUFhLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUV2RSxJQUFJLGVBQWUsR0FBRyxRQUFRLENBQUMsT0FBTztTQUNuQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsV0FBVyxDQUFDO1NBQ3RDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxjQUFjLENBQUM7U0FDNUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUM7U0FDaEMsSUFBSSxFQUFFLENBQUM7SUFDVixlQUFlLEdBQUcsZUFBZTtTQUM5QixLQUFLLENBQUMsS0FBSyxDQUFDO1NBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQztTQUNULEtBQUssQ0FBQyxJQUFJLENBQUM7U0FDWCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDYixPQUFPLGVBQWUsQ0FBQztBQUN6QixDQUFDO0FBQ0Qsa0JBQWUsU0FBUyxDQUFDIn0=