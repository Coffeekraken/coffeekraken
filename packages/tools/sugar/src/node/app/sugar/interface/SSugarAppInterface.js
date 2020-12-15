"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SInterface_1 = __importDefault(require("../../../interface/SInterface"));
const sugar_1 = __importDefault(require("../../../config/sugar"));
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
    if (interfacePath) {
        const ModuleInterface = require(interfacePath);
        Object.keys(ModuleInterface.definition).forEach((argName) => {
            SSugarAppInterface.definition[`modules.${moduleId}.${argName}`] = Object.assign({}, ModuleInterface.definition[argName]);
        });
    }
});
module.exports = SSugarAppInterface;
//# sourceMappingURL=SSugarAppInterface.js.map