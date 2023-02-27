import __argsToString from './argsToString';
export default function __buildCommandLine(command, args = {}, settings) {
    settings = Object.assign({ keepFalsy: false }, (settings !== null && settings !== void 0 ? settings : {}));
    // loop on args
    const string = __argsToString(args, {
        keepFalsy: settings.keepFalsy,
    });
    const cmdString = command.replace('[arguments]', string);
    return cmdString;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sY0FBYyxNQUFNLGdCQUFnQixDQUFDO0FBcUU1QyxNQUFNLENBQUMsT0FBTyxVQUFVLGtCQUFrQixDQUN0QyxPQUFlLEVBQ2YsT0FBZ0MsRUFBRSxFQUNsQyxRQUE2QztJQUU3QyxRQUFRLG1CQUNKLFNBQVMsRUFBRSxLQUFLLElBQ2IsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUNGLGVBQWU7SUFDZixNQUFNLE1BQU0sR0FBRyxjQUFjLENBQUMsSUFBSSxFQUFFO1FBQ2hDLFNBQVMsRUFBRSxRQUFRLENBQUMsU0FBUztLQUNoQyxDQUFDLENBQUM7SUFDSCxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN6RCxPQUFPLFNBQVMsQ0FBQztBQUNyQixDQUFDIn0=