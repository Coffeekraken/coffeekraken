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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHNjSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL25vZGUvdHlwZXNjcmlwdC9jb21waWxlL2ludGVyZmFjZS9Uc2NJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVOzs7OztBQUVWLDRFQUFzRDtBQUN0RCw0REFBc0M7QUFDdEMsK0VBQXlEO0FBRXpELE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztBQUN2QixvQkFBWSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO0lBQ2pELE1BQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUN6QixJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssU0FBUyxJQUFJLE9BQU8sTUFBTSxDQUFDLElBQUksS0FBSyxRQUFRO1FBQzlELGFBQWEsQ0FBQyxJQUFJLEdBQUcsb0JBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakQsSUFBSSxNQUFNLENBQUMsU0FBUyxLQUFLLFNBQVM7UUFBRSxhQUFhLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDM0UsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxhQUFhLENBQUM7QUFDM0MsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFxQixZQUFhLFNBQVEsb0JBQVk7O0FBQXRELCtCQUVDO0FBRFEsdUJBQVUsR0FBRyxXQUFXLENBQUMifQ==