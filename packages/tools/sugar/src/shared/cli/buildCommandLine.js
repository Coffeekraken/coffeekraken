import __argsToString from './argsToString';
export default function buildCommandLine(command, args = {}, settings) {
    settings = Object.assign({ keepFalsy: false }, (settings !== null && settings !== void 0 ? settings : {}));
    // loop on args
    const string = __argsToString(args, {
        keepFalsy: settings.keepFalsy,
    });
    const cmdString = command.replace('[arguments]', string);
    return cmdString;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRDb21tYW5kTGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJ1aWxkQ29tbWFuZExpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxjQUFjLE1BQU0sZ0JBQWdCLENBQUM7QUFvRTVDLE1BQU0sQ0FBQyxPQUFPLFVBQVUsZ0JBQWdCLENBQ3BDLE9BQWUsRUFDZixPQUFnQyxFQUFFLEVBQ2xDLFFBQTZDO0lBRTdDLFFBQVEsbUJBQ0osU0FBUyxFQUFFLEtBQUssSUFDYixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO0lBQ0YsZUFBZTtJQUNmLE1BQU0sTUFBTSxHQUFHLGNBQWMsQ0FBQyxJQUFJLEVBQUU7UUFDaEMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxTQUFTO0tBQ2hDLENBQUMsQ0FBQztJQUNILE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3pELE9BQU8sU0FBUyxDQUFDO0FBQ3JCLENBQUMifQ==