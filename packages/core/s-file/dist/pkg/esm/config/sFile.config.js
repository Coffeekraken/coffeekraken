import { __dirname } from '@coffeekraken/sugar/fs';
import { __packageRootDir } from '@coffeekraken/sugar/path';
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
         *   '*.scss,*.sass': `${__packageRootDir(__dirname)}/src/node/scss/SScssFile`
         * }
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        classesMap: {
            'tsconfig.*': `${__packageRootDir(__dirname())}/src/node/ts/STsconfigFile`,
            '*.js,*.jsx': `${__packageRootDir(__dirname())}/src/node/js/SJsFile`,
            '*.ts,*.tsx': `${__packageRootDir(__dirname())}/src/node/typescript/STsFile`,
            '*.scss,*.sass': `${__packageRootDir(__dirname())}/src/node/scss/SScssFile`,
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUU1RCxNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUN4QyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7Ozs7V0FhRztRQUNILFVBQVUsRUFBRTtZQUNSLFlBQVksRUFBRSxHQUFHLGdCQUFnQixDQUM3QixTQUFTLEVBQUUsQ0FDZCw0QkFBNEI7WUFDN0IsWUFBWSxFQUFFLEdBQUcsZ0JBQWdCLENBQzdCLFNBQVMsRUFBRSxDQUNkLHNCQUFzQjtZQUN2QixZQUFZLEVBQUUsR0FBRyxnQkFBZ0IsQ0FDN0IsU0FBUyxFQUFFLENBQ2QsOEJBQThCO1lBQy9CLGVBQWUsRUFBRSxHQUFHLGdCQUFnQixDQUNoQyxTQUFTLEVBQUUsQ0FDZCwwQkFBMEI7U0FDOUI7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9