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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHNjSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVHNjSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7QUFFViw0RUFBc0Q7QUFDdEQsNERBQXNDO0FBQ3RDLCtFQUF5RDtBQUV6RCxNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFDdkIsb0JBQVksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtJQUNqRCxNQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFDekIsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLFNBQVMsSUFBSSxPQUFPLE1BQU0sQ0FBQyxJQUFJLEtBQUssUUFBUTtRQUM5RCxhQUFhLENBQUMsSUFBSSxHQUFHLG9CQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELElBQUksTUFBTSxDQUFDLFNBQVMsS0FBSyxTQUFTO1FBQUUsYUFBYSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQzNFLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsYUFBYSxDQUFDO0FBQzNDLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBcUIsWUFBYSxTQUFRLG9CQUFZOztBQUF0RCwrQkFFQztBQURRLHVCQUFVLEdBQUcsV0FBVyxDQUFDIn0=