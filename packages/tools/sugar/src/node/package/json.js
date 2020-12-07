"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const rootPath_1 = __importDefault(require("./rootPath"));
const fs_1 = __importDefault(require("fs"));
/**
 * @name          json
 * @namespace     sugar.node.package
 * @type          Function
 * @beta
 *
 * This function return you the package.json of the current working package into object format
 *
 * @param     {String}      [from=process.cwd()]      The path from where to search upward for the package.json file
 * @return    {Object}          The package.json into object format
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import json from '@coffeekraken/sugar/node/package/json';
 * json();
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function json(from = process.cwd(), highest = false) {
    const path = `${rootPath_1.default(from, highest)}/package.json`;
    if (!fs_1.default.existsSync(path))
        return false;
    return require(path);
}
module.exports = json;
//# sourceMappingURL=json.js.map