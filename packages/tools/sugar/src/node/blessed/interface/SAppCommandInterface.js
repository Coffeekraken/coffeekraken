"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../class/SInterface"));
/**
 * @name                SAppCommandInterface
 * @namespace           sugar.node.blessed.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for an element used as a command in an SCommandPanel instance.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SAppCommandInterface extends SInterface_1.default {
}
exports.default = SAppCommandInterface;
// static implementsArray = [__SCliInterface];
// static definitionObj = {};
SAppCommandInterface.title = 'SApp Command Interface';
SAppCommandInterface.description = 'This interface represent the minimum requirements that MUST have the instances passed in an SApp based application';
