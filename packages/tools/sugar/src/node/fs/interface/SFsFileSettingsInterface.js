"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../class/SInterface"));
/**
 * @name                SFsFileSettingsInterface
 * @namespace           sugar.node.fs.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a "file" descriptor element
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFsFileSettingsInterface extends SInterface_1.default {
}
exports.default = SFsFileSettingsInterface;
SFsFileSettingsInterface.definitionObj = {
    checkExistence: {
        type: 'Boolean',
        description: 'Specify if you want to check or not the file existence on the filesystem',
        required: true
    },
    rootDir: {
        type: 'String',
        description: 'Specify a root directory that you want to considere as the root folder where the file live. This will gives you access to properties like ```rootDir``` and ```relPath```',
        required: false
    }
};
