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
delete args[-1];
if (!args._settings.processPath) {
    throw `Sorry but to use this endpoint you have to specify at least a "--processPath" parameter...`;
}
const settings = Object.assign({}, args._settings);
const processPath = settings.processPath;
delete settings.processPath;
delete args._settings;
const pro = s_process_1.default.from(processPath, {
    process: Object.assign(Object.assign({}, settings), { runAsChild: false })
});
if (pro && pro.run)
    pro.run(args);
// const ProcessClass = require(args.processPath).default; // eslint-disable-line
// if (ProcessClass.prototype instanceof __SProcess) {
//   const processInstance = new ProcessClass(
//     {},
//     {
//       process: {
//         ...settings,
//         runAsChild: false
//       }
//     }
//   );
//   processInstance.run(stringArgs);
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuQXNDaGlsZC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJydW5Bc0NoaWxkLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCx5RkFBbUU7QUFDbkUsd0VBQWlEO0FBTWpELE1BQU0sVUFBVSxHQUNkLE9BQU8sQ0FBQyxJQUFJO0tBQ1QsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUNSLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQ1gsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO1FBQ3ZELE9BQU8sSUFBSSxHQUFHLEdBQUcsQ0FBQztLQUNuQjtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQyxDQUFDO0tBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNyQixNQUFNLElBQUksR0FBNEIsbUJBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM5RCxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRTtJQUMvQixNQUFNLDRGQUE0RixDQUFDO0NBQ3BHO0FBRUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ25ELE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUM7QUFDekMsT0FBTyxRQUFRLENBQUMsV0FBVyxDQUFDO0FBQzVCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztBQUV0QixNQUFNLEdBQUcsR0FBRyxtQkFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7SUFDdkMsT0FBTyxrQ0FDRixRQUFRLEtBQ1gsVUFBVSxFQUFFLEtBQUssR0FDbEI7Q0FDRixDQUFDLENBQUM7QUFDSCxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRztJQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFbEMsaUZBQWlGO0FBQ2pGLHNEQUFzRDtBQUN0RCw4Q0FBOEM7QUFDOUMsVUFBVTtBQUNWLFFBQVE7QUFDUixtQkFBbUI7QUFDbkIsdUJBQXVCO0FBQ3ZCLDRCQUE0QjtBQUM1QixVQUFVO0FBQ1YsUUFBUTtBQUNSLE9BQU87QUFDUCxxQ0FBcUM7QUFDckMsSUFBSSJ9