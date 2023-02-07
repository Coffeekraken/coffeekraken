"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            chdir
 * @namespace            node.fs
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function allows you to change the process working directory.
 * If you make use of the `__spawn` sugar function, it will also change
 * the directory of the parent process if you call this function in a childProcess.
 *
 * @todo        tests
 *
 * @param       {String}            path            The folder path you want to go to
 *
 * @example         js
 * import { __chdir } from '@coffeekraken/sugar/fs';
 * __chdir('/my/cool/file.txt', 'Hello world');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __chdir(path) {
    var _a;
    (_a = process.send) === null || _a === void 0 ? void 0 : _a.call(process, {
        command: `chdir`,
        args: path,
    });
    process.chdir(path);
}
exports.default = __chdir;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILFNBQXdCLE9BQU8sQ0FBQyxJQUFZOztJQUN4QyxNQUFBLE9BQU8sQ0FBQyxJQUFJLHdEQUFHO1FBQ1gsT0FBTyxFQUFFLE9BQU87UUFDaEIsSUFBSSxFQUFFLElBQUk7S0FDYixDQUFDLENBQUM7SUFDSCxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3hCLENBQUM7QUFORCwwQkFNQyJ9