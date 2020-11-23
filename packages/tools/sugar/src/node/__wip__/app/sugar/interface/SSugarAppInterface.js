"use strict";
const __SInterface = require('../../../class/SInterface');
const __sugarConfig = require('../../../config/sugar');
/**
 * @name                SSugarAppInterface
 * @namespace           sugar.node.ui.sugar.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe de arguments supported
 * when using the SSugarCli class
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SSugarAppInterface extends __SInterface {
}
SSugarAppInterface.definitionObj = {};
const modules = __sugarConfig('sugar-app.modules');
Object.keys(modules).forEach((moduleId) => {
    const moduleObj = modules[moduleId];
    const interfacePath = moduleObj.interface;
    if (interfacePath) {
        const ModuleInterface = require(interfacePath);
        Object.keys(ModuleInterface.definitionObj).forEach((argName) => {
            SSugarAppInterface.definitionObj[`modules.${moduleId}.${argName}`] = Object.assign({}, ModuleInterface.definitionObj[argName]);
        });
    }
});
module.exports = SSugarAppInterface;
