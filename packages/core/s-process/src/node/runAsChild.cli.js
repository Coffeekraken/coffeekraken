"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseArgs_1 = __importDefault(require("@coffeekraken/sugar/shared/cli/parseArgs"));
const s_process_1 = __importDefault(require("@coffeekraken/s-process"));
const stringArgs = process.argv
    .slice(1)
    .map((arg) => {
    if (arg.slice(0, 2) !== '--' && arg.slice(0, 1) !== '-') {
        return `"${arg}"`;
    }
    return arg;
})
    .join(' ') || '';
const args = parseArgs_1.default(stringArgs);
if (!args.processPath) {
    throw `Sorry but to use this endpoint you have to specify at least a "--processPath" parameter...`;
}
const settings = Object.assign({}, args._settings);
delete args._settings;
const ProcessClass = require(args.processPath).default; // eslint-disable-line
if (ProcessClass.prototype instanceof s_process_1.default) {
    const processInstance = new ProcessClass({}, {
        process: Object.assign(Object.assign({}, settings), { runAsChild: false })
    });
    processInstance.run(stringArgs);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuQXNDaGlsZC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJydW5Bc0NoaWxkLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCx5RkFBbUU7QUFDbkUsd0VBQWlEO0FBTWpELE1BQU0sVUFBVSxHQUNkLE9BQU8sQ0FBQyxJQUFJO0tBQ1QsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUNSLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQ1gsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO1FBQ3ZELE9BQU8sSUFBSSxHQUFHLEdBQUcsQ0FBQztLQUNuQjtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQyxDQUFDO0tBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNyQixNQUFNLElBQUksR0FBNEIsbUJBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM5RCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtJQUNyQixNQUFNLDRGQUE0RixDQUFDO0NBQ3BHO0FBQ0QsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ25ELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztBQUN0QixNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLHNCQUFzQjtBQUM5RSxJQUFJLFlBQVksQ0FBQyxTQUFTLFlBQVksbUJBQVUsRUFBRTtJQUNoRCxNQUFNLGVBQWUsR0FBRyxJQUFJLFlBQVksQ0FDdEMsRUFBRSxFQUNGO1FBQ0UsT0FBTyxrQ0FDRixRQUFRLEtBQ1gsVUFBVSxFQUFFLEtBQUssR0FDbEI7S0FDRixDQUNGLENBQUM7SUFDRixlQUFlLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0NBQ2pDIn0=