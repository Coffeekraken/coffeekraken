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
export default isChildProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxTQUFTLGNBQWM7SUFDbkIsT0FBTyxDQUNILE9BQU8sQ0FBQyxJQUFJLEtBQUssU0FBUyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEtBQUssU0FBUyxDQUMzRSxDQUFDO0FBQ04sQ0FBQztBQUNELGVBQWUsY0FBYyxDQUFDIn0=