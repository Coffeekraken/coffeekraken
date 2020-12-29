"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SInterface_1 = __importDefault(require("../../../interface/SInterface"));
const sugar_1 = __importDefault(require("../../../config/sugar"));
const folderPath_1 = __importDefault(require("../../../fs/folderPath"));
const filename_1 = __importDefault(require("../../../fs/filename"));
const fs_1 = __importDefault(require("fs"));
const get_1 = __importDefault(require("../../../object/get"));
/**
 * @name                SSugarAppInterface
 * @namespace           sugar.node.ui.sugar.interface
 * @type                Class
 * @extends             SInterface
 * @wip
 *
 * This class represent the interface that describe de arguments supported
 * when using the SSugarCli class
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SSugarAppInterface extends SInterface_1.default {
}
SSugarAppInterface.definition = {};
const modules = sugar_1.default('sugar-app.modules');
Object.keys(modules).forEach((moduleId) => {
    const moduleObj = modules[moduleId];
    const interfacePath = moduleObj.interface;
    let ModuleInterface;
    if (interfacePath) {
        ModuleInterface = require(interfacePath);
    }
    else {
        const folderPath = folderPath_1.default(moduleObj.processPath || moduleObj.modulePath);
        const filename = filename_1.default(moduleObj.processPath || moduleObj.modulePath);
        const toTry = [
            `${folderPath}/interface/${filename.replace(/Process(\.js)?$/, 'Interface.js')}`,
            `${folderPath}/interface/${filename.replace(/Module(\.js)?$/, 'Interface.js')}`,
            `${folderPath}/${filename.replace(/Process(\.js)?$/, 'Interface.js')}`,
            `${folderPath}/${filename.replace(/Module(\.js)?$/, 'Interface.js')}`
        ].filter((path) => {
            if (!path.match(/\.js$/))
                return false;
            if (!fs_1.default.existsSync(path))
                return false;
            return true;
        });
        if (!toTry.length)
            return;
        ModuleInterface = require(toTry[0]);
    }
    Object.keys(ModuleInterface.definition).forEach((argName) => {
        // params
        SSugarAppInterface.definition[`modules.${moduleId}.params.${argName}`] = Object.assign({}, ModuleInterface.definition[argName]);
        if (SSugarAppInterface.definition[`modules.${moduleId}.params.${argName}`]
            .default === undefined) {
            const defaultValue = get_1.default(moduleObj, `params.${argName}`);
            if (defaultValue !== undefined) {
                SSugarAppInterface.definition[`modules.${moduleId}.params.${argName}`].default = defaultValue;
            }
        }
        // presets
        SSugarAppInterface.definition[`modules.${moduleId}.presets.*.params.${argName}`] = Object.assign({}, ModuleInterface.definition[argName]);
        delete SSugarAppInterface.definition[`modules.${moduleId}.presets.*.params.${argName}`].required;
    });
});
module.exports = SSugarAppInterface;
//# sourceMappingURL=SSugarAppInterface.js.map