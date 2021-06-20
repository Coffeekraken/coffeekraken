import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
export default {
    /**
     * @name           sFileClassesMap
     * @namespace       config.fs
     * @type            Record<string, string>
     *
     * Map some SFile classes path using minimatch patterns like so:
     * {
     *   '*.scss,*.sass': `${__packageRootDir(__dirname)}/src/node/scss/SScssFile`
     * }
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    sFileClassesMap: {
        'tsconfig.*': `${__packageRootDir(__dirname)}/src/node/ts/STsconfigFile`,
        '*.js,*.jsx': `${__packageRootDir(__dirname)}/src/node/js/SJsFile`,
        '*.ts,*.tsx': `${__packageRootDir(__dirname)}/src/node/typescript/STsFile`,
        '*.scss,*.sass': `${__packageRootDir(__dirname)}/src/node/scss/SScssFile`,
        '*.svelte': `${__packageRootDir(__dirname)}/src/node/svelte/SSvelteFile`
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnMuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZ0JBQWdCLE1BQU0sOENBQThDLENBQUM7QUFFNUUsZUFBZTtJQUNiOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILGVBQWUsRUFBRTtRQUNmLFlBQVksRUFBRSxHQUFHLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyw0QkFBNEI7UUFDeEUsWUFBWSxFQUFFLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLHNCQUFzQjtRQUNsRSxZQUFZLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsOEJBQThCO1FBQzFFLGVBQWUsRUFBRSxHQUFHLGdCQUFnQixDQUFDLFNBQVMsQ0FBQywwQkFBMEI7UUFDekUsVUFBVSxFQUFFLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLDhCQUE4QjtLQUN6RTtDQUNGLENBQUMifQ==