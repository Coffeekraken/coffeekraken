// @ts-nocheck
import __parseArgs from '../../shared/cli/parseArgs';
import __SProcess from '@coffeekraken/s-process';
export default (stringArgs = '') => {
    const args = __parseArgs(stringArgs);
    if (!args.processPath) {
        throw `Sorry but to use this endpont you have to specify at least a "--processPath" parameter...`;
    }
    const ProcessClass = require(args.processPath).default;
    if (ProcessClass.prototype instanceof __SProcess) {
        const processInstance = new ProcessClass();
        processInstance.run(stringArgs);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuQ2hpbGQuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicnVuQ2hpbGQuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSw0QkFBNEIsQ0FBQztBQUNyRCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQU1qRCxlQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQ2pDLE1BQU0sSUFBSSxHQUE0QixXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDOUQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7UUFDckIsTUFBTSwyRkFBMkYsQ0FBQztLQUNuRztJQUNELE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQ3ZELElBQUksWUFBWSxDQUFDLFNBQVMsWUFBWSxVQUFVLEVBQUU7UUFDaEQsTUFBTSxlQUFlLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMzQyxlQUFlLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ2pDO0FBQ0gsQ0FBQyxDQUFDIn0=