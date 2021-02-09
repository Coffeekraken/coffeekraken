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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Rlc3RKZXN0UHJvY2Vzc01hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVGVzdEplc3RQcm9jZXNzTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFNZCwwRUFBb0Q7QUFFcEQsd0ZBQWtFO0FBQ2xFLDhGQUF3RTtBQUt4RTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxNQUFxQixnQkFBaUIsU0FBUSw4QkFBc0I7SUFLbEU7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLGFBQWEsR0FBRyxFQUFFLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDM0MsS0FBSyxDQUFDLGFBQWEsa0JBQ2pCLEVBQUUsRUFBRSxrQkFBa0IsRUFDdEIsSUFBSSxFQUFFLG1CQUFtQixFQUN6QixNQUFNLEVBQUUsSUFBSSxtQkFBVyxDQUFDLEVBQUUsQ0FBQyxJQUN4QixRQUFRLEVBQ1gsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxnQ0FBZ0M7SUFDaEMsaUNBQWlDO0lBQ2pDLDRCQUE0QjtJQUU1Qiw4Q0FBOEM7SUFDOUMsNkNBQTZDO0lBQzdDLDRDQUE0QztJQUM1Qyw4RUFBOEU7SUFFOUUsbUdBQW1HO0lBQ25HLGlIQUFpSDtJQUVqSCxvREFBb0Q7SUFDcEQsdUNBQXVDO0lBQ3ZDLCtEQUErRDtJQUMvRCwyQ0FBMkM7SUFDM0MsUUFBUTtJQUVSLDJCQUEyQjtJQUMzQiw0QkFBNEI7SUFDNUIsK0JBQStCO0lBQy9CLDJDQUEyQztJQUMzQyxrQkFBa0I7SUFDbEIsZ0RBQWdEO0lBRWhELHlFQUF5RTtJQUV6RSwwQ0FBMEM7SUFDMUMsb0NBQW9DO0lBRXBDLHdDQUF3QztJQUN4QywrREFBK0Q7SUFDL0QsUUFBUTtJQUVSLGlEQUFpRDtJQUVqRCwrQkFBK0I7SUFFL0IsK0JBQStCO0lBQy9CLElBQUk7SUFFSjs7Ozs7Ozs7T0FRRztJQUNILElBQUk7UUFDRixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZixDQUFDOztBQXhGSCxtQ0F5RkM7QUF4RlEsMkJBQVUsR0FBRztJQUNsQixJQUFJLEVBQUUsNEJBQW9CO0NBQzNCLENBQUMifQ==