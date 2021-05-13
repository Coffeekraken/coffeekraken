import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
export default {
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
        'tsconfig.*': `${__packageRoot(__dirname)}/src/node/ts/STsconfigFile`,
        '*.js,*.jsx': `${__packageRoot(__dirname)}/src/node/js/SJsFile`,
        '*.ts,*.tsx': `${__packageRoot(__dirname)}/src/node/typescript/STsFile`,
        '*.scss,*.sass': `${__packageRoot(__dirname)}/src/node/scss/SScssFile`,
        '*.svelte': `${__packageRoot(__dirname)}/src/node/svelte/SSvelteFile`
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnMuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBRXRFLGVBQWU7SUFDYjs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxlQUFlLEVBQUU7UUFDZixZQUFZLEVBQUUsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLDRCQUE0QjtRQUNyRSxZQUFZLEVBQUUsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLHNCQUFzQjtRQUMvRCxZQUFZLEVBQUUsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLDhCQUE4QjtRQUN2RSxlQUFlLEVBQUUsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLDBCQUEwQjtRQUN0RSxVQUFVLEVBQUUsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLDhCQUE4QjtLQUN0RTtDQUNGLENBQUMifQ==