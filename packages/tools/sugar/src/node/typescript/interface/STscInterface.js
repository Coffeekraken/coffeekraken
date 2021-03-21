"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = __importDefault(require("typescript"));
const upperFirst_1 = __importDefault(require("@coffeekraken/sugar/shared/string/upperFirst"));
const SInterface_1 = __importDefault(require("@coffeekraken/sugar/node/interface/SInterface"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzY0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNUc2NJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsNERBQXNDO0FBQ3RDLDhGQUF3RTtBQUN4RSwrRkFBeUU7QUFFekUsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO0FBQ3ZCLG9CQUFZLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7SUFDakQsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBQ3pCLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxTQUFTLElBQUksT0FBTyxNQUFNLENBQUMsSUFBSSxLQUFLLFFBQVE7UUFDOUQsYUFBYSxDQUFDLElBQUksR0FBRyxvQkFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRCxJQUFJLE1BQU0sQ0FBQyxTQUFTLEtBQUssU0FBUztRQUFFLGFBQWEsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUMzRSxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLGFBQWEsQ0FBQztBQUMzQyxDQUFDLENBQUMsQ0FBQztBQUVILE1BQXFCLFlBQWEsU0FBUSxvQkFBWTs7QUFBdEQsK0JBRUM7QUFEUSx1QkFBVSxHQUFHLFdBQVcsQ0FBQyJ9