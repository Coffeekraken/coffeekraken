"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../../class/SInterface"));
const SDeamonInterface_1 = __importDefault(require("../../interface/SDeamonInterface"));
/**
 * @name                SFsDeamonInterface
 * @namespace           sugar.node.deamon.fs.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for an element that is capable of "watching" some events/actions, and respond
 * to it by launching function, or whatever you want.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFsDeamonInterface extends SInterface_1.default {
}
exports.default = SFsDeamonInterface;
SFsDeamonInterface.implementsArray = [SDeamonInterface_1.default];
SFsDeamonInterface.definitionObj = {
    watch: {
        type: 'String',
        alias: 'i',
        description: 'Specify what to watch using a glob pattern',
        required: true,
        level: 1
    }
};
