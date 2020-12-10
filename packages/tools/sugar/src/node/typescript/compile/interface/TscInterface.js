"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const upperFirst_1 = __importDefault(require("../../../string/upperFirst"));
const typescript_1 = __importDefault(require("typescript"));
const SInterface_1 = __importDefault(require("../../../interface/SInterface"));
const _definition = {};
typescript_1.default.optionDeclarations.forEach((argObj) => {
    const argDefinition = {};
    if (argObj.type !== undefined && typeof argObj.type === 'string')
        argDefinition.type = upperFirst_1.default(argObj.type);
    if (argObj.shortName !== undefined)
        argDefinition.alias = argObj.shortName;
    _definition[argObj.name] = argDefinition;
});
class TscInterface extends SInterface_1.default {
}
exports.default = TscInterface;
TscInterface.definition = _definition;
//# sourceMappingURL=module.js.map