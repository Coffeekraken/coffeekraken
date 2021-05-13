// @ts-nocheck
import __isTestEnv from '../../shared/is/testEnv';
/**
 * @name                            childProcess
 * @namespace            node.is
 * @type                            Function
 * @status              beta
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isChildProcess() {
    if (__isTestEnv())
        return false;
    return (process.send !== undefined || process.env.IS_CHILD_PROCESS !== undefined);
}
export default isChildProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpbGRQcm9jZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2hpbGRQcm9jZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLFdBQVcsTUFBTSx5QkFBeUIsQ0FBQztBQUVsRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxTQUFTLGNBQWM7SUFDckIsSUFBSSxXQUFXLEVBQUU7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUNoQyxPQUFPLENBQ0wsT0FBTyxDQUFDLElBQUksS0FBSyxTQUFTLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsS0FBSyxTQUFTLENBQ3pFLENBQUM7QUFDSixDQUFDO0FBQ0QsZUFBZSxjQUFjLENBQUMifQ==