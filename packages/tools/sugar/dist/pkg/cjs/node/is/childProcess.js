"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                            childProcess
 * @namespace            node.is
 * @type                            Function
 * @platform        node
 * @status          beta
 *
 * Check if the current script is running as a child process or not by checking if the ```process.send``` exists, or is the environment variable ```IS_CHILD_PROCESS``` is true.
 *
 * @return        {Boolean}                             true if the process is running as a child process, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import isChildProcess from '@coffeekraken/sugar/node/is/childProcess';
 * isChildProcess(); // => false
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function isChildProcess() {
    return (process.send !== undefined || process.env.IS_CHILD_PROCESS !== undefined);
}
exports.default = isChildProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILFNBQVMsY0FBYztJQUNuQixPQUFPLENBQ0gsT0FBTyxDQUFDLElBQUksS0FBSyxTQUFTLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsS0FBSyxTQUFTLENBQzNFLENBQUM7QUFDTixDQUFDO0FBQ0Qsa0JBQWUsY0FBYyxDQUFDIn0=