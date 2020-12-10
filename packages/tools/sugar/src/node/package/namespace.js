"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const json_1 = __importDefault(require("./json"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const filename_1 = __importDefault(require("../fs/filename"));
const sugar_1 = __importDefault(require("../config/sugar"));
/**
 * @name          namespace
 * @namespace     sugar.node.package
 * @type          Function
 * @wip
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
module.exports = namespace;
//# sourceMappingURL=module.js.map