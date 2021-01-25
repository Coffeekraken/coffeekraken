"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SFsDeamon_1 = __importDefault(require("../../deamon/fs/SFsDeamon"));
const STestJestInterface_1 = __importDefault(require("./interface/STestJestInterface"));
const SChildProcessManager_1 = __importDefault(require("../../process/SChildProcessManager"));
module.exports = (_a = class STestJestProcess extends SChildProcessManager_1.default {
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
    },
    _a.interfaces = {
        this: STestJestInterface_1.default
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Rlc3RKZXN0UHJvY2Vzc01hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVGVzdEplc3RQcm9jZXNzTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFNZCwwRUFBb0Q7QUFFcEQsd0ZBQWtFO0FBQ2xFLDhGQUF3RTtBQXFCeEUsdUJBQVMsTUFBTSxnQkFBaUIsU0FBUSw4QkFBc0I7UUFLNUQ7Ozs7Ozs7O1dBUUc7UUFDSCxZQUFZLGFBQWEsR0FBRyxFQUFFLEVBQUUsUUFBUSxHQUFHLEVBQUU7WUFDM0MsS0FBSyxDQUFDLGFBQWEsa0JBQ2pCLEVBQUUsRUFBRSxrQkFBa0IsRUFDdEIsSUFBSSxFQUFFLG1CQUFtQixFQUN6QixNQUFNLEVBQUUsSUFBSSxtQkFBVyxDQUFDLEVBQUUsQ0FBQyxJQUN4QixRQUFRLEVBQ1gsQ0FBQztRQUNMLENBQUM7UUFFRDs7Ozs7Ozs7Ozs7O1dBWUc7UUFDSCxnQ0FBZ0M7UUFDaEMsaUNBQWlDO1FBQ2pDLDRCQUE0QjtRQUU1Qiw4Q0FBOEM7UUFDOUMsNkNBQTZDO1FBQzdDLDRDQUE0QztRQUM1Qyw4RUFBOEU7UUFFOUUsbUdBQW1HO1FBQ25HLGlIQUFpSDtRQUVqSCxvREFBb0Q7UUFDcEQsdUNBQXVDO1FBQ3ZDLCtEQUErRDtRQUMvRCwyQ0FBMkM7UUFDM0MsUUFBUTtRQUVSLDJCQUEyQjtRQUMzQiw0QkFBNEI7UUFDNUIsK0JBQStCO1FBQy9CLDJDQUEyQztRQUMzQyxrQkFBa0I7UUFDbEIsZ0RBQWdEO1FBRWhELHlFQUF5RTtRQUV6RSwwQ0FBMEM7UUFDMUMsb0NBQW9DO1FBRXBDLHdDQUF3QztRQUN4QywrREFBK0Q7UUFDL0QsUUFBUTtRQUVSLGlEQUFpRDtRQUVqRCwrQkFBK0I7UUFFL0IsK0JBQStCO1FBQy9CLElBQUk7UUFFSjs7Ozs7Ozs7V0FRRztRQUNILElBQUk7WUFDRixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDZixDQUFDO0tBQ0Y7SUF4RlEsYUFBVSxHQUFHO1FBQ2xCLElBQUksRUFBRSw0QkFBb0I7S0FDMUI7UUFzRkYifQ==