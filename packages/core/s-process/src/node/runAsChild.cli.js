// @ts-nocheck
import __parseArgs from '@coffeekraken/sugar/shared/cli/parseArgs';
import __SProcess from '@coffeekraken/s-process';
const stringArgs = process.argv
    .slice(1)
    .map((arg) => {
    if (arg.slice(0, 2) !== '--' && arg.slice(0, 1) !== '-') {
        return `"${arg}"`;
    }
    return arg;
})
    .join(' ') || '';
const args = __parseArgs(stringArgs);
delete args[-1];
if (!args._settings.processPath) {
    throw `Sorry but to use this endpoint you have to specify at least a "--processPath" parameter...`;
}
const settings = Object.assign({}, args._settings);
const processPath = settings.processPath;
delete settings.processPath;
delete args._settings;
const pro = __SProcess.from(processPath, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuQXNDaGlsZC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJydW5Bc0NoaWxkLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxXQUFXLE1BQU0sMENBQTBDLENBQUM7QUFDbkUsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFNakQsTUFBTSxVQUFVLEdBQ2QsT0FBTyxDQUFDLElBQUk7S0FDVCxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQ1IsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7SUFDWCxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7UUFDdkQsT0FBTyxJQUFJLEdBQUcsR0FBRyxDQUFDO0tBQ25CO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDLENBQUM7S0FDRCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3JCLE1BQU0sSUFBSSxHQUE0QixXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDOUQsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUU7SUFDL0IsTUFBTSw0RkFBNEYsQ0FBQztDQUNwRztBQUVELE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNuRCxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDO0FBQ3pDLE9BQU8sUUFBUSxDQUFDLFdBQVcsQ0FBQztBQUM1QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7QUFFdEIsTUFBTSxHQUFHLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7SUFDdkMsT0FBTyxrQ0FDRixRQUFRLEtBQ1gsVUFBVSxFQUFFLEtBQUssR0FDbEI7Q0FDRixDQUFDLENBQUM7QUFDSCxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRztJQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFbEMsaUZBQWlGO0FBQ2pGLHNEQUFzRDtBQUN0RCw4Q0FBOEM7QUFDOUMsVUFBVTtBQUNWLFFBQVE7QUFDUixtQkFBbUI7QUFDbkIsdUJBQXVCO0FBQ3ZCLDRCQUE0QjtBQUM1QixVQUFVO0FBQ1YsUUFBUTtBQUNSLE9BQU87QUFDUCxxQ0FBcUM7QUFDckMsSUFBSSJ9