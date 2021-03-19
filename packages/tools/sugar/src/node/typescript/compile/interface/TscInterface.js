"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = __importDefault(require("typescript"));
const upperFirst_1 = __importDefault(require("../../../../shared/string/upperFirst"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHNjSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVHNjSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDREQUFzQztBQUN0QyxzRkFBZ0U7QUFDaEUsK0VBQXlEO0FBRXpELE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztBQUN2QixvQkFBWSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO0lBQ2pELE1BQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUN6QixJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssU0FBUyxJQUFJLE9BQU8sTUFBTSxDQUFDLElBQUksS0FBSyxRQUFRO1FBQzlELGFBQWEsQ0FBQyxJQUFJLEdBQUcsb0JBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakQsSUFBSSxNQUFNLENBQUMsU0FBUyxLQUFLLFNBQVM7UUFBRSxhQUFhLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDM0UsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxhQUFhLENBQUM7QUFDM0MsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFxQixZQUFhLFNBQVEsb0JBQVk7O0FBQXRELCtCQUVDO0FBRFEsdUJBQVUsR0FBRyxXQUFXLENBQUMifQ==