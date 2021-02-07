"use strict";
// @ts-nocheck
/**
 * @name                            childProcess
 * @namespace           sugar.node.is
 * @type                            Function
 * @status              beta
 *
 * Check if the current script is running as a child process or not by checking if the ```process.send``` exists, or is the environment variable ```IS_CHILD_PROCESS``` is true.
 *
 * @return        {Boolean}                             true if the process is running as a child process, false if not
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isChildProcess() {
    return (process.send !== undefined || process.env.IS_CHILD_PROCESS !== undefined);
}
module.exports = isChildProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpbGRQcm9jZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2hpbGRQcm9jZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsU0FBUyxjQUFjO0lBQ3JCLE9BQU8sQ0FDTCxPQUFPLENBQUMsSUFBSSxLQUFLLFNBQVMsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixLQUFLLFNBQVMsQ0FDekUsQ0FBQztBQUNKLENBQUM7QUFDRCxpQkFBUyxjQUFjLENBQUMifQ==