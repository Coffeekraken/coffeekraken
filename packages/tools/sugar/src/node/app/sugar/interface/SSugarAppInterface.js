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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyQXBwSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N1Z2FyQXBwSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7O0FBRWQsK0VBQXlEO0FBQ3pELGtFQUFrRDtBQUNsRCx3RUFBa0Q7QUFDbEQsb0VBQWlEO0FBQ2pELDRDQUFzQjtBQUN0Qiw4REFBd0M7QUFHeEM7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxNQUFNLGtCQUFtQixTQUFRLG9CQUFZOztBQUNwQyw2QkFBVSxHQUFHLEVBQUUsQ0FBQztBQUd6QixNQUFNLE9BQU8sR0FBRyxlQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUNuRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO0lBQ3hDLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwQyxNQUFNLGFBQWEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDO0lBQzFDLElBQUksZUFBZSxDQUFDO0lBQ3BCLElBQUksYUFBYSxFQUFFO1FBQ2pCLGVBQWUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7S0FDMUM7U0FBTTtRQUNMLE1BQU0sVUFBVSxHQUFHLG9CQUFZLENBQzdCLFNBQVMsQ0FBQyxXQUFXLElBQUksU0FBUyxDQUFDLFVBQVUsQ0FDOUMsQ0FBQztRQUNGLE1BQU0sUUFBUSxHQUFHLGtCQUFhLENBQzVCLFNBQVMsQ0FBQyxXQUFXLElBQUksU0FBUyxDQUFDLFVBQVUsQ0FDOUMsQ0FBQztRQUNGLE1BQU0sS0FBSyxHQUFHO1lBQ1osR0FBRyxVQUFVLGNBQWMsUUFBUSxDQUFDLE9BQU8sQ0FDekMsaUJBQWlCLEVBQ2pCLGNBQWMsQ0FDZixFQUFFO1lBQ0gsR0FBRyxVQUFVLGNBQWMsUUFBUSxDQUFDLE9BQU8sQ0FDekMsZ0JBQWdCLEVBQ2hCLGNBQWMsQ0FDZixFQUFFO1lBQ0gsR0FBRyxVQUFVLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxjQUFjLENBQUMsRUFBRTtZQUN0RSxHQUFHLFVBQVUsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLGNBQWMsQ0FBQyxFQUFFO1NBQ3RFLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO2dCQUFFLE9BQU8sS0FBSyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztnQkFBRSxPQUFPLEtBQUssQ0FBQztZQUN6QyxPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO1lBQUUsT0FBTztRQUMxQixlQUFlLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3JDO0lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDMUQsU0FBUztRQUNULGtCQUFrQixDQUFDLFVBQVUsQ0FDM0IsV0FBVyxRQUFRLFdBQVcsT0FBTyxFQUFFLENBQ3hDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsZUFBZSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzNELElBQ0Usa0JBQWtCLENBQUMsVUFBVSxDQUFDLFdBQVcsUUFBUSxXQUFXLE9BQU8sRUFBRSxDQUFDO2FBQ25FLE9BQU8sS0FBSyxTQUFTLEVBQ3hCO1lBQ0EsTUFBTSxZQUFZLEdBQUcsYUFBSyxDQUFDLFNBQVMsRUFBRSxVQUFVLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDM0QsSUFBSSxZQUFZLEtBQUssU0FBUyxFQUFFO2dCQUM5QixrQkFBa0IsQ0FBQyxVQUFVLENBQzNCLFdBQVcsUUFBUSxXQUFXLE9BQU8sRUFBRSxDQUN4QyxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUM7YUFDMUI7U0FDRjtRQUNELFVBQVU7UUFDVixrQkFBa0IsQ0FBQyxVQUFVLENBQzNCLFdBQVcsUUFBUSxxQkFBcUIsT0FBTyxFQUFFLENBQ2xELEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsZUFBZSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzNELE9BQU8sa0JBQWtCLENBQUMsVUFBVSxDQUNsQyxXQUFXLFFBQVEscUJBQXFCLE9BQU8sRUFBRSxDQUNsRCxDQUFDLFFBQVEsQ0FBQztJQUNiLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFSCxpQkFBUyxrQkFBa0IsQ0FBQyJ9