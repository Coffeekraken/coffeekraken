"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const json_1 = __importDefault(require("./json"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
const filename_1 = __importDefault(require("../fs/filename"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
/**
 * @name          namespace
 * @namespace     sugar.node.package
 * @type          Function
 * @status              wip
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
    settings = deepMerge_1.default(s_sugar_config_1.default('core.namespace') || {}, settings);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFtZXNwYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmFtZXNwYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtEQUE0QjtBQUM1Qiw4RUFBd0Q7QUFDeEQsOERBQTJDO0FBQzNDLGtGQUF5RDtBQUV6RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUFTLFNBQVMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDcEMsUUFBUSxHQUFHLG1CQUFXLENBQUMsd0JBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN4RSwrQkFBK0I7SUFDL0IsTUFBTSxJQUFJLEdBQUcsY0FBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDdkQsSUFBSSxXQUFXLEdBQUcsRUFBRSxFQUNsQixjQUFjLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJO1FBQ25CLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2RSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTztRQUFFLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFN0UsMkJBQTJCO0lBQzNCLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQztJQUN6QixNQUFNLFFBQVEsR0FBRyxrQkFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLElBQUksUUFBUSxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUNuRCxhQUFhLEdBQUcsYUFBYTthQUMxQixPQUFPLENBQUMsR0FBRyxHQUFHLFFBQVEsRUFBRSxFQUFFLENBQUM7YUFDM0IsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUMxQjtJQUNELGFBQWEsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXZFLElBQUksZUFBZSxHQUFHLFFBQVEsQ0FBQyxPQUFPO1NBQ25DLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxXQUFXLENBQUM7U0FDdEMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLGNBQWMsQ0FBQztTQUM1QyxPQUFPLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQztTQUNoQyxJQUFJLEVBQUUsQ0FBQztJQUNWLGVBQWUsR0FBRyxlQUFlO1NBQzlCLEtBQUssQ0FBQyxLQUFLLENBQUM7U0FDWixJQUFJLENBQUMsR0FBRyxDQUFDO1NBQ1QsS0FBSyxDQUFDLElBQUksQ0FBQztTQUNYLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNiLE9BQU8sZUFBZSxDQUFDO0FBQ3pCLENBQUM7QUFDRCxrQkFBZSxTQUFTLENBQUMifQ==