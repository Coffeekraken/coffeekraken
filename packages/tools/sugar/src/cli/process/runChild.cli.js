"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseArgs_1 = __importDefault(require("../../node/cli/parseArgs"));
const SProcess_1 = __importDefault(require("../../node/process/SProcess"));
exports.default = (stringArgs = '') => {
    const args = parseArgs_1.default(stringArgs);
    if (!args.processPath) {
        throw `Sorry but to use this endpont you have to specify at least a "--processPath" parameter...`;
    }
    const ProcessClass = require(args.processPath);
    if (ProcessClass instanceof SProcess_1.default) {
        const processInstance = new ProcessClass();
        processInstance.run(stringArgs);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuQ2hpbGQuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicnVuQ2hpbGQuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHlFQUFtRDtBQUNuRCwyRUFBcUQ7QUFNckQsa0JBQWUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDakMsTUFBTSxJQUFJLEdBQTRCLG1CQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDOUQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7UUFDckIsTUFBTSwyRkFBMkYsQ0FBQztLQUNuRztJQUNELE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFL0MsSUFBSSxZQUFZLFlBQVksa0JBQVUsRUFBRTtRQUN0QyxNQUFNLGVBQWUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzNDLGVBQWUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDakM7QUFDSCxDQUFDLENBQUMifQ==