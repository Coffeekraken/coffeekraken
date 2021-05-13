// @ts-nocheck
import __handleError from './error/handleError';
import __initEnv from './init/initEnv';
import __onProcessExit from './process/onProcessExit';
import __exitCleanup from './process/exitCleanup';
// import __registerSFileClasses from './fs/registerSFileClasses';
/**
 * @name                    index
 * @namespace           node
 *
 * This file is the "initialisation" one for the sugar node toolkit.
 * It's optional to include it but if you do, you will get these features "for free":
 * - Logging: Get the powerfull options of the SLog class without any change in your codebase
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// init env
__initEnv();
// handle the errors
__handleError();
// exit cleanup
__onProcessExit(() => {
    return __exitCleanup;
});
// SFile classes
// __registerSFileClasses();
// Logging
// new __SLog(__sugarConfig('log'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBSWQsT0FBTyxhQUFhLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxTQUFTLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkMsT0FBTyxlQUFlLE1BQU0seUJBQXlCLENBQUM7QUFDdEQsT0FBTyxhQUFhLE1BQU0sdUJBQXVCLENBQUM7QUFFbEQsa0VBQWtFO0FBRWxFOzs7Ozs7Ozs7O0dBVUc7QUFFSCxXQUFXO0FBQ1gsU0FBUyxFQUFFLENBQUM7QUFFWixvQkFBb0I7QUFDcEIsYUFBYSxFQUFFLENBQUM7QUFFaEIsZUFBZTtBQUNmLGVBQWUsQ0FBQyxHQUFHLEVBQUU7SUFDbkIsT0FBTyxhQUFhLENBQUM7QUFDdkIsQ0FBQyxDQUFDLENBQUM7QUFFSCxnQkFBZ0I7QUFDaEIsNEJBQTRCO0FBRTVCLFVBQVU7QUFDVixvQ0FBb0MifQ==