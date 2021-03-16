"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SFsDeamon_1 = __importDefault(require("../../deamon/fs/SFsDeamon"));
const STestJestInterface_1 = __importDefault(require("./interface/STestJestInterface"));
const SChildProcessManager_1 = __importDefault(require("../../process/SChildProcessManager"));
/**
 * @name            STestJestProcess
 * @namespace           sugar.node.test.jest
 * @type            Class
 * @extends         SProcess
 * @status              wip
 *
 * This class represent the process that launch the tests on javascript files
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class STestJestProcess extends SChildProcessManager_1.default {
    /**
     * @name          constructor
     * @type          Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(initialParams = {}, settings = {}) {
        super(initialParams, Object.assign({ id: 'STestJestProcess', name: 'Test Jest Process', deamon: new SFsDeamon_1.default({}) }, settings));
    }
    /**
     * @name              run
     * @type              Function
     *
     * Method that execute the frontend server code, listen for errors, etc...
     *
     * @param       {Object}        argsObj           The arguments object that will be passed to the underlined actions stream instance
     * @param       {Object}        [settings={}]     An object of settings passed to the ```start``` method of the ```SBuildScssActionsStream``` instance
     * @return      {Süromise}                        An SPomise instance representing the build process
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    // run(argsObj, settings = {}) {
    //     let input = argsObj.input;
    //     delete argsObj.input;
    //     const folderPath = __folderPath(input);
    //     const fileName = __getFilename(input);
    //     const extension = __extension(input);
    //     const fileNameWithoutExtension = fileName.replace(`.${extension}`, '');
    //     const neighbourTestFilePath = `${folderPath}/${fileNameWithoutExtension}.test.${extension}`;
    //     const inTestsFolderTestFilePath = `${folderPath}/__tests__/${fileNameWithoutExtension}.test.${extension}`;
    //     if (__fs.existsSync(neighbourTestFilePath)) {
    //       input = neighbourTestFilePath;
    //     } else if (__fs.existsSync(inTestsFolderTestFilePath)) {
    //       input = inTestsFolderTestFilePath;
    //     }
    //     const commandToRun =
    //       __buildCommandLine(
    //         `npx jest ${input}`,
    //         __STestJestInterface.definition,
    //         argsObj
    //       ) + ' --forceExit --detectOpenHandles';
    //     const childProcess = new __SChildProcessManager(commandToRun, {});
    //     const promise = childProcess.run();
    //     const result = await promise;
    //     if (result.state === 'success') {
    //       return promise.reject(result.value.stdout.join('\n'));
    //     }
    //     // __SPromise.pipe(childProcess, promise);
    //     promise.resolve(result);
    //   return super.run(promise);
    // }
    /**
     * @name          kill
     * @type          Function
     *
     * Method that allows you to kill the process
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    kill() {
        super.kill();
    }
}
exports.default = STestJestProcess;
STestJestProcess.interfaces = {
    this: STestJestInterface_1.default
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Rlc3RKZXN0UHJvY2Vzc01hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbm9kZS90ZXN0L2plc3QvU1Rlc3RKZXN0UHJvY2Vzc01hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBTWQsMEVBQW9EO0FBRXBELHdGQUFrRTtBQUNsRSw4RkFBd0U7QUFLeEU7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBcUIsZ0JBQWlCLFNBQVEsOEJBQXNCO0lBS2xFOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxhQUFhLEdBQUcsRUFBRSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQzNDLEtBQUssQ0FBQyxhQUFhLGtCQUNqQixFQUFFLEVBQUUsa0JBQWtCLEVBQ3RCLElBQUksRUFBRSxtQkFBbUIsRUFDekIsTUFBTSxFQUFFLElBQUksbUJBQVcsQ0FBQyxFQUFFLENBQUMsSUFDeEIsUUFBUSxFQUNYLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsZ0NBQWdDO0lBQ2hDLGlDQUFpQztJQUNqQyw0QkFBNEI7SUFFNUIsOENBQThDO0lBQzlDLDZDQUE2QztJQUM3Qyw0Q0FBNEM7SUFDNUMsOEVBQThFO0lBRTlFLG1HQUFtRztJQUNuRyxpSEFBaUg7SUFFakgsb0RBQW9EO0lBQ3BELHVDQUF1QztJQUN2QywrREFBK0Q7SUFDL0QsMkNBQTJDO0lBQzNDLFFBQVE7SUFFUiwyQkFBMkI7SUFDM0IsNEJBQTRCO0lBQzVCLCtCQUErQjtJQUMvQiwyQ0FBMkM7SUFDM0Msa0JBQWtCO0lBQ2xCLGdEQUFnRDtJQUVoRCx5RUFBeUU7SUFFekUsMENBQTBDO0lBQzFDLG9DQUFvQztJQUVwQyx3Q0FBd0M7SUFDeEMsK0RBQStEO0lBQy9ELFFBQVE7SUFFUixpREFBaUQ7SUFFakQsK0JBQStCO0lBRS9CLCtCQUErQjtJQUMvQixJQUFJO0lBRUo7Ozs7Ozs7O09BUUc7SUFDSCxJQUFJO1FBQ0YsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2YsQ0FBQzs7QUF4RkgsbUNBeUZDO0FBeEZRLDJCQUFVLEdBQUc7SUFDbEIsSUFBSSxFQUFFLDRCQUFvQjtDQUMzQixDQUFDIn0=