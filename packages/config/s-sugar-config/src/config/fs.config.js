import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export default function (env) {
    if (env.platform !== 'node')
        return;
    return {
        /**
         * @name           sFileClassesMap
         * @namespace       config.fs
         * @type            Record<string, string>
         *
         * Map some SFile classes path using minimatch patterns like so:
         * {
         *   '*.scss,*.sass': `${__packageRoot(__dirname)}/src/node/scss/SScssFile`
         * }
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        sFileClassesMap: {
            'tsconfig.*': `${__packageRoot(__dirname())}/src/node/ts/STsconfigFile`,
            '*.js,*.jsx': `${__packageRoot(__dirname())}/src/node/js/SJsFile`,
            '*.ts,*.tsx': `${__packageRoot(__dirname())}/src/node/typescript/STsFile`,
            '*.scss,*.sass': `${__packageRoot(__dirname())}/src/node/scss/SScssFile`,
            '*.svelte': `${__packageRoot(__dirname())}/src/node/svelte/SSvelteFile`,
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnMuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBRTVELE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFFcEMsT0FBTztRQUNIOzs7Ozs7Ozs7Ozs7V0FZRztRQUNILGVBQWUsRUFBRTtZQUNiLFlBQVksRUFBRSxHQUFHLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyw0QkFBNEI7WUFDdkUsWUFBWSxFQUFFLEdBQUcsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLHNCQUFzQjtZQUNqRSxZQUFZLEVBQUUsR0FBRyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUMsOEJBQThCO1lBQ3pFLGVBQWUsRUFBRSxHQUFHLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQywwQkFBMEI7WUFDeEUsVUFBVSxFQUFFLEdBQUcsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLDhCQUE4QjtTQUMxRTtLQUNKLENBQUM7QUFDTixDQUFDIn0=