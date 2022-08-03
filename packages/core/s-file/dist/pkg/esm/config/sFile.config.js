import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
export default function (api) {
    if (api.env.platform !== 'node')
        return;
    return {
        /**
         * @name           classesMap
         * @namespace       config.sFile
         * @type            Record<string, string>
         * @default         {}
         *
         * Map some SFile classes path using minimatch patterns like so:
         * {
         *   '*.scss,*.sass': `${__packageRoot(__dirname)}/src/node/scss/SScssFile`
         * }
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        classesMap: {
            'tsconfig.*': `${__packageRoot(__dirname())}/src/node/ts/STsconfigFile`,
            '*.js,*.jsx': `${__packageRoot(__dirname())}/src/node/js/SJsFile`,
            '*.ts,*.tsx': `${__packageRoot(__dirname())}/src/node/typescript/STsFile`,
            '*.scss,*.sass': `${__packageRoot(__dirname())}/src/node/scss/SScssFile`,
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBRXRFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBQ3hDLE9BQU87UUFDSDs7Ozs7Ozs7Ozs7OztXQWFHO1FBQ0gsVUFBVSxFQUFFO1lBQ1IsWUFBWSxFQUFFLEdBQUcsYUFBYSxDQUMxQixTQUFTLEVBQUUsQ0FDZCw0QkFBNEI7WUFDN0IsWUFBWSxFQUFFLEdBQUcsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLHNCQUFzQjtZQUNqRSxZQUFZLEVBQUUsR0FBRyxhQUFhLENBQzFCLFNBQVMsRUFBRSxDQUNkLDhCQUE4QjtZQUMvQixlQUFlLEVBQUUsR0FBRyxhQUFhLENBQzdCLFNBQVMsRUFBRSxDQUNkLDBCQUEwQjtTQUM5QjtLQUNKLENBQUM7QUFDTixDQUFDIn0=