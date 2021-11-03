import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export default function (env, config) {
    if (env.platform !== 'node')
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
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        classesMap: {
            'tsconfig.*': `${__packageRoot(__dirname())}/src/node/ts/STsconfigFile`,
            '*.js,*.jsx': `${__packageRoot(__dirname())}/src/node/js/SJsFile`,
            '*.ts,*.tsx': `${__packageRoot(__dirname())}/src/node/typescript/STsFile`,
            '*.scss,*.sass': `${__packageRoot(__dirname())}/src/node/scss/SScssFile`,
            '*.svelte': `${__packageRoot(__dirname())}/src/node/svelte/SSvelteFile`,
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic0ZpbGUuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic0ZpbGUuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBRzVELE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRyxFQUFFLE1BQU07SUFDaEMsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBQ3BDLE9BQU87UUFDSDs7Ozs7Ozs7Ozs7OztXQWFHO1FBQ0gsVUFBVSxFQUFFO1lBQ1IsWUFBWSxFQUFFLEdBQUcsYUFBYSxDQUMxQixTQUFTLEVBQUUsQ0FDZCw0QkFBNEI7WUFDN0IsWUFBWSxFQUFFLEdBQUcsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLHNCQUFzQjtZQUNqRSxZQUFZLEVBQUUsR0FBRyxhQUFhLENBQzFCLFNBQVMsRUFBRSxDQUNkLDhCQUE4QjtZQUMvQixlQUFlLEVBQUUsR0FBRyxhQUFhLENBQzdCLFNBQVMsRUFBRSxDQUNkLDBCQUEwQjtZQUMzQixVQUFVLEVBQUUsR0FBRyxhQUFhLENBQ3hCLFNBQVMsRUFBRSxDQUNkLDhCQUE4QjtTQUNsQztLQUNKLENBQUM7QUFDTixDQUFDIn0=