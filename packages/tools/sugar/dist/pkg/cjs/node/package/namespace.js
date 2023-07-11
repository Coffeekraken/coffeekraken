"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const deepMerge_js_1 = __importDefault(require("../../shared/object/deepMerge.js"));
const filename_js_1 = __importDefault(require("../fs/filename.js"));
const json_js_1 = __importDefault(require("./json.js"));
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
    settings = (0, deepMerge_js_1.default)(s_sugar_config_1.default.get('core.namespace') || {}, settings);
    // get the package json content
    const json = (0, json_js_1.default)(settings.context || process.cwd());
    let packageName = '', packageVersion = '';
    if (json && json.name)
        packageName = json.name.replace('@', '').split('/').join('.').trim();
    if (json && json.version)
        packageVersion = json.version.split('.').join('-');
    // sanitize the passed path
    let sanitizedPath = path;
    const filename = (0, filename_js_1.default)(path);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtGQUF5RDtBQUN6RCxvRkFBMkQ7QUFDM0Qsb0VBQTJDO0FBQzNDLHdEQUErQjtBQUUvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILFNBQVMsU0FBUyxDQUFDLElBQUksRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUNsQyxRQUFRLEdBQUcsSUFBQSxzQkFBVyxFQUFDLHdCQUFhLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzVFLCtCQUErQjtJQUMvQixNQUFNLElBQUksR0FBRyxJQUFBLGlCQUFNLEVBQUMsUUFBUSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUN2RCxJQUFJLFdBQVcsR0FBRyxFQUFFLEVBQ2hCLGNBQWMsR0FBRyxFQUFFLENBQUM7SUFDeEIsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUk7UUFDakIsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pFLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPO1FBQ3BCLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFdkQsMkJBQTJCO0lBQzNCLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQztJQUN6QixNQUFNLFFBQVEsR0FBRyxJQUFBLHFCQUFVLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsSUFBSSxRQUFRLElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ2pELGFBQWEsR0FBRyxhQUFhO2FBQ3hCLE9BQU8sQ0FBQyxHQUFHLEdBQUcsUUFBUSxFQUFFLEVBQUUsQ0FBQzthQUMzQixPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQzlCO0lBQ0QsYUFBYSxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFdkUsSUFBSSxlQUFlLEdBQUcsUUFBUSxDQUFDLE9BQU87U0FDakMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLFdBQVcsQ0FBQztTQUN0QyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsY0FBYyxDQUFDO1NBQzVDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDO1NBQ2hDLElBQUksRUFBRSxDQUFDO0lBQ1osZUFBZSxHQUFHLGVBQWU7U0FDNUIsS0FBSyxDQUFDLEtBQUssQ0FBQztTQUNaLElBQUksQ0FBQyxHQUFHLENBQUM7U0FDVCxLQUFLLENBQUMsSUFBSSxDQUFDO1NBQ1gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsT0FBTyxlQUFlLENBQUM7QUFDM0IsQ0FBQztBQUNELGtCQUFlLFNBQVMsQ0FBQyJ9