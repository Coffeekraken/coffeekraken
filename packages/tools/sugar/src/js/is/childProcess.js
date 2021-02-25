// @ts-nocheck
// @shared
/**
 * @name                            childProcess
 * @namespace           sugar.js.is
 * @type                            Function
 * @stable
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
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function childProcess() {
    if (!global || !global.process)
        return false;
    return (global.process.send !== undefined ||
        global.process.env.IS_CHILD_PROCESS ||
        global.process.ppid);
}
export default childProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpbGRQcm9jZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2hpbGRQcm9jZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVO0FBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsU0FBUyxZQUFZO0lBQ25CLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQzdDLE9BQU8sQ0FDTCxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxTQUFTO1FBQ2pDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQjtRQUNuQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDcEIsQ0FBQztBQUNKLENBQUM7QUFDRCxlQUFlLFlBQVksQ0FBQyJ9