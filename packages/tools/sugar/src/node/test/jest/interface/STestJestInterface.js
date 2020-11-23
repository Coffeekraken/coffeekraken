"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../../class/SInterface"));
const STestInterface_1 = __importDefault(require("../../interface/STestInterface"));
const sugar_1 = __importDefault(require("../../../config/sugar"));
const deepMerge_1 = __importDefault(require("../../../object/deepMerge"));
/**
 * @name                STestJestCliInterface
 * @namespace           sugar.node.test.jest.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the cli parameters for the
 * test jest process.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class STestJestCliInterface extends SInterface_1.default {
}
exports.default = STestJestCliInterface;
STestJestCliInterface.definitionObj = deepMerge_1.default(STestInterface_1.default.definitionObj, {
    input: {
        default: sugar_1.default('jest.cli.input')
    },
    watch: {
        default: sugar_1.default('jest.cli.watch')
    }
});
