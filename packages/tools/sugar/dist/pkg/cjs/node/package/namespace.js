"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
const filename_1 = __importDefault(require("../fs/filename"));
const json_1 = __importDefault(require("./json"));
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
    settings = (0, deepMerge_1.default)(s_sugar_config_1.default.get('core.namespace') || {}, settings);
    // get the package json content
    const json = (0, json_1.default)(settings.context || process.cwd());
    let packageName = '', packageVersion = '';
    if (json && json.name)
        packageName = json.name.replace('@', '').split('/').join('.').trim();
    if (json && json.version)
        packageVersion = json.version.split('.').join('-');
    // sanitize the passed path
    let sanitizedPath = path;
    const filename = (0, filename_1.default)(path);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtGQUF5RDtBQUN6RCw4RUFBd0Q7QUFDeEQsOERBQXdDO0FBQ3hDLGtEQUE0QjtBQUU1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILFNBQVMsU0FBUyxDQUFDLElBQUksRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUNsQyxRQUFRLEdBQUcsSUFBQSxtQkFBVyxFQUFDLHdCQUFhLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzVFLCtCQUErQjtJQUMvQixNQUFNLElBQUksR0FBRyxJQUFBLGNBQU0sRUFBQyxRQUFRLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELElBQUksV0FBVyxHQUFHLEVBQUUsRUFDaEIsY0FBYyxHQUFHLEVBQUUsQ0FBQztJQUN4QixJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSTtRQUNqQixXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDekUsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU87UUFDcEIsY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUV2RCwyQkFBMkI7SUFDM0IsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLE1BQU0sUUFBUSxHQUFHLElBQUEsa0JBQVUsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxJQUFJLFFBQVEsSUFBSSxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDakQsYUFBYSxHQUFHLGFBQWE7YUFDeEIsT0FBTyxDQUFDLEdBQUcsR0FBRyxRQUFRLEVBQUUsRUFBRSxDQUFDO2FBQzNCLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDOUI7SUFDRCxhQUFhLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUV2RSxJQUFJLGVBQWUsR0FBRyxRQUFRLENBQUMsT0FBTztTQUNqQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsV0FBVyxDQUFDO1NBQ3RDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxjQUFjLENBQUM7U0FDNUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUM7U0FDaEMsSUFBSSxFQUFFLENBQUM7SUFDWixlQUFlLEdBQUcsZUFBZTtTQUM1QixLQUFLLENBQUMsS0FBSyxDQUFDO1NBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQztTQUNULEtBQUssQ0FBQyxJQUFJLENBQUM7U0FDWCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDZixPQUFPLGVBQWUsQ0FBQztBQUMzQixDQUFDO0FBQ0Qsa0JBQWUsU0FBUyxDQUFDIn0=