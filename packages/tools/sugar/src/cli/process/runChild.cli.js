"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const parseArgs_1 = __importDefault(require("../../node/cli/parseArgs"));
const SProcess_1 = __importDefault(require("../../node/process/SProcess"));
module.exports = (stringArgs = '') => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuQ2hpbGQuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicnVuQ2hpbGQuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7O0FBRWQseUVBQW1EO0FBQ25ELDJFQUFxRDtBQU1yRCxpQkFBUyxDQUFDLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUMzQixNQUFNLElBQUksR0FBNEIsbUJBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM5RCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtRQUNyQixNQUFNLDJGQUEyRixDQUFDO0tBQ25HO0lBQ0QsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUUvQyxJQUFJLFlBQVksWUFBWSxrQkFBVSxFQUFFO1FBQ3RDLE1BQU0sZUFBZSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDM0MsZUFBZSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUNqQztBQUNILENBQUMsQ0FBQyJ9